const menuButton = document.querySelector('.menu');
const nav = document.querySelector('.main-nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav--active');
        menuButton.classList.toggle('menu--open', isOpen);
        menuButton.setAttribute('aria-expanded', isOpen);
        nav.setAttribute('aria-expanded', isOpen);
    });
}

async function copyToClipboard(text) {
    if (!text) {
        return false;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            // ignore and try fallback
        }
    }

    try {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        tempInput.setAttribute('readonly', '');
        tempInput.style.position = 'absolute';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.select();
        const result = document.execCommand && document.execCommand('copy');
        document.body.removeChild(tempInput);
        return result;
    } catch (error) {
        return false;
    }
}


// ============================================
// 技能进度条动画
// ============================================

// 1️⃣ 等待页面完全加载
document.addEventListener('DOMContentLoaded', () => {
    
    // 2️⃣ 选择技能区域
    const skillSection = document.querySelector('.skill');
    
    // 3️⃣ 检查元素是否存在
    if (!skillSection) {
        console.warn('技能区域未找到');
        return;
    }
    
    // 4️⃣ 创建观察者配置
    const observerOptions = {
        root: null,           // 使用浏览器视口作为参照
        rootMargin: '0px',    // 无边距偏移
        threshold: 0.2        // 当20%的区域可见时触发
    };
    
    // 5️⃣ 定义回调函数：元素进入视口时会执行
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // 6️⃣ 检查是否进入视口
            if (entry.isIntersecting) {
                console.log('技能区域进入视口！开始动画...');
                
                // 7️⃣ 触发动画
                animateSkillBars();
                
                // 8️⃣ 停止观察（动画只执行一次）
                observer.unobserve(entry.target);
            }
        });
    };
    
    // 9️⃣ 创建观察者实例
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // 🔟 开始观察技能区域
    observer.observe(skillSection);
});

// ============================================
// 进度条动画函数
// ============================================
function animateSkillBars() {
    // 1️⃣ 获取所有技能项
    const skillItems = document.querySelectorAll('.skill-item');
    
    // 2️⃣ 遍历每个技能
    skillItems.forEach((item, index) => {
        // 3️⃣ 获取这个技能的填充条和百分比显示
        const fill = item.querySelector('.skill-bar-fill');
        const percentText = item.querySelector('.skill-percent');
        
        // 4️⃣ 读取目标百分比
        const targetPercent = parseInt(fill.getAttribute('data-percent'));
        
        // 5️⃣ 延迟执行：让技能依次动画（更好看）
        setTimeout(() => {
            // 6️⃣ 设置进度条宽度（触发 CSS transition）
            fill.style.width = targetPercent + '%';
            
            // 7️⃣ 数字跳动动画
            animateNumber(percentText, 0, targetPercent, 1500);
            
        }, index * 100);  // 每个技能延迟100ms
    });
}

// ============================================
// 数字跳动动画函数
// ============================================
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        // 1️⃣ 计算已经过去的时间
        const elapsed = currentTime - startTime;
        
        // 2️⃣ 计算进度（0 到 1）
        const progress = Math.min(elapsed / duration, 1);
        
        // 3️⃣ 使用缓动函数（先快后慢）
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        // 4️⃣ 计算当前数字
        const current = Math.floor(start + (end - start) * easeOutProgress);
        
        // 5️⃣ 更新显示
        element.textContent = current + '%';
        
        // 6️⃣ 如果还没结束，继续下一帧
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // 确保最终值精确
            element.textContent = end + '%';
        }
    }
    
    // 启动动画
    requestAnimationFrame(update);
}





document.addEventListener('DOMContentLoaded', () => {
    // 点击「联系我」按钮，显示/隐藏邮箱卡片
    // 1. 获取「联系我」按钮和邮箱卡片元素
    const contactButton = document.querySelector('.me-contact-button');
    const emailCard = document.querySelector('.email-card');
    
    // 2. 给「联系我」按钮增加 点击事件
    contactButton.addEventListener('click', () => {
        emailCard.hidden = !emailCard.hidden;
    });
    
    // 3. 获取「复制邮箱」按钮，复制邮箱地址
    const copyButton = document.querySelector('.email-copy');
    const emailHint = document.querySelector('.email-hint');
    const emailText = document.querySelector('.email-text').textContent;
    
    // 4. 给「复制邮箱」按钮添加点击事件
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText);
        emailHint.textContent = '✅已复制！';
        setTimeout(() => {emailHint.textContent=''}, 2000);
    });
});


// ============================================
// 主题切换功能
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle__icon');

    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme == 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.textContent = '🌙';
    }

    themeToggle.addEventListener('click', () => {
        // 切换暗色主题类
        const isDark = document.body.classList.toggle('dark-theme');

        // 根据当前主题更新图标
        if (isDark) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });
});