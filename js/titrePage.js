class TitleHacker {
    constructor() {
        this.originalTitle = "Horreur";
        this.chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.updateRate = 1 ;
        this.freezeRate = 1;
        this.hackedTitle = Array(this.originalTitle.length).fill('');
        this.frozenIndices = new Set();
        this.start();
    }

    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }

    updateTitle() {
        let newTitle = '';
        for (let i = 0; i < this.originalTitle.length; i++) {
            if (this.originalTitle[i] === ' ') {
                newTitle += ' ';
                continue;
            }

            if (this.frozenIndices.has(i)) {
                newTitle += this.hackedTitle[i];
                continue;
            }

            if (Math.random() * 1000 < this.freezeRate) {
                this.frozenIndices.add(i);
                this.hackedTitle[i] = this.getRandomChar();
            }

            newTitle += this.getRandomChar();
        }

        if (this.frozenIndices.size === this.originalTitle.replace(/ /g, '').length) {
            setTimeout(() => {
                this.frozenIndices.clear();
            }, 1000);
        }

        document.title = newTitle;
    }

    start() {
        setInterval(() => this.updateTitle(), this.updateRate);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TitleHacker();
}); 