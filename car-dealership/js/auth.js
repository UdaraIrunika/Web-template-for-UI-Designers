// =============================================
// AUTHENTICATION SYSTEM
// =============================================

/**
 * Check if user is logged in on page load
 */
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');

    if (currentUser) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'block';
            const userName = document.getElementById('user-name');
            if (userName) {
                userName.textContent = currentUser.name.split(' ')[0];
            }
        }
    } else {
        // User is not logged in
        if (loginBtn) loginBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
    }
}

/**
 * Login user
 */
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    // Get registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check demo account
    if (email === 'demo@luxeauto.com' && password === 'demo123') {
        const demoUser = {
            name: 'Demo User',
            email: 'demo@luxeauto.com',
            phone: '+1 (555) 123-4567',
            joinedDate: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
        window.location.href = 'user-dashboard.html';
        return;
    }

    // Check registered users
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
        // Remove password before storing in currentUser
        const currentUser = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            joinedDate: user.joinedDate
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'user-dashboard.html';
    } else {
        errorDiv.textContent = '⚠️ Invalid email or password';
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    }
}

/**
 * Register new user
 */
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const phone = document.getElementById('register-phone').value.trim();
    const termsAgree = document.getElementById('terms-agree').checked;
    const messageDiv = document.getElementById('register-message');

    // Validate password match
    if (password !== confirmPassword) {
        messageDiv.textContent = '⚠️ Passwords do not match';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Validate terms agreement
    if (!termsAgree) {
        messageDiv.textContent = '⚠️ Please agree to Terms & Conditions';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Get existing users
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        messageDiv.textContent = '⚠️ Email already registered';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Create new user
    const newUser = {
        name,
        email,
        password,
        phone,
        joinedDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(users));

    // Show success message
    messageDiv.textContent = '✅ Account created successfully! Redirecting...';
    messageDiv.className = 'login-message success';
    messageDiv.style.display = 'block';

    // Auto login and redirect
    setTimeout(() => {
        const currentUser = {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            joinedDate: newUser.joinedDate
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = 'user-dashboard.html';
    }, 1500);
}

/**
 * Logout user
 */
function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
}

/**
 * Show register form
 */
function showRegisterForm() {
    document.querySelector('#login-form').closest('.login-card').style.display = 'none';
    document.getElementById('register-card').style.display = 'block';
}

/**
 * Show login form
 */
function showLoginForm() {
    document.getElementById('register-card').style.display = 'none';
    document.getElementById('forgot-password-card').style.display = 'none';
    document.getElementById('reset-password-card').style.display = 'none';
    document.querySelector('#login-form').closest('.login-card').style.display = 'block';
}

/**
 * Show forgot password form
 */
function showForgotPasswordForm() {
    document.querySelector('#login-form').closest('.login-card').style.display = 'none';
    document.getElementById('register-card').style.display = 'none';
    document.getElementById('reset-password-card').style.display = 'none';
    document.getElementById('forgot-password-card').style.display = 'block';
}

/**
 * Handle forgot password request
 */
function forgotPassword(event) {
    event.preventDefault();

    const email = document.getElementById('forgot-email').value.trim();
    const messageDiv = document.getElementById('forgot-message');

    // Get registered users
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email exists
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user && email !== 'demo@luxeauto.com') {
        messageDiv.textContent = '⚠️ Email not found in our records';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Store reset token (in real app, this would be sent via email)
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetData = {
        email: email,
        token: resetToken,
        expiry: new Date(Date.now() + 3600000).toISOString() // 1 hour expiry
    };
    localStorage.setItem('passwordResetToken', JSON.stringify(resetData));

    // Show success and redirect to reset form
    messageDiv.textContent = '✅ Reset link sent! Redirecting...';
    messageDiv.className = 'login-message success';
    messageDiv.style.display = 'block';

    setTimeout(() => {
        // In real app, user would click email link. Here we auto-redirect
        document.getElementById('forgot-password-card').style.display = 'none';
        document.getElementById('reset-password-card').style.display = 'block';
        document.getElementById('reset-email-display').value = email;
    }, 1500);
}

/**
 * Reset password with new password
 */
function resetPassword(event) {
    event.preventDefault();

    const newPassword = document.getElementById('reset-new-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password').value;
    const messageDiv = document.getElementById('reset-message');

    // Validate password match
    if (newPassword !== confirmPassword) {
        messageDiv.textContent = '⚠️ Passwords do not match';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Validate password length
    if (newPassword.length < 6) {
        messageDiv.textContent = '⚠️ Password must be at least 6 characters';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
        return;
    }

    // Get reset token
    const resetData = JSON.parse(localStorage.getItem('passwordResetToken') || '{}');
    
    if (!resetData.email) {
        messageDiv.textContent = '⚠️ Invalid reset session';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        return;
    }

    // Check if token expired
    if (new Date() > new Date(resetData.expiry)) {
        messageDiv.textContent = '⚠️ Reset link expired. Please request a new one.';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        setTimeout(() => {
            showForgotPasswordForm();
        }, 2000);
        return;
    }

    // Update password
    if (resetData.email === 'demo@luxeauto.com') {
        messageDiv.textContent = '⚠️ Cannot reset demo account password';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
        return;
    }

    // Get users and update password
    let users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = users.findIndex(u => u.email.toLowerCase() === resetData.email.toLowerCase());

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('registeredUsers', JSON.stringify(users));
        
        // Clear reset token
        localStorage.removeItem('passwordResetToken');

        // Show success
        messageDiv.textContent = '✅ Password reset successful! Redirecting to login...';
        messageDiv.className = 'login-message success';
        messageDiv.style.display = 'block';

        setTimeout(() => {
            showLoginForm();
            // Pre-fill email
            document.getElementById('login-email').value = resetData.email;
        }, 2000);
    } else {
        messageDiv.textContent = '⚠️ User not found';
        messageDiv.className = 'login-message error';
        messageDiv.style.display = 'block';
    }
}

/**
 * Edit profile (placeholder)
 */
function editProfile() {
    alert('Profile editing feature coming soon!');
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', checkLoginStatus);
