let selectedProduct = {};

function calculateSubtotal() {
  const quantity = parseInt(document.getElementById('cantidad').value, 10);
  const price = parseFloat(document.getElementById('precio').value);
  const subtotal = quantity * price;
  document.getElementById('subtotal').innerText = `Subtotal: $${subtotal}`;
}

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
    discount = 0.1 * precio;
  }

  const subtotal = (precio - discount) * cantidad;
  document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
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
