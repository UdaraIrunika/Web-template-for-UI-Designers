// =============================================
// LUXEAUTO - MAIN JAVASCRIPT
// Modern Luxury Car Dealership
// =============================================

// =============================================
// CAROUSEL - Hero Car Slideshow
// =============================================

let currentSlide = 0;
const slides = document.querySelectorAll('.car-slide');
const indicators = document.querySelectorAll('.indicator');

/**
 * Initialize carousel with auto-play
 */
function initCarousel() {
    if (slides.length === 0) return;
    
    // Auto-play carousel every 5 seconds
    setInterval(() => {
        nextCar();
    }, 5000);
}

/**
 * Show next car in carousel
 */
function nextCar() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

/**
 * Show previous car in carousel
 */
function prevCar() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

/**
 * Go to specific slide by index
 */
function goToSlide(index) {
    currentSlide = index;
    showSlide(index);
}

/**
 * Display specific slide
 */
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    if (slides[index]) slides[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
}

// =============================================
// THEME TOGGLE - Dark/Light Mode
// =============================================

/**
 * Update main car image when thumbnail is clicked
 */
function updateMainImage(imageUrl) {
    const mainImage = document.getElementById('main-car-image');
    if (mainImage) {
        mainImage.src = imageUrl;
    }
}

// =============================================
// THEME TOGGLE - Dark/Light Mode
// =============================================

/**
 * Initialize theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on page load
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    } else {
        document.body.classList.remove('light-mode');
        if (themeToggle) themeToggle.textContent = '☀️';
    }
    
    // Add click listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

/**
 * Toggle between dark and light theme
 */
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
}

// =============================================
// DATA - Sample Car Inventory
// =============================================

