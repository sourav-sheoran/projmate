const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

// MongoDB Connection
mongoose
    .connect("mongodb+srv://sheoransourav29:7zDrzQVhNdiRla0J@cluster0.1atax.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });

// Schema and Models
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    type: String,
    timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/chat", (req, res) => {
    res.render("chat");
});

app.get("/main", (req, res) => {
    res.render("main");
});

app.get("/crtacc", (req, res) => {
    res.render("crtacc");
});

// Login Endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const isSame = await bcrypt.compare(password, user.password)
        console.log(user.password, password, isSame)
        if (isSame) {
            return res.status(200).json({ message: "Login successful!" });
        } else {
            console.log("incorrect")
            return res.status(401).json({ error: "Incorrect password!" });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
});


// Create Account Endpoint
app.post("/crtacc", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered!" });
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: "Account created successfully!" });
    } catch (err) {
        console.error("Account Creation Error:", err);
        res.status(400).json({ error: "Failed to create account." });
    }
});

// CRUD APIs
// Create message
app.post("/api/messages", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read messages
app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find().sort({ timestamp: -1 });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update message
app.put("/api/messages/:id", async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete message
app.delete("/api/messages/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Message deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
