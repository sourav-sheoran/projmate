async function login(event) {
    event.preventDefault()
    // Get the input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate inputs
    if (!email || !password) {
        alert("Please fill in all fields.");
        return false;
    }

    // Make a POST request to the server
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }), // Sending email and password
        })
        .catch((err) => {
            console.log("fetch error", err)
        });

        // Check if the response is OK
        if (!response.ok) {
            console.log(response)
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Handle server response
        if (result.message) {
            alert(result.message); // Success message
            window.location.href = "/main"; // Redirect to main page
        } else if (result.error) {
            console.log(alert)
            alert(result.error); // Error message
        }
    } catch (error) {
        alert("An error occurred while logging in. Please try again.");
        console.error("Login error:", error); // Log error for debugging
    }

    return false; // Prevent form submission
}

document.querySelector("#login-form").addEventListener("submit", login)