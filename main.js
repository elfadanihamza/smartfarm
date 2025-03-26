// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Feature dots navigation
    const featureDots = document.querySelectorAll('.feature-dots .dot');
    const featureContents = document.querySelectorAll('.feature-content');
    
    featureDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const featureId = this.getAttribute('data-feature');
            
            // Remove active class from all dots and contents
            featureDots.forEach(d => d.classList.remove('active'));
            featureContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked dot and corresponding content
            this.classList.add('active');
            document.getElementById(featureId).classList.add('active');
        });
    });
    
    // Testimonial slider
    const testimonialDots = document.querySelectorAll('.slider-dots .dot');
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');
            
            // Remove active class from all dots and testimonials
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonials.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked dot and corresponding testimonial
            this.classList.add('active');
            testimonials[slideIndex].classList.add('active');
        });
    });
    
    // Update cart count
    updateCartCount();
});

// Cart functionality
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Add to cart
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        
        const productId = e.target.getAttribute('data-id');
        const productName = e.target.closest('.product-card') ? 
            e.target.closest('.product-card').querySelector('h3').textContent : 
            e.target.closest('.product-info').querySelector('h2').textContent;
        const productPrice = e.target.closest('.product-card') ? 
            parseFloat(e.target.closest('.product-card').querySelector('.price').textContent.replace('€', '')) : 
            parseFloat(e.target.closest('.product-info').querySelector('.price').textContent.replace('€', ''));
        const quantity = e.target.closest('.product-info') ? 
            parseInt(document.getElementById('quantity').value) : 1;
        
        addToCart(productId, productName, productPrice, quantity);
    }
});

function addToCart(id, name, price, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    showNotification(`${name} ajouté au panier`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}