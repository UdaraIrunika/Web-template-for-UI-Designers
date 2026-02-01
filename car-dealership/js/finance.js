// =============================================
// FINANCE CALCULATOR
// =============================================

/**
 * Initialize finance calculator
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('finance.html')) {
        initFinanceCalculator();
        populateQuickSelectCars();
        
        // Check for car ID in URL
        const params = new URLSearchParams(window.location.search);
        const carId = params.get('carId');
        if (carId) {
            loadCarForCalculation(parseInt(carId));
        } else {
            calculateLoan();
        }
    }
});

/**
 * Initialize calculator event listeners
 */
function initFinanceCalculator() {
    const inputs = ['vehicle-price', 'down-payment', 'interest-rate', 'loan-term', 'trade-in'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', calculateLoan);
        }
    });
}

/**
 * Calculate loan payment
 */
function calculateLoan() {
    // Get input values
    const vehiclePrice = parseFloat(document.getElementById('vehicle-price')?.value || 0);
    const downPayment = parseFloat(document.getElementById('down-payment')?.value || 0);
    const tradeIn = parseFloat(document.getElementById('trade-in')?.value || 0);
    const interestRate = parseFloat(document.getElementById('interest-rate')?.value || 0);
    const loanTerm = parseInt(document.getElementById('loan-term')?.value || 60);

    // Calculate loan amount
    const loanAmount = Math.max(0, vehiclePrice - downPayment - tradeIn);
    
    // Calculate monthly interest rate
    const monthlyRate = (interestRate / 100) / 12;
    
    // Calculate monthly payment using amortization formula
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                        (Math.pow(1 + monthlyRate, loanTerm) - 1);
    } else {
        monthlyPayment = loanAmount / loanTerm;
    }

    // Calculate total amounts
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - loanAmount;

    // Update display
    document.getElementById('monthly-payment').textContent = '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-vehicle-price').textContent = '$' + vehiclePrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-down-payment').textContent = '$' + downPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-trade-in').textContent = '$' + tradeIn.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-loan-amount').textContent = '$' + loanAmount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-interest').textContent = interestRate.toFixed(2) + '%';
    document.getElementById('display-term').textContent = loanTerm + ' months (' + (loanTerm / 12).toFixed(1) + ' years)';
    document.getElementById('display-total-interest').textContent = '$' + totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('display-total-amount').textContent = '$' + (totalPayment + downPayment + tradeIn).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Update down payment percentage
    const downPaymentPercent = vehiclePrice > 0 ? (downPayment / vehiclePrice * 100).toFixed(1) : 0;
    document.getElementById('down-payment-percent').textContent = downPaymentPercent + '%';
}

/**
 * Load car for calculation
 */
function loadCarForCalculation(carId) {
    const car = carInventory.find(c => c.id === carId);
    if (car) {
        document.getElementById('vehicle-price').value = car.price;
        const suggestedDown = Math.round(car.price * 0.2); // 20% down payment
        document.getElementById('down-payment').value = suggestedDown;
        calculateLoan();
    }
}

/**
 * Populate quick select cars
 */
function populateQuickSelectCars() {
    const grid = document.getElementById('quick-car-grid');
    if (!grid) return;

    grid.innerHTML = carInventory.slice(0, 6).map(car => `
        <div class="quick-car-card" onclick="loadCarForCalculation(${car.id})">
            <img src="${getCarImageUrl(car.id)}" alt="${car.name}">
            <h4>${car.name}</h4>
            <p class="quick-car-price">$${car.price.toLocaleString()}</p>
            <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;">Calculate</button>
        </div>
    `).join('');
}

/**
 * Get car image URL
 */
function getCarImageUrl(carId) {
    const imageMap = {
        1: 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop',
        2: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=400&h=300&fit=crop',
        3: 'https://images.unsplash.com/photo-1578674360105-937379187a51?w=400&h=300&fit=crop',
        4: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=400&h=300&fit=crop',
        5: 'https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=400&h=300&fit=crop',
        6: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop',
        7: 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop',
        8: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=400&h=300&fit=crop',
        9: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=400&h=300&fit=crop',
        10: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop',
        11: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop',
        12: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=400&h=300&fit=crop',
        13: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
        14: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&h=300&fit=crop'
    };
    return imageMap[carId] || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop';
}
