(function () {
    function enhancePageAccessibility() {
        const main = document.querySelector('main, [role="main"]');
        if (main && !document.querySelector('.pmo-skip-link')) {
            if (!main.id) main.id = 'main-content';
            main.setAttribute('tabindex', '-1');

            const skipLink = document.createElement('a');
            skipLink.className = 'pmo-skip-link';
            skipLink.href = `#${main.id}`;
            skipLink.textContent = 'Skip to main content';
            document.body.prepend(skipLink);
        }

        document.querySelectorAll('button:not([type])').forEach((button) => {
            if (!button.closest('form')) button.type = 'button';
        });

        document.querySelectorAll('a[href="#"][data-bs-toggle]').forEach((trigger) => {
            trigger.setAttribute('role', 'button');
            trigger.addEventListener('click', (event) => event.preventDefault());
        });

        document.querySelectorAll('input:not([type="hidden"]), select, textarea').forEach((field) => {
            const hasLinkedLabel = field.id && Array.from(document.querySelectorAll('label')).some((label) => label.htmlFor === field.id);
            const hasName = field.hasAttribute('aria-label') || field.hasAttribute('aria-labelledby') || hasLinkedLabel || field.closest('label');
            if (!hasName) field.setAttribute('aria-label', field.placeholder || field.name || field.type || 'Input');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', enhancePageAccessibility);
    } else {
        enhancePageAccessibility();
    }
})();
