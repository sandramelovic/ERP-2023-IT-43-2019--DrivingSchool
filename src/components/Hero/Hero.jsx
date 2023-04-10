import React from 'react'
import Header from '../Header/Header'
import './Hero.css'
import hero_image from "../../assets/hero_image.png"
import hero_image_back from "../../assets/hero_image_back.png"
import Finger from "../../assets/finger.png"
import Calories from "../../assets/calories.png"
import {motion} from 'framer-motion'
import NumberCounter from 'number-counter'
import {useNavigate} from 'react-router-dom';


const Hero = () => {

    const transition = {type:'spring', duration:3}
    const mobile = window.innerWidth<=768 ? true:false
    
    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/login');
      }

    return (
        <div className='hero' id='home'>
            <div className='blur hero-blur'></div>
            <div className="left-h">
                <Header/>
                {/* the best ad */}
                <div className='the-best-ad'>
                    <motion.div
                    initial={{left: mobile? "150px" : '238px'}}
                    whileInView={{left:'8px'}}
                    transition={{...transition, type: 'tween'}}
                    ></motion.div>
                    <span>najbolja auto škola u gradu</span>
                </div>

                {/* Hero Heading */}
                <div className="hero-text">
                    <div>
                        <span className='stroke-text'>Postani </span>
                        <span>Najbolji</span>
                    </div>
                    <div>
                        <span>Vozač u gradu</span>
                    </div>
                    <div>
                        <span>
                        Ovde ćeš naučiti sve što ti je potrebno da se slobodno prepustiš ulicama - vozilom kojim ti želiš, po najboljim cenama!
                        </span>
                    </div>
                </div>

                {/* figures */}
                <div className="figures">
                    <div>
                        <span>
                            <NumberCounter end={40} start={10} delay='2' preFix="+"/>
                        </span>
                        <span>isusnih instruktora</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={978} start={900} delay='4' preFix="+"/>
                        </span>
                        <span>zadovoljnih članova</span>
                    </div>
                    <div>
                        <span>
                            <NumberCounter end={20} start={0} delay='1' preFix="+"/>
                        </span>
                        <span>programa</span>
                    </div>
                </div>

                {/* hero buttons */}
                <div className="hero-buttons">
                    <buttons className='btn'>Kreni sada!</buttons>
                    <buttons className='btn'>Saznaj više</buttons>
                </div>
            </div>


            <div className="right-h">
                <button onClick={routeChange} className='btn'>Pridruži se</button>

                <motion.div 
                initial={{right:"-1rem"}}
                whileInView={{right: "4rem"}}
                transition={transition}
                className='finger-rate'>
                    <img src={Finger} alt=""/>
                    <span>Da li je sada pravo vreme da dođeš po svoju vozačku dozvolu?</span>
                    <span>
                    <NumberCounter end={100} start={10} delay='1' postFix="%"/>
                    </span>
                </motion.div>

                {/* hero images */}
                <img src={hero_image} alt="" className='hero-image'/>
                <img src={hero_image_back} alt="" className='hero-image-back'/>

                { /* calories */}
                <motion.div 
                initial={{right:"50rem"}}
                whileInView={{right:"40rem"}}
                transition={transition}
                className="calories">
                    <img src={Calories} alt=""/>
                    <div>
                        <span>Prolaznost praktičnog ispita</span>
                        <span>65 %</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Hero