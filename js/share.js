import { showToast } from './toast.js';

export async function shareDeal(title, sectionId) {
    const dealUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;

    if (navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        try {
            await navigator.share({
                title: `The Arena Deal: ${title}`,
                url: dealUrl
            });
        } catch (err) {}
    } else {
        const el = document.createElement('textarea');
        el.value = dealUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('Deal copied to clipboard!');
    }
}