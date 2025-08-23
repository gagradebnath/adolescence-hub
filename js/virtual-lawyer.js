// Virtual Lawyer AI JavaScript

const VirtualLawyer = {
    state: {
        chatHistory: [],
        isTyping: false,
        currentConversationId: null
    },
    
    // Legal knowledge base with common questions and responses
    knowledgeBase: {
        'privacy rights': {
            response: `🔒 **Your Digital Privacy Rights:**

**Key Rights You Have:**
• **Right to know** what personal data is collected about you
• **Right to access** your personal information held by companies
• **Right to correct** inaccurate personal information
• **Right to delete** your personal data (in many cases)
• **Right to control** how your data is used and shared

**For Minors (Under 18):**
• Extra protections under COPPA (Children's Online Privacy Protection Act)
• Parents/guardians have rights to access and delete your data
• Companies need verifiable parental consent for children under 13

**What You Can Do:**
• Review privacy settings on all social media accounts
• Read privacy policies (look for simplified versions)
• Use privacy-focused browsers and search engines
• Be cautious about sharing personal information online

**Remember:** Privacy laws vary by state and country. These rights may be stronger in places like California (CCPA) or the EU (GDPR).`,
            category: 'privacy',
            relatedTopics: ['data protection', 'social media privacy', 'COPPA']
        },
        
        'cyberbullying': {
            response: `⚖️ **Cyberbullying Laws & Prevention:**

**Legal Definition:**
Cyberbullying is using digital communication to harass, threaten, or intimidate someone. It's illegal in most states and can result in:
• Criminal charges (harassment, stalking, threats)
• School disciplinary action
• Civil lawsuits for damages

**What Counts as Cyberbullying:**
• Sending threatening or harassing messages
• Sharing embarrassing photos/videos without consent
• Creating fake profiles to impersonate or harass
• Spreading rumors or lies online
• Excluding someone from online groups to hurt them

**How to Respond:**
1. **Don't engage** - Don't respond to the bully
2. **Document everything** - Take screenshots
3. **Block and report** the person on all platforms
4. **Tell a trusted adult** immediately
5. **Report to authorities** if threats are serious

**Legal Remedies:**
• Restraining orders
• Criminal prosecution
• School intervention
• Platform removal of content

**Get Help:**
• Crisis Text Line: Text HOME to 741741
• Cyberbullying Research Center resources
• Local law enforcement for serious threats`,
            category: 'safety',
            relatedTopics: ['harassment', 'online safety', 'reporting procedures']
        },
        
        'digital consent': {
            response: `✋ **Understanding Digital Consent:**

**What is Digital Consent?**
Digital consent means agreeing to share, use, or distribute digital content (photos, videos, messages) involving you.

**Key Principles:**
• **Informed** - You understand what you're agreeing to
• **Voluntary** - No pressure or coercion
• **Specific** - Clear about what's being shared and where
• **Revocable** - You can change your mind

**Important Laws:**
• **Image-based abuse** is illegal in most states
• Sharing intimate images without consent is a crime
• Even if you initially consented, you can revoke consent
• Minors cannot legally consent to intimate imagery

**Before Sharing:**
• Think: "Would I be okay if this was seen by my family, teachers, or future employers?"
• Remember: Once shared, you lose control over the content
• Consider: Screenshots can be taken and shared further

**If Someone Shares Without Consent:**
• Document the violation (screenshots)
• Report to the platform immediately
• Contact local authorities
• Seek legal advice
• Contact crisis support if needed

**Remember:** "They asked for it" or "We were dating" are NOT legal defenses for sharing intimate images without consent.`,
            category: 'legal',
            relatedTopics: ['image sharing', 'privacy', 'relationship laws']
        },
        
        'social media privacy': {
            response: `📱 **Social Media Privacy Laws:**

**Platform Responsibilities:**
• Must provide clear privacy policies
• Need parental consent for users under 13
• Required to respond to data deletion requests
• Must report certain illegal content

**Your Rights:**
• Control who sees your posts and profile
• Request copies of your data
• Ask for data to be deleted
• Know how your data is used for advertising

**Privacy Settings Checklist:**
• **Profile visibility** - Friends only vs. public
• **Post audience** - Who can see your content
• **Tagging permissions** - Who can tag you
• **Location sharing** - Turn off unless necessary
• **Data collection** - Limit advertising data use
• **Two-factor authentication** - Always enable

**Red Flags:**
• Apps asking for unnecessary permissions
• Platforms without clear privacy policies
• Services that make privacy settings hard to find
• Apps that don't allow data deletion

**Best Practices:**
• Review privacy settings monthly
• Think before posting - assume it's permanent
• Be cautious about third-party app permissions
• Use strong, unique passwords
• Report privacy violations to platforms

**Legal Protections:**
• COPPA (under 13 protection)
• CCPA (California residents)
• State privacy laws (varies by location)
• FTC enforcement of privacy violations`,
            category: 'privacy',
            relatedTopics: ['platform policies', 'data rights', 'privacy settings']
        },
        
        'reporting harassment': {
            response: `🚨 **How to Report Online Harassment:**

**Immediate Steps:**
1. **Your Safety First** - If you feel in immediate danger, call 911
2. **Don't Engage** - Don't respond to harassment
3. **Document Everything** - Screenshots with timestamps
4. **Block the Harasser** on all platforms

**Platform Reporting:**
• Use built-in reporting tools on each platform
• Be specific about the type of harassment
• Include evidence (screenshots, links)
• Follow up if no action is taken

**Legal Reporting:**
• **Local Police** - For threats or serious harassment
• **FBI Internet Crime Complaint Center** - For federal crimes
• **School Officials** - If involving classmates
• **Employer** - If workplace-related

**What Information to Collect:**
• Screenshots of harassing content
• Usernames and profile information
• Dates and times of incidents
• Any real-world threats or contact
• Evidence of platform violations

**Legal Options:**
• **Restraining Orders** - Court protection from contact
• **Criminal Charges** - For threats, stalking, or harassment
• **Civil Lawsuits** - For damages from harassment
• **Title IX** - If related to school/education

**Support Resources:**
• Crisis Text Line: Text HOME to 741741
• National Sexual Assault Hotline: 1-800-656-4673
• LGBTQ National Hotline: 1-888-843-4564
• Teen Line: 1-800-852-8336

**Remember:** Online harassment is real harassment. It's not your fault, and you deserve help and protection.`,
            category: 'safety',
            relatedTopics: ['cyberbullying', 'legal remedies', 'support resources']
        }
    },
    
    init() {
        this.loadChatHistory();
        this.setupEventListeners();
        this.initializeChat();
    },
    
    setupEventListeners() {
        const messageInput = document.getElementById('messageInput');
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage(e);
                }
            });
        }
    },
    
    initializeChat() {
        this.state.currentConversationId = 'conv_' + Date.now();
        
        // If no chat history, show welcome message
        if (this.state.chatHistory.length === 0) {
            this.addMessage('ai', this.getWelcomeMessage(), true);
        } else {
            this.renderChatHistory();
        }
    },
    
    getWelcomeMessage() {
        return {
            text: `👋 Hello! I'm your Legal AI Assistant. I can help you understand:

• Digital privacy rights and laws
• Cyberbullying prevention and reporting  
• Online consent and data protection
• Social media legal guidelines
• Digital safety for minors

What would you like to learn about today?`,
            timestamp: new Date(),
            resources: []
        };
    },
    
    sendMessage(event) {
        event.preventDefault();
        
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage('user', { text: message, timestamp: new Date() });
        
        // Clear input
        messageInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process AI response
        setTimeout(() => {
            const response = this.generateAIResponse(message);
            this.hideTypingIndicator();
            this.addMessage('ai', response);
        }, 1500 + Math.random() * 1000); // Simulate thinking time
    },
    
    askQuickQuestion(question) {
        const messageInput = document.getElementById('messageInput');
        messageInput.value = question;
        
        // Trigger send
        const event = { preventDefault: () => {} };
        this.sendMessage(event);
    },
    
    generateAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let response = null;
        
        // Find best matching response from knowledge base
        for (const [key, data] of Object.entries(this.knowledgeBase)) {
            if (message.includes(key) || this.findKeywordMatch(message, data.relatedTopics)) {
                response = data;
                break;
            }
        }
        
        // Fallback responses for common patterns
        if (!response) {
            if (message.includes('help') || message.includes('emergency')) {
                response = this.getEmergencyResponse();
            } else if (message.includes('legal advice') || message.includes('lawyer')) {
                response = this.getLegalAdviceDisclaimer();
            } else {
                response = this.getGeneralResponse(message);
            }
        }
        
        return {
            text: response.response || response.text,
            timestamp: new Date(),
            category: response.category || 'general',
            resources: response.resources || []
        };
    },
    
    findKeywordMatch(message, keywords) {
        return keywords && keywords.some(keyword => 
            message.includes(keyword.toLowerCase())
        );
    },
    
    getEmergencyResponse() {
        return {
            response: `🚨 **Emergency Resources:**

**Immediate Danger:** Call 911

**Crisis Support:**
• Crisis Text Line: Text HOME to 741741
• National Suicide Prevention Lifeline: 988
• Teen Line: 1-800-852-8336

**Specialized Help:**
• Cybertipline (NCMEC): 1-800-THE-LOST
• National Sexual Assault Hotline: 1-800-656-4673
• LGBTQ National Hotline: 1-888-843-4564

**Online Safety:**
• If someone is threatening you online, document everything and contact local police
• Report serious threats to the FBI's Internet Crime Complaint Center
• Block and report the person on all platforms

**Remember:** You're not alone. There are people who want to help you. Don't hesitate to reach out to trusted adults, counselors, or these professional resources.`,
            category: 'emergency',
            resources: ['Crisis Text Line', 'National Hotlines', 'Emergency Contacts']
        };
    },
    
    getLegalAdviceDisclaimer() {
        return {
            response: `⚖️ **About Legal Advice:**

**Important:** I'm an AI that provides general educational information about laws. I cannot:
• Give specific legal advice for your situation
• Replace consultation with a real lawyer
• Guarantee legal outcomes
• Represent you in legal matters

**When You Need a Real Lawyer:**
• Serious legal troubles or charges
• Complex family or custody issues
• Significant financial matters
• Any situation where you could face legal consequences

**Free/Low-Cost Legal Help:**
• Legal Aid organizations in your area
• Law school clinics
• Bar association referral services
• Pro bono (free) legal programs

**What I Can Help With:**
• Explaining general legal concepts
• Understanding your basic rights
• Guidance on reporting procedures
• Educational information about digital safety laws

Would you like me to explain any specific legal concept or right?`,
            category: 'legal',
            resources: ['Legal Aid', 'Bar Associations', 'Law School Clinics']
        };
    },
    
    getGeneralResponse(message) {
        const responses = [
            {
                text: `I'd be happy to help you understand legal concepts related to digital rights and safety. Could you be more specific about what you'd like to know? For example:

• Privacy rights and data protection
• Cyberbullying laws and prevention
• Social media legal guidelines
• Digital consent and image sharing
• Reporting online harassment

What topic interests you most?`,
                category: 'general'
            },
            {
                text: `I specialize in helping teens understand digital rights and online safety laws. Some popular topics include:

• Understanding what data companies can collect from you
• Your rights when someone shares your photos without permission
• How to legally report cyberbullying
• Privacy settings and legal protections

What would you like to learn about?`,
                category: 'general'
            }
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    },
    
    addMessage(sender, messageData, isInitial = false) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const timestamp = this.formatTime(messageData.timestamp);
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="ai-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${this.formatMessageText(messageData.text)}</div>
                    ${messageData.resources && messageData.resources.length > 0 ? 
                        `<div class="message-resources mt-2">
                            <small class="text-muted">Related resources: ${messageData.resources.join(', ')}</small>
                        </div>` : ''
                    }
                    <div class="message-time">${timestamp}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${this.formatMessageText(messageData.text)}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save to history (don't save initial welcome message)
        if (!isInitial) {
            this.state.chatHistory.push({
                sender,
                message: messageData,
                timestamp: messageData.timestamp
            });
            this.saveChatHistory();
        }
    },
    
    formatMessageText(text) {
        // Convert markdown-style formatting
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert bullets
        text = text.replace(/^• /gm, '&bull; ');
        
        // Convert newlines to breaks
        text = text.replace(/\n/g, '<br>');
        
        return text;
    },
    
    formatTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    },
    
    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'flex';
            this.state.isTyping = true;
            
            // Scroll to show typing indicator
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    },
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
            this.state.isTyping = false;
        }
    },
    
    clearChat() {
        if (confirm('Are you sure you want to clear the chat history?')) {
            this.state.chatHistory = [];
            this.saveChatHistory();
            
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML = '';
            
            // Show welcome message again
            this.addMessage('ai', this.getWelcomeMessage(), true);
            
            AdolescenceHub.showNotification('Chat history cleared', 'info');
        }
    },
    
    saveChatHistory() {
        try {
            localStorage.setItem('virtual-lawyer-chat', JSON.stringify(this.state.chatHistory));
        } catch (error) {
            console.warn('Failed to save chat history:', error);
        }
    },
    
    loadChatHistory() {
        try {
            const saved = localStorage.getItem('virtual-lawyer-chat');
            if (saved) {
                this.state.chatHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.warn('Failed to load chat history:', error);
            this.state.chatHistory = [];
        }
    },
    
    renderChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        this.state.chatHistory.forEach(entry => {
            this.addMessage(entry.sender, entry.message, true);
        });
    },
    
    exportChat() {
        const chatContent = this.state.chatHistory.map(entry => {
            const time = this.formatTime(entry.timestamp);
            const sender = entry.sender === 'ai' ? 'Legal AI Assistant' : 'You';
            return `[${time}] ${sender}: ${entry.message.text}`;
        }).join('\n\n');
        
        const blob = new Blob([chatContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `legal-chat-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        AdolescenceHub.showNotification('Chat exported successfully!', 'success');
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('virtual-lawyer.html')) {
        VirtualLawyer.init();
    }
});

// Expose to global scope
window.VirtualLawyer = VirtualLawyer;
