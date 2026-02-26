export function initMobileMenu() {
    const headerMenuButton = document.getElementById('header-menu-button');
    const closeButton = document.getElementById('close-menu-button');
    const menuOverlay = document.getElementById('mobile-nav-overlay');
    const menuDrawer = document.getElementById('mobile-nav-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
        menuOverlay.classList.remove('invisible');
        menuOverlay.classList.add('opacity-100');
        menuDrawer.classList.remove('translate-x-full');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuOverlay.classList.remove('opacity-100');
        menuDrawer.classList.add('translate-x-full');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        setTimeout(() => menuOverlay.classList.add('invisible'), 300);
    }

    headerMenuButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);

    menuOverlay.addEventListener('click', e => {
        if (e.target === menuOverlay) closeMenu();
    });

    mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
}