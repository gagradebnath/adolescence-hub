// Community Page JavaScript

const CommunityHub = {
    state: {
        posts: [],
        currentFilter: 'all',
        currentUser: null,
        selectedCategory: ''
    },
    
    init() {
        this.setupEventListeners();
        this.loadMockData();
        this.updateUI();
    },
    
    setupEventListeners() {
        // Create post form
        const createPostForm = document.querySelector('.create-post-form');
        if (createPostForm) {
            createPostForm.addEventListener('submit', this.handleCreatePost.bind(this));
        }
        
        // Filter tabs
        const filterTabs = document.querySelectorAll('.feed-filters .nav-link');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', this.handleFilterChange.bind(this));
        });
        
        // Comment forms
        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('comment-form')) {
                this.handleComment(e);
            }
            if (e.target.classList.contains('answer-form')) {
                this.handleAnswer(e);
            }
        });
        
        // Load more button
        const loadMoreBtn = document.getElementById('loadMorePosts');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', this.loadMorePosts.bind(this));
        }
    },
    
    handleCreatePost(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const content = e.target.querySelector('textarea').value.trim();
        const category = formData.get('category') || 'general';
        const isAnonymous = e.target.querySelector('.anonymous-checkbox')?.checked || false;
        
        if (content.length < 10) {
            AdolescenceHub.showNotification('Post must be at least 10 characters long.', 'error');
            return;
        }
        
        const newPost = {
            id: Date.now(),
            content: content,
            category: category,
            isAnonymous: isAnonymous,
            author: isAnonymous ? 'Anonymous' : 'Current User',
            timestamp: new Date(),
            likes: 0,
            comments: [],
            tags: this.extractTags(content)
        };
        
        this.addPostToFeed(newPost);
        e.target.reset();
        AdolescenceHub.showNotification('Post created successfully!', 'success');
    },
    
    addPostToFeed(post) {
        const postsContainer = document.querySelector('.posts-container');
        if (!postsContainer) return;
        
        const postElement = this.createPostElement(post);
        const loadMoreBtn = document.getElementById('loadMorePosts');
        
        if (loadMoreBtn) {
            postsContainer.insertBefore(postElement, loadMoreBtn.parentElement);
        } else {
            postsContainer.appendChild(postElement);
        }
        
        // Add animation
        postElement.style.opacity = '0';
        postElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            postElement.style.transition = 'all 0.3s ease';
            postElement.style.opacity = '1';
            postElement.style.transform = 'translateY(0)';
        }, 100);
        
        this.state.posts.unshift(post);
    },
    
    createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post-card card mb-4';
        postDiv.setAttribute('data-post-id', post.id);
        
        const timeAgo = this.getTimeAgo(post.timestamp);
        const categoryBadge = this.getCategoryInfo(post.category);
        
        postDiv.innerHTML = `
            <div class="card-body">
                <div class="post-header d-flex align-items-start mb-3">
                    <div class="user-avatar me-3">
                        ${post.isAnonymous ? 
                            '<div class="anonymous-avatar"><i class="fas fa-user-secret"></i></div>' :
                            `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff" alt="${post.author}" class="rounded-circle">`
                        }
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6 class="mb-0">${post.author}</h6>
                                <small class="text-muted">${timeAgo} • ${categoryBadge.name}</small>
                            </div>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-label="Post options">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" onclick="CommunityHub.savePost(${post.id})"><i class="fas fa-bookmark me-2"></i>Save Post</a></li>
                                    <li><a class="dropdown-item" href="#" onclick="CommunityHub.reportPost(${post.id})"><i class="fas fa-flag me-2"></i>Report</a></li>
                                    ${!post.isAnonymous ? '<li><a class="dropdown-item" href="#" onclick="CommunityHub.blockUser()"><i class="fas fa-user-slash me-2"></i>Block User</a></li>' : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="post-content mb-3">
                    <p>${this.formatPostContent(post.content)}</p>
                    ${post.tags.length > 0 ? `
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="badge bg-light text-dark me-1">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="post-actions">
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="CommunityHub.likePost(${post.id})">
                            <i class="fas fa-heart"></i> <span class="like-count">${post.likes}</span>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary me-2" onclick="CommunityHub.toggleComments(${post.id})">
                            <i class="fas fa-comment"></i> <span class="comment-count">${post.comments.length}</span>
                        </button>
                        <button class="btn btn-sm btn-outline-info me-2" onclick="CommunityHub.sharePost(${post.id})">
                            <i class="fas fa-share"></i> Share
                        </button>
                        <button class="btn btn-sm btn-outline-warning" onclick="CommunityHub.savePost(${post.id})">
                            <i class="fas fa-bookmark"></i> Save
                        </button>
                    </div>
                </div>
                
                <div class="comments-section mt-3 d-none" id="comments-${post.id}">
                    <div class="comments-list">
                        ${post.comments.map(comment => this.createCommentHTML(comment)).join('')}
                    </div>
                    
                    <form class="comment-form" onsubmit="CommunityHub.addComment(event, ${post.id})">
                        <div class="input-group">
                            <textarea class="form-control" placeholder="Write a comment..." rows="1" required></textarea>
                            <button class="btn btn-primary" type="submit">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        return postDiv;
    },
    
    createCommentHTML(comment) {
        const timeAgo = this.getTimeAgo(comment.timestamp);
        
        return `
            <div class="comment-item d-flex mb-3">
                <div class="user-avatar me-2" style="width: 32px; height: 32px;">
                    ${comment.isAnonymous ? 
                        '<div class="anonymous-avatar" style="width: 32px; height: 32px; font-size: 0.8rem;"><i class="fas fa-user-secret"></i></div>' :
                        `<img src="https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=ec4899&color=fff&size=32" alt="${comment.author}" class="rounded-circle">`
                    }
                </div>
                <div class="flex-grow-1">
                    <div class="comment-content">
                        <strong>${comment.author}</strong>
                        <span class="text-muted">${timeAgo}</span>
                        <p class="mb-1">${comment.content}</p>
                    </div>
                    <div class="comment-actions">
                        <button class="btn btn-sm btn-link p-0 me-2" onclick="CommunityHub.likeComment(${comment.id})">
                            <i class="fas fa-heart"></i> ${comment.likes || 0}
                        </button>
                        <button class="btn btn-sm btn-link p-0">Reply</button>
                    </div>
                </div>
            </div>
        `;
    },
    
    formatPostContent(content) {
        // Convert hashtags to links
        content = content.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
        
        // Convert URLs to links (basic implementation)
        content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
        
        // Convert newlines to <br>
        content = content.replace(/\n/g, '<br>');
        
        return content;
    },
    
    extractTags(content) {
        const hashtags = content.match(/#\w+/g) || [];
        return hashtags.map(tag => tag.toLowerCase());
    },
    
    getCategoryInfo(category) {
        const categories = {
            general: { name: 'General', color: 'primary' },
            education: { name: 'Education', color: 'success' },
            health: { name: 'Health', color: 'info' },
            technology: { name: 'Technology', color: 'warning' },
            creativity: { name: 'Creativity', color: 'danger' },
            support: { name: 'Support', color: 'secondary' }
        };
        
        return categories[category] || categories.general;
    },
    
    getTimeAgo(timestamp) {
        const now = new Date();
        const time = new Date(timestamp);
        const diff = now - time;
        
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return 'Just now';
    },
    
    handleFilterChange(e) {
        e.preventDefault();
        
        // Update active tab
        document.querySelectorAll('.feed-filters .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Update filter state
        this.state.currentFilter = e.target.getAttribute('data-filter');
        this.filterPosts();
    },
    
    filterPosts() {
        const posts = document.querySelectorAll('.post-card');
        
        posts.forEach(post => {
            const shouldShow = this.shouldShowPost(post);
            if (shouldShow) {
                post.style.display = 'block';
                post.style.animation = 'fadeIn 0.3s ease';
            } else {
                post.style.display = 'none';
            }
        });
    },
    
    shouldShowPost(postElement) {
        switch (this.state.currentFilter) {
            case 'trending':
                // Mock trending logic - posts with high engagement
                const likes = parseInt(postElement.querySelector('.like-count')?.textContent || '0');
                return likes >= 20;
            
            case 'following':
                // Mock following logic - non-anonymous posts
                return !postElement.querySelector('.anonymous-avatar');
            
            case 'questions':
                // Posts that contain question marks
                const content = postElement.querySelector('.post-content p')?.textContent || '';
                return content.includes('?');
            
            default:
                return true;
        }
    },
    
    likePost(postId) {
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        if (!postElement) return;
        
        const likeButton = postElement.querySelector('.action-buttons .btn-outline-primary');
        const likeCount = likeButton.querySelector('.like-count');
        const currentLikes = parseInt(likeCount.textContent);
        const isLiked = likeButton.classList.contains('liked');
        
        if (isLiked) {
            likeButton.classList.remove('liked');
            likeCount.textContent = currentLikes - 1;
            likeButton.querySelector('i').className = 'fas fa-heart';
        } else {
            likeButton.classList.add('liked');
            likeCount.textContent = currentLikes + 1;
            likeButton.querySelector('i').className = 'fas fa-heart text-danger';
            
            // Add heart animation
            this.addHeartAnimation(likeButton);
        }
        
        // Update state
        const post = this.state.posts.find(p => p.id === postId);
        if (post) {
            post.likes = parseInt(likeCount.textContent);
        }
    },
    
    addHeartAnimation(button) {
        const heart = document.createElement('i');
        heart.className = 'fas fa-heart floating-heart';
        heart.style.position = 'absolute';
        heart.style.color = '#dc3545';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatHeart 1s ease-out forwards';
        
        button.style.position = 'relative';
        button.appendChild(heart);
        
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 1000);
    },
    
    toggleComments(postId) {
        const commentsSection = document.getElementById(`comments-${postId}`);
        const toggleButton = document.querySelector(`[data-post-id="${postId}"] .action-buttons .btn-outline-secondary`);
        
        if (commentsSection.classList.contains('d-none')) {
            commentsSection.classList.remove('d-none');
            toggleButton.innerHTML = '<i class="fas fa-chevron-up"></i> <span class="comment-count">' + 
                                    toggleButton.querySelector('.comment-count').textContent + '</span>';
        } else {
            commentsSection.classList.add('d-none');
            toggleButton.innerHTML = '<i class="fas fa-comment"></i> <span class="comment-count">' + 
                                    toggleButton.querySelector('.comment-count').textContent + '</span>';
        }
    },
    
    addComment(event, postId) {
        event.preventDefault();
        
        const form = event.target;
        const textarea = form.querySelector('textarea');
        const content = textarea.value.trim();
        
        if (content.length < 1) return;
        
        const comment = {
            id: Date.now(),
            content: content,
            author: 'Current User',
            isAnonymous: false,
            timestamp: new Date(),
            likes: 0
        };
        
        // Add to comments list
        const commentsList = form.previousElementSibling;
        const commentHTML = this.createCommentHTML(comment);
        commentsList.insertAdjacentHTML('beforeend', commentHTML);
        
        // Update comment count
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        const commentCount = postElement.querySelector('.comment-count');
        commentCount.textContent = parseInt(commentCount.textContent) + 1;
        
        // Update state
        const post = this.state.posts.find(p => p.id === postId);
        if (post) {
            post.comments.push(comment);
        }
        
        // Reset form
        textarea.value = '';
        
        AdolescenceHub.showNotification('Comment added!', 'success');
    },
    
    sharePost(postId) {
        const post = this.state.posts.find(p => p.id === postId);
        if (!post) return;
        
        const shareText = `Check out this post from Adolescence HUB: "${post.content.substring(0, 100)}..."`;
        const shareUrl = `${window.location.origin}${window.location.pathname}#post-${postId}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Adolescence HUB Post',
                text: shareText,
                url: shareUrl
            }).then(() => {
                AdolescenceHub.showNotification('Post shared successfully!', 'success');
            }).catch(() => {
                this.fallbackShare(shareText + ' ' + shareUrl);
            });
        } else {
            this.fallbackShare(shareText + ' ' + shareUrl);
        }
    },
    
    fallbackShare(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                AdolescenceHub.showNotification('Post link copied to clipboard!', 'success');
            });
        } else {
            AdolescenceHub.showNotification('Sharing not supported on this browser', 'info');
        }
    },
    
    savePost(postId) {
        let savedPosts = JSON.parse(localStorage.getItem('saved-posts') || '[]');
        
        if (!savedPosts.includes(postId)) {
            savedPosts.push(postId);
            localStorage.setItem('saved-posts', JSON.stringify(savedPosts));
            AdolescenceHub.showNotification('Post saved!', 'success');
        } else {
            AdolescenceHub.showNotification('Post already saved', 'info');
        }
    },
    
    reportPost(postId) {
        if (confirm('Are you sure you want to report this post? Our moderation team will review it.')) {
            AdolescenceHub.showNotification('Post reported. Thank you for keeping our community safe.', 'info');
            
            // In a real app, this would send to moderation queue
            console.log('Post reported:', postId);
        }
    },
    
    blockUser() {
        if (confirm('Are you sure you want to block this user? You won\'t see their posts anymore.')) {
            AdolescenceHub.showNotification('User blocked successfully.', 'info');
        }
    },
    
    loadMorePosts() {
        const loadMoreBtn = document.getElementById('loadMorePosts');
        const originalText = loadMoreBtn.innerHTML;
        
        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        loadMoreBtn.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            const mockPosts = this.generateMockPosts(3);
            mockPosts.forEach(post => this.addPostToFeed(post));
            
            loadMoreBtn.innerHTML = originalText;
            loadMoreBtn.disabled = false;
            
            AdolescenceHub.showNotification('New posts loaded!', 'success');
        }, 1500);
    },
    
    generateMockPosts(count) {
        const mockContent = [
            "Just learned about digital privacy settings! Who else is updating their social media privacy controls? #digitalliteracy #privacy",
            "Can anyone recommend good resources for learning about fake news detection? Working on a school project 📚",
            "Anonymous: Does anyone else feel overwhelmed by all the information online? How do you decide what to trust?",
            "Tried that new fact-checking game - it's actually really fun! Got me thinking about how I consume news 🤔",
            "PSA: Always read the privacy policy before downloading new apps! Found some surprising things in a popular app today",
            "What are your thoughts on influencer marketing? Sometimes it's hard to tell what's genuine and what's paid promotion",
            "Just finished a course on media literacy. The techniques they teach for spotting bias are game-changing! 🎯"
        ];
        
        const categories = ['education', 'technology', 'general', 'health', 'support'];
        const authors = ['Alex T.', 'Jordan K.', 'Sam R.', 'Casey M.', 'Taylor S.'];
        
        return Array.from({ length: count }, (_, i) => ({
            id: Date.now() + i,
            content: mockContent[Math.floor(Math.random() * mockContent.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            isAnonymous: Math.random() > 0.7,
            author: Math.random() > 0.7 ? 'Anonymous' : authors[Math.floor(Math.random() * authors.length)],
            timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random time in last 24h
            likes: Math.floor(Math.random() * 50),
            comments: [],
            tags: []
        }));
    },
    
    loadMockData() {
        // Load some initial mock posts
        const initialPosts = this.generateMockPosts(2);
        this.state.posts = initialPosts;
    },
    
    updateUI() {
        // Update any UI elements that depend on state
        if (this.state.currentUser) {
            document.querySelectorAll('.user-info').forEach(el => {
                el.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="user-avatar me-2">
                            <i class="fas fa-user"></i>
                        </div>
                        <span>${this.state.currentUser.username}</span>
                    </div>
                `;
            });
        }
    }
};

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes floatHeart {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-30px) scale(1.5); opacity: 0; }
    }
    
    .floating-heart {
        z-index: 1000;
    }
    
    .hashtag {
        color: #6366f1;
        font-weight: 500;
        cursor: pointer;
    }
    
    .hashtag:hover {
        text-decoration: underline;
    }
    
    .post-card {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .post-card:hover {
        transform: translateY(-2px);
    }
    
    .btn.liked {
        background-color: rgba(220, 53, 69, 0.1);
        border-color: #dc3545;
        color: #dc3545;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('community.html')) {
        CommunityHub.init();
    }
});

// Expose to global scope
window.CommunityHub = CommunityHub;
