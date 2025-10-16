document.addEventListener('DOMContentLoaded', function() {
    // Lógica para el banner de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    const configButton = document.getElementById('config-cookies');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');    

    if (cookieBanner) {
        const moreInfoLink = document.getElementById('more-info');

        // Función para ocultar el banner
        const hideCookieBanner = () => {
            if (cookieBanner) {
                cookieBanner.style.display = 'none';
            }
        };

        // Si venimos de la página de configuración, ocultar el banner
        if (sessionStorage.getItem('hideCookieBanner')) {
            hideCookieBanner();
            sessionStorage.removeItem('hideCookieBanner'); // Limpiar para futuras navegaciones
        }

        // Mostrar el banner solo si no se ha establecido ninguna preferencia de cookies
        if (!localStorage.getItem('cookiePreference')) {
            cookieBanner.style.display = 'block';
        }

        // Handle 'Más información' link
        if (moreInfoLink) {
            moreInfoLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'informacion-cookies.html';
            });
        }

        // Handle 'Configurar' button
        if (configButton) {
            configButton.addEventListener('click', function() {
                window.location.href = 'configurar-cookies.html';
            });
        }

        // Handle 'Aceptar todas' button
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                hideCookieBanner();
                localStorage.setItem('cookiePreference', 'accepted');
            });
        }

        // Handle 'Rechazar todas' button
        if (rejectButton) {
            rejectButton.addEventListener('click', function() {
                hideCookieBanner();
                localStorage.setItem('cookiePreference', 'rejected');
            });
        }
    }

    // Lógica para el botón de configuración de cookies en el footer
    const cookieSettings = document.getElementById('cookie-settings');
    if (cookieSettings) {
        cookieSettings.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'configurar-cookies.html';
        });
    }
});
