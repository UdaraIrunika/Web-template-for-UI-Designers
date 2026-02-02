(function () {
    const SEARCH_INDEX = [
        { title: 'Apex RTX 4090', description: 'Gaming PC with liquid cooling, 32GB DDR5, 2TB NVMe.', category: 'Products', url: 'products.html' },
        { title: 'Creator Pro X', description: '16" OLED laptop, RTX 4080, 64GB RAM.', category: 'Products', url: 'products.html' },
        { title: 'Silent Pro', description: 'Threadripper PRO workstation for rendering and simulations.', category: 'Products', url: 'products.html' },
        { title: 'Nexus Value', description: 'Entry-level gaming system with RTX 4070 and 16GB RAM.', category: 'Products', url: 'products.html' },
        { title: 'Ultra Beast', description: 'Dual RTX 4090s, 128GB DDR5, custom loop cooling.', category: 'Products', url: 'products.html' },
        { title: 'Professional Edge', description: 'RTX A6000 workstation with dual XEON processors.', category: 'Products', url: 'products.html' },

        { title: 'Custom Configurations', description: 'Hand-picked components built to your specifications.', category: 'Services', url: 'features.html' },
        { title: 'Performance Optimized', description: 'Rigorous testing and tuning for peak performance.', category: 'Services', url: 'features.html' },
        { title: '3-Year Warranty', description: 'Comprehensive warranty for parts and labor.', category: 'Services', url: 'features.html' },
        { title: '24/7 Expert Support', description: 'Always-on technical support for your system.', category: 'Services', url: 'features.html' },

        { title: 'Custom Builds', description: 'Configure your own PC from premium components.', category: 'Custom Builds', url: 'custom.html' },
        { title: 'PC Repair', description: 'Diagnostics, upgrades, and repair services.', category: 'Support', url: 'support.html' },
        { title: 'Performance Tuning', description: 'Optimize your system for max stability and speed.', category: 'Support', url: 'support.html' },
        { title: 'Data Recovery', description: 'Recover files from failing storage devices.', category: 'Support', url: 'support.html' },

        { title: 'Build Your PC', description: 'Full custom PC builder with compatibility checks.', category: 'Builder', url: 'build-your-pc.html' },
        { title: 'Intel Core i7-14700K', description: '20 cores, 28 threads, LGA1700', category: 'Builder', url: 'build-your-pc.html' },
        { title: 'AMD Ryzen 7 7800X3D', description: '8 cores, 16 threads, AM5', category: 'Builder', url: 'build-your-pc.html' },
        { title: 'NVIDIA RTX 4080 SUPER', description: '16GB GDDR6X graphics card', category: 'Builder', url: 'build-your-pc.html' },
        { title: 'ASUS TUF Z790-PLUS WIFI', description: 'LGA1700, DDR5, ATX motherboard', category: 'Builder', url: 'build-your-pc.html' },
        { title: 'Gigabyte B650 AORUS ELITE AX', description: 'AM5, DDR5, ATX motherboard', category: 'Builder', url: 'build-your-pc.html' },

        { title: 'Login', description: 'Sign in to your account or create a new one.', category: 'Account', url: 'login.html' },
        { title: 'Dashboard', description: 'View your profile, orders, and saved builds.', category: 'Account', url: 'dashboard.html' }
    ];

    function createOverlay() {
        if (document.getElementById('search-overlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-modal" role="dialog" aria-modal="true">
                <div class="search-header">
                    <i class="fas fa-search"></i>
                    <input id="search-input" type="text" placeholder="Search products, services, parts..." />
                    <button id="search-close" class="search-close" aria-label="Close search">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="search-results" id="search-results"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSearch();
        });

        document.getElementById('search-close').addEventListener('click', closeSearch);
        document.getElementById('search-input').addEventListener('input', handleSearch);
    }

    function openSearch() {
        createOverlay();
        const overlay = document.getElementById('search-overlay');
        overlay.classList.add('open');
        const input = document.getElementById('search-input');
        input.value = '';
        renderResults([], 'Start typing to search the site.');
        setTimeout(() => input.focus(), 50);
    }

    function closeSearch() {
        const overlay = document.getElementById('search-overlay');
        if (overlay) overlay.classList.remove('open');
    }

    function handleSearch(e) {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
            renderResults([], 'Start typing to search the site.');
            return;
        }
        const results = SEARCH_INDEX.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        ).slice(0, 12);
        renderResults(results, results.length ? '' : 'No results found.');
    }

    function renderResults(results, emptyText) {
        const container = document.getElementById('search-results');
        if (!container) return;

        if (!results.length) {
            container.innerHTML = `<div class="search-empty">${emptyText}</div>`;
            return;
        }

        container.innerHTML = results.map(item => `
            <a class="search-result" href="${item.url}">
                <div class="search-result-title">${item.title}</div>
                <div class="search-result-desc">${item.description}</div>
                <div class="search-result-meta">${item.category}</div>
            </a>
        `).join('');
    }

    function bindTriggers() {
        const buttons = Array.from(document.querySelectorAll('.search-btn, .icon-btn'))
            .filter(btn => btn.querySelector('i.fa-search'));

        buttons.forEach(btn => {
            btn.addEventListener('click', openSearch);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
                e.preventDefault();
                openSearch();
            }
            if (e.key === 'Escape') {
                closeSearch();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        bindTriggers();
        createOverlay();
    });
})();
