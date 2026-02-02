// Cart Management System
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
    }

    // Load cart from localStorage
    loadFromStorage() {
        const stored = localStorage.getItem('nexus_cart');
        return stored ? JSON.parse(stored) : [];
    }

    // Save cart to localStorage
    saveToStorage() {
        localStorage.setItem('nexus_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Add product to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: product.quantity || 1
            });
        }
        
        this.saveToStorage();
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
            }
        }
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get cart item count
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveToStorage();
    }

    // Update cart count display
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getItemCount();
        cartCountElements.forEach(el => {
            el.textContent = count > 0 ? count : '0';
        });
    }

    // Get all items
    getItems() {
        return this.items;
    }
}

// Initialize cart globally
let cart = new ShoppingCart();

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    cart.updateCartCount();
    
    // Setup add to cart buttons
    setupAddToCartButtons();
});

// Setup add to cart button functionality
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productTitle = productCard.querySelector('.product-title');
            const productPrice = productCard.querySelector('.product-price');
            const productImage = productCard.querySelector('.product-image img');
            const productCategory = productCard.querySelector('.product-category');
            
            if (!productTitle || !productPrice) return;
            
            // Extract USD base price from data attributes (preferred)
            let price = 0;
            const currentPrice = productPrice.querySelector('.current-price');
            if (currentPrice && currentPrice.dataset.usdPrice) {
                price = parseFloat(currentPrice.dataset.usdPrice);
            } else if (productPrice.dataset.usdPrice) {
                price = parseFloat(productPrice.dataset.usdPrice);
            } else {
                // Fallback: parse text
                let raw = productPrice.textContent.trim();
                price = parseFloat(raw.replace(/[^0-9.]/g, '').split(' ').pop()) || 0;
            }
            
            const product = {
                id: 'product-' + Date.now() + Math.random(),
                name: productTitle.textContent,
                price: price,
                image: productImage ? productImage.src : 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
                category: productCategory ? productCategory.textContent : 'Product',
                quantity: 1
            };
            
            cart.addItem(product);
            
            // Animation feedback
            this.style.background = 'linear-gradient(90deg, var(--primary), var(--secondary))';
            this.style.borderColor = 'transparent';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.borderColor = '';
            }, 300);
            
            // Show notification
            const formatMoney = window.nexusCurrency && window.nexusCurrency.format
                ? window.nexusCurrency.format
                : (usd) => `$${usd.toFixed(2)}`;
            showNotification(`${product.name} added to cart! (${formatMoney(product.price)})`);
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
