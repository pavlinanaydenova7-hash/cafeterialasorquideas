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
            sessionStorage.removeItem('hideCookieBanner'); // limpiar para futuras navegaciones
        }

        // ✅ Mostrar el banner solo si no hay preferencia guardada
        const userPreference = localStorage.getItem('cookiePreference');

        if (!userPreference) {
            cookieBanner.style.display = 'block';
        } else {
            hideCookieBanner(); // 👈 si ya aceptó, rechazó o configuró, no mostrar
        }

        // "Más información"
        if (moreInfoLink) {
            moreInfoLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'informacion-cookies.html';
            });
        }

        // "Configurar" button
        if (configButton) {
            configButton.addEventListener('click', function() {
                window.location.href = 'configurar-cookies.html';
            });
        }

        // "Aceptar todas"
        if (acceptButton) {
            acceptButton.addEventListener('click', function() {
                hideCookieBanner();
                localStorage.setItem('cookiePreference', 'accepted');
            });
        }

        // "Rechazar todas"
        if (rejectButton) {
            rejectButton.addEventListener('click', function() {
                hideCookieBanner();
                localStorage.setItem('cookiePreference', 'rejected');
            });
        }
    }

    // Lógica para el enlace de configuración en el footer
    const cookieSettings = document.getElementById('cookie-settings');
    if (cookieSettings) {
        cookieSettings.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'configurar-cookies.html';
        });
    }
});
