document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const clearBtn = document.getElementById('clearBtn');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // Password Toggle Logic
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('iconoir-eye');
        eyeIcon.classList.toggle('iconoir-eye-closed');
    });

    // Clear Button Logic
    clearBtn.addEventListener('click', function () {
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
    });

    // Form Submit Logic (Prototype presentation)
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent actual submission

        // Basic UI validation feedback
        if (usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
            alert('Please enter both username and password.');
            return;
        }

        // Show loading state
        loginBtn.disabled = true;
        btnText.textContent = 'Authenticating... ';
        btnSpinner.classList.remove('d-none');

        // Simulate API call delay
        setTimeout(() => {
            // Success State
            btnSpinner.classList.add('d-none');
            btnText.textContent = 'Success!';
            loginBtn.style.backgroundColor = '#198754';
            loginBtn.style.borderColor = '#198754';

            // Reset and simulate redirect after 0.5s
            setTimeout(() => {
                window.location.href = 'internet_risk.html';
            }, 500);

        }, 1500);
    });

    // Wealth Gateway Tab Switching Logic
    const gatewayTabButtons = document.querySelectorAll('.gateway-tab-btn');
    const gatewayPanels = document.querySelectorAll('.gateway-panel');

    gatewayTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Set active class on buttons
            gatewayTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Set active class on panels
            gatewayPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
});

// In the Spotlight Tab Switching
window.switchFundTab = function (category) {
    // Update active tab button style
    const tabButtons = document.querySelectorAll('.explorer-tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Show/hide rows
    const rows = document.querySelectorAll('.fund-row');
    rows.forEach(row => {
        if (row.classList.contains(category + '-fund')) {
            row.classList.remove('d-none');
        } else {
            row.classList.add('d-none');
        }
    });
};

// Interactive Chart Mockup Update
window.updateMockChart = function (range) {
    // Update active chart tab button style
    const chartBtns = document.querySelectorAll('.chart-tab-mock-btn');
    chartBtns.forEach(btn => {
        if (btn.getAttribute('onclick').includes(range)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    const chartArea = document.getElementById('chartArea');
    const chartLine = document.getElementById('chartLine');

    if (!chartArea || !chartLine) return;

    // Transition paths based on ranges
    if (range === '1M') {
        chartArea.setAttribute('d', 'M 0 120 Q 80 160 160 110 T 320 130 T 400 90 L 400 200 L 0 200 Z');
        chartLine.setAttribute('d', 'M 0 120 Q 80 160 160 110 T 320 130 T 400 90');
    } else if (range === '6M') {
        chartArea.setAttribute('d', 'M 0 150 Q 80 120 160 90 T 320 110 T 400 70 L 400 200 L 0 200 Z');
        chartLine.setAttribute('d', 'M 0 150 Q 80 120 160 90 T 320 110 T 400 70');
    } else if (range === '1Y') {
        chartArea.setAttribute('d', 'M 0 170 Q 80 130 160 140 T 320 80 T 400 50 L 400 200 L 0 200 Z');
        chartLine.setAttribute('d', 'M 0 170 Q 80 130 160 140 T 320 80 T 400 50');
    }
};

document.addEventListener('DOMContentLoaded', injectAlertBanner);

function injectAlertBanner() {
    if (document.getElementById("pmoAlertBanner")) return;

    const bannerHtml = `
        <div class="alert-banner py-2 bg-danger text-white text-center position-relative" id="pmoAlertBanner" style="z-index: 900; width: 100%; color: #ffffff !important; background-color: #ff1700 !important;">
            <div class="container-fluid px-5" style="color: #ffffff !important;">
                <div id="alertCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="5000" style="color: #ffffff !important;">
                    <div class="carousel-inner" style="color: #ffffff !important;">
                        <div class="carousel-item active" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-warning-triangle me-2 align-middle" style="color: #ffffff !important;"></i>
                                We'll be carrying out system maintenance of Public Mutual's online services on 15/03/2026, 12:00am-08:00am. Stay tuned!
                            </small>
                        </div>
                        <div class="carousel-item" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-info-circle me-2 align-middle" style="color: #ffffff !important;"></i>
                                Notice: Never share your User ID, Password or TAC/OTP with anyone, including Public Mutual staff.
                            </small>
                        </div>
                        <div class="carousel-item" style="color: #ffffff !important;">
                            <small class="fw-medium" style="color: #ffffff !important;">
                                <i class="iconoir-graph-up me-2 align-middle" style="color: #ffffff !important;"></i>
                                Explore our latest Shariah-Compliant and Equity Funds now open for subscription.
                            </small>
                        </div>
                    </div>
                    <button class="carousel-control-prev d-none d-md-flex" type="button" data-bs-target="#alertCarousel" data-bs-slide="prev" style="width: 30px; border: none; background: transparent; position: absolute; left: 15px; top: 0; bottom: 0; color: #ffffff !important;">
                        <i class="iconoir-nav-arrow-left text-white fs-6" style="color: #ffffff !important;"></i>
                    </button>
                    <button class="carousel-control-next d-none d-md-flex" type="button" data-bs-target="#alertCarousel" data-bs-slide="next" style="width: 30px; border: none; background: transparent; position: absolute; right: 45px; top: 0; bottom: 0; color: #ffffff !important;">
                        <i class="iconoir-nav-arrow-right text-white fs-6" style="color: #ffffff !important;"></i>
                    </button>
                </div>
                <button type="button" class="btn-close btn-close-white position-absolute end-0 top-50 translate-middle-y me-3" aria-label="Close" onclick="document.getElementById('pmoAlertBanner').style.display='none'" style="box-shadow: none; border: none; background-color: transparent; color: #ffffff !important;"></button>
            </div>
        </div>
    `;

    const div = document.createElement("div");
    div.innerHTML = bannerHtml.trim();
    const bannerElement = div.firstChild;

    // Check for widescreen-header
    const wsHeader = document.querySelector(".widescreen-header");
    if (wsHeader) {
        wsHeader.parentNode.insertBefore(bannerElement, wsHeader.nextSibling);
    } else {
        // Prepend to body so it stays at the absolute top
        document.body.insertBefore(bannerElement, document.body.firstChild);
    }

    // Initialize carousel manually to ensure auto-play
    setTimeout(() => {
        const carouselEl = document.getElementById('alertCarousel');
        if (carouselEl && typeof bootstrap !== 'undefined') {
            new bootstrap.Carousel(carouselEl, {
                interval: 5000,
                ride: 'carousel'
            });
        }
    }, 100);
}
