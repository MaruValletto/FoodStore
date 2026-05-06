import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product, CartItem } from "../../../types/product";

// 1. Capturamos el contenedor del HTML donde irán los productos
const productGrid = document.getElementById("product-grid") as HTMLElement;

/**
 * Función encargada de limpiar el contenedor y dibujar las tarjetas de productos
 * @param productsList - Array de productos a mostrar
 */
const renderProducts = (productsList: Product[]): void => {
    // Limpiamos el contenido previo para que no se dupliquen al filtrar
    productGrid.innerHTML = "";

    productsList.forEach(product => {
        // Creamos el elemento de la tarjeta
        const productCard = document.createElement("article");
        productCard.classList.add("product-card");

        // Estructura interna de la tarjeta
        productCard.innerHTML = `
            <img src="/img/${product.imagen}" alt="${product.nombre}" class="product-img">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
                <div class="product-footer">
                    <span class="price">$${product.precio.toLocaleString('es-AR')}</span>
                    <button class="btn-add" data-id="${product.id}">Agregar</button>
                </div>
            </div>
        `;

        // Inyectamos la tarjeta en la grilla
        productGrid.appendChild(productCard);
    });
};

// 2. Ejecutamos el renderizado inicial con todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(PRODUCTS);
});

// 3. Lógica de Búsqueda
const searchInput = document.getElementById("search-input") as HTMLInputElement;

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Filtramos los productos cuyo nombre contenga el término buscado
    const filteredProducts = PRODUCTS.filter(product => 
        product.nombre.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length === 0) {
        productGrid.innerHTML = `<p>No se encontraron productos que coincidan con "${searchTerm}"</p>`;
    } else {
        renderProducts(filteredProducts);
    }
});

// 4. Lógica de Categorías (Tarjetas con íconos asignados)
const categoryList = document.getElementById("category-list") as HTMLElement;

// Diccionario para asignar el emoji correcto a cada categoría
const categoryIcons: { [key: string]: string } = {
    "Pizzas": "🍕",
    "Hamburguesas": "🍔",
    "Bebidas": "🥤",
    "Postres": "🍰",
    "Empanadas": "🥟",
    "Ensaladas": "🥗",
    "Todos los productos": "🍽️"
};

const renderCategories = (): void => {
    // Limpiamos el contenedor
    categoryList.innerHTML = "";
    const categories = getCategories();
    
    // Agregamos la opción para volver a ver "Todos"
    const allOption = document.createElement("div");
    const allIcon = categoryIcons["Todos los productos"] || "🍽️";
    allOption.innerHTML = `${allIcon} Todos los productos`;
    allOption.classList.add("category-card-item");
    
    allOption.addEventListener("click", () => renderProducts(PRODUCTS));
    categoryList.appendChild(allOption);

    // Generamos las tarjetas para cada categoría y le agregamos el ícono correspondiente
    categories.forEach((cat) => {
        const card = document.createElement("div");
        const icon = categoryIcons[cat.nombre] || "🏷️"; // Ícono por defecto si no lo encuentra
        
        card.innerHTML = `${icon} ${cat.nombre}`;
        card.classList.add("category-card-item");

        card.addEventListener("click", () => {
            const filtered = PRODUCTS.filter(p => 
                p.categorias.some(c => c.id === cat.id)
            );
            renderProducts(filtered);
        });

        categoryList.appendChild(card);
    });
};

// 5. Actualizamos el DOMContentLoaded para cargar también las categorías
document.addEventListener("DOMContentLoaded", () => {
    renderProducts(PRODUCTS);
    renderCategories(); 
});

/**
 * Agregar productos al carrito
 * Gestiona la persistencia en localStorage y evita duplicados
 */
const addToCart = (productId: number): void => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Si existe, aumentamos su cantidad 
        existingItem.cantidad += 1;
    } else {
        const productToAdd = PRODUCTS.find(p => p.id === productId);
        if (productToAdd) {
            // Lo agregamos con cantidad inicial 1
            cart.push({ ...productToAdd, cantidad: 1 });
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("¡Producto añadido al carrito!");
};

/**
 * Escuchador de clics delegado
 * Usamos delegación de eventos para capturar clics en botones creados dinámicamente
 */
productGrid.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    
    // Verificamos si lo que se clickeó es el botón de agregar
    if (target.classList.contains("btn-add")) {
        const id = Number(target.getAttribute("data-id"));
        addToCart(id);
    }
});