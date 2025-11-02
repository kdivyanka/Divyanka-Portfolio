// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.setupToggle();
    }

    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        toggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }
}

// Cursor Glow Effect
class CursorGlow {
    constructor() {
        this.cursor = document.getElementById('cursor-glow');
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });
    }
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Navigation Active State
class NavigationManager {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateActiveLink());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                scrollToSection(sectionId);
            });
        });
    }

    updateActiveLink() {
        const scrollPos = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos <= bottom) {
                this.navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
}

// Skills Animation
class SkillsAnimator {
    constructor() {
        this.skillCards = document.querySelectorAll('.skill-card');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillCards.forEach(card => observer.observe(card));
    }

    animateSkill(card) {
        const progress = card.querySelector('.circular-progress');
        const circle = progress.querySelector('.progress-ring-circle');
        const percentage = parseInt(progress.getAttribute('data-percentage'));
        
        const circumference = 2 * Math.PI * 52;
        const offset = circumference - (percentage / 100) * circumference;
        
        // Smooth animation with delay
        requestAnimationFrame(() => {
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
                circle.style.stroke = 'var(--primary-color)';
            }, 300);
        });
        
        // Animate percentage counter
        const percentageText = progress.querySelector('.percentage-text');
        setTimeout(() => {
            this.animateCounter(percentageText, 0, percentage, 3000);
        }, 500);
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Smoother easing function
            const easeOutQuint = 1 - Math.pow(1 - progress, 5);
            const current = Math.floor(start + (end - start) * easeOutQuint);
            
            element.textContent = current + '%';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Code Editor
class CodeEditor {
    constructor() {
        this.editor = document.getElementById('codeEditor');
        this.highlight = document.getElementById('codeHighlight');
        this.output = document.getElementById('output');
        this.currentLang = 'javascript';
        this.samples = {
            javascript: `// JavaScript Example
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
    console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,
            java: `// Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Calculate factorial
        int n = 5;
        int factorial = calculateFactorial(n);
        System.out.println(n + "! = " + factorial);
    }
    
    public static int calculateFactorial(int n) {
        if (n <= 1) return 1;
        return n * calculateFactorial(n - 1);
    }
}`,
            python: `# Python Example
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

# Test the function
numbers = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", numbers)
print("Sorted array:", quick_sort(numbers))`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Card</title>
    <style>
        .card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 30px;
            color: white;
            text-align: center;
            transition: transform 0.3s ease;
        }
        .card:hover {
            transform: translateY(-10px);
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Hello, World!</h2>
        <p>This is an interactive card component.</p>
    </div>
</body>
</html>`,
            css: `/* Modern CSS Animation */
.floating-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    animation: float 6s ease-in-out infinite;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

/* Glassmorphism Effect */
.glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}`,
            c: `// C Programming Example
#include <stdio.h>
#include <stdlib.h>

// Function to perform binary search
int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target)
            return mid;
        
        if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    
    return -1;
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int size = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    
    int result = binarySearch(arr, size, target);
    
    if (result != -1)
        printf("Element found at index %d\\n", result);
    else
        printf("Element not found\\n");
    
    return 0;
}`
        };
        this.init();
    }

    init() {
        this.setupTabs();
        this.setupEditor();
        this.setupControls();
        this.loadSample('javascript');
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.currentLang = tab.getAttribute('data-lang');
                this.loadSample(this.currentLang);
            });
        });
    }

    setupEditor() {
        // Simple editor without highlighting overlay
    }

    setupControls() {
        document.getElementById('runCode').addEventListener('click', () => {
            this.runCode();
        });

        document.getElementById('clearCode').addEventListener('click', () => {
            this.editor.value = '';
            this.output.textContent = 'Code cleared. Ready for new input...';
        });
    }

    loadSample(lang) {
        this.editor.value = this.samples[lang] || '';
        this.updateHighlighting();
    }

    updateHighlighting() {
        // Highlighting removed to prevent overlap
    }

    runCode() {
        const code = this.editor.value.trim();
        
        if (!code) {
            this.output.textContent = 'Please enter some code to execute.';
            return;
        }

        this.output.innerHTML = '<div class="loading">Executing code...</div>';

        setTimeout(() => {
            try {
                if (this.currentLang === 'javascript') {
                    this.executeJavaScript(code);
                } else {
                    this.simulateExecution(code);
                }
            } catch (error) {
                this.output.innerHTML = `<div class="error">Error: ${error.message}</div>`;
            }
        }, 500);
    }

    executeJavaScript(code) {
        const originalLog = console.log;
        const logs = [];
        
        console.log = (...args) => {
            logs.push(args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' '));
        };

        try {
            eval(code);
            console.log = originalLog;
            
            if (logs.length > 0) {
                this.output.innerHTML = logs.map(log => 
                    `<div class="output-line">${this.escapeHtml(log)}</div>`
                ).join('');
            } else {
                this.output.textContent = 'Code executed successfully (no output).';
            }
        } catch (error) {
            console.log = originalLog;
            this.output.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    simulateExecution(code) {
        const outputs = {
            java: 'Hello, World!\n5! = 120',
            python: 'Original array: [64, 34, 25, 12, 22, 11, 90]\nSorted array: [11, 12, 22, 25, 34, 64, 90]',
            html: 'HTML rendered successfully! Check the browser for visual output.',
            css: 'CSS styles applied successfully! Animations and effects are ready.',
            c: 'Element found at index 3'
        };

        const output = outputs[this.currentLang] || 'Code compiled and executed successfully!';
        this.output.innerHTML = output.split('\n').map(line => 
            `<div class="output-line">${this.escapeHtml(line)}</div>`
        ).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.glass-card, .project-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Particle Background Effect
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.opacity = '0.1';
        
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = getComputedStyle(document.documentElement)
                .getPropertyValue('--primary-color');
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new CursorGlow();
    new NavigationManager();
    new SkillsAnimator();
    new CodeEditor();
    new AnimationObserver();
    new ParticleBackground();
    
    // Add smooth reveal animations
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add CSS for additional animations
const additionalStyles = `
.animate-in {
    animation: slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loading {
    color: var(--accent-color);
    font-style: italic;
}

.error {
    color: #ef4444;
    font-weight: 500;
}

.output-line {
    margin: 5px 0;
    padding: 2px 0;
    border-left: 2px solid var(--primary-color);
    padding-left: 10px;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);