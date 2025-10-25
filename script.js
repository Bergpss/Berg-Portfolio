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

// const emailToggle = document.querySelector('.media-cta__button[data-email]');
// const emailBox = document.querySelector('.media-email');

// if (emailToggle && emailBox) {
//     const emailTextEl = emailBox.querySelector('.media-email__text');
//     const copyButton = emailBox.querySelector('.media-email__copy');
//     const hintEl = emailBox.querySelector('.media-email__hint');
//     const emailValue = emailToggle.dataset.email || (emailTextEl ? emailTextEl.textContent.trim() : '');

//     emailToggle.addEventListener('click', () => {
//         emailBox.hidden = false;
//         emailToggle.setAttribute('aria-expanded', 'true');
//         emailToggle.textContent = emailValue;
//         emailToggle.disabled = true;
//     });

//     if (copyButton) {
//         copyButton.addEventListener('click', async () => {
//             const success = await copyToClipboard(emailValue);
//             if (hintEl) {
//                 hintEl.textContent = success ? '已复制' : '复制失败，请手动复制';
//                 setTimeout(() => {
//                     hintEl.textContent = '';
//                 }, 2000);
//             }
//         });
//     }
// }

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
