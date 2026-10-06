/**
 * Row action dropdowns on authorise tables — Popper `fixed` escapes
 * .table-responsive / .overflow-hidden clipping (Bootstrap 5).
 * Used by unit-trust/authorise.html, unit-trust/view_account.html, eop/authorise.html,
 * eop/payment.html, and eop/analytics.html (PRS table).
 *
 * IMPORTANT: pass popperConfig as a function. A plain object shallow-merges with Bootstrap’s
 * default and replaces the entire `modifiers` array, which removes flip/computeStyles and
 * breaks the menu (clicks appear to do nothing).
 */
(function () {
    function buildPopperConfig(defaultBsPopperConfig) {
        const modifiers = (defaultBsPopperConfig.modifiers || []).map((m) => {
            if (m.name === 'preventOverflow') {
                return {
                    ...m,
                    options: {
                        ...(m.options || {}),
                        boundary: document.documentElement,
                        padding: 8,
                    },
                };
            }
            return m;
        });
        return {
            ...defaultBsPopperConfig,
            strategy: 'fixed',
            modifiers,
        };
    }

    function initAuthoriseTableDropdowns() {
        if (!window.bootstrap || !bootstrap.Dropdown) return;
        document.querySelectorAll('.authorise-table-card [data-bs-toggle="dropdown"]').forEach((toggle) => {
            const existing = bootstrap.Dropdown.getInstance(toggle);
            if (existing) existing.dispose();
            new bootstrap.Dropdown(toggle, {
                popperConfig: buildPopperConfig,
            });
        });
    }

    function scheduleInit() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAuthoriseTableDropdowns);
        } else {
            initAuthoriseTableDropdowns();
        }
        window.addEventListener('load', initAuthoriseTableDropdowns);
    }

    scheduleInit();
})();
