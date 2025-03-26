document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    
    // Render cart items
    renderCartItems(cart);
    
    // Quantity buttons
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            const itemElement = e.target.closest('.cart-item');
            const itemId = itemElement.getAttribute('data-id');
            const quantityInput = itemElement.querySelector('.quantity-input');
            let quantity = parseInt(quantityInput.value);
            
            if (e.target.classList.contains('minus') && quantity > 1) {
                quantity--;
            } else if (e.target.classList.contains('plus')) {
                quantity++;
            }
            
            quantityInput.value = quantity;
            updateCartItem(itemId, quantity);
        }
        
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const itemElement = e.target.closest('.cart-item');
            const itemId = itemElement.getAttribute('data-id');
            removeCartItem(itemId);
        }
    });
});

function renderCartItems(cart) {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary .summary-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartSummary.innerHTML = '';
        updateCartSummary(0, 0);
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    cartSummary.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Cart item
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.setAttribute('data-id', item.id);
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="images/product${item.id}-thumb.jpg" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="price">€${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                    <button class="quantity-btn plus">+</button>
                </div>
            </div>
            <div class="item-total">
                <p>€${itemTotal.toFixed(2)}</p>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        
        // Summary item
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <div class="item-name">${item.name} × ${item.quantity}</div>
            <div class="item-price">€${itemTotal.toFixed(2)}</div>
        `;
        cartSummary.appendChild(summaryItem);
    });
    
    updateCartSummary(subtotal, 9.99); // 9.99€ shipping
}

function updateCartItem(itemId, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(cart);
    }
}

function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    renderCartItems(cart);
    updateCartCount();
}

function updateCartSummary(subtotal, shipping) {
    const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
    const shippingElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    
    subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    shippingElement.textContent = `€${shipping.toFixed(2)}`;
    totalElement.textContent = `€${(subtotal + shipping).toFixed(2)}`;
    
    // Update checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.textContent = `Passer à la commande €${(subtotal + shipping).toFixed(2)}`;
}