const carInventory = [
    {
        id: 1,
        name: 'Tesla Model S',
        price: 89990,
        brand: 'Tesla',
        fuelType: 'Electric',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Black',
        specs: {
            horsepower: 450,
            acceleration: '3.2s (0-60)',
            maxSpeed: 163,
            batteryRange: 405,
            batteryCapacity: '100 kWh'
        },
        description: 'The Tesla Model S is the ultimate electric sedan offering cutting-edge technology, outstanding performance, and unparalleled efficiency. Experience the future of driving with Autopilot capabilities and over-the-air updates.'
    },
    {
        id: 2,
        name: 'BMW M440i',
        price: 65500,
        brand: 'BMW',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Silver',
        specs: {
            horsepower: 382,
            acceleration: '4.5s (0-60)',
            maxSpeed: 155,
            engineSize: '3.0L Twin-Turbo',
            fuelEconomy: '23 MPG'
        },
        description: 'The BMW M440i combines luxury with performance. Featuring a powerful twin-turbo engine, premium interior, and advanced technology, this sedan is perfect for drivers who demand both style and substance.'
    },
    {
        id: 3,
        name: 'Porsche 911 GT3',
        price: 120000,
        brand: 'Porsche',
        fuelType: 'Gasoline',
        transmission: 'Manual',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'RWD',
        condition: 'New',
        color: 'Yellow',
        specs: {
            horsepower: 502,
            acceleration: '3.2s (0-60)',
            maxSpeed: 198,
            engineSize: '4.0L Flat-Six',
            fuelEconomy: '19 MPG'
        },
        description: 'The iconic Porsche 911 GT3 is engineered for pure driving pleasure. With exceptional handling, a high-revving naturally aspirated engine, and track-ready performance, it\'s a driver\'s ultimate dream car.'
    },
    {
        id: 4,
        name: 'Mercedes AMG C63',
        price: 75000,
        brand: 'Mercedes-Benz',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'RWD',
        condition: 'New',
        color: 'White',
        specs: {
            horsepower: 503,
            acceleration: '3.8s (0-60)',
            maxSpeed: 180,
            engineSize: '4.0L Biturbo V8',
            fuelEconomy: '21 MPG'
        },
        description: 'Experience German engineering at its finest with the Mercedes-AMG C63. Featuring a potent V8 engine, dynamic handling, and luxurious appointments, it\'s the pinnacle of performance sedans.'
    },
    {
        id: 5,
        name: 'Audi RS6 Avant',
        price: 110000,
        brand: 'Audi',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Blue',
        specs: {
            horsepower: 592,
            acceleration: '3.6s (0-60)',
            maxSpeed: 190,
            engineSize: '4.0L Twin-Turbo V8',
            fuelEconomy: '18 MPG'
        },
        description: 'The Audi RS6 Avant combines practicality with performance. Its powerful engine, spacious wagon design, and quattro all-wheel drive make it the ultimate luxury performance vehicle for families who refuse to compromise.'
    },
    {
        id: 6,
        name: 'Lamborghini Huracán',
        price: 250000,
        brand: 'Lamborghini',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Orange',
        specs: {
            horsepower: 631,
            acceleration: '2.9s (0-60)',
            maxSpeed: 217,
            engineSize: '5.2L V10',
            fuelEconomy: '11 MPG'
        },
        description: 'The Lamborghini Huracán is pure automotive passion. With its exotic design, screaming V10 engine, and incredible performance, it\'s a supercar that turns heads and dominates the road.'
    },
    {
        id: 7,
        name: 'Tesla Model 3',
        price: 45000,
        brand: 'Tesla',
        fuelType: 'Electric',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'RWD',
        condition: 'New',
        color: 'Red',
        specs: {
            horsepower: 358,
            acceleration: '4.2s (0-60)',
            maxSpeed: 162,
            batteryRange: 358,
            batteryCapacity: '75 kWh'
        },
        description: 'The Tesla Model 3 is the entry point to premium electric driving. Offering impressive range, quick charging, and access to Tesla\'s Supercharger network, it\'s perfect for daily commuting with style.'
    },
    {
        id: 8,
        name: 'BMW i7',
        price: 95000,
        brand: 'BMW',
        fuelType: 'Electric',
        transmission: 'Automatic',
        ac: true,
        stock: 5,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Gray',
        specs: {
            horsepower: 516,
            acceleration: '4.6s (0-60)',
            maxSpeed: 150,
            batteryRange: 380,
            batteryCapacity: '111.5 kWh'
        },
        description: 'The BMW i7 represents the pinnacle of electric luxury. With stunning design, cutting-edge technology, and exceptional comfort, it redefines what a luxury electric sedan can be.'
    },
    {
        id: 9,
        name: 'Lexus RX 500h',
        price: 68000,
        brand: 'Lexus',
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        ac: true,
        stock: 4,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'White',
        image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&h=500&fit=crop',
        specs: {
            horsepower: 366,
            acceleration: '5.9s (0-60)',
            maxSpeed: 124,
            engineSize: '2.4L Turbo Hybrid',
            fuelEconomy: '27 MPG'
        },
        description: 'The Lexus RX 500h blends luxury SUV comfort with advanced hybrid performance. Expect refined ride quality, premium materials, and efficient power for daily driving.'
    },
    {
        id: 10,
        name: 'Range Rover Sport',
        price: 92500,
        brand: 'Land Rover',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 3,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=500&fit=crop',
        specs: {
            horsepower: 395,
            acceleration: '5.7s (0-60)',
            maxSpeed: 140,
            engineSize: '3.0L Turbo I6',
            fuelEconomy: '20 MPG'
        },
        description: 'The Range Rover Sport delivers commanding presence, off-road capability, and premium luxury. A performance SUV built for both city and adventure.'
    },
    {
        id: 11,
        name: 'Audi e-tron GT',
        price: 104000,
        brand: 'Audi',
        fuelType: 'Electric',
        transmission: 'Automatic',
        ac: true,
        stock: 4,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Blue',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&h=500&fit=crop',
        specs: {
            horsepower: 522,
            acceleration: '3.9s (0-60)',
            maxSpeed: 152,
            batteryRange: 238,
            batteryCapacity: '93.4 kWh'
        },
        description: 'The Audi e-tron GT offers a thrilling electric drive with quattro stability, luxurious cabin finishes, and the unmistakable stance of a grand tourer.'
    },
    {
        id: 12,
        name: 'Mercedes EQS 580',
        price: 125000,
        brand: 'Mercedes-Benz',
        fuelType: 'Electric',
        transmission: 'Automatic',
        ac: true,
        stock: 2,
        year: 2024,
        mileage: 0,
        driveType: 'AWD',
        condition: 'New',
        color: 'Silver',
        image: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=600&h=500&fit=crop',
        specs: {
            horsepower: 516,
            acceleration: '4.1s (0-60)',
            maxSpeed: 130,
            batteryRange: 340,
            batteryCapacity: '107.8 kWh'
        },
        description: 'Mercedes EQS 580 is the flagship electric sedan with ultra-smooth power delivery, an opulent cabin, and cutting-edge driver assistance systems.'
    },
    {
        id: 13,
        name: 'Ford Mustang GT',
        price: 42000,
        brand: 'Ford',
        fuelType: 'Gasoline',
        transmission: 'Manual',
        ac: true,
        stock: 6,
        year: 2022,
        mileage: 18000,
        driveType: 'RWD',
        condition: 'Used',
        color: 'Red',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=500&fit=crop',
        specs: {
            horsepower: 450,
            acceleration: '4.2s (0-60)',
            maxSpeed: 155,
            engineSize: '5.0L V8',
            fuelEconomy: '19 MPG'
        },
        description: 'The Ford Mustang GT pairs classic muscle car character with modern tech. A visceral V8 soundtrack and engaging manual transmission make every drive unforgettable.'
    },
    {
        id: 14,
        name: 'Toyota Supra 3.0',
        price: 52000,
        brand: 'Toyota',
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        ac: true,
        stock: 4,
        year: 2023,
        mileage: 9000,
        driveType: 'RWD',
        condition: 'Certified',
        color: 'Yellow',
        image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&h=500&fit=crop',
        specs: {
            horsepower: 382,
            acceleration: '3.9s (0-60)',
            maxSpeed: 155,
            engineSize: '3.0L Turbo I6',
            fuelEconomy: '25 MPG'
        },
        description: 'The Toyota Supra 3.0 delivers sharp handling, turbocharged performance, and iconic styling. This certified model offers exceptional value for enthusiasts.'
    }
];

