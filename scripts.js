document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the page data attribute
            const page = this.getAttribute('data-page');
            
            // Here you can add logic to load different content based on the page
            console.log(`Loading ${page} content`);
        });
    });
});

// Extended product data with more details
const products = [
    { id: 1, name: "Modern Chair", price: 199.99, image: "#", 
      description: "Sleek and comfortable chair with ergonomic design.", category: "Furniture" },
    { id: 2, name: "Stylish Lamp", price: 89.99, image: "#", 
      description: "Elegant lamp with adjustable brightness for ambient lighting.", category: "Lighting" },
    { id: 3, name: "Minimalist Desk", price: 299.99, image: "#", 
      description: "Spacious desk with clean lines and ample storage.", category: "Furniture" },
    { id: 4, name: "Cozy Rug", price: 149.99, image: "#", 
      description: "Soft and plush rug to add warmth to any room.", category: "Home Decor" },
    { id: 5, name: "Abstract Painting", price: 399.99, image: "#", 
      description: "Vibrant abstract artwork to liven up your walls.", category: "Art" },
    { id: 6, name: "Smart Speaker", price: 129.99, image: "#", 
      description: "High-quality speaker with voice control and smart home integration.", category: "Electronics" }
];

let cart = [];

// Render all sections on a single page
function renderAllSections() {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <section id="home" class="mb-16">
            <h2 class="text-4xl font-bold mb-8 text-center">Welcome to Modern Store</h2>
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <p class="text-xl mb-4">Discover our curated collection of modern and stylish products.</p>
                <a href="#products" class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">Shop Now</a>
            </div>
        </section>

        <section id="products" class="mb-16">
            <h2 class="text-4xl font-bold mb-8 text-center">Our Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${products.map(product => `
                    <div class="bg-white p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
                        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                        <p class="text-gray-600 mb-2">${product.category}</p>
                        <p class="text-gray-700 mb-4">${product.description}</p>
                        <p class="text-indigo-600 font-bold mb-4">$${product.price.toFixed(2)}</p>
                        <button onclick="addToCart(${product.id})" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </section>

        <section id="about" class="mb-16">
            <h2 class="text-4xl font-bold mb-8 text-center">About Us</h2>
            <div class="bg-white p-8 rounded-lg shadow-lg">
                <p class="text-xl mb-4">We are passionate about bringing you the best in modern design and functionality.</p>
                <p class="text-xl">Our curated selection ensures that you'll find unique and high-quality products for your home and lifestyle.</p>
            </div>
        </section>

        <section id="contact" class="mb-16">
            <h2 class="text-4xl font-bold mb-8 text-center">Contact Us</h2>
            <form id="contact-form" class="bg-white p-8 rounded-lg shadow-lg">
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" class="w-full px-3 py-2 border rounded-md" required>
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" class="w-full px-3 py-2 border rounded-md" required>
                </div>
                <div class="mb-4">
                    <label for="message" class="block text-gray-700 text-sm font-bold mb-2">Message</label>
                    <textarea id="message" class="w-full px-3 py-2 border rounded-md" rows="4" required></textarea>
                </div>
                <button type="submit" class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">Send Message</button>
            </form>
        </section>

        <section id="cart" class="mb-16">
            <h2 class="text-4xl font-bold mb-8 text-center">Your Cart</h2>
            <div id="cart-items" class="space-y-4">
                <!-- Cart items will be dynamically inserted here -->
            </div>
            <div class="mt-8">
                <p class="text-2xl font-bold">Total: $<span id="cart-total">0</span></p>
                <button id="checkout-btn" class="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">Checkout</button>
            </div>
        </section>
    `;

    // Add event listeners
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    updateCartCount();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <div>
                <h4 class="font-bold">${item.name}</h4>
                <p class="text-gray-600">${item.category}</p>
            </div>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Update cart count in header
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
}

// Handle checkout
function handleCheckout() {
    alert('Thank you for your purchase!');
    cart = [];
    updateCart();
    updateCartCount();
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Navigation
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = e.target.getAttribute('data-page');
        scrollToSection(sectionId);
    });
});

// Initialize the page
renderAllSections();
updateCartCount();
