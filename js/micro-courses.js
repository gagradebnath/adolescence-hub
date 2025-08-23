// Micro-Courses JavaScript

const MicroCourses = {
    state: {
        currentFilter: 'all',
        enrolledCourses: [],
        courseProgress: {},
        selectedCourse: null
    },
    
    courses: [
        {
            id: 'digital-literacy-basics',
            title: 'Digital Literacy Basics',
            description: 'Learn the fundamentals of navigating the digital world safely and effectively.',
            category: 'digital-literacy',
            difficulty: 'beginner',
            duration: '2 hours',
            lessons: 8,
            rating: 4.8,
            enrolled: 1420,
            icon: 'fas fa-laptop',
            thumbnail: 'digital-literacy',
            objectives: [
                'Understand basic digital concepts and terminology',
                'Learn to evaluate online information credibility',
                'Develop safe browsing habits',
                'Master essential digital communication skills'
            ],
            lessons_detail: [
                { id: 1, title: 'What is Digital Literacy?', type: 'video', duration: '8 min', completed: true },
                { id: 2, title: 'Navigating the Internet Safely', type: 'reading', duration: '12 min', completed: true },
                { id: 3, title: 'Understanding URLs and Domains', type: 'video', duration: '10 min', completed: false },
                { id: 4, title: 'Email Etiquette and Safety', type: 'reading', duration: '15 min', completed: false },
                { id: 5, title: 'Digital Footprints', type: 'video', duration: '12 min', completed: false },
                { id: 6, title: 'Password Security', type: 'reading', duration: '10 min', completed: false },
                { id: 7, title: 'Two-Factor Authentication', type: 'video', duration: '8 min', completed: false },
                { id: 8, title: 'Final Assessment', type: 'quiz', duration: '20 min', completed: false }
            ],
            progress: 25,
            certificate: true
        },
        {
            id: 'fake-news-detection',
            title: 'Fake News Detection',
            description: 'Learn to identify misinformation and verify news sources in the digital age.',
            category: 'digital-literacy',
            difficulty: 'intermediate',
            duration: '3 hours',
            lessons: 10,
            rating: 4.9,
            enrolled: 987,
            icon: 'fas fa-search',
            thumbnail: 'fake-news',
            objectives: [
                'Identify common signs of fake news and misinformation',
                'Use fact-checking tools and techniques',
                'Understand media bias and its impact',
                'Develop critical thinking skills for news consumption'
            ],
            lessons_detail: [
                { id: 1, title: 'The Misinformation Crisis', type: 'video', duration: '15 min', completed: false },
                { id: 2, title: 'Types of False Information', type: 'reading', duration: '18 min', completed: false },
                { id: 3, title: 'Fact-Checking Techniques', type: 'video', duration: '20 min', completed: false },
                { id: 4, title: 'Verifying Sources', type: 'reading', duration: '12 min', completed: false },
                { id: 5, title: 'Understanding Media Bias', type: 'video', duration: '16 min', completed: false },
                { id: 6, title: 'Social Media Red Flags', type: 'reading', duration: '14 min', completed: false },
                { id: 7, title: 'Using Fact-Check Websites', type: 'video', duration: '10 min', completed: false },
                { id: 8, title: 'Reverse Image Searching', type: 'reading', duration: '8 min', completed: false },
                { id: 9, title: 'Practice Exercises', type: 'quiz', duration: '25 min', completed: false },
                { id: 10, title: 'Final Project', type: 'quiz', duration: '30 min', completed: false }
            ],
            progress: 0,
            certificate: true
        },
        {
            id: 'teen-mental-health',
            title: 'Teen Mental Health Essentials',
            description: 'Understanding adolescent mental health, coping strategies, and when to seek help.',
            category: 'mental-health',
            difficulty: 'beginner',
            duration: '2.5 hours',
            lessons: 9,
            rating: 4.7,
            enrolled: 2156,
            icon: 'fas fa-heart',
            thumbnail: 'mental-health',
            objectives: [
                'Recognize signs of common mental health challenges',
                'Learn healthy coping mechanisms and stress management',
                'Understand when and how to seek professional help',
                'Build emotional intelligence and resilience'
            ],
            lessons_detail: [
                { id: 1, title: 'Understanding Teen Mental Health', type: 'video', duration: '12 min', completed: true },
                { id: 2, title: 'Common Mental Health Challenges', type: 'reading', duration: '20 min', completed: true },
                { id: 3, title: 'Stress and Anxiety Management', type: 'video', duration: '18 min', completed: true },
                { id: 4, title: 'Depression: Signs and Support', type: 'reading', duration: '15 min', completed: false },
                { id: 5, title: 'Building Resilience', type: 'video', duration: '14 min', completed: false },
                { id: 6, title: 'Healthy Coping Strategies', type: 'reading', duration: '16 min', completed: false },
                { id: 7, title: 'When to Seek Help', type: 'video', duration: '10 min', completed: false },
                { id: 8, title: 'Supporting Friends', type: 'reading', duration: '12 min', completed: false },
                { id: 9, title: 'Mental Health Action Plan', type: 'quiz', duration: '20 min', completed: false }
            ],
            progress: 33,
            certificate: true
        },
        {
            id: 'adolescent-development',
            title: 'Understanding Adolescent Development',
            description: 'Explore the physical, emotional, and social changes during adolescence.',
            category: 'adolescence',
            difficulty: 'beginner',
            duration: '2 hours',
            lessons: 7,
            rating: 4.6,
            enrolled: 1544,
            icon: 'fas fa-seedling',
            thumbnail: 'adolescence',
            objectives: [
                'Understand physical and cognitive changes during puberty',
                'Learn about emotional and social development',
                'Explore identity formation and self-discovery',
                'Navigate relationships and peer pressure'
            ],
            lessons_detail: [
                { id: 1, title: 'What is Adolescence?', type: 'video', duration: '10 min', completed: false },
                { id: 2, title: 'Physical Development', type: 'reading', duration: '18 min', completed: false },
                { id: 3, title: 'Brain Development in Teens', type: 'video', duration: '15 min', completed: false },
                { id: 4, title: 'Emotional Changes', type: 'reading', duration: '14 min', completed: false },
                { id: 5, title: 'Identity and Self-Concept', type: 'video', duration: '12 min', completed: false },
                { id: 6, title: 'Social Relationships', type: 'reading', duration: '16 min', completed: false },
                { id: 7, title: 'Reflection Activity', type: 'quiz', duration: '15 min', completed: false }
            ],
            progress: 0,
            certificate: true
        },
        {
            id: 'climate-change-basics',
            title: 'Climate Change for Teens',
            description: 'Understand climate science and how young people can make a difference.',
            category: 'climate',
            difficulty: 'intermediate',
            duration: '3.5 hours',
            lessons: 12,
            rating: 4.8,
            enrolled: 892,
            icon: 'fas fa-globe-americas',
            thumbnail: 'climate',
            objectives: [
                'Understand the science behind climate change',
                'Learn about environmental impacts and solutions',
                'Explore youth activism and climate action',
                'Develop sustainable lifestyle practices'
            ],
            lessons_detail: [
                { id: 1, title: 'Climate vs Weather', type: 'video', duration: '12 min', completed: false },
                { id: 2, title: 'The Greenhouse Effect', type: 'reading', duration: '15 min', completed: false },
                { id: 3, title: 'Evidence of Climate Change', type: 'video', duration: '18 min', completed: false },
                { id: 4, title: 'Causes and Contributors', type: 'reading', duration: '20 min', completed: false },
                { id: 5, title: 'Environmental Impacts', type: 'video', duration: '16 min', completed: false },
                { id: 6, title: 'Solutions and Technology', type: 'reading', duration: '22 min', completed: false },
                { id: 7, title: 'Youth Climate Movements', type: 'video', duration: '14 min', completed: false },
                { id: 8, title: 'Personal Action Steps', type: 'reading', duration: '12 min', completed: false },
                { id: 9, title: 'Sustainable Living', type: 'video', duration: '16 min', completed: false },
                { id: 10, title: 'Climate Communication', type: 'reading', duration: '10 min', completed: false },
                { id: 11, title: 'Action Plan Project', type: 'quiz', duration: '25 min', completed: false },
                { id: 12, title: 'Final Assessment', type: 'quiz', duration: '20 min', completed: false }
            ],
            progress: 0,
            certificate: true
        },
        {
            id: 'ai-basics',
            title: 'AI Basics for Teens',
            description: 'Introduction to artificial intelligence, machine learning, and their impact on society.',
            category: 'ai-tech',
            difficulty: 'beginner',
            duration: '2.5 hours',
            lessons: 8,
            rating: 4.9,
            enrolled: 1203,
            icon: 'fas fa-robot',
            thumbnail: 'ai-tech',
            objectives: [
                'Understand what AI is and how it works',
                'Learn about different types of AI applications',
                'Explore ethical considerations in AI development',
                'Discover career opportunities in AI and tech'
            ],
            lessons_detail: [
                { id: 1, title: 'What is Artificial Intelligence?', type: 'video', duration: '14 min', completed: false },
                { id: 2, title: 'Types of AI Systems', type: 'reading', duration: '16 min', completed: false },
                { id: 3, title: 'Machine Learning Basics', type: 'video', duration: '18 min', completed: false },
                { id: 4, title: 'AI in Daily Life', type: 'reading', duration: '12 min', completed: false },
                { id: 5, title: 'Ethics and AI', type: 'video', duration: '20 min', completed: false },
                { id: 6, title: 'AI and the Future of Work', type: 'reading', duration: '15 min', completed: false },
                { id: 7, title: 'Getting Started in AI', type: 'video', duration: '12 min', completed: false },
                { id: 8, title: 'AI Project Challenge', type: 'quiz', duration: '30 min', completed: false }
            ],
            progress: 0,
            certificate: true
        }
    ],
    
    init() {
        this.loadUserProgress();
        this.renderCourses();
        this.updateStats();
        this.setupEventListeners();
    },
    
    setupEventListeners() {
        // Add any additional event listeners here
        console.log('MicroCourses initialized');
    },
    
    renderCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;
        
        coursesGrid.innerHTML = '';
        
        const filteredCourses = this.getFilteredCourses();
        
        filteredCourses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            coursesGrid.appendChild(courseCard);
        });
    },
    
    getFilteredCourses() {
        if (this.state.currentFilter === 'all') {
            return this.courses;
        }
        return this.courses.filter(course => course.category === this.state.currentFilter);
    },
    
    createCourseCard(course) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';
        
        const difficultyClass = `difficulty-${course.difficulty}`;
        const isEnrolled = this.state.enrolledCourses.includes(course.id);
        const progress = this.state.courseProgress[course.id] || course.progress || 0;
        
        col.innerHTML = `
            <div class="course-card position-relative">
                <div class="course-thumbnail position-relative">
                    <i class="${course.icon}"></i>
                    <div class="course-badge">${course.difficulty}</div>
                </div>
                <div class="card-body p-4">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <h5 class="card-title mb-0">${course.title}</h5>
                        <span class="difficulty-badge ${difficultyClass}">${course.difficulty}</span>
                    </div>
                    
                    <p class="card-text text-muted mb-3">${course.description}</p>
                    
                    <div class="course-stats mb-3">
                        <div class="course-stat">
                            <i class="fas fa-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                        <div class="course-stat">
                            <i class="fas fa-book-open"></i>
                            <span>${course.lessons} lessons</span>
                        </div>
                        <div class="course-stat">
                            <i class="fas fa-star text-warning"></i>
                            <span>${course.rating}</span>
                        </div>
                        <div class="course-stat">
                            <i class="fas fa-users"></i>
                            <span>${course.enrolled}</span>
                        </div>
                    </div>
                    
                    ${isEnrolled || progress > 0 ? `
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <small class="text-muted">Progress</small>
                                <small class="text-muted">${progress}%</small>
                            </div>
                            <div class="progress-bar-custom">
                                <div class="progress-fill" style="width: ${progress}%"></div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-outline-primary flex-grow-1" onclick="MicroCourses.showCourseDetails('${course.id}')">
                            View Details
                        </button>
                        ${isEnrolled || progress > 0 ? 
                            `<button class="btn btn-primary" onclick="MicroCourses.continueCourse('${course.id}')">
                                ${progress > 0 ? 'Continue' : 'Start'}
                            </button>` :
                            `<button class="btn btn-primary" onclick="MicroCourses.enrollInCourse('${course.id}')">
                                Enroll
                            </button>`
                        }
                    </div>
                </div>
            </div>
        `;
        
        return col;
    },
    
    filterCourses(filter) {
        // Update active tab
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.state.currentFilter = filter;
        this.renderCourses();
    },
    
    showCourseDetails(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;
        
        this.state.selectedCourse = course;
        
        const modalBody = document.getElementById('courseModalBody');
        const enrollBtn = document.getElementById('enrollBtn');
        const isEnrolled = this.state.enrolledCourses.includes(courseId);
        const progress = this.state.courseProgress[courseId] || course.progress || 0;
        
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <h4>${course.title}</h4>
                    <p class="text-muted mb-4">${course.description}</p>
                    
                    <h6 class="fw-bold mb-3">Learning Objectives:</h6>
                    <ul class="mb-4">
                        ${course.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                    
                    <h6 class="fw-bold mb-3">Course Content:</h6>
                    <div class="lessons-list">
                        ${course.lessons_detail.map(lesson => `
                            <div class="lesson-item d-flex align-items-center ${lesson.completed ? 'completed' : ''}">
                                <div class="lesson-icon ${lesson.type}">
                                    <i class="fas fa-${this.getLessonIcon(lesson.type)}"></i>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <h6 class="mb-1">${lesson.title}</h6>
                                        <small class="text-muted">${lesson.duration}</small>
                                    </div>
                                    <small class="text-muted text-capitalize">${lesson.type}</small>
                                </div>
                                ${lesson.completed ? '<i class="fas fa-check-circle text-success ms-2"></i>' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card bg-light">
                        <div class="card-body">
                            <h6 class="fw-bold mb-3">Course Info</h6>
                            <div class="mb-2">
                                <strong>Duration:</strong> ${course.duration}
                            </div>
                            <div class="mb-2">
                                <strong>Lessons:</strong> ${course.lessons}
                            </div>
                            <div class="mb-2">
                                <strong>Difficulty:</strong> <span class="badge difficulty-${course.difficulty}">${course.difficulty}</span>
                            </div>
                            <div class="mb-2">
                                <strong>Rating:</strong> 
                                <span class="text-warning">
                                    ${'★'.repeat(Math.floor(course.rating))}${'☆'.repeat(5 - Math.floor(course.rating))}
                                </span>
                                ${course.rating}
                            </div>
                            <div class="mb-3">
                                <strong>Enrolled:</strong> ${course.enrolled} students
                            </div>
                            
                            ${course.certificate ? `
                                <div class="alert alert-info mb-3">
                                    <i class="fas fa-certificate me-2"></i>
                                    <small>Certificate available upon completion</small>
                                </div>
                            ` : ''}
                            
                            ${isEnrolled || progress > 0 ? `
                                <div class="mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <small>Your Progress</small>
                                        <small>${progress}%</small>
                                    </div>
                                    <div class="progress-bar-custom">
                                        <div class="progress-fill" style="width: ${progress}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update enroll button
        if (isEnrolled || progress > 0) {
            enrollBtn.textContent = progress > 0 ? 'Continue Course' : 'Start Course';
            enrollBtn.onclick = () => this.continueCourse(courseId);
        } else {
            enrollBtn.textContent = 'Enroll Now';
            enrollBtn.onclick = () => this.enrollInCourse(courseId);
        }
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('courseModal'));
        modal.show();
    },
    
    getLessonIcon(type) {
        const icons = {
            video: 'play-circle',
            reading: 'book-open',
            quiz: 'question-circle'
        };
        return icons[type] || 'circle';
    },
    
    enrollInCourse(courseId) {
        if (courseId && !this.state.enrolledCourses.includes(courseId)) {
            this.state.enrolledCourses.push(courseId);
        } else if (!courseId && this.state.selectedCourse) {
            courseId = this.state.selectedCourse.id;
            if (!this.state.enrolledCourses.includes(courseId)) {
                this.state.enrolledCourses.push(courseId);
            }
        }
        
        this.saveUserProgress();
        this.renderCourses();
        this.updateStats();
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('courseModal'));
        if (modal) modal.hide();
        
        AdolescenceHub.showNotification('Successfully enrolled in course!', 'success');
        
        // Start the course
        setTimeout(() => {
            this.continueCourse(courseId);
        }, 500);
    },
    
    continueCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;
        
        // Find next lesson to start
        const nextLesson = course.lessons_detail.find(lesson => !lesson.completed);
        const lessonIndex = nextLesson ? course.lessons_detail.indexOf(nextLesson) : 0;
        
        this.openCoursePlayer(course, lessonIndex);
    },
    
    openCoursePlayer(course, lessonIndex = 0) {
        const lesson = course.lessons_detail[lessonIndex];
        const modal = new bootstrap.Modal(document.getElementById('coursePlayerModal'));
        const modalBody = document.getElementById('coursePlayerBody');
        const modalLabel = document.getElementById('coursePlayerLabel');
        
        modalLabel.textContent = course.title;
        
        modalBody.innerHTML = `
            <div class="row g-0">
                <div class="col-md-8">
                    <div class="player-content p-4">
                        ${this.renderLessonContent(lesson)}
                    </div>
                </div>
                <div class="col-md-4 bg-light border-start">
                    <div class="course-sidebar p-3">
                        <h6 class="fw-bold mb-3">Course Progress</h6>
                        <div class="progress-bar-custom mb-3">
                            <div class="progress-fill" style="width: ${this.calculateProgress(course)}%"></div>
                        </div>
                        <p class="text-muted small mb-4">${this.calculateProgress(course)}% Complete</p>
                        
                        <h6 class="fw-bold mb-3">Lessons</h6>
                        <div class="lessons-sidebar">
                            ${course.lessons_detail.map((l, i) => `
                                <div class="lesson-sidebar-item ${i === lessonIndex ? 'active' : ''} ${l.completed ? 'completed' : ''}" 
                                     onclick="MicroCourses.switchLesson(${i})">
                                    <div class="d-flex align-items-center">
                                        <div class="lesson-icon ${l.type} me-2" style="width: 30px; height: 30px; font-size: 0.8rem;">
                                            <i class="fas fa-${this.getLessonIcon(l.type)}"></i>
                                        </div>
                                        <div class="flex-grow-1">
                                            <div class="fw-semibold small">${l.title}</div>
                                            <div class="text-muted smaller">${l.duration}</div>
                                        </div>
                                        ${l.completed ? '<i class="fas fa-check-circle text-success"></i>' : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-4">
                            <button class="btn btn-primary w-100" onclick="MicroCourses.completeLesson(${lessonIndex})">
                                ${lesson.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.state.currentCourse = course;
        this.state.currentLessonIndex = lessonIndex;
        
        modal.show();
    },
    
    renderLessonContent(lesson) {
        switch (lesson.type) {
            case 'video':
                return `
                    <div class="lesson-video">
                        <h4>${lesson.title}</h4>
                        <div class="video-placeholder bg-dark rounded d-flex align-items-center justify-content-center" style="height: 300px;">
                            <div class="text-center text-light">
                                <i class="fas fa-play-circle fa-4x mb-3"></i>
                                <p>Video content: ${lesson.title}</p>
                                <p class="small">Duration: ${lesson.duration}</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <h6>About this lesson:</h6>
                            <p>This video lesson covers important concepts about ${lesson.title.toLowerCase()}. Pay attention to key points and take notes as needed.</p>
                        </div>
                    </div>
                `;
            
            case 'reading':
                return `
                    <div class="lesson-reading">
                        <h4>${lesson.title}</h4>
                        <div class="reading-content">
                            <p class="lead">This reading lesson will help you understand ${lesson.title.toLowerCase()}.</p>
                            
                            <h6>Key Points:</h6>
                            <ul>
                                <li>Understanding the fundamental concepts</li>
                                <li>Practical applications in daily life</li>
                                <li>Best practices and recommendations</li>
                                <li>Common mistakes to avoid</li>
                            </ul>
                            
                            <h6>Reading Material:</h6>
                            <div class="bg-light p-3 rounded">
                                <p>This is a comprehensive reading section that would contain detailed information about ${lesson.title}. The content would be structured to help students learn step by step.</p>
                                
                                <p>In a real implementation, this would contain the full educational content including:</p>
                                <ul>
                                    <li>Detailed explanations</li>
                                    <li>Examples and case studies</li>
                                    <li>Interactive elements</li>
                                    <li>Review questions</li>
                                </ul>
                            </div>
                            
                            <div class="mt-4">
                                <p><strong>Estimated reading time:</strong> ${lesson.duration}</p>
                            </div>
                        </div>
                    </div>
                `;
            
            case 'quiz':
                return `
                    <div class="lesson-quiz">
                        <h4>${lesson.title}</h4>
                        <div class="quiz-content">
                            <p class="lead">Test your knowledge with this interactive quiz.</p>
                            
                            <div class="quiz-question bg-light p-3 rounded mb-3">
                                <h6>Sample Question 1:</h6>
                                <p>What is the most important aspect of digital literacy?</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q1" id="q1a">
                                    <label class="form-check-label" for="q1a">
                                        Being able to use technology efficiently
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q1" id="q1b">
                                    <label class="form-check-label" for="q1b">
                                        Critical evaluation of digital information
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q1" id="q1c">
                                    <label class="form-check-label" for="q1c">
                                        Having the latest devices
                                    </label>
                                </div>
                            </div>
                            
                            <div class="quiz-question bg-light p-3 rounded mb-3">
                                <h6>Sample Question 2:</h6>
                                <p>Which of the following is a sign of reliable news source?</p>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q2" id="q2a">
                                    <label class="form-check-label" for="q2a">
                                        Emotional language and clickbait headlines
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q2" id="q2b">
                                    <label class="form-check-label" for="q2b">
                                        Clear authorship and source citations
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="q2" id="q2c">
                                    <label class="form-check-label" for="q2c">
                                        Anonymous posts with no verification
                                    </label>
                                </div>
                            </div>
                            
                            <div class="text-center mt-4">
                                <button class="btn btn-primary" onclick="MicroCourses.submitQuiz()">
                                    Submit Quiz
                                </button>
                            </div>
                            
                            <div class="mt-3">
                                <p><strong>Time limit:</strong> ${lesson.duration}</p>
                            </div>
                        </div>
                    </div>
                `;
            
            default:
                return `<div class="lesson-default"><h4>${lesson.title}</h4><p>Lesson content would be displayed here.</p></div>`;
        }
    },
    
    switchLesson(lessonIndex) {
        if (this.state.currentCourse) {
            this.openCoursePlayer(this.state.currentCourse, lessonIndex);
        }
    },
    
    completeLesson(lessonIndex) {
        if (!this.state.currentCourse) return;
        
        const courseId = this.state.currentCourse.id;
        const lesson = this.state.currentCourse.lessons_detail[lessonIndex];
        
        // Toggle completion status
        lesson.completed = !lesson.completed;
        
        // Update progress
        const completedLessons = this.state.currentCourse.lessons_detail.filter(l => l.completed).length;
        const totalLessons = this.state.currentCourse.lessons_detail.length;
        const progress = Math.round((completedLessons / totalLessons) * 100);
        
        this.state.courseProgress[courseId] = progress;
        
        // Update the course in the main array
        const courseIndex = this.courses.findIndex(c => c.id === courseId);
        if (courseIndex !== -1) {
            this.courses[courseIndex] = { ...this.state.currentCourse };
        }
        
        this.saveUserProgress();
        
        // Refresh the player
        this.openCoursePlayer(this.state.currentCourse, lessonIndex);
        
        const message = lesson.completed ? 'Lesson marked as complete!' : 'Lesson marked as incomplete';
        AdolescenceHub.showNotification(message, 'success');
        
        // Check if course is completed
        if (progress === 100) {
            setTimeout(() => {
                AdolescenceHub.showNotification('🎉 Congratulations! You completed the course!', 'success');
            }, 500);
        }
    },
    
    submitQuiz() {
        // Mock quiz submission
        AdolescenceHub.showNotification('Quiz submitted! Score: 85%', 'success');
        
        // Auto-complete the lesson
        if (this.state.currentLessonIndex !== undefined) {
            this.completeLesson(this.state.currentLessonIndex);
        }
    },
    
    calculateProgress(course) {
        const completedLessons = course.lessons_detail.filter(l => l.completed).length;
        return Math.round((completedLessons / course.lessons_detail.length) * 100);
    },
    
    startLearningPath() {
        const pathCourses = [
            'digital-literacy-basics',
            'fake-news-detection',
            'teen-mental-health',
            'ai-basics'
        ];
        
        // Enroll in all path courses
        pathCourses.forEach(courseId => {
            if (!this.state.enrolledCourses.includes(courseId)) {
                this.state.enrolledCourses.push(courseId);
            }
        });
        
        this.saveUserProgress();
        this.renderCourses();
        this.updateStats();
        
        AdolescenceHub.showNotification('Enrolled in the complete learning path!', 'success');
        
        // Start with the first course
        setTimeout(() => {
            this.continueCourse(pathCourses[0]);
        }, 1000);
    },
    
    updateStats() {
        const totalCourses = this.courses.length;
        const enrolledCount = this.state.enrolledCourses.length;
        const completedCount = Object.values(this.state.courseProgress).filter(progress => progress === 100).length;
        const totalHours = this.courses.reduce((total, course) => {
            const hours = parseFloat(course.duration.replace(' hours', '').replace(' hour', ''));
            return total + hours;
        }, 0);
        
        // Update display
        document.getElementById('totalCourses').textContent = totalCourses;
        document.getElementById('completedCourses').textContent = completedCount;
        document.getElementById('totalHours').textContent = Math.round(totalHours);
        document.getElementById('certificatesEarned').textContent = completedCount;
    },
    
    saveUserProgress() {
        const data = {
            enrolledCourses: this.state.enrolledCourses,
            courseProgress: this.state.courseProgress,
            lastUpdated: new Date().toISOString()
        };
        
        try {
            localStorage.setItem('micro-courses-progress', JSON.stringify(data));
        } catch (error) {
            console.warn('Failed to save progress:', error);
        }
    },
    
    loadUserProgress() {
        try {
            const saved = localStorage.getItem('micro-courses-progress');
            if (saved) {
                const data = JSON.parse(saved);
                this.state.enrolledCourses = data.enrolledCourses || [];
                this.state.courseProgress = data.courseProgress || {};
                
                // Update course objects with saved progress
                this.courses.forEach(course => {
                    if (this.state.courseProgress[course.id] !== undefined) {
                        course.progress = this.state.courseProgress[course.id];
                    }
                });
            }
        } catch (error) {
            console.warn('Failed to load progress:', error);
        }
    }
};

// Add some custom CSS for the course player
const style = document.createElement('style');
style.textContent = `
    .lesson-sidebar-item {
        padding: 0.5rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .lesson-sidebar-item:hover {
        background: rgba(102, 126, 234, 0.1);
    }
    
    .lesson-sidebar-item.active {
        background: rgba(102, 126, 234, 0.2);
        border: 1px solid #667eea;
    }
    
    .lesson-sidebar-item.completed {
        background: rgba(34, 197, 94, 0.1);
    }
    
    .video-placeholder {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .video-placeholder:hover {
        background: #495057 !important;
    }
    
    .quiz-question {
        border: 1px solid #e9ecef;
    }
    
    .smaller {
        font-size: 0.75rem;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('micro-courses.html')) {
        MicroCourses.init();
    }
});

// Expose to global scope
window.MicroCourses = MicroCourses;