// =============================================
// NAVIGATION & SCROLL EFFECTS
// =============================================

/**
 * Load stock from localStorage or initialize with defaults
 */
function initializeInventoryStock() {
    const savedStock = JSON.parse(localStorage.getItem('carStock') || '{}');
    
    carInventory.forEach(car => {
        if (savedStock[car.id]) {
            car.stock = savedStock[car.id];
        }
    });
}

/**
 * Save stock to localStorage
 */
function saveInventoryStock() {
    const stockData = {};
    carInventory.forEach(car => {
        stockData[car.id] = car.stock;
    });
    localStorage.setItem('carStock', JSON.stringify(stockData));
}

document.addEventListener('DOMContentLoaded', function() {
    initializeInventoryStock();
    initThemeToggle();
    initCarousel();
    initNavbar();
    initScrollAnimations();
    initMobileMenu();
    setActiveNavLink();
});

/**
 * Initialize navbar scroll effects
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards and other elements
    const elementsToObserve = document.querySelectorAll('.feature-card, .car-card, .info-box');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// =============================================
// INVENTORY PAGE - FILTERING & SEARCH
// =============================================

/**
 * Initialize inventory page filters
 */
function initInventoryFilters() {
    const searchInput = document.getElementById('search-input');
    const brandFilter = document.getElementById('brand-filter');
    const fuelFilter = document.getElementById('fuel-filter');
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const resetBtn = document.getElementById('reset-filters');
    const filterBtn = document.getElementById('apply-filters');

    // Initialize price slider
    if (priceMin && priceMax) {
        priceMin.addEventListener('input', updatePriceDisplay);
        priceMax.addEventListener('input', updatePriceDisplay);
        updatePriceDisplay();
    }

    if (filterBtn) {
        filterBtn.addEventListener('click', applyFilters);
        resetBtn.addEventListener('click', resetFilters);
        
        // Real-time search
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
    }
}

/**
 * Update price display when sliders change
 */
function updatePriceDisplay() {
    const minSlider = document.getElementById('price-min');
    const maxSlider = document.getElementById('price-max');
    const minDisplay = document.getElementById('min-price-display');
    const maxDisplay = document.getElementById('max-price-display');

    if (!minSlider || !maxSlider || !minDisplay || !maxDisplay) return;

    let minVal = parseInt(minSlider.value);
    let maxVal = parseInt(maxSlider.value);

    // Prevent min from exceeding max and vice versa
    if (minVal > maxVal) {
        minSlider.value = maxVal;
        minVal = maxVal;
    }
    if (maxVal < minVal) {
        maxSlider.value = minVal;
        maxVal = minVal;
    }

    minDisplay.textContent = minVal.toLocaleString();
    maxDisplay.textContent = maxVal.toLocaleString();
}

/**
 * Apply filters to car inventory
 */
