function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

// Set the date on the page
document.getElementById('dateDisplay').textContent = formatDate(new Date());

// Retrieve username from localStorage and display welcome message
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
if (currentUser.username) {
    document.getElementById('welcomeMessage').textContent = `Dear, ${currentUser.username}! Welcome to Mega Cart...`;
} else {
    window.location.href = 'login.html';
}

// Logout functionality
document.getElementById('logoutLink').addEventListener('click', function() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
});

// Add click event to each image to add item to the cart
const itemsArray = JSON.parse(localStorage.getItem('items')) || [];
document.querySelectorAll('#categories img').forEach(img => {
    img.addEventListener('click', function() {
        const item = {
            name: this.dataset.name,
            image: this.src,
            cost: parseFloat(this.dataset.cost),
            deliveryDays: parseInt(this.dataset.delivery, 10)
        };
        itemsArray.push(item);
        localStorage.setItem('items', JSON.stringify(itemsArray));
        alert(`Added ${item.name} to your cart!`);
    });
});

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    document.querySelectorAll('#categories li').forEach(li => {
        const name = li.querySelector('p').textContent.toLowerCase();
        li.style.display = name.includes(searchText) ? 'block' : 'none';
    });
});

// Category filtering functionality
document.getElementById('categorySelect').addEventListener('change', function() {
    const category = this.value.toLowerCase();
    document.querySelectorAll('#categories li').forEach(li => {
        const name = li.querySelector('p').textContent.toLowerCase();
        li.style.display = category === 'all' || name.includes(category) ? 'block' : 'none';
    });
});

// Navigate to buy-item.html on clicking view cart button
document.getElementById('viewCartButton').addEventListener('click', function() {
    window.location.href = 'buy-item.html';
});