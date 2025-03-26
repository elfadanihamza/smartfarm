document.addEventListener('DOMContentLoaded', function() {
    // Product image gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const imageUrl = this.getAttribute('data-image');
            mainImage.src = imageUrl;
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add review button
    const addReviewBtn = document.getElementById('add-review');
    
    addReviewBtn.addEventListener('click', function() {
        const reviewForm = document.createElement('div');
        reviewForm.className = 'review-form';
        reviewForm.innerHTML = `
            <h3>Ajouter un avis</h3>
            <form id="new-review">
                <div class="form-group">
                    <label for="review-name">Votre nom</label>
                    <input type="text" id="review-name" required>
                </div>
                <div class="form-group">
                    <label for="review-rating">Note</label>
                    <select id="review-rating" required>
                        <option value="">Sélectionnez...</option>
                        <option value="5">5 étoiles</option>
                        <option value="4">4 étoiles</option>
                        <option value="3">3 étoiles</option>
                        <option value="2">2 étoiles</option>
                        <option value="1">1 étoile</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="review-title">Titre</label>
                    <input type="text" id="review-title" required>
                </div>
                <div class="form-group">
                    <label for="review-content">Votre avis</label>
                    <textarea id="review-content" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn">Envoyer l'avis</button>
            </form>
        `;
        
        this.parentNode.insertBefore(reviewForm, this);
        this.style.display = 'none';
        
        // Handle form submission
        document.getElementById('new-review').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value;
            const rating = parseInt(document.getElementById('review-rating').value);
            const title = document.getElementById('review-title').value;
            const content = document.getElementById('review-content').value;
            
            // Create new review element
            const newReview = document.createElement('div');
            newReview.className = 'review';
            newReview.innerHTML = `
                <div class="review-header">
                    <div class="review-author">
                        <img src="images/user-placeholder.jpg" alt="${name}">
                        <h4>${name}</h4>
                    </div>
                    <div class="review-rating">
                        ${'<i class="fas fa-star"></i>'.repeat(rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - rating)}
                    </div>
                </div>
                <div class="review-content">
                    <h3>${title}</h3>
                    <p>${content}</p>
                    <div class="review-date">Posté le ${new Date().toLocaleDateString('fr-FR')}</div>
                </div>
            `;
            
            // Insert new review
            document.querySelector('.product-reviews .container').insertBefore(
                newReview,
                document.querySelector('.product-reviews .container').firstChild.nextSibling
            );
            
            // Remove form and show button again
            this.parentNode.removeChild(this);
            addReviewBtn.style.display = 'block';
            
            // Show success message
            showNotification('Merci pour votre avis!');
        });
    });
});