function applyFilters() {
    const searchTerm = (document.getElementById('search-input')?.value || '').toLowerCase();
    const brand = document.getElementById('brand-filter')?.value || '';
    const fuel = document.getElementById('fuel-filter')?.value || '';
    const ac = document.getElementById('ac-filter')?.value || '';
    const transmission = document.getElementById('transmission-filter')?.value || '';
    const driveType = document.getElementById('drivetype-filter')?.value || '';
    const condition = document.getElementById('condition-filter')?.value || '';
    const color = document.getElementById('color-filter')?.value || '';
    const minPrice = parseInt(document.getElementById('price-min')?.value || 30000);
    const maxPrice = parseInt(document.getElementById('price-max')?.value || 300000);

    const filtered = carInventory.filter(car => {
        const matchesSearch = car.name.toLowerCase().includes(searchTerm) || 
                             car.brand.toLowerCase().includes(searchTerm);
        const matchesBrand = !brand || car.brand === brand;
        const matchesFuel = !fuel || car.fuelType === fuel;
        const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
        const matchesAC = !ac || (ac === 'AC' && car.ac) || (ac === 'NON-AC' && !car.ac);
        const matchesTransmission = !transmission || car.transmission === transmission;
        const matchesDriveType = !driveType || car.driveType === driveType;
        const matchesCondition = !condition || car.condition === condition;
        const matchesColor = !color || car.color === color;

        return matchesSearch && matchesBrand && matchesFuel && matchesPrice && matchesAC && 
               matchesTransmission && matchesDriveType && matchesCondition && matchesColor;
    });

    displayFilteredCars(filtered);
}

/**
 * Reset all filters
 */
function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('brand-filter').value = '';
    document.getElementById('fuel-filter').value = '';
    document.getElementById('ac-filter').value = '';
    if (document.getElementById('transmission-filter')) document.getElementById('transmission-filter').value = '';
    if (document.getElementById('drivetype-filter')) document.getElementById('drivetype-filter').value = '';
    if (document.getElementById('condition-filter')) document.getElementById('condition-filter').value = '';
    if (document.getElementById('color-filter')) document.getElementById('color-filter').value = '';
    document.getElementById('price-min').value = '30000';
    document.getElementById('price-max').value = '300000';
    updatePriceDisplay();
    displayFilteredCars(carInventory);
}

/**
 * Display filtered cars
 */
function displayFilteredCars(cars) {
    const carsGrid = document.querySelector('.cars-grid');
    const resultsInfo = document.querySelector('.results-info');

    if (!carsGrid) return;

    if (cars.length === 0) {
        carsGrid.innerHTML = '<div class="no-results" style="grid-column: 1/-1;"><p>No cars found matching your criteria. Try adjusting your filters.</p></div>';
        if (resultsInfo) resultsInfo.textContent = 'No results found';
        return;
    }

    carsGrid.innerHTML = cars.map(car => `
        <div class="car-card">
            <div class="car-image-wrapper">
                <div class="car-image" style="background: linear-gradient(135deg, #333, #555); display: flex; align-items: center; justify-content: center;">
                    <img src="${car.image || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop'}" alt="${car.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="stock-badge" style="position: absolute; top: 12px; right: 12px; background: ${car.stock > 0 ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 107, 107, 0.9)'}; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">
                    ${car.stock > 0 ? `✅ ${car.stock} Left` : '❌ Out of Stock'}
                </div>
            </div>
            <div class="car-card-content">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-price">$${car.price.toLocaleString()}</p>
                <div class="car-specs">
                    <span class="spec">${car.fuelType === 'Electric' ? '⚡' : '⛽'} ${car.fuelType}</span>
                    <span class="spec">🔧 ${car.transmission}</span>
                    <span class="spec">${car.ac ? '❄️ AC' : '🌡️ NON-AC'}</span>
                </div>
                <div class="car-actions">
                    <a href="car.html?id=${car.id}" class="btn-view">View Details →</a>
                    <button class="btn-book" onclick="openBookingModal(${car.id}, '${car.name}', '${car.price}', '${car.image || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop'}')">📅 Book Now</button>
                </div>
            </div>
        </div>
    `).join('');

    if (resultsInfo) {
        resultsInfo.textContent = `Showing ${cars.length} car${cars.length !== 1 ? 's' : ''}`;
    }
}

// =============================================
// BOOKING MODAL FUNCTIONS
// =============================================

/**
 * Open booking modal for a specific car
 */
