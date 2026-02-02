(function () {
    const STORAGE_KEY = 'nexus_currency_settings';
    const RATES_KEY = 'nexus_currency_rates';
    const RATES_TTL = 12 * 60 * 60 * 1000; // 12 hours
    const DEFAULT_CURRENCY = 'USD';

    const state = {
        code: DEFAULT_CURRENCY,
        rate: 1,
        rates: {}
    };

    function loadSettings() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved && saved.code) {
                state.code = saved.code;
            }
        } catch (e) {
            state.code = DEFAULT_CURRENCY;
        }
    }

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ code: state.code }));
    }

    function loadCachedRates() {
        try {
            const cached = JSON.parse(localStorage.getItem(RATES_KEY));
            if (cached && cached.timestamp && cached.rates && (Date.now() - cached.timestamp) < RATES_TTL) {
                return cached.rates;
            }
        } catch (e) {
            return null;
        }
        return null;
    }

    async function fetchRates() {
        const cached = loadCachedRates();
        if (cached) {
            state.rates = cached;
            updateRate();
            return;
        }

        try {
            const response = await fetch('https://open.er-api.com/v6/latest/USD');
            const data = await response.json();
            if (data && data.rates) {
                state.rates = data.rates;
                localStorage.setItem(RATES_KEY, JSON.stringify({
                    timestamp: Date.now(),
                    rates: data.rates
                }));
            }
        } catch (e) {
            state.rates = { USD: 1 };
        }

        updateRate();
    }

    function updateRate() {
        state.rate = state.rates[state.code] || 1;
        updateCurrencyDisplays();
        document.dispatchEvent(new CustomEvent('nexusCurrencyChanged'));
    }

    function formatCurrency(amountUSD) {
        const value = (amountUSD || 0) * state.rate;
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: state.code,
                maximumFractionDigits: 2
            }).format(value);
        } catch (e) {
            return `${state.code} ${value.toFixed(2)}`;
        }
    }

    function updateCurrencyDisplays() {
        document.querySelectorAll('[data-usd-price]').forEach(el => {
            const usd = parseFloat(el.getAttribute('data-usd-price') || '0');
            el.textContent = formatCurrency(usd);
        });

        document.querySelectorAll('[data-usd-total]').forEach(el => {
            const usd = parseFloat(el.getAttribute('data-usd-total') || '0');
            el.textContent = formatCurrency(usd);
        });

        const currencyLabel = document.getElementById('currency-label');
        if (currencyLabel) {
            currencyLabel.textContent = state.code;
        }
    }

    function createCurrencySelector() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions || document.getElementById('currency-select')) return;

        const wrapper = document.createElement('div');
        wrapper.className = 'currency-selector';
        wrapper.style.cssText = 'display:flex; align-items:center; gap:8px; margin-right:10px;';

        const label = document.createElement('span');
        label.id = 'currency-label';
        label.style.cssText = 'font-size:0.85rem; color:var(--gray);';
        label.textContent = state.code;

        const select = document.createElement('select');
        select.id = 'currency-select';
        select.style.cssText = 'background: rgba(255,255,255,0.08); color: var(--light); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 6px 8px; font-size: 0.85rem;';

        const setOptions = () => {
            const codes = Object.keys(state.rates).sort();
            select.innerHTML = '';
            codes.forEach(code => {
                const option = document.createElement('option');
                option.value = code;
                option.textContent = code;
                if (code === state.code) option.selected = true;
                select.appendChild(option);
            });
        };

        select.addEventListener('change', () => {
            state.code = select.value;
            saveSettings();
            updateRate();
        });

        wrapper.appendChild(select);
        wrapper.appendChild(label);
        navActions.insertBefore(wrapper, navActions.firstChild);

        if (Object.keys(state.rates).length > 0) {
            setOptions();
        } else {
            const option = document.createElement('option');
            option.value = 'USD';
            option.textContent = 'USD';
            select.appendChild(option);
        }

        const observer = new MutationObserver(() => {
            if (Object.keys(state.rates).length > 0) {
                setOptions();
            }
        });
        observer.observe(select, { childList: true });
    }

    window.nexusCurrency = {
        get code() { return state.code; },
        get rate() { return state.rate; },
        format: formatCurrency,
        update: updateCurrencyDisplays
    };

    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();
        createCurrencySelector();
        fetchRates();
    });
})();
