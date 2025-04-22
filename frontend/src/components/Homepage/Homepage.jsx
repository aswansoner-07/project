import React from 'react'
import Banner from '../Banner/Banner'
import PopularProducts from '../PopularProducts/PopularProducts'
import Footer from '../Footer/Footer'

const Homepage = () => {
  return (
    <div>
        <div>
            <Banner/>
        </div>
        <div>
            <PopularProducts/>
        </div>
    </div>
  )
}

export default Homepage