document.addEventListener('DOMContentLoaded', () => {
    const viseur = document.createElement('img');
    viseur.src = './img/knife.png';
    viseur.id = 'viseur';
    document.body.appendChild(viseur);

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            viseur.style.left = e.clientX + 'px';
            viseur.style.top = e.clientY + 'px';
        });
    });
});