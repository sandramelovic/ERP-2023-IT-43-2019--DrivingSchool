import React, {useState} from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'
import Bars from '../../assets/bars.png'
import { Link } from 'react-scroll'
import Login from '../Login/Login'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Header = () => {

    const mobile = window.innerWidth <= 768 ? true : false
    const [menuOpened, setMenuOpened] = useState(false)

    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/cars');
      }

    return (
        <div className='header'>
            <img src={Logo} alt="" className='logo' />
            {menuOpened === false && mobile === true ? (
                <div
                    style={{ backgroundColor: 'var(--appColor)', padding: '0.5rem', borderRadius: '5px' }}
                    onClick={()=> setMenuOpened(true)}>
                    <img src={Bars} alt="" style={{ width: '1.5rem', height: '1.5rem' }} /></div>
            ) : (
                <ul className='header-menu'>
                    <li><Link
                    onClick={()=> setMenuOpened(false)}
                    to='home'
                    span={true}
                    smooth={true}
                    >Pocetna</Link></li>
                    <li><Link
                    onClick={routeChange}
                    span={true}
                    smooth={true}
                    activeClass="active" spy={true} 
                    >O nama</Link></li>
                    <li><Link
                    onClick={routeChange}
                    to='cars'
                    span={true}
                    smooth={true}
                    >Vozni park</Link></li>
                    <li><Link
                    onClick={()=> setMenuOpened(false)}
                    to='plans'
                    span={true}
                    smooth={true}
                    >Kategorije</Link></li>
                </ul>
            )}
        </div>
    )
}

export default Header