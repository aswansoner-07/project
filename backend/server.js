const express =require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const bcrypt = require('bcryptjs'); 

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
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['user', 'vendor'], // optional validation
        required: true
    }
});


//model

const Product = mongoose.model("Product",productSchema);
// vendor modal

const Vendor = mongoose.model("Vendor",vendorSchema);

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


app.listen(8001,()=>{
    console.log('server running at port : 8001');
})