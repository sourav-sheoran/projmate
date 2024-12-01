document.querySelector("#signup-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get the input values
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Password length validation
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Prepare the payload
    const payload = {
        username,
        email,
        password,
    };

    // Make a POST request to the server
    try {
        const response = await fetch("/crtacc", { // This should match the server route
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || "Account created successfully!");
            window.location.href = "/login"; // Redirect to the login page
        } else {
            alert(result.error || "Failed to create account. Please try again.");
        }
    } catch (error) {
        alert("An error occurred while creating your account. Please try again.");
        console.error("Sign Up Error:", error);
    }
});
