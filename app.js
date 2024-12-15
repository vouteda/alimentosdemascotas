let selectedProduct = {};

function showOrderForm(button) {
  const card = button.closest('.product-card');
  const productName = card.querySelector('h3').innerText;
  const productPrice = card.querySelector('.size-dropdown').value;

  selectedProduct = {
    name: productName,
    price: productPrice
  };

  document.getElementById('producto').value = productName;
  document.getElementById('precio').value = productPrice;
  document.getElementById('cantidad').value = 1;

  document.getElementById('orderForm').style.display = 'block';
  calculateSubtotal();
}

function calculateSubtotal() {
  const quantity = parseInt(document.getElementById('cantidad').value, 10);
  const price = parseFloat(document.getElementById('precio').value);
  const subtotal = quantity * price;
  document.getElementById('subtotal').innerText = `Subtotal: $${subtotal}`;
}

function addToCart() {
    const productName = document.getElementById('producto').value;
    const quantity = document.getElementById('cantidad').value;
    const price = document.getElementById('precio').value;
  
    if (!productName || !quantity || !price) {
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
        <strong>${productName}</strong> <br>
        Cantidad: ${quantity} - Precio: $${price}
      </div>
      <button class="remove-btn" onclick="removeCartItem(this)">
        <i class="fa fa-trash"></i> Eliminar
      </button>
    `;
  
    cartItemsContainer.appendChild(cartItem); 
    carritoContainer.insertBefore(cartItemsContainer, finalizarCompraBtn);
    
    document.getElementById('orderForm').style.display = 'none';
  }
  
  window.onload = function() {
    document.getElementById('promoModal').style.display = 'flex';
};

function generatePromoCode() {
  const email = document.getElementById('emailInput').value;
  if (email) {
      const promoCode = Math.random().toString(36).substring(2, 11).toUpperCase();
      localStorage.setItem('promoCode', promoCode);
      document.getElementById('promoCodeDisplay').textContent = `Tu codigo de descuento es: ${promoCode}`;
  } else {
      alert('Por favor ingresa tu email');
  }
}

function applyDiscount() {
  const promoCode = document.getElementById('promoCode').value.trim();
  const PromoCodeGuardado = localStorage.getItem('promoCode');
  const cantidad = parseInt(document.getElementById('cantidad').value, 10) || 1;
  let precio = parseFloat(document.getElementById('precio').value.replace('$', ''));

  if (isNaN(precio)) {
      precio = 0;
  }

  let discount = 0;
  if (promoCode === PromoCodeGuardado) {
      descuento = 0.1 * precio;
  }

  const subtotal = (precio - descuento) * cantidad;
  document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

function closeModal() {
  document.getElementById('promoModal').style.display = 'none';
}

function removeCartItem(button) {
  button.parentElement.remove();
}

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


