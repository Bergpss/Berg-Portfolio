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
