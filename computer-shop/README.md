# 🖥️ NEXUS Computer Shop

A modern, full-featured e-commerce website for custom PC builds and computer components. Built with vanilla JavaScript, HTML5, and CSS3.

![NEXUS Computer Shop](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🛒 Shopping & Products
- **Product Catalog** - Browse high-performance PCs, laptops, and components
- **Shopping Cart** - Add/remove items with real-time updates
- **Checkout System** - Complete order processing with multiple payment methods
- **Order Confirmation** - Detailed order summaries with invoice generation

### 🔧 PC Builder
- **Custom PC Builder** - Interactive component selection tool
- **8 Component Categories**: CPU, Motherboard, GPU, RAM, Storage, PSU, Case, Cooling
- **Compatibility Checking** - Real-time validation for:
  - CPU socket matching with motherboard
  - RAM type compatibility (DDR4/DDR5)
  - PSU wattage requirements
  - Case size compatibility
- **Power Consumption Calculator** - Track total system wattage
- **Save Builds** - Store configurations to user account (requires login)
- **Load Builds** - Restore saved builds from dashboard

### 💰 Multi-Currency Support
- **170+ Currencies** - Real-time exchange rates via API
- **Live Conversion** - All prices update dynamically
- **Persistent Selection** - Currency choice saved in localStorage
- **12-Hour Cache** - Optimized API calls

### 👤 User Authentication
- **Registration & Login** - Secure account management
- **User Dashboard** - Comprehensive profile management
- **Order History** - Track all purchases with status updates
- **Saved Builds** - Manage custom PC configurations
- **Profile Editing** - Update account information
- **Password Reset** - 4-step forgot password flow

### 🔍 Search System
- **Site-Wide Search** - Instant results across all content
- **25+ Indexed Items** - Products, services, components, pages
- **Keyboard Shortcuts** - Press `/` to open search, `Escape` to close
- **Category Filtering** - Products, Services, Builder, Account sections

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Modern frosted glass effects
- **Responsive Layout** - Mobile, tablet, and desktop optimized
- **Smooth Animations** - Professional transitions and effects
- **Dark Theme** - Eye-friendly color scheme

## 🚀 Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Storage**: LocalStorage for cart, user data, and settings
- **API**: Open Exchange Rates API for currency conversion
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)

## 📦 Installation

1. **Clone or download** the repository
2. **Place in XAMPP htdocs** (or any web server)
   ```
   D:\XAMPP\htdocs\ALL_PROJECTS\com-shop\
   ```
3. **Start your web server** (Apache/XAMPP)
4. **Open in browser**:
   ```
   http://localhost/ALL_PROJECTS/com-shop/
   ```

### No Dependencies Required
- Pure vanilla JavaScript - no npm, webpack, or build process
- No database setup needed - uses localStorage

## 🎮 Demo Accounts

Three pre-configured demo users are available:

| Email | Password | Profile |
|-------|----------|---------|
| demo@nexuspc.com | demo123 | Full demo user with orders & builds |
| john.doe@example.com | password123 | Clean account for testing |
| sarah.tech@example.com | tech2026 | Professional user with workstation |

### Demo User Features:
- **demo@nexuspc.com** includes:
  - 2 orders (completed & processing)
  - 2 saved PC builds (Gaming Beast & Budget Build)
  - Saved shipping address

## 📁 Project Structure

```
com-shop/
├── index.html              # Homepage
├── products.html           # Product catalog
├── build-your-pc.html      # PC builder tool
├── custom.html             # Custom build service
├── features.html           # Services page
├── support.html            # Support center
├── cart.html               # Shopping cart
├── checkout.html           # Checkout process
├── order-confirmation.html # Order success page
├── login.html              # Login/Register
├── dashboard.html          # User dashboard
├── forgot-password.html    # Password reset
├── css/
│   └── style.css           # Global styles
├── js/
│   ├── cart.js             # Shopping cart logic
│   ├── currency.js         # Currency converter
│   ├── search.js           # Search functionality
│   └── auth.js             # Authentication system
└── README.md               # This file
```

## 🎯 Key Features Breakdown

