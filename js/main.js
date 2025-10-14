document.addEventListener('DOMContentLoaded', function() {
    // Lógica para el banner de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.style.display = 'block';
    }

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.style.display = 'none';
    });

    // Lógica para el botón de configuración de cookies en el footer
    const cookieSettings = document.getElementById('cookie-settings');
    cookieSettings.addEventListener('click', function(e) {
        e.preventDefault();
        // Aquí se podría abrir un modal de configuración de cookies
        alert('Aquí puedes configurar tus preferencias de cookies.');
        cookieBanner.style.display = 'block';
    });
});
