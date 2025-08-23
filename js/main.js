// Main JavaScript for Adolescence HUB

// Global state management
const AdolescenceHub = {
    state: {
        user: null,
        notifications: [],
        preferences: {
            theme: 'light',
            notifications: true,
            anonymousMode: false
        }
    },
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.loadUserPreferences();
        this.initializeComponents();
        this.checkAuthentication();
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Navigation scroll effect
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Form submissions
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Modal interactions
        document.addEventListener('click', this.handleModalTriggers.bind(this));
        
        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.smoothScroll.bind(this));
        });
        
        // Search functionality
        const searchInputs = document.querySelectorAll('.search-input');
        searchInputs.forEach(input => {
            input.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        });
        
        // Anonymous mode toggle
        const anonymousToggle = document.querySelector('.anonymous-toggle');
        if (anonymousToggle) {
            anonymousToggle.addEventListener('change', this.toggleAnonymousMode.bind(this));
        }
    },
    
    // Handle scroll events
    handleScroll() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            const scrollPercent = scrolled / (hero.offsetHeight / 2);
            hero.style.transform = `translateY(${scrollPercent * 50}px)`;
        }
        
        // Animate elements on scroll
        this.animateOnScroll();
    },
    
    // Animate elements when they come into view
    animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => observer.observe(el));
    },
    
    // Smooth scrolling
    smoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    },
    
    // Handle form submissions
    handleFormSubmit(e) {
        const form = e.target;
        
        // Handle different form types
        if (form.classList.contains('contact-form')) {
            this.handleContactForm(e);
        } else if (form.classList.contains('newsletter-form')) {
            this.handleNewsletterForm(e);
        } else if (form.classList.contains('qa-form')) {
            this.handleQAForm(e);
        } else if (form.classList.contains('rumor-form')) {
            this.handleRumorForm(e);
        }
    },
    
    // Handle contact form submission
    handleContactForm(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    },
    
    // Handle newsletter signup
    handleNewsletterForm(e) {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        if (this.validateEmail(email)) {
            this.showNotification('Successfully subscribed to newsletter!', 'success');
            e.target.reset();
        } else {
            this.showNotification('Please enter a valid email address.', 'error');
        }
    },
    
    // Handle Q&A form submission
    handleQAForm(e) {
        e.preventDefault();
        const question = e.target.querySelector('textarea').value;
        const isAnonymous = e.target.querySelector('.anonymous-checkbox')?.checked || false;
        
        if (question.trim().length < 10) {
            this.showNotification('Question must be at least 10 characters long.', 'error');
            return;
        }
        
        // Add question to the list
        this.addQuestionToFeed(question, isAnonymous);
        this.showNotification('Question posted successfully!', 'success');
        e.target.reset();
    },
    
    // Handle rumor submission
    handleRumorForm(e) {
        e.preventDefault();
        const rumor = e.target.querySelector('textarea').value;
        const source = e.target.querySelector('input[name="source"]')?.value || '';
        
        if (rumor.trim().length < 20) {
            this.showNotification('Please provide more details about the rumor.', 'error');
            return;
        }
        
        this.addRumorToFeed(rumor, source);
        this.showNotification('Rumor submitted for verification!', 'success');
        e.target.reset();
    },
    
    // Add question to Q&A feed
    addQuestionToFeed(question, isAnonymous) {
        const qaFeed = document.querySelector('.qa-feed');
        if (!qaFeed) return;
        
        const questionElement = document.createElement('div');
        questionElement.className = 'qa-item card mb-3';
        questionElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-start">
                    <div class="user-avatar me-3">
                        <i class="fas fa-${isAnonymous ? 'user-secret' : 'user'}"></i>
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h6 class="mb-0">${isAnonymous ? 'Anonymous' : 'User'}</h6>
                            <small class="text-muted">Just now</small>
                        </div>
                        <p class="mb-3">${this.escapeHtml(question)}</p>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-outline-primary me-2" onclick="AdolescenceHub.likePost(this)">
                                <i class="fas fa-heart"></i> <span class="like-count">0</span>
                            </button>
                            <button class="btn btn-sm btn-outline-secondary me-2" onclick="AdolescenceHub.toggleAnswers(this)">
                                <i class="fas fa-comment"></i> Answer
                            </button>
                            <button class="btn btn-sm btn-outline-warning" onclick="AdolescenceHub.reportPost(this)">
                                <i class="fas fa-flag"></i> Report
                            </button>
                        </div>
                        <div class="answers-section mt-3" style="display: none;">
                            <form class="answer-form">
                                <div class="input-group">
                                    <textarea class="form-control" placeholder="Share your answer..." rows="2"></textarea>
                                    <button class="btn btn-primary" type="submit">
                                        <i class="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                            </form>
                            <div class="answers-list mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        qaFeed.insertBefore(questionElement, qaFeed.firstChild);
        
        // Add animation
        questionElement.style.opacity = '0';
        questionElement.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            questionElement.style.transition = 'all 0.3s ease';
            questionElement.style.opacity = '1';
            questionElement.style.transform = 'translateY(0)';
        }, 100);
    },
    
    // Add rumor to verification feed
    addRumorToFeed(rumor, source) {
        const rumorFeed = document.querySelector('.rumor-feed');
        if (!rumorFeed) return;
        
        const rumorElement = document.createElement('div');
        rumorElement.className = 'rumor-item card mb-3';
        rumorElement.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <div class="rumor-status">
                        <span class="badge bg-warning">Pending Verification</span>
                    </div>
                    <small class="text-muted">Just submitted</small>
                </div>
                <p class="mb-3">${this.escapeHtml(rumor)}</p>
                ${source ? `<p class="text-muted mb-3"><strong>Source:</strong> ${this.escapeHtml(source)}</p>` : ''}
                <div class="verification-actions">
                    <button class="btn btn-sm btn-success me-2" onclick="AdolescenceHub.verifyRumor(this, true)">
                        <i class="fas fa-check"></i> Confirm
                    </button>
                    <button class="btn btn-sm btn-danger me-2" onclick="AdolescenceHub.verifyRumor(this, false)">
                        <i class="fas fa-times"></i> Debunk
                    </button>
                    <button class="btn btn-sm btn-outline-primary" onclick="AdolescenceHub.addEvidence(this)">
                        <i class="fas fa-plus"></i> Add Evidence
                    </button>
                </div>
                <div class="evidence-section mt-3" style="display: none;">
                    <form class="evidence-form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Add supporting evidence or source...">
                            <button class="btn btn-outline-secondary" type="submit">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </form>
                    <div class="evidence-list mt-2"></div>
                </div>
            </div>
        `;
        
        rumorFeed.insertBefore(rumorElement, rumorFeed.firstChild);
    },
    
    // Like/unlike post
    likePost(button) {
        const likeCount = button.querySelector('.like-count');
        const currentCount = parseInt(likeCount.textContent);
        const isLiked = button.classList.contains('liked');
        
        if (isLiked) {
            button.classList.remove('liked');
            likeCount.textContent = currentCount - 1;
            button.querySelector('i').className = 'fas fa-heart';
        } else {
            button.classList.add('liked');
            likeCount.textContent = currentCount + 1;
            button.querySelector('i').className = 'fas fa-heart text-danger';
        }
    },
    
    // Toggle answers section
    toggleAnswers(button) {
        const answersSection = button.closest('.qa-item').querySelector('.answers-section');
        if (answersSection.style.display === 'none') {
            answersSection.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Answers';
        } else {
            answersSection.style.display = 'none';
            button.innerHTML = '<i class="fas fa-comment"></i> Answer';
        }
    },
    
    // Report inappropriate content
    reportPost(button) {
        if (confirm('Are you sure you want to report this content?')) {
            this.showNotification('Content reported. Thank you for keeping our community safe.', 'info');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-check"></i> Reported';
        }
    },
    
    // Verify rumor
    verifyRumor(button, isConfirmed) {
        const rumorItem = button.closest('.rumor-item');
        const statusBadge = rumorItem.querySelector('.badge');
        const actions = rumorItem.querySelector('.verification-actions');
        
        if (isConfirmed) {
            statusBadge.className = 'badge bg-danger';
            statusBadge.textContent = 'Confirmed';
        } else {
            statusBadge.className = 'badge bg-success';
            statusBadge.textContent = 'Debunked';
        }
        
        actions.innerHTML = `
            <p class="text-muted mb-0">
                <i class="fas fa-users me-1"></i>
                Verified by community
            </p>
        `;
        
        this.showNotification(`Rumor ${isConfirmed ? 'confirmed' : 'debunked'}. Thank you for your contribution!`, 'success');
    },
    
    // Add evidence to rumor
    addEvidence(button) {
        const evidenceSection = button.closest('.rumor-item').querySelector('.evidence-section');
        evidenceSection.style.display = evidenceSection.style.display === 'none' ? 'block' : 'none';
    },
    
    // Show notification
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            min-width: 300px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, duration);
    },
    
    // Toggle theme
    toggleTheme() {
        const currentTheme = this.state.preferences.theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        this.state.preferences.theme = newTheme;
        this.saveUserPreferences();
        
        this.showNotification(`Switched to ${newTheme} theme`, 'info');
    },
    
    // Toggle anonymous mode
    toggleAnonymousMode(e) {
        this.state.preferences.anonymousMode = e.target.checked;
        this.saveUserPreferences();
        
        const message = this.state.preferences.anonymousMode 
            ? 'Anonymous mode enabled' 
            : 'Anonymous mode disabled';
        this.showNotification(message, 'info');
    },
    
    // Handle search
    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const searchResults = document.querySelector('.search-results');
        
        if (query.length < 2) {
            if (searchResults) searchResults.innerHTML = '';
            return;
        }
        
        // Simulate search results
        const mockResults = [
            { title: 'How to identify fake news', type: 'article', url: '#' },
            { title: 'Digital privacy basics', type: 'course', url: '#' },
            { title: 'Spot the fake game', type: 'game', url: '#' },
            { title: 'Influencer marketing tactics', type: 'tool', url: '#' }
        ].filter(item => 
            item.title.toLowerCase().includes(query)
        );
        
        if (searchResults) {
            searchResults.innerHTML = mockResults.map(result => `
                <div class="search-result-item">
                    <a href="${result.url}" class="text-decoration-none">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-${this.getIconForType(result.type)} me-2"></i>
                            <div>
                                <h6 class="mb-0">${result.title}</h6>
                                <small class="text-muted">${result.type}</small>
                            </div>
                        </div>
                    </a>
                </div>
            `).join('');
        }
    },
    
    // Get icon for content type
    getIconForType(type) {
        const icons = {
            article: 'newspaper',
            course: 'graduation-cap',
            game: 'gamepad',
            tool: 'tools'
        };
        return icons[type] || 'file';
    },
    
    // Validate email
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Load user preferences
    loadUserPreferences() {
        const saved = localStorage.getItem('adolescence-hub-preferences');
        if (saved) {
            this.state.preferences = { ...this.state.preferences, ...JSON.parse(saved) };
        }
        
        // Apply theme
        document.body.setAttribute('data-theme', this.state.preferences.theme);
        
        // Apply anonymous mode
        const anonymousToggle = document.querySelector('.anonymous-toggle');
        if (anonymousToggle) {
            anonymousToggle.checked = this.state.preferences.anonymousMode;
        }
    },
    
    // Save user preferences
    saveUserPreferences() {
        localStorage.setItem('adolescence-hub-preferences', JSON.stringify(this.state.preferences));
    },
    
    // Check authentication
    checkAuthentication() {
        const token = localStorage.getItem('adolescence-hub-token');
        if (token) {
            // Validate token and load user data
            this.loadUserData(token);
        }
    },
    
    // Load user data
    loadUserData(token) {
        // Simulate API call
        setTimeout(() => {
            this.state.user = {
                id: 1,
                username: 'user123',
                email: 'user@example.com',
                avatar: null,
                joinDate: '2024-01-01',
                points: 150,
                badges: ['fact-checker', 'community-helper']
            };
            
            this.updateUserInterface();
        }, 1000);
    },
    
    // Update UI based on user state
    updateUserInterface() {
        const userElements = document.querySelectorAll('.user-info');
        userElements.forEach(el => {
            if (this.state.user) {
                el.innerHTML = `
                    <div class="d-flex align-items-center">
                        <div class="user-avatar me-2">
                            <i class="fas fa-user"></i>
                        </div>
                        <span>${this.state.user.username}</span>
                    </div>
                `;
            }
        });
    },
    
    // Initialize components
    initializeComponents() {
        // Initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize modals
        const modalTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="modal"]'));
        modalTriggerList.map(function (modalTriggerEl) {
            return new bootstrap.Modal(modalTriggerEl);
        });
        
        // Initialize progress bars
        this.animateProgressBars();
        
        // Initialize counters
        this.animateCounters();
    },
    
    // Animate progress bars
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 500);
        });
    },
    
    // Animate counters
    animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    },
    
    // Handle modal triggers
    handleModalTriggers(e) {
        if (e.target.classList.contains('modal-trigger')) {
            const modalId = e.target.getAttribute('data-modal');
            const modal = document.querySelector(modalId);
            if (modal) {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            }
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    AdolescenceHub.init();
});

// Expose to global scope for HTML onclick handlers
window.AdolescenceHub = AdolescenceHub;
