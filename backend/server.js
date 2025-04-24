const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// .env example
PORT=8001
SECRET_KEY=`aswan`
EMAIL_USER=``
EMAIL_PASS=``

// const PORT = process.env.PORT || 8001;
// const SECRET_KEY = process.env.SECRET_KEY;

// Rate Limiters
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, try again later.'
});
app.use(globalLimiter);

const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, try again later.'
});

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/project_db')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.log(err));

// Schemas
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    rating: Number,
    description: String,
    image: String,
});

const vendorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, enum: ['user', 'vendor'], required: true },
    resetToken: String,
    resetTokenExpiry: Date,
});

const cartSchema = new mongoose.Schema({
    userId: String,
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
});

// Models
const Product = mongoose.model("Product", productSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);
const Cart = mongoose.model("Cart", cartSchema);

// Email setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

const sendResetEmail = async (to, token) => {
    const resetURL = `http://localhost:5173/reset-password?token=${token}`;
    await transporter.sendMail({
        from: '"Support Team" <support@yourdomain.com>',
        to,
        subject: "Password Reset Request",
        html: `<h2>Password Reset</h2><p>Click below to reset:</p><a href="${resetURL}">${resetURL}</a>`
    });
};

// JWT Middleware
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. Token missing.' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};

// Role Middleware
const requireVendor = (req, res, next) => {
    if (req.user.role !== 'vendor') {
        return res.status(403).json({ message: 'Access denied. Vendor only.' });
    }
    next();
};

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my API' });
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/add-product', verifyToken, requireVendor, async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!['user', 'vendor'].includes(role)) {
            return res.status(400).json({ message: "Role must be 'user' or 'vendor'." });
        }

        const existing = await Vendor.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const vendor = new Vendor({ name, email, password: hashedPassword, role });
        await vendor.save();
        res.status(201).json({ message: "Registered successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', loginLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Vendor.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        const { name, role, _id } = user;
        res.status(200).json({ message: "Login successful!", token, user: { name, email, role, _id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await Vendor.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();
    await sendResetEmail(user.email, token);
    res.status(200).json({ message: "Reset link sent to email" });
});

app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    const user = await Vendor.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful" });
});

app.post('/cart/add', verifyToken, async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;
    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId == productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
            await cart.save();
            res.status(200).json({ message: "Cart updated successfully" });
        } else {
            const newCart = new Cart({ userId, items: [{ productId }] });
            await newCart.save();
            res.status(201).json({ message: "Product added to cart" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
