import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import Logo from '../../assets/logo.png';
import Bars from '../../assets/bars.png';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { setCategory, setProgramType } from '../../redux/actions/categoryActions';
import uploadPhotoWhiteBack from '../../assets/uploadPhotoWhiteBack.png';
import { motion } from 'framer-motion';

const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const state = useSelector((state) => state.orderItemReducer);

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
        window.removeEventListener('scroll', isSticky);
    };
});

       
/* Method that will fix header after a specific scrollable */
       const isSticky = (e) => {
            const header = document.querySelector('.header');
            const scrollTop = window.scrollY;
            scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
        };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  const calculateTotal = () => {
    let total = 0;
    state.forEach((item) => {
      total += item.price;
    });
    return total; // Assuming you want to display the total without decimal places
  };

  return (
    <>
      <div className='header'>
        <Link to='/'>
          <img src={Logo} alt='' className='logo' />
        </Link>
        {menuOpened === false && mobile === true ? (
          <div
            style={{ backgroundColor: 'var(--appColor)', padding: '0.5rem', borderRadius: '5px' }}
            onClick={() => setMenuOpened(true)}
          >
            <img src={Bars} alt='' style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        ) : (
          <>
            <ul className='header-menu' ref={menuRef} >
              <li>
                <Link
                  onClick={() => setMenuOpened(false)}
                  to='/'
                  span={true}
                  smooth={true}
                  className='subnav_link'
                >
                  Pocetna
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenuOpened(false)}
                  to='/cars'
                  span={true}
                  smooth={true}
                  className='subnav_link'
                >
                  Vozni park
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => setMenuOpened(false)}
                  to='/programs'
                  span={true}
                  smooth={true}
                  className='subnav_link'
                >
                  Programi
                </Link>
              </li>
              <li>
                <Link
                  to='/contact'
                  span={true}
                  smooth={true}
                  activeClass='active'
                  spy={true}
                  className='subnav_link'
                >
                  Kontakt
                </Link>
              </li>
              {localStorage.getItem('user') !== 'undefined' &&
                localStorage.getItem('user') != null &&
                window.location.pathname !== '/' &&
                window.location.pathname !== '/cart' && 
                JSON.parse(localStorage.getItem('user')).data.user.role !== 'Admin' &&(
                  <li className='shoppingCartIcon'>
                    <div onClick={handleCartClick}>
                      <ShoppingCartIcon fontSize='large' />
                      <span className='badge'>
                        <b>({state?.length})</b>
                      </span>
                    </div>
                  </li>
                )}
            </ul>
          </>
        )}
      </div>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}

          className='container' ref={cartRef}>
          <div className='shopping-cart'>
            <div className='shopping-cart-header'>
              <ShoppingCartIcon />
              <span className='badge'>{state?.length}</span>
              <div className='shopping-cart-total'>
                <span className='lighter-text'>Ukupno: </span>
                <span className='main-color-text'>{calculateTotal()},00 RSD</span>
              </div>
            </div>
            <ul className='shopping-cart-items'>
              {state.map((item, index) => (
                <li className='clearfix' key={index}>
                  <img
                    src={item.programImage ? require(`../../assets/${item.programImage}`) : uploadPhotoWhiteBack}
                  />
                  <span className='item-name'>{`${setCategory(item.categoryId)} - ${setProgramType(
                    item.programTypeId
                  )}`}</span>
                  <span className='item-price'>{item.price},00 RSD</span>
                </li>
              ))}
            </ul>
            <div class='text-center'>
              <Link className='btn button btn-lg btn-block' to='/cart'>
                Korpa
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;
