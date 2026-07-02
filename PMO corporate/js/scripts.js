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
