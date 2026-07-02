document.addEventListener('DOMContentLoaded', function() {
    // Stepper elements
    const step1Card = document.getElementById('step-1-card');
    const step2Card = document.getElementById('step-2-card');
    const step3Card = document.getElementById('step-3-card');

    const indStep1 = document.getElementById('indicator-step-1');
    const indStep2 = document.getElementById('indicator-step-2');
    const indStep3 = document.getElementById('indicator-step-3');
    
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');

    // Choice Cards
    const optPasswordOnly = document.getElementById('opt-password-only');
    const optBoth = document.getElementById('opt-both');

    const fieldsPasswordOnly = document.getElementById('fields-password-only');
    const fieldsBoth = document.getElementById('fields-both');

    // Stepper Label Variables
    const step1Label = document.getElementById('step1-label');
    const step2Label = document.getElementById('step2-label');
    const step3Subtitle = document.getElementById('step3-subtitle');

    // Step 1 Controls
    const step1Form = document.getElementById('step1Form');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha');
    const captchaBox = document.getElementById('captcha-box');
    const captchaInput = document.getElementById('captchaInput');

    // Step 2 Controls (New Password & Credentials Update)
    const step2Form = document.getElementById('step2Form');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const eyeIconNew = document.getElementById('eyeIconNew');
    const eyeIconConfirm = document.getElementById('eyeIconConfirm');
    const btnNext2 = document.getElementById('btn-next-2');
    const usernameUpdateContainer = document.getElementById('username-update-container');
    const newUsername = document.getElementById('newUsername');
    const step2Title = document.getElementById('step2-title');
    const step2Subtitle = document.getElementById('step2-subtitle');
    const useridLabelStep3 = document.getElementById('userid-label-step3');
    const recoveredUseridStep3 = document.getElementById('recovered-userid-step3');

    // Step 3 Controls (Security Verification - PAC)
    const step3Form = document.getElementById('step3Form');
    const pacInput = document.getElementById('pacInput');
    const btnRequestPac = document.getElementById('btn-request-pac');
    const pacMessage = document.getElementById('pac-message');
    const useridRetrievalContainer = document.getElementById('userid-retrieval-container');
    const retrievedUseridVal = document.getElementById('retrieved-userid-val');
    const smsToast = document.getElementById('smsToast');
    const pacError = document.getElementById('pac-error');
    const pacSuccess = document.getElementById('pac-success');
    const pacTimer = document.getElementById('pac-timer');
    const timerSeconds = document.getElementById('timer-seconds');
    const btnComplete = document.getElementById('btn-complete');

    // Back buttons
    const btnBack1 = document.getElementById('btn-back-1');
    const btnBack2 = document.getElementById('btn-back-2');

    // Active state tracker
    let selectedOption = 'password-only'; // 'password-only' or 'both'
    let currentStep = 1;

    // CAPTCHA list
    const captchas = ['4P8DX', '9KW4V', '2YA8U', 'K7Z2M', 'X4F9S'];
    let currentCaptchaIdx = 0;

    // --- Path Selection Handler ---
    if (optPasswordOnly && optBoth) {
        optPasswordOnly.addEventListener('click', function() {
            selectedOption = 'password-only';
            optPasswordOnly.classList.add('selected');
            optBoth.classList.remove('selected');
            
            // Toggle form views
            fieldsPasswordOnly.classList.remove('d-none');
            fieldsBoth.classList.add('d-none');
            
           
            // Refresh Captcha
            currentCaptchaIdx = 0;
            captchaBox.textContent = captchas[currentCaptchaIdx];
            captchaInput.value = captchas[currentCaptchaIdx];
        });

        optBoth.addEventListener('click', function() {
            selectedOption = 'both';
            optBoth.classList.add('selected');
            optPasswordOnly.classList.remove('selected');
            
            // Toggle form views
            fieldsBoth.classList.remove('d-none');
            fieldsPasswordOnly.classList.add('d-none');
            
           
            // Refresh Captcha
            currentCaptchaIdx = 1;
            captchaBox.textContent = captchas[currentCaptchaIdx];
            captchaInput.value = captchas[currentCaptchaIdx];
        });
    }

    // Refresh Captcha click
    if (refreshCaptchaBtn) {
        refreshCaptchaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currentCaptchaIdx = (currentCaptchaIdx + 1) % captchas.length;
            captchaBox.textContent = captchas[currentCaptchaIdx];
            captchaInput.value = captchas[currentCaptchaIdx];
        });
    }

    // --- Navigation Mechanics ---
    function showStep(step) {
        // Toggle card d-none states
        step1Card.classList.add('d-none');
        step2Card.classList.add('d-none');
        step3Card.classList.add('d-none');

        // Reset Stepper indicators
        indStep1.classList.remove('active');
        indStep2.classList.remove('active');
        indStep3.classList.remove('active');
        line1.classList.remove('active');
        line2.classList.remove('active');

        // Render stepper styles up to active step
        if (step >= 1) indStep1.classList.add('active');
        if (step >= 2) {
            indStep2.classList.add('active');
            line1.classList.add('active');
        }
        if (step >= 3) {
            indStep3.classList.add('active');
            line2.classList.add('active');
        }

        // Display targeted card
        if (step === 1) step1Card.classList.remove('d-none');
        if (step === 2) {
            step2Card.classList.remove('d-none');
            if (selectedOption === 'both') {
                if (usernameUpdateContainer) usernameUpdateContainer.classList.remove('d-none');
                if (step2Title) step2Title.textContent = "Update Credentials";
                if (step2Subtitle) step2Subtitle.textContent = "Please update your recovered User ID and configure a robust new password.";
            } else {
                if (usernameUpdateContainer) usernameUpdateContainer.classList.add('d-none');
                if (step2Title) step2Title.textContent = "Create New Password";
                if (step2Subtitle) step2Subtitle.textContent = "Please configure a robust new password for your PMO corporate profile.";
            }
        }
        if (step === 3) {
            step3Card.classList.remove('d-none');
            const useridCalloutStep3 = document.getElementById('userid-callout-step3');
            if (selectedOption === 'both') {
                if (useridCalloutStep3) useridCalloutStep3.classList.remove('d-none');
                if (recoveredUseridStep3 && newUsername) recoveredUseridStep3.textContent = newUsername.value;
                if (useridLabelStep3) useridLabelStep3.textContent = "New User ID:";
            } else {
                if (useridCalloutStep3) useridCalloutStep3.classList.add('d-none');
            }
        }

        currentStep = step;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // --- Form Step 1 Submit Handler ---
    if (step1Form) {
        step1Form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate Captcha
            if (captchaInput.value.toUpperCase() !== captchaBox.textContent.trim()) {
                captchaInput.classList.add('is-invalid');
                return;
            } else {
                captchaInput.classList.remove('is-invalid');
            }

            // Move to Step 2
            showStep(2);
        });
    }

    let pacSent = false;
    let pacVerified = false;
    let countdownValue = 60;
    let timerInterval = null;
    const correctPAC = "12345678";

    // PAC simulated request with loading, Toast alerts, countdown timer, and autocomplete input
    if (btnRequestPac) {
        btnRequestPac.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading text state
            btnRequestPac.disabled = true;
            btnRequestPac.textContent = 'REQUESTING...';
            
            setTimeout(() => {
                pacSent = true;
                btnRequestPac.textContent = 'REQUEST PAC';
                
                // Enable PAC input field
                pacInput.removeAttribute('disabled');
                pacInput.value = '12345678'; // Pre-populate standard demo PAC code
                pacInput.classList.remove('is-valid', 'is-invalid');
                pacInput.focus();
                
                // Display Push Notification Toast with animation
                smsToast.classList.remove('d-none');
                // Force reflow
                smsToast.offsetHeight;
                smsToast.classList.add('show');
                
                // Clear existing timer if any
                if (timerInterval) clearInterval(timerInterval);
                
                // Countdown timer
                countdownValue = 60;
                pacTimer.style.display = 'block';
                timerSeconds.textContent = countdownValue;
                
                timerInterval = setInterval(() => {
                    countdownValue--;
                    timerSeconds.textContent = countdownValue;
                    if (countdownValue <= 0) {
                        clearInterval(timerInterval);
                        btnRequestPac.disabled = false;
                        pacTimer.style.display = 'none';
                        btnRequestPac.textContent = 'RESEND PAC';
                    }
                }, 1000);
                
                // Auto-dismiss the toast after 8 seconds
                setTimeout(() => {
                    smsToast.classList.remove('show');
                    setTimeout(() => {
                        smsToast.classList.add('d-none');
                    }, 500);
                }, 8000);
                
                // Trigger input event to run validation instantly
                pacInput.dispatchEvent(new Event('input'));
                
            }, 1000);
        });
    }

    // --- PAC Input verification check ---
    if (pacInput) {
        pacInput.addEventListener('input', function() {
            const val = pacInput.value.trim();
            
            if (val.length === 8) {
                if (val === correctPAC) {
                    // Success verification
                    pacVerified = true;
                    pacInput.classList.add('is-valid');
                    pacInput.classList.remove('is-invalid');
                    pacSuccess.style.display = 'block';
                    pacError.style.display = 'none';
                    
                    // Enable complete button
                    if (btnComplete) btnComplete.removeAttribute('disabled');
                    
                    if (selectedOption === 'both') {
                        // Reveal retrieved User ID immediately as PAC is successfully verified
                        useridRetrievalContainer.classList.remove('d-none');
                        if (retrievedUseridVal && newUsername) {
                            retrievedUseridVal.textContent = newUsername.value;
                        }
                        const retrievedTitle = useridRetrievalContainer.querySelector('.uppercase');
                        if (retrievedTitle) {
                            retrievedTitle.textContent = "UPDATED CORPORATE USER ID";
                        }
                        useridRetrievalContainer.style.opacity = '0';
                        useridRetrievalContainer.style.transition = 'opacity 0.4s ease';
                        setTimeout(() => useridRetrievalContainer.style.opacity = '1', 50);
                    }
                } else {
                    // Failed verification
                    pacVerified = false;
                    pacInput.classList.add('is-invalid');
                    pacInput.classList.remove('is-valid');
                    pacError.style.display = 'block';
                    pacSuccess.style.display = 'none';
                    
                    // Keep complete button disabled
                    if (btnComplete) btnComplete.setAttribute('disabled', 'true');
                }
            } else {
                // Reset validation styling when editing
                pacVerified = false;
                pacInput.classList.remove('is-valid', 'is-invalid');
                pacError.style.display = 'none';
                pacSuccess.style.display = 'none';
                
                // Keep complete button disabled
                if (btnComplete) btnComplete.setAttribute('disabled', 'true');
            }
        });
    }

    // --- Form Step 2 Submit Handler (New Password Setup) ---
    if (step2Form) {
        step2Form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate User ID if option is both
            if (selectedOption === 'both' && newUsername) {
                if (!newUsername.value.trim()) {
                    newUsername.classList.add('is-invalid');
                    alert("User ID cannot be empty.");
                    return;
                } else {
                    newUsername.classList.remove('is-invalid');
                }
            }

            // Validate match
            if (newPassword.value !== confirmPassword.value) {
                confirmPassword.classList.add('is-invalid');
                alert("Passwords do not match. Please ensure both fields are identical.");
                return;
            } else {
                confirmPassword.classList.remove('is-invalid');
            }

            // Verify password requirements
            if (!checkPasswordComplexity(newPassword.value)) {
                alert("Password does not meet the complexity requirements.");
                return;
            }

            // Move to Step 3
            showStep(3);
        });
    }

    // --- Password Validation Logic (Step 2) ---
    const ruleCasing = document.getElementById('rule-casing');
    const ruleNumeric = document.getElementById('rule-numeric');
    const ruleLength = document.getElementById('rule-length');
    const ruleSpecial = document.getElementById('rule-special');

    function checkPasswordComplexity(pass) {
        // Casing: both upper and lower
        const hasUpper = /[A-Z]/.test(pass);
        const hasLower = /[a-z]/.test(pass);
        const casingValid = hasUpper && hasLower;
        updateRuleUI(ruleCasing, casingValid);

        // Numeric
        const hasNumeric = /[0-9]/.test(pass);
        updateRuleUI(ruleNumeric, hasNumeric);

        // Length: between 8 and 16
        const lengthValid = pass.length >= 8 && pass.length <= 16;
        updateRuleUI(ruleLength, lengthValid);

        // Special char
        const hasSpecial = /[`~!@#$%^_+=\-[\]|;./?]/.test(pass);
        updateRuleUI(ruleSpecial, hasSpecial);

        return casingValid && hasNumeric && lengthValid && hasSpecial;
    }

    function updateRuleUI(element, isValid) {
        if (!element) return;
        const icon = element.querySelector('i');
        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
            if (icon) {
                icon.className = 'iconoir-check-circle-solid';
            }
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
            if (icon) {
                icon.className = 'iconoir-check-circle';
            }
        }
    }

    if (newPassword) {
        newPassword.addEventListener('input', function() {
            checkPasswordComplexity(this.value);
        });
        // Initial verification
        checkPasswordComplexity(newPassword.value);
    }

    // Toggle password visibility
    if (toggleNewPassword) {
        toggleNewPassword.addEventListener('click', function() {
            const type = newPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            newPassword.setAttribute('type', type);
            eyeIconNew.className = type === 'password' ? 'iconoir-eye text-primary' : 'iconoir-eye-closed text-primary';
        });
    }

    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            eyeIconConfirm.className = type === 'password' ? 'iconoir-eye text-primary' : 'iconoir-eye-closed text-primary';
        });
    }

    // --- Form Step 3 Submit Handler (PAC Validation & Finish) ---
    if (step3Form) {
        step3Form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate PAC code
            if (pacInput.value !== '12345678') {
                pacInput.classList.add('is-invalid');
                return;
            } else {
                pacInput.classList.remove('is-invalid');
            }

            // Reset execution logic
            alert("Success! Your password has been updated securely. Redirecting to Login...");
            window.location.href = 'index.html';
        });
    }

    // --- Back Buttons Mechanics ---
    if (btnBack1) {
        btnBack1.addEventListener('click', function() {
            showStep(1);
        });
    }

    if (btnBack2) {
        btnBack2.addEventListener('click', function() {
            showStep(2);
        });
    }
});
