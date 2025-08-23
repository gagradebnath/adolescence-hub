// Influencer Analyzer JavaScript

const InfluencerAnalyzer = {
    state: {
        currentAnalysis: null,
        analysisHistory: [],
        isAnalyzing: false
    },
    
    init() {
        this.setupEventListeners();
        this.loadAnalysisHistory();
    },
    
    setupEventListeners() {
        const form = document.getElementById('analyzerForm');
        if (form) {
            form.addEventListener('submit', this.handleAnalyze.bind(this));
        }
        
        // Analysis type change handler
        const analysisType = document.getElementById('analysisType');
        if (analysisType) {
            analysisType.addEventListener('change', this.handleAnalysisTypeChange.bind(this));
        }
    },
    
    handleAnalysisTypeChange(e) {
        const type = e.target.value;
        const urlInput = document.getElementById('contentUrl');
        
        switch(type) {
            case 'profile':
                urlInput.placeholder = '@username or profile URL';
                break;
            case 'post':
                urlInput.placeholder = 'Post URL or share link';
                break;
            case 'campaign':
                urlInput.placeholder = 'Campaign URL or hashtag';
                break;
            case 'video':
                urlInput.placeholder = 'Video URL (TikTok, YouTube, etc.)';
                break;
            default:
                urlInput.placeholder = '@influencer or post URL';
        }
    },
    
    async handleAnalyze(e) {
        e.preventDefault();
        
        if (this.state.isAnalyzing) return;
        
        const formData = new FormData(e.target);
        const analysisData = {
            type: formData.get('type') || document.getElementById('analysisType').value,
            url: formData.get('url') || document.getElementById('contentUrl').value,
            detectFOMO: document.getElementById('detectFOMO').checked,
            detectSponsorship: document.getElementById('detectSponsorship').checked,
            detectFakeProducts: document.getElementById('detectFakeProducts').checked,
            detectManipulation: document.getElementById('detectManipulation').checked
        };
        
        // Validate input
        if (!analysisData.type || !analysisData.url) {
            AdolescenceHub.showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        await this.runAnalysis(analysisData);
    },
    
    async runAnalysis(data) {
        this.state.isAnalyzing = true;
        this.showLoadingState();
        
        try {
            // Simulate API call with realistic delay and progress
            const result = await this.simulateAnalysis(data);
            this.showResults(result);
            this.saveAnalysisToHistory(result);
        } catch (error) {
            AdolescenceHub.showNotification('Analysis failed. Please try again.', 'error');
            this.showWelcomeState();
        } finally {
            this.state.isAnalyzing = false;
        }
    },
    
    async simulateAnalysis(data) {
        const stages = [
            'Fetching content...',
            'Analyzing language patterns...',
            'Detecting FOMO tactics...',
            'Checking for hidden sponsorships...',
            'Identifying fake products...',
            'Analyzing manipulation techniques...',
            'Generating insights...',
            'Finalizing report...'
        ];
        
        for (let i = 0; i < stages.length; i++) {
            document.getElementById('loadingMessage').textContent = stages[i];
            const progress = ((i + 1) / stages.length) * 100;
            document.getElementById('loadingProgress').style.width = `${progress}%`;
            document.getElementById('loadingProgress').setAttribute('aria-valuenow', progress);
            
            // Random delay between 300-800ms per stage
            await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
        }
        
        // Generate mock analysis results
        return this.generateMockResults(data);
    },
    
    generateMockResults(data) {
        const mockResults = {
            'profile': {
                title: 'Lifestyle Influencer Profile',
                info: '@lifestyleinfluencer • 2.3M followers',
                riskLevel: 'High',
                scores: {
                    fomo: Math.floor(Math.random() * 30) + 60,
                    sponsorship: Math.floor(Math.random() * 40) + 40,
                    fakeProducts: Math.floor(Math.random() * 50) + 20,
                    manipulation: Math.floor(Math.random() * 25) + 65
                }
            },
            'post': {
                title: 'Product Promotion Post',
                info: 'Instagram post • 45.2K likes',
                riskLevel: 'Medium',
                scores: {
                    fomo: Math.floor(Math.random() * 25) + 50,
                    sponsorship: Math.floor(Math.random() * 30) + 50,
                    fakeProducts: Math.floor(Math.random() * 40) + 30,
                    manipulation: Math.floor(Math.random() * 20) + 60
                }
            },
            'campaign': {
                title: 'Marketing Campaign Analysis',
                info: '#SummerSale campaign • 15 posts analyzed',
                riskLevel: 'High',
                scores: {
                    fomo: Math.floor(Math.random() * 20) + 70,
                    sponsorship: Math.floor(Math.random() * 25) + 65,
                    fakeProducts: Math.floor(Math.random() * 35) + 40,
                    manipulation: Math.floor(Math.random() * 15) + 75
                }
            },
            'video': {
                title: 'Video Content Analysis',
                info: 'TikTok video • 892K views',
                riskLevel: 'Medium',
                scores: {
                    fomo: Math.floor(Math.random() * 35) + 45,
                    sponsorship: Math.floor(Math.random() * 45) + 35,
                    fakeProducts: Math.floor(Math.random() * 30) + 25,
                    manipulation: Math.floor(Math.random() * 30) + 55
                }
            }
        };
        
        const result = mockResults[data.type] || mockResults['post'];
        
        // Add dynamic content based on detection settings
        result.detections = {
            fomo: data.detectFOMO,
            sponsorship: data.detectSponsorship,
            fakeProducts: data.detectFakeProducts,
            manipulation: data.detectManipulation
        };
        
        result.url = data.url;
        result.timestamp = new Date().toISOString();
        
        return result;
    },
    
    showLoadingState() {
        document.getElementById('welcomeState').classList.add('d-none');
        document.getElementById('resultsState').classList.add('d-none');
        document.getElementById('loadingState').classList.remove('d-none');
    },
    
    showResults(results) {
        document.getElementById('loadingState').classList.add('d-none');
        document.getElementById('welcomeState').classList.add('d-none');
        document.getElementById('resultsState').classList.remove('d-none');
        
        // Update results display
        this.updateResultsDisplay(results);
        this.state.currentAnalysis = results;
    },
    
    showWelcomeState() {
        document.getElementById('loadingState').classList.add('d-none');
        document.getElementById('resultsState').classList.add('d-none');
        document.getElementById('welcomeState').classList.remove('d-none');
    },
    
    updateResultsDisplay(results) {
        // Update header
        document.getElementById('analyzedContentTitle').textContent = results.title;
        document.getElementById('analyzedContentInfo').textContent = results.info;
        
        // Update risk level
        const riskMeter = document.getElementById('riskMeter');
        const riskLevel = document.getElementById('riskLevel');
        riskLevel.textContent = results.riskLevel;
        riskMeter.className = `risk-meter ${results.riskLevel.toLowerCase()}`;
        
        // Update detection cards
        this.updateDetectionCard('fomo', results.scores.fomo, results.detections.fomo);
        this.updateDetectionCard('sponsorship', results.scores.sponsorship, results.detections.sponsorship);
        this.updateDetectionCard('fakeProducts', results.scores.fakeProducts, results.detections.fakeProducts);
        this.updateDetectionCard('manipulation', results.scores.manipulation, results.detections.manipulation);
        
        // Animate meters
        setTimeout(() => {
            this.animateMeters();
        }, 500);
    },
    
    updateDetectionCard(type, score, enabled) {
        const ratingElement = document.getElementById(`${type}Rating`);
        const meterElement = document.getElementById(`${type}Meter`);
        
        if (!enabled) {
            ratingElement.textContent = 'Disabled';
            ratingElement.className = 'detection-rating disabled';
            meterElement.style.width = '0%';
            return;
        }
        
        // Update rating text and color
        let rating, ratingClass;
        if (score >= 70) {
            rating = 'High';
            ratingClass = 'high';
        } else if (score >= 40) {
            rating = 'Medium';
            ratingClass = 'medium';
        } else {
            rating = 'Low';
            ratingClass = 'low';
        }
        
        ratingElement.textContent = rating;
        ratingElement.className = `detection-rating ${ratingClass}`;
        
        // Update meter
        meterElement.setAttribute('data-percentage', score);
        meterElement.parentElement.nextElementSibling.textContent = `${score}% Detected`;
        
        // Update indicators based on score and type
        this.updateIndicators(type, score);
    },
    
    updateIndicators(type, score) {
        const indicators = {
            fomo: [
                'Limited time offer language',
                'Scarcity claims ("Only X left!")',
                'Urgency words ("Hurry!", "Now!")',
                'Countdown timers',
                'Exclusive access claims'
            ],
            sponsorship: [
                'Vague disclosure language',
                'Suspicious product placement',
                'Repeated brand mentions',
                'Affiliate link detection',
                'Hidden partnership indicators'
            ],
            fakeProducts: [
                'Unverified product claims',
                'No legitimate reviews found',
                'Dropshipping indicators',
                'Fake testimonials',
                'Stock photo usage'
            ],
            manipulation: [
                'Social proof manipulation',
                'Authority bias exploitation',
                'Emotional trigger words',
                'Bandwagon effect tactics',
                'Fear-based messaging'
            ]
        };
        
        const indicatorsList = document.getElementById(`${type}Indicators`);
        if (indicatorsList) {
            // Show indicators based on score (higher score = more indicators)
            const numIndicators = Math.ceil((score / 100) * indicators[type].length);
            const selectedIndicators = indicators[type].slice(0, numIndicators);
            
            indicatorsList.innerHTML = selectedIndicators
                .map(indicator => `<li>${indicator}</li>`)
                .join('');
        }
    },
    
    animateMeters() {
        const meters = document.querySelectorAll('.meter-fill');
        meters.forEach(meter => {
            const percentage = meter.getAttribute('data-percentage');
            meter.style.width = '0%';
            
            setTimeout(() => {
                meter.style.transition = 'width 1s ease-out';
                meter.style.width = `${percentage}%`;
            }, 100);
        });
    },
    
    runDemo() {
        const demoData = {
            type: 'post',
            url: '@demo_influencer/summer-sale-post',
            detectFOMO: true,
            detectSponsorship: true,
            detectFakeProducts: true,
            detectManipulation: true
        };
        
        this.runAnalysis(demoData);
    },
    
    exportResults() {
        if (!this.state.currentAnalysis) return;
        
        const results = this.state.currentAnalysis;
        const reportData = {
            title: 'Influencer Analysis Report',
            content: results.title,
            url: results.url,
            riskLevel: results.riskLevel,
            scores: results.scores,
            timestamp: results.timestamp,
            generatedBy: 'Adolescence HUB AI Analyzer'
        };
        
        const dataStr = JSON.stringify(reportData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `analysis-report-${Date.now()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
        AdolescenceHub.showNotification('Analysis report exported successfully!', 'success');
    },
    
    shareResults() {
        if (!this.state.currentAnalysis) return;
        
        const results = this.state.currentAnalysis;
        const shareText = `I analyzed "${results.title}" with Adolescence HUB's AI tool. Risk level: ${results.riskLevel}. Check out this tool for detecting influencer manipulation tactics!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Influencer Analysis Results',
                text: shareText,
                url: window.location.href
            }).then(() => {
                AdolescenceHub.showNotification('Results shared successfully!', 'success');
            }).catch(() => {
                this.fallbackShare(shareText);
            });
        } else {
            this.fallbackShare(shareText);
        }
    },
    
    fallbackShare(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                AdolescenceHub.showNotification('Analysis summary copied to clipboard!', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            AdolescenceHub.showNotification('Analysis summary copied to clipboard!', 'success');
        }
    },
    
    analyzeNew() {
        this.showWelcomeState();
        document.getElementById('analyzerForm').reset();
        document.getElementById('contentUrl').focus();
    },
    
    saveAnalysisToHistory(results) {
        this.state.analysisHistory.unshift(results);
        
        // Keep only last 50 analyses
        if (this.state.analysisHistory.length > 50) {
            this.state.analysisHistory = this.state.analysisHistory.slice(0, 50);
        }
        
        // Save to localStorage
        try {
            localStorage.setItem('analyzer-history', JSON.stringify(this.state.analysisHistory));
        } catch (e) {
            console.warn('Could not save analysis history:', e);
        }
    },
    
    loadAnalysisHistory() {
        try {
            const saved = localStorage.getItem('analyzer-history');
            if (saved) {
                this.state.analysisHistory = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load analysis history:', e);
            this.state.analysisHistory = [];
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    InfluencerAnalyzer.init();
});

// Expose to global scope
window.InfluencerAnalyzer = InfluencerAnalyzer;
