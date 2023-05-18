import React, {useState} from 'react'
import './Header.css'
import Logo from '../../assets/logo.png'
import Bars from '../../assets/bars.png'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom'

const Header = () => {
    const mobile = window.innerWidth <= 768 ? true : false
    const [menuOpened, setMenuOpened] = useState(false)

    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/cars');
      }

    return (
        <div className='header'>
            <Link to='/'>
            <img src={Logo} alt="" className='logo' />
            </Link>
            {menuOpened === false && mobile === true ? (
                <div
                    style={{ backgroundColor: 'var(--appColor)', padding: '0.5rem', borderRadius: '5px' }}
                    onClick={()=> setMenuOpened(true)}>
                    <img src={Bars} alt="" style={{ width: '1.5rem', height: '1.5rem' }} /></div>
            ) : (
                <ul className='header-menu'>
                    <li><Link
                    onClick={()=> setMenuOpened(false)}
                    to='/'
                    span={true}
                    smooth={true}
                    className="subnav_link"
                    >Pocetna</Link></li>
                    <li><Link
                    onClick={routeChange}
                    to='/cars'
                    span={true}
                    smooth={true}
                    className="subnav_link"
                    >Vozni park</Link></li>
                    <li><Link
                    onClick={()=> setMenuOpened(false)}
                    to='/programs'
                    span={true}
                    smooth={true}
                    className="subnav_link"
                    >Programi</Link></li>
                    <li><Link
                    onClick={routeChange}
                    to='/contact'
                    span={true}
                    smooth={true}
                    activeClass="active" spy={true} 
                    className="subnav_link"
                    >Kontakt</Link></li>
                </ul>
            )}
        </div>
    )
}

export default Header