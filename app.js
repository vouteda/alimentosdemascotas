let selectedProduct = {};

// Show the order form with selected product details
function showOrderForm(button) {
  const card = button.closest('.product-card');
  const productName = card.querySelector('h3').innerText;
  const productPrice = parseFloat(card.querySelector('.size-dropdown').value);

  selectedProduct = {
    name: productName,
    price: productPrice,
    quantity: 1 // Default quantity
  };

  // Populate the order form
  document.getElementById('producto').value = productName;
  document.getElementById('precio').value = productPrice;
  document.getElementById('cantidad').value = 1;
  document.getElementById('orderForm').style.display = 'block';

  updateSubtotal(); // Call subtotal function
}

// Update subtotal on quantity change
function updateSubtotal() {
  const quantity = parseInt(document.getElementById('cantidad').value, 10) || 1;
  selectedProduct.quantity = quantity;

  const subtotal = calculateSubtotal(selectedProduct.price, quantity);
  document.getElementById('subtotal').innerText = `Subtotal: $${subtotal}`;
}

// Add selected product to cart
function addToCart() {
  const { name, price, quantity } = selectedProduct;

  if (!name || !price || !quantity) {
    alert("Completa todos los campos del formulario.");
    return;
  }

  const carritoContainer = document.getElementById("carritoContainer");
  const cartItemsContainer = document.getElementById("cartItems");
  const finalizarCompraBtn = document.getElementById("finalizarCompraBtn");

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <div>
      <strong>${name}</strong> <br>
      Cantidad: ${quantity} - Precio: $${price.toFixed(2)}
    </div>
    <button class="remove-btn" onclick="removeCartItem(this)">
      <i class="fa fa-trash"></i> Eliminar
    </button>
  `;

  cartItemsContainer.appendChild(cartItem);
  carritoContainer.insertBefore(cartItemsContainer, finalizarCompraBtn);

  document.getElementById('orderForm').style.display = 'none';
}

// Remove item from cart
function removeCartItem(button) {
  button.parentElement.remove();
}

// Handle promo code modal display on load
window.onload = function () {
  document.getElementById('promoModal').style.display = 'flex';
};

// Generate and display promo code
function generatePromoCode() {
  const email = document.getElementById('emailInput').value;
  if (email) {
    const promoCode = generatePromo(); // Call function from data.js
    localStorage.setItem('promoCode', promoCode);
    document.getElementById('promoCodeDisplay').textContent = `Tu código de descuento es: ${promoCode}`;
  } else {
    alert('Por favor ingresa tu email');
  }
}

// Apply discount and update subtotal
function applyDiscount() {
  const promoCode = document.getElementById('promoCode').value.trim();
  const savedPromoCode = localStorage.getItem('promoCode');
  const cantidad = parseInt(document.getElementById('cantidad').value, 10) || 1;

  if (!selectedProduct.price) return;

  const discountedPrice = applyDiscountCode(selectedProduct.price, promoCode, savedPromoCode); // Call function from data.js
  const subtotal = calculateSubtotal(discountedPrice, cantidad);

  // Update UI
  document.getElementById('subtotal').textContent = `Subtotal: $${subtotal}`;
  selectedProduct.price = discountedPrice; // Update product with discounted price
  selectedProduct.quantity = cantidad;
}

// Close the promo modal
function closeModal() {
  document.getElementById('promoModal').style.display = 'none';
}

// Complete purchase flow
function completePurchase() {
  let emailInput = localStorage.getItem('userEmail');

  if (!emailInput) {
    emailInput = prompt("Por favor ingresa tu email para completar la compra:");
    if (emailInput) {
      localStorage.setItem('userEmail', emailInput);
      alert(`Se ha enviado un email a ${emailInput} con los detalles para finalizar y pagar la compra.`);
    } else {
      alert("No se puede completar la compra sin un email válido.");
    }
    return;
  }

  alert(`Se ha enviado un email a ${emailInput} con los detalles para finalizar y pagar la compra.`);
}
