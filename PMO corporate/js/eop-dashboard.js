/**
 * EOP dashboard (home) — quick links to other EOP HTML pages.
 */
document.addEventListener('DOMContentLoaded', () => {
    const auth = document.getElementById('eopNotifAuthAction');
    const pay = document.getElementById('eopNotifPaymentAction');
    const last = document.getElementById('eopBtnViewLastTxn');
    const more = document.getElementById('eopHomeRecentTxnMore');

    if (auth) {
        auth.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'authorise.html';
        });
    }
    if (pay) {
        pay.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'payment.html';
        });
    }
    if (last) {
        last.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'transactions.html';
        });
    }
    if (more) {
        more.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'transactions.html';
        });
    }

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
        try {
            if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
                new bootstrap.Tooltip(el);
            }
        } catch (_) {
            /* ignore */
        }
    });
});
