import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Homepage from '../components/Homepage/Homepage'
import Products from '../components/Products/Products'
import AboutUs from '../components/AboutUs/AboutUs'
import ContactUs from '../components/ContactUs/ContactUs'
import VendorLogin from '../components/VendorLogin/VendorLogin'
import ProductInner from '../components/ProductInner/ProductInner'
import AddToCart from '../components/AddToCart/AddToCart'
import VendorRegister from '../components/VendorRegister/VendorRegister'
import AddProduct from '../AddProduct'
import Dashboard from '../components/Dashboard/Dashboard'

const Index = () => {
  return (
    <>

        <Routes>    
            <Route path="/" element={<Homepage/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/contactus" element={<ContactUs/>} />               
            <Route path="/vendorlogin" element={<VendorLogin/>} />               
            <Route path="/product/:productId" element={<ProductInner/>} />               
            <Route path="/cart" element={<AddToCart/>} />               
            <Route path="/vendor-register" element={<VendorRegister/>} />               
            <Route path="/add-product" element={<AddProduct/>} />               
            <Route path="/dashboard" element={<Dashboard/>} />               
        </Routes>    
    </>
  )
}

export default Index