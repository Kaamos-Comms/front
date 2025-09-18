
class PrivacyNoticeManager {
    constructor() {
        this.notice = document.getElementById('privacyNotice');
        if (!this.notice) return;
        
        setTimeout(() => this.showNotice(), 3000);
    }
    
    showNotice() {
        this.notice.classList.add('show');
        
        setTimeout(() => {
            this.notice.classList.add('pulse-element');
        }, 500);
    }
    
    closeNotice() {
        this.notice.classList.add('closing');
        setTimeout(() => {
            this.notice.style.display = 'none';
        }, 300);
    }
}

class ScrollAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('.pulse-element:not(.hero-title)');
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                
                const delay = Math.random() * 200;
                setTimeout(() => {
                    entry.target.style.animationDelay = '0s';
                }, delay);
            }
        });
    }
}

class PulseEnhancer {
    constructor() {
        this.enhanceKeyElements();
        this.addHoverEffects();
    }
    
    enhanceKeyElements() {
        const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.animationDuration = '1.5s';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.animationDuration = '4s';
            });
        });
    }
    
    addHoverEffects() {
        const featureItems = document.querySelectorAll('.feature-list li');
        featureItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(10px)';
                item.style.color = 'var(--european-green)';
                item.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
                item.style.color = 'var(--text-secondary)';
            });
        });
    }
}

class TypewriterEffect {
    constructor() {
        this.subtitle = document.querySelector('.hero-subtitle');
        if (!this.subtitle) return;
        
        this.originalText = this.subtitle.textContent;
        this.subtitle.textContent = '';
        this.currentIndex = 0;
        
        setTimeout(() => this.startTyping(), 1000);
    }
    
    startTyping() {
        if (this.currentIndex < this.originalText.length) {
            this.subtitle.textContent += this.originalText[this.currentIndex];
            this.currentIndex++;
            
            const delay = Math.random() * 50 + 30;
            setTimeout(() => this.startTyping(), delay);
        } else {
            this.addCursor();
        }
    }
    
    addCursor() {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        this.subtitle.appendChild(cursor);
        
        setTimeout(() => {
            cursor.remove();
        }, 3000);
    }
}

function closePrivacyNotice() {
    const notice = document.getElementById('privacyNotice');
    if (notice) {
        notice.classList.add('closing');
        setTimeout(() => {
            notice.style.display = 'none';
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.IntersectionObserver && window.requestAnimationFrame) {
        new PrivacyNoticeManager();
        new ScrollAnimationManager();
        new PulseEnhancer();
        
        if (window.innerWidth > 768) {
            new TypewriterEffect();
        }
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        .typing-cursor {
            color: var(--european-green);
            font-weight: 300;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-animate {
            animation: fadeInUp 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('visibilitychange', () => {
    const pulseElements = document.querySelectorAll('.pulse-element');
    if (document.hidden) {
        pulseElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        pulseElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});
