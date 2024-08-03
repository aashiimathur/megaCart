function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

document.getElementById('dateDisplay').textContent = formatDate(new Date());

const itemsArray = JSON.parse(localStorage.getItem('items')) || [];
const cartItemsTable = document.getElementById('cartItems');
let totalCost = 0;

function updateTotalCost() {
    totalCost = 0;
    const rows = cartItemsTable.querySelectorAll('tr');
    rows.forEach(row => {
        const cost = parseFloat(row.cells[2].textContent.replace('₹', ''));
        const quantity = parseInt(row.querySelector('.quantity').value, 10);
        totalCost += cost * quantity;
    });
    document.getElementById('totalCost').textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;
}

itemsArray.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.name}</td>
        <td><img src="${item.image}" alt="${item.name}" style="width: 100px; height: 60px; object-fit: cover;"></td>
        <td>₹${item.cost.toFixed(2)}</td>
        <td><input type="number" class="quantity" value="1" min="1"></td>
        <td>${item.deliveryDays}</td>
        <td><span class="remove-item">Remove</span></td>
    `;
    cartItemsTable.appendChild(row);
    updateTotalCost();
});

cartItemsTable.addEventListener('input', function(event) {
    if (event.target.classList.contains('quantity')) {
        updateTotalCost();
    }
});

cartItemsTable.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const row = event.target.closest('tr');
        const itemName = row.cells[0].textContent;
        const itemCost = parseFloat(row.cells[2].textContent.replace('₹', ''));
        const quantity = parseInt(row.querySelector('.quantity').value, 10);
        totalCost -= itemCost * quantity;
        document.getElementById('totalCost').textContent = `Total Cost: ₹${totalCost.toFixed(2)}`;

        const updatedItems = itemsArray.filter(item => item.name !== itemName);
        localStorage.setItem('items', JSON.stringify(updatedItems));

        row.remove();
    }
});

document.getElementById('checkoutButton').addEventListener('click', function() {
    alert('Thank you for your purchase!');
    localStorage.removeItem('items');
    window.location.href = 'main.html';
});