function openBookingModal(carId, carName, carPrice, carImage) {
    const modal = document.getElementById('booking-modal');
    const carNameEl = document.getElementById('booking-car-name');
    const carPriceEl = document.getElementById('booking-car-price');
    const carImageEl = document.getElementById('booking-car-image');
    const form = document.getElementById('booking-form');
    const submitBtn = document.getElementById('booking-submit-btn');
    const availabilityEl = document.getElementById('booking-availability');

    if (!modal) return;

    // Get car from inventory
    const car = carInventory.find(c => c.id === carId);
    if (!car) return;

    // Check availability
    const isAvailable = car.stock > 0;
    const stockCount = car.stock;

    // Set car details in modal
    carNameEl.textContent = carName;
    carPriceEl.textContent = `$${parseInt(carPrice).toLocaleString()}`;
    carImageEl.src = carImage;
    
    // Display availability status
    if (availabilityEl) {
        if (isAvailable) {
            availabilityEl.innerHTML = `<span style="color: #4caf50; font-weight: 600;">✅ Available</span> - <strong>${stockCount} vehicle${stockCount !== 1 ? 's' : ''} left in stock`;
            availabilityEl.style.display = 'block';
        } else {
            availabilityEl.innerHTML = `<span style="color: #ff6b6b; font-weight: 600;">❌ Out of Stock</span>`;
            availabilityEl.style.display = 'block';
        }
    }

    // Enable/disable submit button based on availability
    if (submitBtn) {
        submitBtn.disabled = !isAvailable;
        submitBtn.style.opacity = isAvailable ? '1' : '0.5';
        submitBtn.style.cursor = isAvailable ? 'pointer' : 'not-allowed';
    }
    
    // Store car ID in form for submission
    form.dataset.carId = carId;
    form.dataset.carName = carName;
    form.dataset.carPrice = carPrice;

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;
}

/**
 * Close booking modal
 */
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('booking-form').reset();
    }
}

/**
 * Close success modal
 */
function closeSuccessModal() {
    const modal = document.getElementById('booking-success-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    closeBookingModal();
}

/**
 * Submit booking form
 */
function submitBooking(event) {
    event.preventDefault();

    const form = document.getElementById('booking-form');
    const customerName = document.getElementById('booking-customer-name').value;
    const email = document.getElementById('booking-email').value;
    const phone = document.getElementById('booking-phone').value;
    const preferredDate = document.getElementById('booking-date').value;
    const preferredTime = document.getElementById('booking-time').value;
    const message = document.getElementById('booking-message').value;

    const carName = form.dataset.carName;
    const carPrice = form.dataset.carPrice;
    const carImage = document.getElementById('booking-car-image').src;

    // Get car ID from form
    const carId = parseInt(form.dataset.carId);
    
    // Find car in inventory and check availability
    const car = carInventory.find(c => c.id === carId);
    if (!car || car.stock <= 0) {
        alert('Sorry, this vehicle is no longer available!');
        closeBookingModal();
        return;
    }

    // Generate unique booking code
    const bookingCode = generateUniqueBookingCode();

    // Prepare booking data
    const bookingData = {
        booking_code: bookingCode,
        car_name: carName,
        car_price: carPrice,
        car_image: carImage,
        car_status: 'Available',
        customer_name: customerName,
        email: email,
        phone: phone,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        message: message,
        booking_date: new Date().toISOString()
    };

    // Log booking data (in a real app, this would be sent to a server)
    console.log('Booking submitted:', bookingData);

    // Store in localStorage for demonstration
    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('carBookings', JSON.stringify(bookings));

    // Decrement stock for the booked car
    car.stock -= 1;
    saveInventoryStock();
    console.log(`Stock updated for ${carName}: ${car.stock} vehicles left`);

    // Show success message and redirect
    showBookingSuccess(carName, preferredDate, preferredTime, bookingCode);

    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
        closeBookingModal();
        window.location.href = 'booking-dashboard.html';
    }, 3000);
}

/**
 * Generate unique booking code
 */
function generateUniqueBookingCode() {
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
 * Show booking success message
 */
function showBookingSuccess(carName, date, time, bookingCode) {
    const successModal = document.getElementById('booking-success-modal');
    const successMessage = document.getElementById('success-message');

    if (successModal && successMessage) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        successMessage.innerHTML = `
            <div style="margin-bottom: 20px;">
                <p style="margin: 0;">Your booking for <strong>${carName}</strong> has been confirmed!</p>
                <p style="margin: 8px 0 0 0;">📅 ${formattedDate} at ${time}</p>
            </div>
            <div style="background: rgba(255, 107, 107, 0.1); padding: 15px; border-radius: 10px; border: 1px solid rgba(255, 107, 107, 0.3); margin-bottom: 15px;">
                <p style="margin: 0 0 8px 0; font-size: 0.9rem; color: rgba(255, 255, 255, 0.7);">Your Booking Code</p>
                <p style="margin: 0; font-size: 1.3rem; font-weight: 800; color: #ffd700; font-family: monospace;">${bookingCode}</p>
            </div>
        `;
        successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close booking modals when clicking outside
 */
document.addEventListener('DOMContentLoaded', function() {
    const bookingModal = document.getElementById('booking-modal');
    const successModal = document.getElementById('booking-success-modal');
    const searchModal = document.getElementById('search-modal');

    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });
    }

    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                closeSearchModal();
            }
        });
    }
});

