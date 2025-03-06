class HorizontalScroll {
    constructor() {
        this.mainContent = document.querySelector('.main-content');
        this.handBlood = document.querySelector('.hand-blood');
        this.shortsKnife = document.querySelector('.shorts-knife');
        this.currentPosition = 0;
        this.targetPosition = 0;
        this.scrollThreshold = 0;
        this.maxScroll = -100;
        this.isTablet = window.innerWidth < 1024;
        this.init();
    }

    init() {
        if (!this.isTablet) {
            window.addEventListener('wheel', this.handleScroll.bind(this));
            window.addEventListener('touchstart', this.handleTouchStart.bind(this));
            window.addEventListener('touchmove', this.handleTouchMove.bind(this));
            this.animate();
        } else {
            // Passer en mode vertical
            this.mainContent.style.transform = 'none';
            this.mainContent.style.overflowY = 'auto';
            this.mainContent.style.height = '100vh';

            if (this.handBlood) {
                this.handBlood.style.transform = 'translateY(-50%) rotate(50deg)';
            }
        }

        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        const newIsTablet = window.innerWidth < 1024;
        if (this.isTablet !== newIsTablet) {
            this.isTablet = newIsTablet;
            if (this.isTablet) {
                // Passer en mode scroll vertical
                this.mainContent.style.transform = 'none';
                this.mainContent.style.overflowY = 'auto';
                this.mainContent.style.height = '100vh';

                window.removeEventListener('wheel', this.handleScroll.bind(this));
                window.removeEventListener('touchstart', this.handleTouchStart.bind(this));
                window.removeEventListener('touchmove', this.handleTouchMove.bind(this));
            } else {
                // Réactiver le scroll horizontal
                this.mainContent.style.overflowY = 'hidden';
                window.addEventListener('wheel', this.handleScroll.bind(this));
                window.addEventListener('touchstart', this.handleTouchStart.bind(this));
                window.addEventListener('touchmove', this.handleTouchMove.bind(this));
                this.animate();
            }
        }
    }

    handleScroll(event) {
        event.preventDefault();

        if (this.isTablet) return; // Désactiver le scroll horizontal en mode tablette

        this.scrollThreshold += event.deltaY;
        this.targetPosition = Math.max(this.maxScroll, Math.min(0, -this.scrollThreshold / 500 * 100));

        if (this.targetPosition === 0 || this.targetPosition === this.maxScroll) {
            this.scrollThreshold = this.targetPosition * -5;
        }
    }

    animate() {
        if (this.isTablet) return; // Ne pas animer en mode vertical

        this.currentPosition += (this.targetPosition - this.currentPosition) * 0.1;
        this.mainContent.style.transform = `translateX(${this.currentPosition}vw)`;

        if (this.handBlood) {
            const parallaxOffset = this.currentPosition * 1.5;
            this.handBlood.style.transform = `translateX(${parallaxOffset}vw) translateY(-50%) rotate(50deg)`;
        }

        requestAnimationFrame(this.animate.bind(this));
    }

    handleTouchStart(event) {
        this.touchStartX = event.touches[0].clientX;
        this.lastTouchX = this.touchStartX;
    }

    handleTouchMove(event) {
        if (!this.touchStartX || this.isTablet) return; // Désactiver en mode tablette

        const touchX = event.touches[0].clientX;
        const deltaX = this.lastTouchX - touchX;
        this.lastTouchX = touchX;

        this.scrollThreshold += deltaX * 2;
        this.targetPosition = Math.max(this.maxScroll, Math.min(0, -this.scrollThreshold / 500 * 100));

        if (this.targetPosition === 0 || this.targetPosition === this.maxScroll) {
            this.scrollThreshold = this.targetPosition * -5;
        }

        event.preventDefault();
    }
}

// Initialiser le défilement horizontal/vertical
document.addEventListener('DOMContentLoaded', () => {
    new HorizontalScroll();
});
