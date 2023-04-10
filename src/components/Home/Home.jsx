import React from "react";  
import Hero from '../Hero/Hero';
import Program from '../Program/Program';
import Reasons from '../Reasons/Reasons';
import Plans from '../Plans/Plans';
import Testimonials from '../Testimonials/Testimonials';
import Footer from '../Footer/Footer';
import '../../App.css'

const Home = () => {
    return (
        <div className='App' id='Home'>
            <Hero/>
            <Program/>
            <Reasons/>
            <Plans/>
            <Testimonials/>
            <Footer/>
        </div>
    )
}

export default Home