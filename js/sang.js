document.addEventListener('DOMContentLoaded', () => {
    console.log('BloodEffect.js chargé');
    
    document.addEventListener('click', (e) => {
        console.log('Click détecté aux coordonnées:', e.clientX, e.clientY);
        
        // Créer une image au lieu d'un div
        const bloodSplat = document.createElement('img');
        bloodSplat.src = './img/sang.png';  // Chemin relatif depuis la racine
        bloodSplat.className = 'blood-splat';
        bloodSplat.style.left = (e.clientX - 50) + 'px';
        bloodSplat.style.top = (e.clientY - 50) + 'px';
        document.body.appendChild(bloodSplat);
        
        console.log('Image blood-splat créée et ajoutée');
        console.log('Element dimensions:', bloodSplat.offsetWidth, bloodSplat.offsetHeight);
        console.log('Element position:', bloodSplat.style.left, bloodSplat.style.top);

        // Vérifier si l'image est chargée
        bloodSplat.onload = () => {
            console.log('Image chargée avec succès');
        };
        
        bloodSplat.onerror = () => {
            console.log('Erreur de chargement de l\'image');
        };

        setTimeout(() => {
            bloodSplat.remove();
            console.log('Élément blood-splat supprimé');
        }, 2000);
    });
});
