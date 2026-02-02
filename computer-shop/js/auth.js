// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.initializeDemoUsers();
        this.loadCurrentUser();
    }

    // Initialize demo users if none exist
    initializeDemoUsers() {
        const users = localStorage.getItem('nexus_users');
        if (!users || JSON.parse(users).length === 0) {
            const demoUsers = [
                {
                    id: 'user_demo1',
                    email: 'demo@nexuspc.com',
                    password: 'demo123',
                    fullName: 'Demo User',
                    createdAt: '2025-12-15T10:30:00.000Z',
                    orders: [
                        {
                            id: 'ORD-1735824567890',
                            date: '2025-12-25T14:20:00.000Z',
                            itemCount: 3,
                            total: 2599,
                            status: 'completed',
                            currency: 'USD',
                            items: [
                                { name: 'Intel Core i7-14700K', price: 429 },
                                { name: 'NVIDIA RTX 4070 Ti', price: 799 },
                                { name: 'Corsair Vengeance DDR5 32GB', price: 149 }
                            ]
                        },
                        {
                            id: 'ORD-1736156789123',
                            date: '2026-01-15T09:45:00.000Z',
                            itemCount: 2,
                            total: 1348,
                            status: 'processing',
                            currency: 'USD',
                            items: [
                                { name: 'Samsung 990 PRO 2TB', price: 199 },
                                { name: 'Corsair RM850x PSU', price: 129 }
                            ]
                        }
                    ],
                    savedBuilds: [
                        {
                            id: 'build_1735910456789',
                            name: 'Gaming Beast 2026',
                            totalPrice: 2799,
                            currency: 'USD',
                            createdAt: '2025-12-28T16:30:00.000Z',
                            components: {
                                cpu: { name: 'Intel Core i9-14900K', specs: '24 cores, 32 threads, LGA1700', priceUSD: 589 },
                                motherboard: { name: 'ASUS ROG MAXIMUS Z790 HERO', specs: 'LGA1700, DDR5, ATX, WiFi 7', priceUSD: 629 },
                                gpu: { name: 'NVIDIA RTX 4080 SUPER', specs: '16GB GDDR6X, 10240 CUDA cores', priceUSD: 999 },
                                ram: { name: 'G.SKILL Trident Z5 RGB 32GB', specs: 'DDR5-6000, CL30, 2x16GB', priceUSD: 179 },
                                storage: { name: 'Samsung 990 PRO 2TB', specs: 'PCIe 4.0 NVMe, 7450 MB/s read', priceUSD: 199 },
                                psu: { name: 'Corsair RM1000x', specs: '1000W, 80+ Gold, Modular', priceUSD: 179 },
                                case: { name: 'Lian Li O11 Dynamic EVO', specs: 'Mid Tower, ATX, Tempered Glass', priceUSD: 169 },
                                cooling: { name: 'NZXT Kraken X73', specs: '360mm AIO, RGB, 2000 RPM', priceUSD: 179 }
                            }
                        },
                        {
                            id: 'build_1736002345678',
                            name: 'Budget Gaming PC',
                            totalPrice: 1399,
                            currency: 'USD',
                            createdAt: '2026-01-02T11:15:00.000Z',
                            components: {
                                cpu: { name: 'AMD Ryzen 5 7600X', specs: '6 cores, 12 threads, AM5', priceUSD: 229 },
                                motherboard: { name: 'Gigabyte B650 AORUS ELITE AX', specs: 'AM5, DDR5, ATX, WiFi 6E', priceUSD: 229 },
                                gpu: { name: 'AMD Radeon RX 7700 XT', specs: '12GB GDDR6, 3456 Stream Processors', priceUSD: 449 },
                                ram: { name: 'Corsair Vengeance DDR5 16GB', specs: 'DDR5-5200, CL40, 2x8GB', priceUSD: 89 },
                                storage: { name: 'WD Black SN770 1TB', specs: 'PCIe 4.0 NVMe, 5150 MB/s read', priceUSD: 89 },
                                psu: { name: 'EVGA 750 G7', specs: '750W, 80+ Gold, Modular', priceUSD: 99 },
                                case: { name: 'Fractal Design Meshify C', specs: 'Mid Tower, ATX, Mesh Front', priceUSD: 109 },
                                cooling: { name: 'Cooler Master Hyper 212', specs: 'Tower Cooler, 120mm fan, 1600 RPM', priceUSD: 39 }
                            }
                        }
                    ],
                    addresses: [
                        {
                            id: 'addr_1',
                            name: 'Home',
                            address: '123 Tech Street',
                            city: 'San Francisco',
                            state: 'CA',
                            zip: '94102',
                            country: 'United States'
                        }
                    ]
                },
                {
                    id: 'user_demo2',
                    email: 'john.doe@example.com',
                    password: 'password123',
                    fullName: 'John Doe',
                    createdAt: '2026-01-10T08:00:00.000Z',
                    orders: [],
                    savedBuilds: [],
                    addresses: []
                },
                {
                    id: 'user_demo3',
                    email: 'sarah.tech@example.com',
                    password: 'tech2026',
                    fullName: 'Sarah Johnson',
                    createdAt: '2026-01-20T14:30:00.000Z',
                    orders: [
                        {
                            id: 'ORD-1737389012345',
                            date: '2026-01-25T10:30:00.000Z',
                            itemCount: 1,
                            total: 1899,
                            status: 'pending',
                            currency: 'USD',
                            items: [
                                { name: 'Creator Pro X Laptop', price: 1899 }
                            ]
                        }
                    ],
                    savedBuilds: [
                        {
                            id: 'build_1737389456789',
                            name: 'Workstation Pro',
                            totalPrice: 3499,
                            currency: 'USD',
                            createdAt: '2026-01-26T09:00:00.000Z',
                            components: {
                                cpu: { name: 'AMD Ryzen 9 7950X', specs: '16 cores, 32 threads, AM5', priceUSD: 699 },
                                motherboard: { name: 'ASUS ProArt X670E-CREATOR', specs: 'AM5, DDR5, E-ATX, WiFi 6E', priceUSD: 499 },
                                gpu: { name: 'NVIDIA RTX 4090', specs: '24GB GDDR6X, 16384 CUDA cores', priceUSD: 1599 },
                                ram: { name: 'Corsair Dominator DDR5 64GB', specs: 'DDR5-5600, CL36, 2x32GB', priceUSD: 299 },
                                storage: { name: 'Samsung 990 PRO 4TB', specs: 'PCIe 4.0 NVMe, 7450 MB/s read', priceUSD: 389 },
                                psu: { name: 'Corsair HX1200', specs: '1200W, 80+ Platinum, Modular', priceUSD: 249 },
                                case: { name: 'Corsair 5000D Airflow', specs: 'Full Tower, E-ATX, Mesh Panels', priceUSD: 179 },
                                cooling: { name: 'Arctic Liquid Freezer II 420', specs: '420mm AIO, PWM, 1800 RPM', priceUSD: 149 }
                            }
                        }
                    ],
                    addresses: []
                }
            ];

            localStorage.setItem('nexus_users', JSON.stringify(demoUsers));
        }
    }

    // Load current user from localStorage
    loadCurrentUser() {
        const userData = localStorage.getItem('nexus_current_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Save current user to localStorage
    saveCurrentUser() {
        if (this.currentUser) {
            localStorage.setItem('nexus_current_user', JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem('nexus_current_user');
        }
    }

    // Get all users from localStorage
    getAllUsers() {
        const users = localStorage.getItem('nexus_users');
        return users ? JSON.parse(users) : [];
    }

    // Save all users to localStorage
    saveAllUsers(users) {
        localStorage.setItem('nexus_users', JSON.stringify(users));
    }

    // Register new user
    register(email, password, fullName) {
        const users = this.getAllUsers();
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Validate email
        if (!this.validateEmail(email)) {
            return { success: false, message: 'Invalid email format' };
        }

        // Validate password
        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            email: email,
            password: password, // In production, this should be hashed!
            fullName: fullName,
            createdAt: new Date().toISOString(),
            orders: [],
            savedBuilds: [],
            addresses: []
        };

        users.push(newUser);
        this.saveAllUsers(users);

        return { success: true, message: 'Registration successful' };
    }

    // Login user
    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            this.saveCurrentUser();
            return { success: true, message: 'Login successful', user: user };
        }

        return { success: false, message: 'Invalid email or password' };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.saveCurrentUser();
        window.location.href = 'index.html';
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Update user profile
    updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        // Update user data
        users[userIndex] = { ...users[userIndex], ...updates };
        this.saveAllUsers(users);

        // Update current user
        this.currentUser = users[userIndex];
        this.saveCurrentUser();

        return { success: true, message: 'Profile updated successfully' };
    }

    // Add order to user
    addOrder(order) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        users[userIndex].orders.push(order);
        this.saveAllUsers(users);

        this.currentUser = users[userIndex];
        this.saveCurrentUser();

        return { success: true, message: 'Order added successfully' };
    }

    // Save PC build
    saveBuild(build) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        const buildData = {
            id: 'build_' + Date.now(),
            name: build.name || 'Unnamed Build',
            components: build.components,
            totalPrice: build.totalPrice,
            currency: build.currency,
            createdAt: new Date().toISOString()
        };

        users[userIndex].savedBuilds.push(buildData);
        this.saveAllUsers(users);

        this.currentUser = users[userIndex];
        this.saveCurrentUser();

        return { success: true, message: 'Build saved successfully', buildId: buildData.id };
    }

    // Delete saved build
    deleteBuild(buildId) {
        if (!this.currentUser) {
            return { success: false, message: 'Not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, message: 'User not found' };
        }

        users[userIndex].savedBuilds = users[userIndex].savedBuilds.filter(b => b.id !== buildId);
        this.saveAllUsers(users);

        this.currentUser = users[userIndex];
        this.saveCurrentUser();

        return { success: true, message: 'Build deleted successfully' };
    }

    // Validate email format
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Update navigation UI based on login status
    updateNavigationUI() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        if (this.isLoggedIn()) {
            const user = this.getCurrentUser();
            authButtons.innerHTML = `
                <a href="dashboard.html" class="user-link">
                    <i class="fas fa-user-circle"></i> ${user.fullName || user.email}
                </a>
                <button onclick="auth.logout()" class="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            `;
        } else {
            authButtons.innerHTML = `
                <a href="login.html" class="login-btn">
                    <i class="fas fa-sign-in-alt"></i> Login
                </a>
            `;
        }
    }
}

// Initialize auth system
const auth = new AuthSystem();

// Update navigation on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => auth.updateNavigationUI());
} else {
    auth.updateNavigationUI();
}
