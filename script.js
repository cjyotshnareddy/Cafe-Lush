// let menubar = document.querySelector('#menu-bar')
// let nav = document.querySelector('.navbar')


// menubar.onclick = () =>{
//     menubar.classList.toggle('fa-times')
//     nav.classList.toggle('active')
  
    
// }



const sr = ScrollReveal ({
    distance : '45px',
    duration : 2700,
    reset : false,
  })

sr.reveal('.photo',{ delay:350, origin:'left' })
 sr.reveal('.aboutt',{ delay:350, origin:'right' })
 sr.reveal('.abtpara',{ delay:350, origin:'right' })
//   sr.reveal('.home-image',{ delay:350, origin:'left' })
//   sr.reveal('.home-text-content',{ delay:350, origin:'right' })

//   sr.reveal('.quality-content',{ delay:350, origin:'left' })
//   sr.reveal('.qulity-image',{ delay:350, origin:'right' })
//   sr.reveal('.gallery-image',{ delay:350, origin:'top' })
  sr.reveal('.menu-food-content',{ delay:350, origin:'top' })
  sr.reveal('.menu-food-text',{ delay:350, origin:'bottom' })
  sr.reveal('.food-main-content',{ delay:350, origin:'bottom' })
//   sr.reveal('.before',{ delay:350, origin:'bottom' })
//   sr.reveal('.footer-logo',{ delay:350, origin:'bottom' })
sr.reveal('.mapp',{ delay:350, origin:'left' })
 sr.reveal('.cont',{ delay:350, origin:'right' })
sr.reveal('.photoo',{ delay:350, origin:'right' })


let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render cart items
function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('cart-total-price');

    cartContainer.innerHTML = '';

  
    let totalPrice = 0;

    cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h3>${item.name} (Rs.${item.price})</h3>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

   
    totalPriceElement.textContent = totalPrice;
}

// Function to add items to the cart
function addToCart(name, price) {
    const existingItemIndex = cart.findIndex(item => item.name === name);

    // If the item already exists in the cart, increase its quantity
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        // Otherwise, add the item to the cart
        cart.push({ name, price, quantity: 1 });
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Re-render the cart
    renderCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseInt(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});


document.getElementById('cart-container').addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', function () {
    window.location.href = 'order.html';
});

// Populate order summary on order.html page
if (window.location.pathname.endsWith('order.html')) {
    function populateOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderItemsContainer = document.getElementById('order-items');
        const totalPriceElement = document.getElementById('total-price');
        let totalPrice = 0;

        orderItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = `${item.name}: Rs. ${item.price} x ${item.quantity}`;
            orderItemsContainer.appendChild(itemElement);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = `Rs. ${totalPrice}`;
    }

    // Call populateOrderSummary when the page loads
    window.onload = populateOrderSummary;
}
