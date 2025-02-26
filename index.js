// Product data
const products = [
  {
    id: 1,
    name: "Brown Rice",
    image: "./images/Brown Rice.webp",
    description:
      "Brown rice is widely recognized for its nutritive alternative to white rice. That's because it is a whole grain.",
    rating: 3.5,
    price: 24.99,
  },
  {
    id: 2,
    name: "Buckwheats",
    image: "./images/Buckwheats.webp",
    description:
      "Buckwheat or common buckwheat is a plant cultivated for its grain-like seeds and as a cover crop. It's grown-like seeds and as a cover crop.",
    rating: 3.5,
    price: 19.99,
  },
  {
    id: 3,
    name: "Wheat",
    image: "./images/Wheat.webp",
    description:
      "Wheat is a cereal grain that is grown all over the world. Together with rice, it is a major source of food for humans and animals.",
    rating: 3.5,
    price: 14.99,
  },
  {
    id: 4,
    name: "Wild Rice",
    image: "./images/Wild Rice.webp",
    description:
      "Wild rice is North America, specifically Minnesota and Ontario. Wild rice was a staple part of the indigenous peoples of that region.",
    rating: 3.5,
    price: 29.99,
  },
  {
    id: 5,
    name: "Basmati Rice",
    image: "./images/Basmati Rice.webp",
    description:
      "Premium long-grain rice known for its distinctive aroma and fluffy texture when cooked.",
    rating: 4.0,
    price: 27.99,
  },
  {
    id: 6,
    name: "Quinoa",
    image: "./images/Quinoa.webp",
    description:
      "A nutrient-rich pseudocereal that contains all nine essential amino acids, making it a complete protein source.",
    rating: 4.5,
    price: 21.99,
  },
  {
    id: 7,
    name: "Jasmine Rice",
    image: "./images/jasmine.webp",
    description:
      "Fragrant Thai rice variety with a subtle floral aroma that pairs excellently with Asian dishes.",
    rating: 3.8,
    price: 18.99,
  },
  {
    id: 8,
    name: "Sorghum",
    image: "./images/sorghum.webp",
    description:
      "Ancient grain that's naturally gluten-free and rich in antioxidants, perfect for diverse culinary applications.",
    rating: 3.7,
    price: 16.99,
  },
];

// Function to create product cards
function renderProducts() {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = ""; // Clear existing content

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">
                    <span class="rating-badge">${product.rating}</span>
                    <span class="star">★</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add To Cart</button>
                    <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
                </div>
            </div>
        `;

    productContainer.appendChild(productCard);
  });
}

// Cart functionality
let cart = [];

function addToCart(productId) {
  // Check if user is logged in
  if (!isUserLoggedIn()) {
    alert("Please sign in to add items to your cart.");
    document.getElementById("signInModal").style.display = "block";
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (product) {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();
    alert(`${product.name} added to cart!`);
  }
}

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function buyNow(productId) {
  // Check if user is logged in
  if (!isUserLoggedIn()) {
    alert("Please sign in to purchase items.");
    document.getElementById("signInModal").style.display = "block";
    return;
  }

  const product = products.find((p) => p.id === productId);
  if (product) {
    alert(`Proceeding to checkout for ${product.name}!`);
    // In a real app, this would redirect to a checkout page
  }
}

// Search functionality
document
  .querySelector(".search-bar input")
  .addEventListener("keyup", function (e) {
    const searchTerm = e.target.value.toLowerCase();

    // Filter products based on search term
    const filteredProducts = searchTerm
      ? products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        )
      : products;

    // Clear the product container
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = "";

    // If no products match, show message
    if (filteredProducts.length === 0) {
      const noResults = document.createElement("div");
      noResults.className = "no-results";
      noResults.textContent = "No products match your search.";
      productContainer.appendChild(noResults);
      return;
    }

    // Render filtered products
    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
                <div class="product-title">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-rating">
                    <span class="rating-badge">${product.rating}</span>
                    <span class="star">★</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add To Cart</button>
                    <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
                </div>
            </div>
        `;

      productContainer.appendChild(productCard);
    });
  });

// Cart modal functionality
document.getElementById("cartButton").addEventListener("click", function (e) {
  e.preventDefault();

  // Check if user is logged in
  if (!isUserLoggedIn()) {
    alert("Please sign in to view your cart.");
    document.getElementById("signInModal").style.display = "block";
    return;
  }

  // Populate cart modal
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById("cartTotal").textContent = "Total: $0.00";
  } else {
    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} x ${
        item.quantity
      }</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${
                  item.id
                })">Remove</button>
            `;

      cartItems.appendChild(cartItem);
    });

    document.getElementById("cartTotal").textContent = `Total: $${total.toFixed(
      2
    )}`;
  }

  document.getElementById("cartModal").style.display = "block";
});

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartCount();

    // Refresh cart modal
    document.getElementById("cartButton").click();
  }
}

document.getElementById("closeCart").addEventListener("click", function () {
  document.getElementById("cartModal").style.display = "none";
});

document.getElementById("checkoutBtn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Proceeding to checkout!");
  // In a real app, this would redirect to a checkout page
});

// Load page content when DOM is loaded
window.addEventListener("DOMContentLoaded", function () {
  // Set a placeholder for the banner (in a real app would be a real image URL)
  document.getElementById("banner-img").src =
    "https://api.placeholder.com/1200/400";

  // Render products
  renderProducts();

  // Update cart count
  updateCartCount();
});

// Helper function to check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem("currentUser") !== null;
}
