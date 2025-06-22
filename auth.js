function signUp() {
    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Username already exists.");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
}

function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] === password) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials.");
    }
}

function checkLogin() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcome-user").textContent = `Welcome, ${user}`;
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

function changePassword() {
    const currentUser = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    const current = document.getElementById("current-password").value.trim();
    const newPass = document.getElementById("new-password").value.trim();
    const confirm = document.getElementById("confirm-password").value.trim();

    // Ensure all fields are filled
    if (!current || !newPass || !confirm) {
        alert("All fields are required.");
        return;
    }

    // Check if current password is correct
    if (users[currentUser] !== current) {
        alert("Current password is incorrect.");
        return;
    }

    // Check if new passwords match
    if (newPass !== confirm) {
        alert("New passwords do not match.");
        return;
    }

    // Update password in localStorage
    users[currentUser] = newPass;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Password changed successfully.");
    window.location.href = "index.html";
}

function loadProfile() {
    const user = localStorage.getItem("loggedInUser");
    if (!user) {
        window.location.href = "login.html";
        return;
    }
    document.getElementById("profile-username").textContent = user;
}
