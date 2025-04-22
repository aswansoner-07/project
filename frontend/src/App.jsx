import { useState } from 'react'
import './App.css'
// import AddProduct from './AddProduct'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter  } from 'react-router-dom'
import Index from './routes/Index'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <div>
      <Index/>
    </div>
    <Footer/>
    </BrowserRouter>
    
      {/* <AddProduct/> */}
    </>
  )
}

export default App
