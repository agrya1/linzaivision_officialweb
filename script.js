// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        offset: 50,
        once: false,
        mirror: true,
        easing: 'ease-in-out',
    });
    
    // 处理加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        // 显示加载动画
        loader.style.display = 'flex';
        
        // 找到已有的logo元素并添加动画
        const logoOuter = loader.querySelector('.logo-outer');
        const logoInner = loader.querySelector('.logo-inner');
        
        if (logoOuter && logoInner) {
            // 确保眼睛内部组件位置和大小合适
            logoInner.style.width = '40px';
            logoInner.style.height = '40px';
            
            // 添加动画样式
            const style = document.createElement('style');
            style.innerHTML = `
                .logo-animation {
                    animation: eyePulse 4s infinite ease-in-out;
                }
                
                /* 移除这里的动画，在下面的脉动效果中一起添加 */
                .logo-outer {
                    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
                }
                
                .logo-inner {
                    animation: innerPulse 5s infinite ease-in-out;
                }
                
                /* 通过CSS选择器直接处理伪元素，确保使用白色！ */
                .loader .logo-inner::after {
                    content: '';
                    position: absolute;
                    top: 50% !important;
                    left: 50% !important;
                    transform: translate(-50%, -50%) !important;
                    width: 15px !important;
                    height: 15px !important;
                    border-radius: 50% !important;
                    background-color: #ffffff !important; /* 确保眼珠颜色为白色 */
                    animation: pupilBlink 7s infinite ease-in-out !important;
                }
                
                /* 额外添加这个规则，增加特异性 */
                .loader .logo-container .logo-animation .logo-inner::after {
                    background-color: #ffffff !important;
                }
                
                @keyframes eyePulse {
                    0% { transform: scale(0.96); }
                    50% { transform: scale(1.04); }
                    100% { transform: scale(0.96); }
                }
                
                @keyframes outerGlow {
                    0% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }
                    50% { box-shadow: 0 0 30px rgba(0, 0, 0, 0.2); }
                    100% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); }
                }
                
                @keyframes innerPulse {
                    0% { transform: scale(0.94); }
                    50% { transform: scale(1.06); }
                    100% { transform: scale(0.94); }
                }
                
                @keyframes pupilBlink {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                    45% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                    50% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.5; }
                    55% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
            
            // 添加脉动效果的第二个样式
            const pulseStyle = document.createElement('style');
            pulseStyle.innerHTML = `
                /* 为眼睛元素添加脉动发光效果 */
                @keyframes gentlePulse {
                    0% { box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
                    50% { box-shadow: 0 0 15px rgba(0, 0, 0, 0.2); }
                    100% { box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
                }
                
                .loader .logo-outer {
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
                    animation: gentlePulse 4s infinite ease-in-out;
                }
                
                /* 强制设置加载器眼珠颜色 */
                .loader .logo-inner::after {
                    background-color: white !important;
                }
            `;
            document.head.appendChild(pulseStyle);
        }
        
        // 六秒后淡出加载动画，显示主页面
        setTimeout(function() {
            loader.classList.add('hidden');
            
            // 确保动画结束后完全移除加载器，避免阻止主页面显示
            setTimeout(function() {
                loader.style.display = 'none';
            }, 600); // 600ms是过渡动画的时间
        }, 888); // 给用户更多时间看到眼睛动画
    }
    
    // 眼睛元素参考
    const eyeElement = document.querySelector('.hero-eye');
    
    // 不再需要复杂的鼠标跟随和眨眼效果
    // 保留滚动事件处理部分用于导航，但简化眼睛部分
    
    // 检查元素是否在视口中
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.bottom > 0 &&
            rect.right > 0
        );
    }
    
    // 滚动事件处理
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        // 头部导航栏滚动效果
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 滚动到相应区域高亮导航菜单
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // 简化眼睛的淡出效果
        if (eyeElement && isInViewport(eyeElement)) {
            const scrollPercentage = Math.min(window.scrollY / window.innerHeight, 1);
            
            // 仅当滚动较深时淡出眼睛
            if (scrollPercentage > 0.5) {
                eyeElement.style.opacity = Math.max(0, 1 - (scrollPercentage - 0.5) * 2);
            } else {
                eyeElement.style.opacity = 1;
            }
        }
    });
    
    // 移动端菜单处理
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            // 打开菜单时的动画
            this.querySelector('.bar:nth-child(1)').style.transform = 'rotate(45deg) translate(6px, 6px)';
            this.querySelector('.bar:nth-child(2)').style.opacity = '0';
            this.querySelector('.bar:nth-child(3)').style.transform = 'rotate(-45deg) translate(6px, -6px)';
            
            nav.style.display = 'block';
            setTimeout(() => {
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0)';
            }, 10);
        } else {
            // 关闭菜单时的动画
            this.querySelector('.bar:nth-child(1)').style.transform = 'rotate(0) translate(0)';
            this.querySelector('.bar:nth-child(2)').style.opacity = '1';
            this.querySelector('.bar:nth-child(3)').style.transform = 'rotate(0) translate(0)';
            
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                nav.style.display = '';
            }, 300);
        }
    });
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 如果移动菜单是打开的，关闭它
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.click();
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加循环动画效果到Logo
    const logoSymbols = document.querySelectorAll('.logo-symbol');
    logoSymbols.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // 添加悬停效果到功能项
    const featureItems = document.querySelectorAll('.feature-item, .matrix-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 为下载按钮添加脉冲动画
    const downloadButtons = document.querySelectorAll('.btn-download');
    function pulseAnimation() {
        downloadButtons.forEach(btn => {
            btn.classList.add('pulse');
            setTimeout(() => {
                btn.classList.remove('pulse');
            }, 1000);
        });
    }
    
    // 每隔5秒脉冲一次
    setInterval(pulseAnimation, 5000);
    setTimeout(pulseAnimation, 3000); // 初始延迟后的第一次脉冲
    
    // 添加CSS类用于脉冲动画
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes btnPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); }
            100% { transform: scale(1); }
        }
        .btn-download.pulse {
            animation: btnPulse 1s ease;
        }
        .nav-link.active::after {
            width: 100%;
        }
        .nav.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .nav.active ul {
            flex-direction: column;
            align-items: center;
        }
        .nav.active li {
            margin: 15px 0;
        }
        @media (max-width: 768px) {
            .nav {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 视差滚动效果
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 装饰圆圈的视差效果
        const circles = document.querySelectorAll('.decoration-circle');
        circles.forEach(circle => {
            const speed = circle.classList.contains('circle-1') ? 0.1 : 0.05;
            circle.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
        
        // Hero部分的视差效果
        const hero = document.querySelector('.hero');
        if (scrollPosition <= hero.offsetHeight) {
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollPosition * 0.002);
        }
    });
    
    // 创建交互式粒子效果
    createParticles();
    
    // 添加新的交互效果 - 功能卡片悬停效果增强
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // 视觉系统和矩阵特性的图标增强效果
    const smallIcons = document.querySelectorAll('.feature-icon-small');
    
    smallIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const circle = this.querySelector('.icon-circle-small');
            if (circle) {
                circle.style.transform = 'scale(1.2)';
                circle.style.transition = 'transform 0.3s ease';
                circle.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            const circle = this.querySelector('.icon-circle-small');
            if (circle) {
                circle.style.transform = '';
                circle.style.backgroundColor = '';
            }
        });
    });
    
    // 用户心声卡片交互效果
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0px 8px 20px -10px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // 滚动视差效果增强
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // 为不同的组件设置不同的视差滚动速度
        const featureSection = document.querySelector('#features');
        if (featureSection && isElementInViewport(featureSection)) {
            const cards = featureSection.querySelectorAll('.feature-card');
            cards.forEach((card, index) => {
                const speed = 0.03;
                card.style.transform = `translateY(${scrollPosition * speed * (index + 1) * 0.2}px)`;
            });
        }
        
        // 矩阵图片视差效果
        const matrixImage = document.querySelector('.matrix-img');
        if (matrixImage && isElementInViewport(matrixImage)) {
            matrixImage.style.transform = `translateY(${scrollPosition * 0.05}px) scale(${1 + scrollPosition * 0.0001})`;
        }
    });
    
    // 检查元素是否在视口中的工具函数
    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
            rect.bottom > 0 &&
            rect.right > 0
        );
    }
    
    // 第三只眼觉醒路径交互效果
    const pathSteps = document.querySelectorAll('.path-step');
    
    pathSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(93, 0, 255, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(93, 0, 255, 0.08)';
        });
    });
    
    // 路径模块滚动效果
    const thirdEyePath = document.querySelector('.third-eye-path');
    if (thirdEyePath) {
        window.addEventListener('scroll', function() {
            if (isElementInViewport(thirdEyePath)) {
                const scrollPos = window.scrollY;
                const opacity = Math.min(1, scrollPos / 500);
                thirdEyePath.style.background = `linear-gradient(135deg, 
                    rgba(138, 43, 226, ${0.1 + opacity * 0.05}), 
                    rgba(93, 0, 255, ${0.05 + opacity * 0.03}))`;
            }
        });
    }
    
    // 神圣可视化系统交互效果
    const visualCards = document.querySelectorAll('.visual-feature-card');
    
    visualCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 35px rgba(147, 112, 219, 0.25)';
            
            const iconCircle = this.querySelector('.icon-circle-small');
            if (iconCircle) {
                iconCircle.style.transform = 'scale(1.15)';
                iconCircle.style.background = 'rgba(147, 112, 219, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(147, 112, 219, 0.1)';
            
            const iconCircle = this.querySelector('.icon-circle-small');
            if (iconCircle) {
                iconCircle.style.transform = 'scale(1)';
                iconCircle.style.background = 'rgba(147, 112, 219, 0.1)';
            }
        });
    });
    
    // 神圣可视化系统标题动画
    const visualTitle = document.querySelector('.sacred-visual-system .section-title');
    if (visualTitle) {
        window.addEventListener('scroll', function() {
            if (isElementInViewport(visualTitle)) {
                const distance = window.scrollY - visualTitle.getBoundingClientRect().top - window.scrollY;
                const opacity = Math.min(1, Math.abs(distance) / 300);
                visualTitle.style.textShadow = `0 0 ${10 * opacity}px rgba(147, 112, 219, ${opacity * 0.5})`;
            }
        });
    }
    
    // 意识管理矩阵交互效果
    const matrixCards = document.querySelectorAll('.matrix-card');
    
    matrixCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(106, 90, 205, 0.25)';
            
            // 添加发光边缘效果
            this.style.boxShadow = '0 20px 40px rgba(106, 90, 205, 0.25), 0 0 15px rgba(106, 90, 205, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 20px rgba(106, 90, 205, 0.1)';
        });
    });
    
    // 矩阵图像视差效果
    const matrixImg = document.querySelector('.matrix-img');
    if (matrixImg) {
        window.addEventListener('scroll', function() {
            if (isElementInViewport(matrixImg)) {
                const scrollPos = window.scrollY;
                const parentPos = matrixImg.parentElement.getBoundingClientRect().top + window.scrollY;
                const relativePos = (scrollPos - parentPos) * 0.1;
                
                matrixImg.style.transform = `translateY(${relativePos}px) scale(${1 + relativePos * 0.001})`;
            }
        });
        
        // 鼠标移动视差效果
        const matrixSection = document.querySelector('.matrix-section');
        if (matrixSection) {
            matrixSection.addEventListener('mousemove', function(e) {
                const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
                const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
                
                matrixImg.style.transform = `translate(${xPos}px, ${yPos}px)`;
            });
            
            matrixSection.addEventListener('mouseleave', function() {
                matrixImg.style.transform = 'translate(0, 0)';
            });
        }
    }
});

// 粒子效果
function createParticles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .particle {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.1);
            pointer-events: none;
            z-index: -1;
        }
    `;
    document.head.appendChild(style);
    
    const heroSection = document.querySelector('.hero');
    const philosophySection = document.querySelector('.philosophy');
    
    if (heroSection) addParticlesToSection(heroSection, 15);
    if (philosophySection) addParticlesToSection(philosophySection, 10);
}

function addParticlesToSection(section, count) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // 随机大小和位置
        const size = Math.random() * 10 + 5;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // 添加动画
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
        
        section.appendChild(particle);
    }
}

// 工具函数：检查元素是否在视口内
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= -rect.height &&
        rect.left >= -rect.width &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height
    );
} 