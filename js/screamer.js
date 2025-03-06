class Screamer {
    constructor() {
        this.overlay = document.getElementById('redirect-overlay');
        this.redirectButton = document.querySelector('#redirect-overlay a');
        this.videoContainer = document.createElement('div');
        this.init();
    }

    init() {
        // Création du conteneur vidéo screamer
        this.videoContainer.className = 'screamer-container';
        this.videoContainer.innerHTML = `
            <video id="screamer-video" class="screamer-video">
                <source src="video/1.mp4" type="video/mp4">
            </video>
        `;
        document.body.appendChild(this.videoContainer);

        // Style pour le screamer
        const style = document.createElement('style');
        style.textContent = `
            .screamer-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: black;
                z-index: 99999;
                display: none;
            }
            .screamer-video {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        `;
        document.head.appendChild(style);

        // Gestion des événements
        this.redirectButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.playScreamer(e.target.href);
        });
    }

    playScreamer(redirectUrl) {
        const video = document.getElementById('screamer-video');
        this.videoContainer.style.display = 'block';
        
        // Jouer le son au maximum
        video.volume = 1;
        
        // Jouer la vidéo en plein écran
        video.play();

        // Gestion de la fin de la vidéo
        video.addEventListener('ended', () => {
            this.videoContainer.style.display = 'none';
            window.location.href = redirectUrl;
        }, { once: true });

        // Forcer la redirection après 5 secondes au cas où la vidéo ne se termine pas
        setTimeout(() => {
            if (!video.ended) {
                this.videoContainer.style.display = 'none';
                window.location.href = redirectUrl;
            }
        }, 5000);
    }
}

// Initialiser le screamer
document.addEventListener('DOMContentLoaded', () => {
    new Screamer();
}); 