### 1. PC Builder System
The interactive PC builder allows users to configure custom computers with:
- Real component specifications (Intel 14th gen, AMD Ryzen 7000, NVIDIA RTX 40 series)
- Market-accurate pricing
- Component compatibility validation
- Visual feedback for selections
- Summary panel with total cost

**Compatibility Rules:**
- LGA1700 CPUs → LGA1700 Motherboards
- AM5 CPUs → AM5 Motherboards
- DDR5 RAM → DDR5 Motherboards
- PSU wattage ≥ Total system wattage + 20% headroom
- Case size matches motherboard form factor

### 2. Currency Converter
Powered by Open Exchange Rates API:
```javascript
// API Endpoint
https://open.er-api.com/v6/latest/USD

// Features
- 170+ currencies
- Real-time rates
- 12-hour cache
- Automatic page-wide updates
```

### 3. Authentication System
LocalStorage-based authentication with:
- User registration with validation
- Login/logout functionality
- Session persistence
- Profile management
- Order tracking
- Build saving

**Data Structure:**
```javascript
{
  id: 'user_unique_id',
  email: 'user@example.com',
  password: 'hashed_in_production',
  fullName: 'User Name',
  createdAt: 'ISO_timestamp',
  orders: [...],
  savedBuilds: [...],
  addresses: [...]
}
```

### 4. Shopping Cart
Persistent cart with:
- Add/remove items
- Quantity updates
- Price calculations
- Tax computation (10%)
- Currency conversion
- Cart count badge

## 💡 Usage Guide

### Building a PC
1. Navigate to **Build Your PC**
2. Select components from each category
3. Watch compatibility warnings (if any)
4. Review total price and power requirements
5. **Add to Cart** or **Save Build** (requires login)

### Shopping
1. Browse **Products** page
2. Click **Add to Cart** on desired items
3. View cart and adjust quantities
4. Proceed to **Checkout**
5. Fill shipping and payment details
6. Confirm order

### Managing Account
1. **Register** or **Login**
2. Access **Dashboard** from header
3. View/edit profile information
4. Check order history
5. Manage saved PC builds
6. Load builds back into PC builder

### Using Search
- Click search icon or press `/` key
- Type product, service, or component name
- Click result to navigate
- Press `Escape` to close

## 🔐 Security Notes

⚠️ **Important**: This is a demo/educational project:
- Passwords stored in plain text in localStorage
- No server-side validation
- No HTTPS encryption
- For production, implement:
  - Server-side authentication
  - Password hashing (bcrypt)
  - HTTPS/SSL
  - Database storage
  - CSRF protection
  - Input sanitization

## 🎨 Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #6366f1;      /* Primary brand color */
    --secondary: #0ea5e9;    /* Secondary accent */
    --dark: #0f172a;         /* Background */
    --light: #f8fafc;        /* Text */
}
```

### Adding Products
Edit product arrays in respective HTML files:
```javascript
// In products.html
const products = [
    { 
        name: 'Product Name',
        price: 999,
        specs: 'Specifications',
        image: 'image_url'
    }
];
```

### Currency API
To use your own API key, modify `js/currency.js`:
```javascript
const API_URL = 'https://your-api-endpoint.com';
```

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 not supported (uses ES6+ features)

## 🐛 Known Limitations

1. **No Backend**: All data stored in browser localStorage
2. **Demo Payments**: No real payment processing
3. **Email Verification**: Simulated (code shown in console)
4. **Image Hosting**: Uses placeholder images
5. **Rate Limiting**: Currency API has daily limits

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway (Stripe/PayPal)
- [ ] User email verification
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Live chat support
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Order tracking system
- [ ] Newsletter subscription

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created as a comprehensive e-commerce demonstration project.

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Open Exchange Rates for currency API
- Component specifications from actual market data

---

**Note**: This is a demonstration project for educational purposes. For production use, implement proper security measures, backend infrastructure, and database integration.

## 📞 Support

For questions or support, visit the **Support** page or contact:
- Email: support@nexuspc.com (demo)
- Phone: +1 (555) 123-4567 (demo)

---

Made with ❤️ for PC enthusiasts
