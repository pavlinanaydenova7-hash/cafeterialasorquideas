document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE TRADUCCIÓN ---
    const defaultLang = 'es';
    let currentLang = localStorage.getItem('lang') || defaultLang;

    // Función para cargar el archivo JSON del idioma y aplicar las traducciones
    async function setLanguage(lang) {
        try {
            // Se intenta primero con una ruta relativa, que funciona al abrir el archivo localmente.
            // La ruta absoluta (`/locales/...`) funcionará cuando el sitio esté en un servidor web.
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                console.error(`Could not load translation file for: ${lang}`);
                return;
            }
            const translations = await response.json();
            applyTranslations(translations, lang);
        } catch (error) {
            console.error('Error loading or applying translations:', error);
        }
    }

    function applyTranslations(translations, lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Comprueba si el texto de la traducción contiene HTML (como un enlace <a>)
                if (/<[a-z][\s\S]*>/i.test(translations[key])) {
                    // Si contiene HTML, lo insertamos directamente para preservar los enlaces
                    element.innerHTML = translations[key];
                } else {
                    // Si no contiene HTML, comprobamos si el elemento tiene un icono <i>
                    const icon = element.querySelector('i.bi');
                    if (icon) {
                        // Si hay un icono, lo mantenemos y solo cambiamos el texto
                        element.innerHTML = `${icon.outerHTML} ${translations[key]}`;
                    } else {
                        // Si no hay icono ni HTML en la traducción, reemplazamos todo el contenido
                        element.innerHTML = translations[key];
                    }
                }
            }
        });

        // Actualiza el atributo lang de la etiqueta <html>
        document.documentElement.lang = lang;
        // Guarda la preferencia de idioma
        localStorage.setItem('lang', lang);
        currentLang = lang;

        // Actualiza el texto del botón del selector de idioma
        const langDisplay = document.getElementById('current-lang-display');
        if (langDisplay) {
            langDisplay.textContent = lang.toUpperCase();
        }
    }

    // Añade los listeners a los botones del selector de idioma
    document.querySelectorAll('.dropdown-item[data-lang]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLang = event.target.getAttribute('data-lang');
            if (selectedLang) {
                setLanguage(selectedLang);
            }
        });
    });

    // Carga el idioma al iniciar la página
    setLanguage(currentLang);

    // --- LÓGICA DEL BANNER DE COOKIES ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');
    const rejectCookies = document.getElementById('reject-cookies');
    const configCookies = document.getElementById('config-cookies');
    const cookieSettingsFooter = document.getElementById('cookie-settings');

    if (cookieBanner && acceptCookies && rejectCookies && configCookies) {
        const cookiePreference = localStorage.getItem('cookiePreference');

        if (!cookiePreference && !sessionStorage.getItem('hideCookieBanner')) {
            cookieBanner.style.display = 'block';
            // Mueve el foco al banner para mejorar la accesibilidad
            setTimeout(() => {
                cookieBanner.focus();
            }, 100);
        }

        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('cookiePreference', 'accepted');
            cookieBanner.style.display = 'none';
        });

        rejectCookies.addEventListener('click', () => {
            localStorage.setItem('cookiePreference', 'rejected');
            cookieBanner.style.display = 'none';
        });

        configCookies.addEventListener('click', () => {
            window.location.href = 'configurar-cookies.html';
        });
    }

    if (cookieSettingsFooter) {
        cookieSettingsFooter.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'configurar-cookies.html';
        });
    }
});
