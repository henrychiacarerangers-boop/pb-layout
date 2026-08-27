/**
 * Registration — UI / display only (prototype). No validation or backend.
 */
document.addEventListener('DOMContentLoaded', function () {
    const step1Card = document.getElementById('step-1-card');
    const step2Card = document.getElementById('step-2-card');
    const step3Card = document.getElementById('step-3-card');
    const indStep1 = document.getElementById('indicator-step-1');
    const indStep2 = document.getElementById('indicator-step-2');
    const indStep3 = document.getElementById('indicator-step-3');
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');

    const btnNext1 = document.getElementById('btn-next-1');
    const step2Form = document.getElementById('step2Form');
    const btnBack1 = document.getElementById('btn-back-1');
    const refreshCaptchaBtn = document.getElementById('refresh-captcha');
    const captchaBox = document.getElementById('captcha-box');
    const captchaInput = document.getElementById('captchaInput');

    const step3Form = document.getElementById('step3Form');
    const btnBack2 = document.getElementById('btn-back-2');
    const passwordInputReg = document.getElementById('passwordInputReg');
    const confirmPasswordInputReg = document.getElementById('confirmPasswordInputReg');
    const togglePasswordReg = document.getElementById('togglePasswordReg');
    const toggleConfirmPasswordReg = document.getElementById('toggleConfirmPasswordReg');
    const eyeIconReg = document.getElementById('eyeIconReg');
    const eyeIconConfirmReg = document.getElementById('eyeIconConfirmReg');

    const pacInput = document.getElementById('pacInput');
    const btnRequestPac = document.getElementById('btn-request-pac');
    const regPacDemoHint = document.getElementById('regPacDemoHint');

    const btnComplete = document.getElementById('btn-complete');
    const regCompleteSpinner = document.getElementById('regCompleteSpinner');
    const regCompleteLabel = document.getElementById('regCompleteLabel');
    const captchaSamples = ['2YA8U2', '4P8DX', '9KW4V', 'K7Z2M', 'X4F9S'];
    let captchaIdx = 0;

    function showStep(step) {
        if (!step1Card || !step2Card || !step3Card) return;

        step1Card.classList.add('d-none');
        step2Card.classList.add('d-none');
        step3Card.classList.add('d-none');

        [indStep1, indStep2, indStep3].forEach(function (el) {
            if (el) el.classList.remove('active');
        });
        if (line1) line1.classList.remove('active');
        if (line2) line2.classList.remove('active');

        if (step >= 1 && indStep1) indStep1.classList.add('active');
        if (step >= 2 && indStep2) {
            indStep2.classList.add('active');
            if (line1) line1.classList.add('active');
            var icon1 = indStep1 && indStep1.querySelector('.step-circle i');
            if (icon1) icon1.className = 'iconoir-check';
        } else {
            var ic1 = indStep1 && indStep1.querySelector('.step-circle i');
            if (ic1) ic1.className = 'iconoir-page';
        }

        if (step >= 3 && indStep3) {
            indStep3.classList.add('active');
            if (line2) line2.classList.add('active');
            var icon2 = indStep2 && indStep2.querySelector('.step-circle i');
            if (icon2) icon2.className = 'iconoir-check';
        } else {
            var ic2 = indStep2 && indStep2.querySelector('.step-circle i');
            if (ic2) ic2.className = 'iconoir-user';
        }

        if (step === 1) step1Card.classList.remove('d-none');
        if (step === 2) step2Card.classList.remove('d-none');
        if (step === 3) step3Card.classList.remove('d-none');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function syncStep3Summary() {
        var regNoEl = document.getElementById('companyRegNo') || document.getElementById('NewcompanyRegNo');
        var displayCompany = document.getElementById('display-company');
        var roleUt = document.getElementById('regRoleUt');
        var roleEop = document.getElementById('regRoleEop');
        var displayRoleUt = document.getElementById('displayRoleUt');
        var displayRoleEop = document.getElementById('displayRoleEop');

        if (displayCompany && regNoEl) {
            var id = regNoEl.value.trim();
            const companyRegistry = {
                '1i2020-2-A': 'Ativa Studio Solution Sdn Bhd',
                '2b2021-3-C': 'Global Tech Consulting Sdn Bhd',
                '3c2022-4-D': 'Quantum Logistics Berhad'
            };
            var resolvedName = companyRegistry[id] || ('Company ID: ' + id);
            displayCompany.textContent = resolvedName;
        }
        if (displayRoleUt && roleUt && roleUt.selectedIndex >= 0) {
            displayRoleUt.textContent = roleUt.options[roleUt.selectedIndex].text;
        }
        if (displayRoleEop && roleEop && roleEop.selectedIndex >= 0) {
            displayRoleEop.textContent = roleEop.options[roleEop.selectedIndex].text;
        }
    }

    function refreshCaptchaDisplay() {
        if (!captchaBox) return;
        captchaIdx = (captchaIdx + 1) % captchaSamples.length;
        captchaBox.textContent = captchaSamples[captchaIdx];
        if (captchaInput) {
            captchaInput.value = captchaSamples[captchaIdx];
            captchaInput.classList.remove('is-invalid');
        }
    }

    // --- Password rule checklist: visual feedback ---
    var ruleCasing = document.getElementById('rule-casing');
    var ruleNumeric = document.getElementById('rule-numeric');
    var ruleLength = document.getElementById('rule-length');
    var ruleSpecial = document.getElementById('rule-special');

    function updateRuleUI(element, isValid) {
        if (!element) return;
        var icon = element.querySelector('i');
        if (isValid) {
            element.classList.add('valid');
            element.classList.remove('invalid');
            if (icon) icon.className = 'iconoir-check-circle-solid';
        } else {
            element.classList.remove('valid');
            element.classList.add('invalid');
            if (icon) icon.className = 'iconoir-check-circle';
        }
    }

    function checkPasswordComplexity(pass) {
        var hasUpper = /[A-Z]/.test(pass);
        var hasLower = /[a-z]/.test(pass);
        var casingValid = hasUpper && hasLower;
        var numericValid = /[0-9]/.test(pass);
        var lengthValid = pass.length >= 8 && pass.length <= 16;
        var specialValid = /[`~!@#$%^&*_=+\-[\]|;./?]/.test(pass);
        return casingValid && numericValid && lengthValid && specialValid;
    }

    function paintPasswordRules(pass) {
        var hasUpper = /[A-Z]/.test(pass);
        var hasLower = /[a-z]/.test(pass);
        updateRuleUI(ruleCasing, hasUpper && hasLower);
        updateRuleUI(ruleNumeric, /[0-9]/.test(pass));
        updateRuleUI(ruleLength, pass.length >= 8 && pass.length <= 16);
        updateRuleUI(ruleSpecial, /[`~!@#$%^&*_=+\-[\]|;./?]/.test(pass));
    }

    if (refreshCaptchaBtn) {
        refreshCaptchaBtn.addEventListener('click', function (e) {
            e.preventDefault();
            refreshCaptchaDisplay();
        });
    }

    if (btnNext1) {
        btnNext1.addEventListener('click', function () {
            showStep(2);
        });
    }

    if (step2Form) {
        step2Form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            // Validate Captcha
            if (captchaInput && captchaInput.value.toUpperCase() !== captchaBox.textContent.trim()) {
                if (captchaInput) captchaInput.classList.add('is-invalid');
                alert("Incorrect captcha code.");
                return;
            } else {
                if (captchaInput) captchaInput.classList.remove('is-invalid');
            }

            // Validate User ID
            const usernameInput = document.getElementById('username');
            if (usernameInput && usernameInput.value.trim() === '') {
                usernameInput.classList.add('is-invalid');
                alert("Please enter a User ID.");
                return;
            } else if (usernameInput) {
                usernameInput.classList.remove('is-invalid');
            }

            // Validate Passwords
            if (passwordInputReg && confirmPasswordInputReg) {
                if (passwordInputReg.value !== confirmPasswordInputReg.value) {
                    confirmPasswordInputReg.classList.add('is-invalid');
                    alert("Passwords do not match. Please ensure both fields are identical.");
                    return;
                } else {
                    confirmPasswordInputReg.classList.remove('is-invalid');
                }

                if (!checkPasswordComplexity(passwordInputReg.value)) {
                    alert("Password does not meet the complexity requirements.");
                    return;
                }
            }

            syncStep3Summary();
            showStep(3);
        });
    }

    if (togglePasswordReg && passwordInputReg) {
        togglePasswordReg.addEventListener('click', function () {
            var type = passwordInputReg.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInputReg.setAttribute('type', type);
            if (eyeIconReg) {
                eyeIconReg.className = type === 'password' ? 'iconoir-eye text-primary' : 'iconoir-eye-closed text-primary';
            }
        });
    }

    if (toggleConfirmPasswordReg && confirmPasswordInputReg) {
        toggleConfirmPasswordReg.addEventListener('click', function () {
            var type = confirmPasswordInputReg.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInputReg.setAttribute('type', type);
            if (eyeIconConfirmReg) {
                eyeIconConfirmReg.className = type === 'password' ? 'iconoir-eye text-primary' : 'iconoir-eye-closed text-primary';
            }
        });
    }

    if (passwordInputReg) {
        passwordInputReg.addEventListener('input', function () {
            paintPasswordRules(this.value);
        });
        paintPasswordRules(passwordInputReg.value);
    }

    if (btnRequestPac) {
        btnRequestPac.addEventListener('click', function () {
            if (pacInput) pacInput.value = '12345678';
            if (regPacDemoHint) regPacDemoHint.classList.remove('d-none');
            btnRequestPac.disabled = true;
            var label = btnRequestPac.textContent;
            btnRequestPac.textContent = 'Sent (demo)';
            window.setTimeout(function () {
                btnRequestPac.disabled = false;
                btnRequestPac.textContent = label;
            }, 1200);
        });
    }

    if (step3Form) {
        step3Form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate PAC
            if (pacInput && pacInput.value.trim() !== '12345678') {
                pacInput.classList.add('is-invalid');
                alert("Incorrect PAC code.");
                return;
            } else if (pacInput) {
                pacInput.classList.remove('is-invalid');
            }

            if (btnComplete) btnComplete.disabled = true;
            if (regCompleteSpinner) regCompleteSpinner.classList.remove('d-none');
            if (regCompleteLabel) regCompleteLabel.textContent = 'Processing…';

            window.setTimeout(function () {
                if (regCompleteLabel) regCompleteLabel.textContent = 'Redirecting…';
                window.location.href = 'index.html';
            }, 1400);
        });
    }

    if (btnBack1) btnBack1.addEventListener('click', function () { showStep(1); });
    if (btnBack2) btnBack2.addEventListener('click', function () { showStep(2); });
});
