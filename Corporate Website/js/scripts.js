document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('usernameInput');
    const passwordInput = document.getElementById('passwordInput');
    const togglePassword = document.getElementById('togglePassword');
    const eyeIcon = document.getElementById('eyeIcon');
    const clearBtn = document.getElementById('clearBtn');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Password Toggle Logic
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        eyeIcon.classList.toggle('iconoir-eye');
        eyeIcon.classList.toggle('iconoir-eye-closed');
    });

    // Clear Button Logic
    clearBtn.addEventListener('click', function() {
        usernameInput.value = '';
        passwordInput.value = '';
        usernameInput.focus();
    });

    // Form Submit Logic (Prototype presentation)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual submission

        // Basic UI validation feedback
        if(usernameInput.value.trim() === '' || passwordInput.value.trim() === '') {
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
});
