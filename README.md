# Proyecto:🍔 Food Store

## ✍️ Descripción

Food Store es un proyecto de demostración de un catálogo y tienda de alimentos en línea, creado con fines educativos para ilustrar el flujo de trabajo con **Vite**, **TypeScript**, y el manejo del carrito de compras y catálogo.


---

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## ⚙️ ¿Cómo Funciona el proyecto?

La aplicación está diseñada con un menú lateral responsivo de categorías (que muestra íconos según la categoría) y un carrito con interacción en dos columnas. El mecanismo principal incluye:

    **Catálogo de Productos**: Renderiza las tarjetas de los productos con los colores de la paleta institucional (naranja/amarillo).
    **Búsqueda en tiempo real**: Filtra productos mediante un input integrado en el header.
    **Manejo del Carrito**: Permite añadir, sumar/restar cantidades y eliminar productos usando localStorage para la persistencia.
    **Resumen de Pedido**: Permite finalizar la compra de forma interactiva en la columna derecha.

---

## 📁 Estructura del Proyecto

```
📂 FoodStore
├── 📂 public
│   └── 📂 img                # Logos e imágenes de productos
├── 📂 src
│   ├── 📂 data
│   │   └── data.ts           # Array de objetos con la información de productos
│   ├── 📂 pages
│   │   ├── 📂 cart
│   │   │   ├── cart.html     # Estructura del carrito en 2 columnas
│   │   │   └── cart.ts       # Lógica: sumar/restar, eliminar y badge del header
│   │   └── 📂 store
│   │       ├── home.html     # Catálogo principal
│   │       └── home.ts       # Lógica: renderizado, filtros y búsqueda
│   ├── 📂 types
│   │   └── product.ts        # Interfaces (Product, CartItem, Category)
│   ├── 📂 utils
│   │   └── auth.ts           # Funciones de utilidad y validación
│   └── style.css             # Estilos globales y diseño responsivo
├── .gitignore                # Archivos ignorados por Git
├── index.html                # Punto de entrada principal
├── package.json              # Scripts y dependencias del proyecto
├── README.md                 # Documentación del proyecto (¡acá está!)
├── tsconfig.json             # Configuración de TypeScript
└── vite.config.ts            # Configuración del empaquetador Vite

```
