import { updateBusinessHours } from './businessHours.js';
import { phoneAnimation } from './phoneAnimation.js';
import { initMobileMenu } from './mobileMenu.js';

document.addEventListener('DOMContentLoaded', () => {
    updateBusinessHours();
    initMobileMenu();

    const animationObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                phoneAnimation();
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const animationTarget = document.getElementById('innovation-focus');
    if (animationTarget) animationObserver.observe(animationTarget);

    const scrollContainer = document.getElementById('project-scroll-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn && scrollContainer) {
        prevBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: -320, behavior: 'smooth' }));
        nextBtn.addEventListener('click', () => scrollContainer.scrollBy({ left: 320, behavior: 'smooth' }));
    }
});