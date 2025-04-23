const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const nodemailer = require("nodemailer");

const app=express();
app.use(express.json());
app.use(cors());

//mongodb connection 

mongoose.connect('mongodb://localhost:27017/project_db')
.then(()=>{
    console.log('MOngoDB connected successfully!!')
})
.catch((err)=>{
   console.log(err);
})


//schema

const productSchema=new mongoose.Schema({
    name:String,
    price:Number,
    rating:Number,
    description:String,
    image:String,
})


// vendor registration

const vendorSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: {
        type: String,
        enum: ['user', 'vendor'], // optional validation
        required: true
    },
    resetToken: String,
    resetTokenExpiry: Date,
});


//model

const Product = mongoose.model("Product",productSchema);
// vendor modal

const Vendor = mongoose.model("Vendor",vendorSchema);


// Setup your transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // or use another provider like "outlook", "yahoo"
    auth: {
        user: "aswansoner@gmail.com",      // replace with your email
        pass: "eyjg penr dwkp rssk"           // use app password (NOT your main Gmail password)
    }
});

// Send reset email
const sendResetEmail = async (to, token) => {
    const resetURL = `http://localhost:5173/reset-password?token=${token}`; // adjust frontend link

    await transporter.sendMail({
        from: '"Support Team" <youremail@gmail.com>',
        to,
        subject: "Password Reset Request",
        html: `
            <h2>Password Reset</h2>
            <p>You requested a password reset. Click below to reset it:</p>
            <a href="${resetURL}">${resetURL}</a>
            <p>If you didn’t request this, you can ignore this email.</p>
        `,
    });
};
//API routes

app.get('/',async(req,res)=>{
    res.json({message:'Welcome in my API'})
})

// Fetch all products
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/add-product',async(req,res)=>{
     try{
        const product=new Product(req.body);
        await product.save();
        res.status(201).json({message:"Product added successfully"})
     }
     catch(err){
         res.status(500).json({error:err.message})
     }
})

// vendor route

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!['user', 'vendor'].includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'user' or 'vendor'." });
        }

        // Check if email already exists
        const existingVendor = await Vendor.findOne({ email });
        if (existingVendor) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const vendor = new Vendor({ name, email, password: hashedPassword, role });
        await vendor.save();

        res.status(201).json({ message: "Registered successfully!!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//login

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Vendor.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!" });
        }

        // Success: return basic info (excluding password)
        const { name, role } = user;
        res.status(200).json({ message: "Login successful!", user: { name, email, role } });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await Vendor.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email with link
    await sendResetEmail(user.email, token);

    res.status(200).json({ message: "Reset link sent to your email" });
});


// Reset Password API
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
    res.status(200).json({ message: "Password has been reset successfully" });
});


app.listen(8001,()=>{
    console.log('server running at port : 8001');
})