// =============================================
// SEARCH BOOKING MODAL
// =============================================

/**
 * Open search modal
 */
function openSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        document.getElementById('search-input-field').focus();
    }
}

/**
 * Close search modal
 */
function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Handle search input - search on Enter key
 */
function handleSearchInput(event) {
    if (event.key === 'Enter') {
        searchBooking();
    }
}

/**
 * Search booking by ID, name, email, or phone
 */
function searchBooking() {
    const searchTerm = document.getElementById('search-input-field').value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }

    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    const resultsContainer = document.getElementById('search-results-container');
    const noResultsDiv = document.getElementById('search-no-results');
    const initialState = document.getElementById('search-initial-state');

    // Filter bookings
    const matches = bookings.filter(booking => {
        const bookingCode = booking.booking_code || '';
        const customerName = booking.customer_name || '';
        const email = booking.email || '';
        const phone = booking.phone || '';

        return (
            bookingCode.toLowerCase().includes(searchTerm) ||
            customerName.toLowerCase().includes(searchTerm) ||
            email.toLowerCase().includes(searchTerm) ||
            phone.toLowerCase().includes(searchTerm)
        );
    });

    // Hide initial state
    initialState.style.display = 'none';

    if (matches.length === 0) {
        resultsContainer.style.display = 'none';
        noResultsDiv.style.display = 'block';
        return;
    }

    // Display results
    noResultsDiv.style.display = 'none';
    resultsContainer.style.display = 'flex';
    resultsContainer.innerHTML = matches.map((booking, index) => createSearchResultHTML(booking, index)).join('');
}

/**
 * Create search result HTML
 */
