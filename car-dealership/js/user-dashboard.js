// =============================================
// USER DASHBOARD FUNCTIONALITY
// =============================================

/**
 * Load user dashboard data
 */
function loadUserDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If not logged in, redirect to login
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Display user name
    const welcomeName = document.getElementById('user-welcome-name');
    const userName = document.getElementById('user-name-display');
    if (welcomeName) welcomeName.textContent = currentUser.name.split(' ')[0];
    if (userName) userName.textContent = currentUser.name.split(' ')[0];

    // Display profile information
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-phone').textContent = currentUser.phone || 'Not provided';
    document.getElementById('profile-joined').textContent = new Date(currentUser.joinedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Load statistics
    loadDashboardStats();
    loadRecentBookings();
}

/**
 * Load dashboard statistics
 */
function loadDashboardStats() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allBookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    
    // Filter bookings for current user
    const userBookings = allBookings.filter(b => 
        b.email.toLowerCase() === currentUser.email.toLowerCase()
    );

    // Update stats
    document.getElementById('total-bookings').textContent = userBookings.length;
    
    // Count upcoming bookings (future dates)
    const today = new Date();
    const upcomingBookings = userBookings.filter(b => {
        const bookingDate = new Date(b.date);
        return bookingDate >= today;
    });
    document.getElementById('upcoming-bookings').textContent = upcomingBookings.length;

    // Check newsletter subscription
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    const isSubscribed = subscribers.includes(currentUser.email.toLowerCase());
    document.getElementById('newsletter-status').textContent = isSubscribed ? 'Yes' : 'No';

    // Placeholder for favorites
    document.getElementById('favorite-cars').textContent = '0';
}

/**
 * Load recent bookings
 */
function loadRecentBookings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const allBookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    const container = document.getElementById('recent-bookings-container');

    // Filter bookings for current user
    const userBookings = allBookings.filter(b => 
        b.email.toLowerCase() === currentUser.email.toLowerCase()
    );

    if (userBookings.length === 0) {
        container.innerHTML = '<p class="no-data">No bookings found. <a href="inventory.html">Browse cars</a> to make your first booking!</p>';
        return;
    }

    // Sort by date (most recent first) and take first 3
    const recentBookings = userBookings
        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
        .slice(0, 3);

    container.innerHTML = recentBookings.map(booking => `
        <div class="recent-booking-item">
            <div class="booking-info">
                <h4>${booking.carName}</h4>
                <p><strong>Booking Code:</strong> ${booking.bookingCode}</p>
                <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
                <p><strong>Status:</strong> <span class="status-badge">${getBookingStatus(booking.date)}</span></p>
            </div>
            <a href="booking-dashboard.html" class="btn btn-secondary btn-sm">View Details</a>
        </div>
    `).join('');
}

/**
 * Get booking status based on date
 */
function getBookingStatus(bookingDate) {
    const today = new Date();
    const date = new Date(bookingDate);
    
    if (date < today) {
        return 'Completed';
    } else if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else {
        return 'Upcoming';
    }
}

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', loadUserDashboard);
