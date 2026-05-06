import type { CartItem } from "../../../types/product";

const cartItemsContainer = document.getElementById("cart-items") as HTMLElement;
const totalAmountLabel = document.getElementById("cart-total-amount") as HTMLElement;
const subtotalLabel = document.getElementById("cart-subtotal") as HTMLElement;
const emptyMsg = document.getElementById("empty-cart-msg") as HTMLElement;
const cartContent = document.getElementById("cart-content") as HTMLElement;
const cartNavCount = document.getElementById("cart-nav-count") as HTMLElement;

/**
 * Renderiza el carrito, calcula el total y actualiza el contador.
 */
const renderCart = (): void => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Actualizamos el número en el menú superior
    if (cartNavCount) {
        const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
        cartNavCount.textContent = `${totalItems}`;
    }

    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        if (cartContent) cartContent.style.display = "none";
        return;
    }

    if (cartContent) cartContent.style.display = "flex";
    emptyMsg.style.display = "none";
    cartItemsContainer.innerHTML = "";
    
    let totalGeneral = 0;

    cart.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalGeneral += subtotal;

        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card-item");

        cartCard.innerHTML = `
            <img src="/img/${item.imagen}" alt="${item.nombre}" class="cart-card-img" />
            <div class="cart-card-details">
                <h4>${item.nombre}</h4>
                <p class="cart-card-category">${item.categorias && item.categorias.length > 0 ? item.categorias[0].nombre : ''}</p>
                <span class="cart-card-price">$${item.precio.toLocaleString('es-AR')}</span>
            </div>
            <div class="cart-card-actions">
                <button class="btn-qty btn-minus" data-id="${item.id}">-</button>
                <span class="cart-qty-num">${item.cantidad}</span>
                <button class="btn-qty btn-plus" data-id="${item.id}">+</button>
                <button class="btn-remove-item" data-id="${item.id}">🗑️</button>
            </div>
            <div class="cart-card-subtotal">
                <span>Subtotal</span>
                <strong>$${subtotal.toLocaleString('es-AR')}</strong>
            </div>
        `;

        cartItemsContainer.appendChild(cartCard);
    });

    if (subtotalLabel) subtotalLabel.textContent = `$${totalGeneral.toLocaleString('es-AR')}`;
    if (totalAmountLabel) totalAmountLabel.textContent = `$${totalGeneral.toLocaleString('es-AR')}`;
};

/**
 * Modifica la cantidad de productos en el carrito.
 */
const updateQuantity = (id: number, change: number) => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = cart.findIndex(p => p.id === id);

    if (itemIndex !== -1) {
        cart[itemIndex].cantidad += change;
        if (cart[itemIndex].cantidad <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
};

/**
 * Elimina un producto entero del carrito.
 */
const removeItem = (id: number) => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
};

// Delegación de eventos para los botones
cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    
    // Obtenemos el ID del dataset
    const id = Number(target.getAttribute("data-id"));

    if (target.classList.contains("btn-plus")) {
        updateQuantity(id, 1);
    } else if (target.classList.contains("btn-minus")) {
        updateQuantity(id, -1);
    } else if (target.classList.contains("btn-remove-item")) {
        removeItem(id);
    }
});

// Botón para limpiar el carrito entero
document.getElementById("btn-clear-cart")?.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCart();
});

document.addEventListener("DOMContentLoaded", renderCart);