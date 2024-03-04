/** Lazy Image Loader with IntersectionObserver */
class LazyLoader {
    constructor(options = {}) {
        this.options = { rootMargin: '200px', ...options };
        this.init();
    }
    init() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('img[data-src]').forEach(img => this.loadImage(img));
            return;
        }
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.options);
        document.querySelectorAll('img[data-src]').forEach(img => this.observer.observe(img));
    }
    loadImage(img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.onload = () => img.classList.add('loaded');
    }
    destroy() {
        if (this.observer) this.observer.disconnect();
    }
}