function createSearchResultHTML(booking, index) {
    const dateObj = new Date(booking.preferred_date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const [hours, minutes] = booking.preferred_time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const formattedTime = `${displayHour}:${minutes} ${ampm}`;
    const carImage = booking.car_image || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=400&h=300&fit=crop';
    const carStatus = booking.car_status || 'Available';

    return `
        <div class="search-result-item" onclick="viewSearchResult(${index})">
            <div class="search-result-image-wrapper">
                <img src="${carImage}" alt="${booking.car_name}" class="search-result-image">
                <span class="search-result-status">${carStatus}</span>
            </div>
            <div class="search-result-header">
                <div class="search-result-car">
                    <h3>${booking.car_name}</h3>
                </div>
                <span class="search-result-code">${booking.booking_code || 'N/A'}</span>
            </div>
            <div class="search-result-details">
                <div class="search-result-detail">
                    <span class="detail-label">📅 Date</span>
                    <span class="detail-value">${formattedDate}</span>
                </div>
                <div class="search-result-detail">
                    <span class="detail-label">⏰ Time</span>
                    <span class="detail-value">${formattedTime}</span>
                </div>
                <div class="search-result-detail">
                    <span class="detail-label">👤 Name</span>
                    <span class="detail-value">${booking.customer_name}</span>
                </div>
                <div class="search-result-detail">
                    <span class="detail-label">📧 Email</span>
                    <span class="detail-value">${booking.email}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * View full booking details from search result
 */
function viewSearchResult(index) {
    const bookings = JSON.parse(localStorage.getItem('carBookings') || '[]');
    const booking = bookings[index];

    if (!booking) return;

    // Store in sessionStorage for quick access
    sessionStorage.setItem('selectedBooking', JSON.stringify({
        booking: booking,
        index: index
    }));

    // Redirect to booking dashboard
    closeSearchModal();
    window.location.href = 'booking-dashboard.html?view=' + index;
}

// =============================================
// CAR DETAILS PAGE
// =============================================

/**
 * Initialize car details page
 */
function initCarDetailsPage() {
    const params = new URLSearchParams(window.location.search);
    const carId = parseInt(params.get('id')) || 1;
    const car = carInventory.find(c => c.id === carId);

    if (!car) {
        document.body.innerHTML = '<div style="padding: 100px; text-align: center; color: white;"><h1>Car not found</h1></div>';
        return;
    }

    displayCarDetails(car);
    initGallery();
    initTestDriveForm();
}

/**
 * Display car details
 */
function displayCarDetails(car) {
    const title = document.querySelector('.car-details-info h1');
    const price = document.querySelector('.car-details-price');
    const specsTable = document.querySelector('.car-specs-table');
    const description = document.querySelector('.car-description p');

    if (title) title.textContent = car.name;
    if (price) price.textContent = `$${car.price.toLocaleString()}`;
    if (description) description.textContent = car.description;

    // Build comprehensive specs table with all car details
    if (specsTable) {
        const specsHTML = `
            <div class="specs-grid">
                <!-- Basic Info -->
                <div class="specs-section">
                    <h4>Basic Information</h4>
                    <div class="specs-row">
                        <div class="specs-label">Brand</div>
                        <div class="specs-value">${car.brand}</div>
                    </div>
                    <div class="specs-row">
                        <div class="specs-label">Year</div>
                        <div class="specs-value">${car.year}</div>
                    </div>
                    <div class="specs-row">
                        <div class="specs-label">Mileage</div>
                        <div class="specs-value">${car.mileage} miles</div>
                    </div>
                    <div class="specs-row">
                        <div class="specs-label">Stock Available</div>
                        <div class="specs-value" style="color: ${car.stock > 0 ? '#4caf50' : '#ff6b6b'}; font-weight: 600;">
                            ${car.stock > 0 ? `✅ ${car.stock} vehicles` : '❌ Out of Stock'}
                        </div>
                    </div>
                </div>

                <!-- Features -->
                <div class="specs-section">
                    <h4>Features & Options</h4>
                    <div class="specs-row">
                        <div class="specs-label">Fuel Type</div>
                        <div class="specs-value">${car.fuelType === 'Electric' ? '⚡' : '⛽'} ${car.fuelType}</div>
                    </div>
                    <div class="specs-row">
                        <div class="specs-label">Transmission</div>
                        <div class="specs-value">🔧 ${car.transmission}</div>
                    </div>
                    <div class="specs-row">
                        <div class="specs-label">Air Conditioning</div>
                        <div class="specs-value">${car.ac ? '✅ Yes (AC)' : '❌ No (NON-AC)'}</div>
                    </div>
                </div>

                <!-- Performance Specs -->
                <div class="specs-section">
                    <h4>Performance Specifications</h4>
                    ${Object.entries(car.specs).map(([key, value]) => `
                        <div class="specs-row">
                            <div class="specs-label">${formatSpecLabel(key)}</div>
                            <div class="specs-value">${value}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        specsTable.innerHTML = specsHTML;
    }

    // Update main image
    const mainImage = document.getElementById('main-car-image');
    if (mainImage) {
        const defaultImage = 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=600&h=500&fit=crop';
        mainImage.src = car.image || defaultImage;
    }

    // Add booking button near action buttons
    const actionButtons = document.querySelector('.car-action-buttons');
    if (actionButtons && car.stock > 0) {
        const bookBtn = document.createElement('button');
        bookBtn.className = 'btn btn-primary btn-icon';
        bookBtn.innerHTML = '📅 Book This Car';
        bookBtn.style.cssText = 'cursor: pointer;';
        bookBtn.onclick = () => openBookingModal(car.id, car.name, car.price, car.image || 'https://images.unsplash.com/photo-1560958089-b8a63dd89c94?w=600&h=500&fit=crop');
        actionButtons.appendChild(bookBtn);
    }
}

/**
 * Format spec label from camelCase to readable format
 */
function formatSpecLabel(label) {
    return label
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
}

/**
 * Initialize image gallery switching
 */
function initGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach((thumb, index) => {
        if (index === 0) thumb.classList.add('active');
        
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            // In a real app, update main image src
            if (mainImage) {
                mainImage.style.background = `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`;
            }
        });
    });
}

/**
 * Initialize test drive form
 */
function initTestDriveForm() {
    const form = document.querySelector('.test-drive-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(form)) {
                alert('Thank you! We will contact you shortly to confirm your test drive.');
                form.reset();
            }
        });
    }
}

// =============================================
// FORM VALIDATION
// =============================================

/**
 * Validate form inputs
 */
function validateForm(form) {
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFormError(input, 'This field is required');
            isValid = false;
        } else {
            clearFormError(input);

            // Email validation
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showFormError(input, 'Please enter a valid email');
                isValid = false;
            }

            // Phone validation
            if (input.type === 'tel' && !isValidPhone(input.value)) {
                showFormError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });

    return isValid;
}

/**
 * Show form validation error
 */
function showFormError(input, message) {
    let error = input.parentElement.querySelector('.form-error');
    if (!error) {
        error = document.createElement('p');
        error.className = 'form-error';
        error.style.color = 'var(--error-color)';
        error.style.fontSize = '0.85rem';
        error.style.marginTop = '5px';
        input.parentElement.appendChild(error);
    }
    error.textContent = message;
    input.style.borderColor = 'var(--error-color)';
}

/**
 * Clear form validation error
 */
function clearFormError(input) {
    const error = input.parentElement.querySelector('.form-error');
    if (error) error.remove();
    input.style.borderColor = '';
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const form = document.querySelector('.contact-form-wrapper form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm(form)) {
                alert('Thank you for your message! We will get back to you shortly.');
                form.reset();
            }
        });
    }
}

// =============================================
// ABOUT PAGE - ANIMATED COUNTERS
// =============================================

/**
 * Initialize counters with animation
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target || entry.target.textContent);
                animateCounter(entry.target, 0, target, 2000);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate counter numbers
 */
function animateCounter(element, start, end, duration) {
    const startTime = Date.now();

    const timer = setInterval(function() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + '+';
        } else {
            element.textContent = end + '+';
            clearInterval(timer);
        }
    }, 30);
}

// =============================================
// PAGE INITIALIZATION
// =============================================

/**
 * Determine current page and initialize
 */
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Load color theme on all pages
    loadColorTheme();

    switch(currentPage) {
        case 'inventory.html':
            populateBrandFilter();
            displayFilteredCars(carInventory);
            initInventoryFilters();
            break;
        case 'car.html':
            initCarDetailsPage();
            break;
        case 'about.html':
            initCounters();
            break;
        case 'contact.html':
            initContactForm();
            break;
    }
}

/**
 * Populate brand filter with unique brands
 */
function populateBrandFilter() {
    const brandFilter = document.getElementById('brand-filter');
    if (!brandFilter) return;

    const brands = [...new Set(carInventory.map(car => car.brand))].sort();
    
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

// =============================================
// UTILITY FUNCTIONS
// =============================================

/**
 * Smooth scroll to element
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Format number to currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

/**
 * Get URL parameter
 */
function getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

// =============================================
// NEWSLETTER SUBSCRIPTION
// =============================================

/**
 * Handle newsletter subscription
 */
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const email = document.getElementById('newsletter-email').value.trim();
    const messageDiv = document.getElementById('newsletter-message');
    const emailInput = document.getElementById('newsletter-email');
    
    // Validate email
    if (!email) {
        showNewsletterMessage(messageDiv, '⚠️ Please enter your email address', 'error');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNewsletterMessage(messageDiv, '⚠️ Please enter a valid email address', 'error');
        return;
    }
    
    // Get existing subscribers from localStorage
    let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    // Check if email already exists
    if (subscribers.includes(email.toLowerCase())) {
        showNewsletterMessage(messageDiv, '📧 You are already subscribed!', 'error');
        return;
    }
    
    // Add new subscriber
    subscribers.push(email.toLowerCase());
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    // Show success message
    showNewsletterMessage(messageDiv, '✅ Thank you for subscribing! Check your inbox for exclusive deals.', 'success');
    
    // Clear input field
    emailInput.value = '';
    
    // Log for demo purposes
    console.log('Newsletter subscription successful:', email);
    console.log('Total subscribers:', subscribers.length);
}

/**
 * Show newsletter message
 */
function showNewsletterMessage(element, message, type) {
    element.textContent = message;
    element.className = `newsletter-message ${type}`;
    element.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// =============================================
// COLOR THEME SWITCHER
// =============================================

/**
 * Toggle theme options panel
 */
function toggleThemeOptions() {
    const themeOptions = document.getElementById('theme-options');
    if (themeOptions) {
        themeOptions.classList.toggle('active');
    }
}

/**
 * Change color theme
 */
function changeColorTheme(theme) {
    // Apply theme to body
    document.body.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('colorTheme', theme);
    
    // Update active indicator
    const themeColors = document.querySelectorAll('.theme-color');
    themeColors.forEach(color => {
        if (color.getAttribute('data-theme') === theme) {
            color.classList.add('active');
        } else {
            color.classList.remove('active');
        }
    });
    
    // Close options panel
    setTimeout(() => {
        const themeOptions = document.getElementById('theme-options');
        if (themeOptions) {
            themeOptions.classList.remove('active');
        }
    }, 300);
}

/**
 * Load saved color theme
 */
function loadColorTheme() {
    const savedTheme = localStorage.getItem('colorTheme') || 'red';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Update active indicator
    const themeColors = document.querySelectorAll('.theme-color');
    themeColors.forEach(color => {
        if (color.getAttribute('data-theme') === savedTheme) {
            color.classList.add('active');
        } else {
            color.classList.remove('active');
        }
    });
}

// Close theme options when clicking outside
document.addEventListener('click', function(event) {
    const themeSwitcher = document.querySelector('.color-theme-switcher');
    const themeOptions = document.getElementById('theme-options');
    
    if (themeSwitcher && themeOptions && !themeSwitcher.contains(event.target)) {
        themeOptions.classList.remove('active');
    }
});

// =============================================
