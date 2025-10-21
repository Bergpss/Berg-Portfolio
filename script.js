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
