// =============================================
// COMPARE CARS FUNCTIONALITY
// =============================================

let comparedCars = [null, null, null];

/**
 * Initialize compare page
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('compare.html')) {
        populateCarSelectors();
        loadComparisonFromURL();
    }
});

/**
 * Populate car selectors with inventory
 */
function populateCarSelectors() {
    const selectors = [
        document.getElementById('compare-car-1'),
        document.getElementById('compare-car-2'),
        document.getElementById('compare-car-3')
    ];

    selectors.forEach(selector => {
        if (!selector) return;
        
        // Clear existing options except the first one
        selector.innerHTML = selector.options[0].outerHTML;
        
        // Add cars from inventory
        carInventory.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = `${car.name} - $${car.price.toLocaleString()}`;
            selector.appendChild(option);
        });
    });
}

/**
 * Load comparison from URL parameters
 */
function loadComparisonFromURL() {
    const params = new URLSearchParams(window.location.search);
    const car1 = params.get('car1');
    const car2 = params.get('car2');
    const car3 = params.get('car3');

    if (car1) {
        document.getElementById('compare-car-1').value = car1;
        addCarToCompare(1);
    }
    if (car2) {
        document.getElementById('compare-car-2').value = car2;
        addCarToCompare(2);
    }
    if (car3) {
        document.getElementById('compare-car-3').value = car3;
        addCarToCompare(3);
    }
}

/**
 * Add car to comparison
 */
function addCarToCompare(position) {
    const selector = document.getElementById(`compare-car-${position}`);
    const carId = parseInt(selector.value);
    
    if (!carId) {
        comparedCars[position - 1] = null;
        updateComparison();
        return;
    }

    const car = carInventory.find(c => c.id === carId);
    if (car) {
        comparedCars[position - 1] = car;
        updateComparison();
    }
}

/**
 * Update comparison display
 */
function updateComparison() {
    const container = document.getElementById('comparison-container');
    const validCars = comparedCars.filter(c => c !== null);

    if (validCars.length < 2) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    // Show/hide third column based on whether third car is selected
    const thirdCarElements = document.querySelectorAll('#car-3-header, [id*="car-3-"]');
    thirdCarElements.forEach(el => {
        el.style.display = comparedCars[2] ? 'table-cell' : 'none';
    });

    // Update each car's data
    comparedCars.forEach((car, index) => {
        const pos = index + 1;
        if (car) {
            updateCarColumn(pos, car);
        } else {
            clearCarColumn(pos);
        }
    });
}

/**
 * Update a car column with data
 */
function updateCarColumn(position, car) {
    // Header
    document.getElementById(`car-${position}-header`).innerHTML = `
        <strong>${car.name}</strong>
    `;

    // Image
    const imageUrl = getCarImageUrl(car.id);
    document.getElementById(`car-${position}-image`).innerHTML = `
        <img src="${imageUrl}" alt="${car.name}" style="width: 100%; max-width: 200px; border-radius: 8px;">
    `;

    // Basic info
    document.getElementById(`car-${position}-name`).textContent = car.name;
    document.getElementById(`car-${position}-price`).innerHTML = `<strong style="color: var(--primary-color); font-size: 1.2rem;">$${car.price.toLocaleString()}</strong>`;
    document.getElementById(`car-${position}-brand`).textContent = car.brand;
    document.getElementById(`car-${position}-fuel`).textContent = car.fuelType;
    document.getElementById(`car-${position}-transmission`).textContent = car.transmission;
    document.getElementById(`car-${position}-drive`).textContent = car.driveType || 'N/A';
    document.getElementById(`car-${position}-color`).textContent = car.color || 'N/A';
    document.getElementById(`car-${position}-condition`).textContent = car.condition || 'N/A';
    document.getElementById(`car-${position}-year`).textContent = car.year;

    // Specs
    document.getElementById(`car-${position}-hp`).textContent = car.specs.horsepower + ' HP';
    document.getElementById(`car-${position}-accel`).textContent = car.specs.acceleration;
    document.getElementById(`car-${position}-speed`).textContent = car.specs.maxSpeed + ' mph';
    
    // Stock
    const stockCell = document.getElementById(`car-${position}-stock`);
    stockCell.innerHTML = car.stock > 0 
        ? `<span style="color: var(--success-color);">✅ ${car.stock} in stock</span>`
        : `<span style="color: var(--error-color);">❌ Out of stock</span>`;

    // Actions
    document.getElementById(`car-${position}-actions`).innerHTML = `
        <a href="car.html?id=${car.id}" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem; display: inline-block; margin: 5px;">View Details</a>
        ${car.stock > 0 ? `<button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.9rem;" onclick="goToBooking(${car.id})">Book Now</button>` : ''}
    `;
}

/**
 * Clear a car column
 */
function clearCarColumn(position) {
    const fields = ['header', 'image', 'name', 'price', 'brand', 'fuel', 'transmission', 'drive', 'color', 'condition', 'year', 'hp', 'accel', 'speed', 'stock', 'actions'];
    fields.forEach(field => {
        const element = document.getElementById(`car-${position}-${field}`);
        if (element) {
            element.textContent = '-';
            element.innerHTML = '-';
        }
    });
}

/**
 * Get car image URL
 */
function getCarImageUrl(carId) {
    const imageMap = {
        1: 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=600&h=500&fit=crop',
        2: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=600&h=500&fit=crop',
        3: 'https://images.unsplash.com/photo-1578674360105-937379187a51?w=600&h=500&fit=crop',
        4: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=600&h=500&fit=crop',
        5: 'https://images.unsplash.com/photo-1606611013016-969c19d4a42f?w=600&h=500&fit=crop',
        6: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=500&fit=crop',
        7: 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=600&h=500&fit=crop',
        8: 'https://images.unsplash.com/photo-1552519507-da3effff991c?w=600&h=500&fit=crop',
        9: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=500&fit=crop',
        10: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=500&fit=crop',
        11: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=500&fit=crop',
        12: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=600&h=500&fit=crop',
        13: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=500&fit=crop',
        14: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=500&fit=crop'
    };
    return imageMap[carId] || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=600&h=500&fit=crop';
}

/**
 * Go to booking page for a car
 */
function goToBooking(carId) {
    window.location.href = `inventory.html#car-${carId}`;
}

/**
 * Clear all comparisons
 */
function clearComparison() {
    comparedCars = [null, null, null];
    document.getElementById('compare-car-1').value = '';
    document.getElementById('compare-car-2').value = '';
    document.getElementById('compare-car-3').value = '';
    updateComparison();
}

/**
 * Navigate to compare page with selected cars
 */
function compareSelectedCars(car1Id, car2Id, car3Id = null) {
    let url = `compare.html?car1=${car1Id}&car2=${car2Id}`;
    if (car3Id) {
        url += `&car3=${car3Id}`;
    }
    window.location.href = url;
}
