/**
 * Booking Dashboard - Load and display booking details
 */

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initBookingDashboard();
});

/**
 * Initialize booking dashboard
 */
function initBookingDashboard() {
    loadBookings();
    initThemeToggle();
    
    // Check if a specific booking should be highlighted
    const params = new URLSearchParams(window.location.search);
    const viewIndex = params.get('view');
    
    if (viewIndex !== null) {
        setTimeout(() => {
            const bookingCard = document.querySelector(`[data-booking-index="${viewIndex}"]`);
            if (bookingCard) {
                bookingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                bookingCard.classList.add('highlight');
            }
        }, 300);
    }
}

/**
 * Load bookings from localStorage and display them
 */
function loadBookings() {
    const bookingsContainer = document.getElementById('bookings-container');
    const emptyState = document.getElementById('empty-state');
    
    if (!bookingsContainer) return;

    // Get bookings from localStorage
    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');

    if (bookings.length === 0) {
        bookingsContainer.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    // Clear container
    bookingsContainer.innerHTML = '';
    emptyState.style.display = 'none';

    // Display each booking
    bookings.forEach((booking, index) => {
        const bookingCard = createBookingCard(booking, index);
        bookingsContainer.appendChild(bookingCard);
    });
}

/**
 * Create a booking card element
 */
function createBookingCard(booking, index) {
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.setAttribute('data-booking-index', index);
    
    // Generate or retrieve booking code
    const bookingCode = booking.booking_code || generateBookingCode(index);
    
    // Update booking with code if not present
    if (!booking.booking_code) {
        booking.booking_code = bookingCode;
        updateBookingInLocalStorage(index, booking);
    }

    // Format date and time
    const bookingDate = new Date(booking.preferred_date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Convert time to 12-hour format
    const [hours, minutes] = booking.preferred_time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;

    // Calculate status based on booking date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookingDateOnly = new Date(booking.preferred_date);
    bookingDateOnly.setHours(0, 0, 0, 0);
    
    let status = 'Confirmed';
    let statusClass = 'status-confirmed';
    
    if (bookingDateOnly < today) {
        status = 'Completed';
        statusClass = 'status-completed';
    } else if (bookingDateOnly.getTime() === today.getTime()) {
        status = 'Today';
        statusClass = 'status-today';
    }

    card.innerHTML = `
        <div class="booking-card-header">
            <div class="booking-title">
                <h3>${booking.car_name}</h3>
                <span class="booking-status ${statusClass}">${status}</span>
            </div>
            <div class="booking-code">
                <span class="code-label">Booking ID</span>
                <span class="code-value">${bookingCode}</span>
            </div>
        </div>

        <div class="booking-card-body">
            <div class="booking-section">
                <h4>Booking Details</h4>
                <div class="booking-details">
                    <div class="detail-row">
                        <span class="detail-label">📅 Date:</span>
                        <span class="detail-value">${formattedDate}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">⏰ Time:</span>
                        <span class="detail-value">${formattedTime}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">💰 Price:</span>
                        <span class="detail-value">$${parseInt(booking.car_price).toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div class="booking-section">
                <h4>Customer Information</h4>
                <div class="booking-details">
                    <div class="detail-row">
                        <span class="detail-label">👤 Name:</span>
                        <span class="detail-value">${booking.customer_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📧 Email:</span>
                        <span class="detail-value">${booking.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">📞 Phone:</span>
                        <span class="detail-value">${booking.phone}</span>
                    </div>
                </div>
            </div>

            ${booking.message ? `
            <div class="booking-section">
                <h4>Special Requests</h4>
                <p class="booking-message">${booking.message}</p>
            </div>
            ` : ''}

            <div class="booking-section">
                <h4>Booking Timestamp</h4>
                <div class="booking-details">
                    <div class="detail-row">
                        <span class="detail-label">📝 Booked On:</span>
                        <span class="detail-value">${new Date(booking.booking_date).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="booking-card-footer">
            <button class="btn-action" onclick="copyBookingCode('${bookingCode}')">📋 Copy Booking ID</button>
            <button class="btn-action" onclick="printBooking(${index})">🖨️ Print Booking</button>
            <button class="btn-action cancel" onclick="cancelBooking(${index})">❌ Cancel Booking</button>
        </div>
    `;

    return card;
}

/**
 * Generate unique booking code
 */
function generateBookingCode(index) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BK-';
    
    // Add timestamp-based number
    const timestamp = Date.now().toString().slice(-6);
    code += timestamp;
    
    // Add random characters
    for (let i = 0; i < 3; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
}

/**
 * Update booking in localStorage
 */
function updateBookingInLocalStorage(index, booking) {
    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    bookings[index] = booking;
    localStorage.setItem('carBookings', JSON.stringify(bookings));
}

/**
 * Copy booking code to clipboard
 */
function copyBookingCode(code) {
    navigator.clipboard.writeText(code).then(() => {
        // Show feedback
        const originalText = event.target.textContent;
        event.target.textContent = '✓ Copied!';
        event.target.style.color = 'var(--primary-color)';
        
        setTimeout(() => {
            event.target.textContent = originalText;
            event.target.style.color = '';
        }, 2000);
    });
}

/**
 * Print booking details
 */
function printBooking(index) {
    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    const booking = bookings[index];
    
    if (!booking) return;

    const bookingCode = booking.booking_code || generateBookingCode(index);
    const printContent = `
        <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #ff6b6b; padding-bottom: 20px;">
                <h1 style="color: #ff6b6b; margin: 0;">LuxeAuto</h1>
                <p style="color: #666; margin: 5px 0;">Premium Car Dealership</p>
            </div>

            <h2 style="text-align: center; color: #333; margin-bottom: 30px;">BOOKING CONFIRMATION</h2>

            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <div>
                        <h3 style="margin: 0; color: #333;">${booking.car_name}</h3>
                        <p style="margin: 5px 0; color: #666;">Price: $${parseInt(booking.car_price).toLocaleString()}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; color: #666; font-size: 12px;">Booking ID</p>
                        <p style="margin: 5px 0; font-weight: bold; font-size: 18px; color: #ff6b6b;">${bookingCode}</p>
                    </div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">
                <div>
                    <h4 style="color: #333; margin-top: 0;">BOOKING DETAILS</h4>
                    <p><strong>Date:</strong> ${new Date(booking.preferred_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p><strong>Time:</strong> ${booking.preferred_time}</p>
                </div>
                <div>
                    <h4 style="color: #333; margin-top: 0;">CUSTOMER INFORMATION</h4>
                    <p><strong>Name:</strong> ${booking.customer_name}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                </div>
            </div>

            ${booking.message ? `
            <div style="margin-bottom: 30px;">
                <h4 style="color: #333;">SPECIAL REQUESTS</h4>
                <p style="color: #666;">${booking.message}</p>
            </div>
            ` : ''}

            <div style="background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-bottom: 30px; border-radius: 5px;">
                <p style="margin: 0; color: #856404;"><strong>Note:</strong> Please bring this confirmation along with a valid ID to your scheduled appointment.</p>
            </div>

            <div style="text-align: center; border-top: 1px solid #ddd; padding-top: 20px; color: #666;">
                <p style="margin: 0; font-size: 12px;">123 Luxury Lane, Auto City, AC 12345</p>
                <p style="margin: 5px 0; font-size: 12px;">(555) 123-4567 | info@luxeauto.com</p>
                <p style="margin: 5px 0; font-size: 12px;">www.luxeauto.com</p>
            </div>
        </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

/**
 * Cancel booking
 */
function cancelBooking(index) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
        bookings.splice(index, 1);
        localStorage.setItem('carBookings', JSON.stringify(bookings));
        loadBookings();
    }
}
