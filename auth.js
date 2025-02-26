// User authentication functionality

// Modal elements
const signUpModal = document.getElementById("signUpModal");
const signInModal = document.getElementById("signInModal");
const closeSignUp = document.getElementById("closeSignUp");
const closeSignIn = document.getElementById("closeSignIn");
const signUpBtn = document.getElementById("signUpBtn");
const signInBtn = document.getElementById("signInBtn");
const switchToSignIn = document.getElementById("switchToSignIn");
const switchToSignUp = document.getElementById("switchToSignUp");
const logoutBtn = document.getElementById("logoutBtn");
const userDisplay = document.getElementById("userDisplay");

// Form elements
const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");

// Open sign up modal
signUpBtn.addEventListener("click", function () {
  signUpModal.style.display = "block";
});

// Open sign in modal
signInBtn.addEventListener("click", function () {
  signInModal.style.display = "block";
});

// Close modals when clicking the X
closeSignUp.addEventListener("click", function () {
  signUpModal.style.display = "none";
});

closeSignIn.addEventListener("click", function () {
  signInModal.style.display = "none";
});

// Close modals when clicking outside the content
window.addEventListener("click", function (event) {
  if (event.target === signUpModal) {
    signUpModal.style.display = "none";
  }
  if (event.target === signInModal) {
    signInModal.style.display = "none";
  }
  if (event.target === document.getElementById("cartModal")) {
    document.getElementById("cartModal").style.display = "none";
  }
});

// Switch between sign in and sign up modals
switchToSignIn.addEventListener("click", function (e) {
  e.preventDefault();
  signUpModal.style.display = "none";
  signInModal.style.display = "block";
});

switchToSignUp.addEventListener("click", function (e) {
  e.preventDefault();
  signInModal.style.display = "none";
  signUpModal.style.display = "block";
});

// Sign Up form submission
signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signUpName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById(
    "signUpConfirmPassword"
  ).value;

  // Basic validation
  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.some((user) => user.email === email)) {
    alert("Email already registered! Please sign in instead.");
    return;
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // In a real app, this would be hashed
  };

  // Save to localStorage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Auto login after registration
  loginUser(newUser);

  // Close modal
  signUpModal.style.display = "none";

  alert("Account created successfully!");
});

// Sign In form submission
signInForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find matching user
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    loginUser(user, rememberMe);
    signInModal.style.display = "none";
  } else {
    alert("Invalid email or password!");
  }
});

// Logout functionality
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  updateAuthUI();

  // Clear cart
  cart = [];
  updateCartCount();

  alert("You have been logged out.");
});

// Function to login user
function loginUser(user, remember = false) {
  // Save current user to localStorage
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  localStorage.setItem("currentUser", JSON.stringify(userData));

  // If remember me is checked, store in cookie (simulated)
  if (remember) {
    // In a real app, this would set a proper cookie or token
    console.log("Remember me enabled for", user.email);
  }

  updateAuthUI();
}

// Update UI based on authentication state
function updateAuthUI() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // User is logged in
    signUpBtn.classList.add("hidden");
    signInBtn.classList.add("hidden");
    logoutBtn.classList.remove("hidden");
    userDisplay.textContent = `Welcome, ${currentUser.name}!`;
    userDisplay.classList.remove("hidden");
  } else {
    // User is logged out
    signUpBtn.classList.remove("hidden");
    signInBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");
    userDisplay.classList.add("hidden");
  }
}
