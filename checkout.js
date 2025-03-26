document.addEventListener('DOMContentLoaded', function() {
    // Payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            const methodType = this.getAttribute('data-method');
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
            
            document.getElementById(`${methodType}-form`).style.display = 'block';
        });
    });
    
    // Form submission
    const paymentForm = document.getElementById('payment-form');
    
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }
        
        // Process payment
        processPayment();
    });
    
    // Load cart items
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderOrderSummary(cart);
});

function validateForm() {
    let isValid = true;
    const inputs = document.querySelectorAll('#payment-form input[required], #payment-form select[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--error)';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (!document.getElementById('terms').checked) {
        alert('Veuillez accepter les conditions générales de vente');
        return false;
    }
    
    return isValid;
}

function processPayment() {
    const submitBtn = document.querySelector('.submit-payment');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Redirect to thank you page
        window.location.href = 'thank-you.html';
    }, 2000);
}

function renderOrderSummary(cart) {
    const summaryItems = document.querySelector('.summary-items');
    let subtotal = 0;
    
    summaryItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <div class="item-name">${item.name} × ${item.quantity}</div>
            <div class="item-price">€${itemTotal.toFixed(2)}</div>
        `;
        summaryItems.appendChild(itemElement);
    });
    
    // Add shipping
    const shipping = 9.99;
    const total = subtotal + shipping;
    
    const shippingElement = document.createElement('div');
    shippingElement.className = 'summary-item';
    shippingElement.innerHTML = `
        <div class="item-name">Livraison</div>
        <div class="item-price">€${shipping.toFixed(2)}</div>
    `;
    summaryItems.appendChild(shippingElement);
    
    // Update total
    document.querySelector('.summary-total div:last-child').textContent = `€${total.toFixed(2)}`;
    
    // Update payment button
    document.querySelector('.submit-payment').textContent = `Payer €${total.toFixed(2)}`;
}