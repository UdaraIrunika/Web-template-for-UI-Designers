// =============================================
// NEWS & BLOG FUNCTIONALITY
// =============================================

/**
 * Filter news articles by category
 */
function filterNews(category) {
    const articles = document.querySelectorAll('.news-card');
    const buttons = document.querySelectorAll('.news-filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter articles
    articles.forEach(article => {
        if (category === 'all') {
            article.style.display = 'block';
            setTimeout(() => {
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
            }, 10);
        } else {
            const articleCategory = article.getAttribute('data-category');
            if (articleCategory === category) {
                article.style.display = 'block';
                setTimeout(() => {
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, 10);
            } else {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    article.style.display = 'none';
                }, 300);
            }
        }
    });
}

/**
 * Load more articles (placeholder for pagination)
 */
function loadMoreArticles() {
    alert('Loading more articles... (This would load additional articles from a backend in a real application)');
}

/**
 * Initialize news page
 */
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('news.html')) {
        initNewsAnimations();
    }
});

/**
 * Initialize scroll animations for news cards
 */
function initNewsAnimations() {
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

    const newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}
