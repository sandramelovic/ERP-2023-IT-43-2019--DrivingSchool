import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png'
import {FaLinkedin} from 'react-icons/fa'
import {FaFacebook} from 'react-icons/fa'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillInstagram} from 'react-icons/ai'
import '../Footer/Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <hr/>
            <div className=" footer-container">
                <article>
                    <Link to="/">
                        <img src={Logo} alt="" />
                    </Link>
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    </p>
                    <div className="footer-socials">
                        <a href="linkedin.com" target="_blank" rel='noreferrer noopener'><FaLinkedin/></a>
                        <a href="https://www.facebook.com/" target="_blank"><FaFacebook/></a>
                        <a href="https://twitter.com/" target="_blank"><AiOutlineTwitter/></a>
                        <a href="https://www.instagram.com/" target="_blank"><AiFillInstagram/></a>
                    </div>
                </article>
                <article>
                    <h4>Linkovi</h4>
                    <Link to='/reasons'>Zašto baš mi?</Link>
                    <Link to="/plans">Planovi</Link>
                    <Link to="/programs">Programi</Link>
                    <Link to="/testimonials">Recenzije</Link>
                    <Link to="/contact">Pošalji email</Link>
                </article>
                <article>
                    <h4>Predlozi</h4>
                    <Link to="/cars">Vozni park</Link>
                    <Link to="/programs">Kupuj kod nas</Link>
                    <Link to="/cart">Pregledaj korpu</Link>
                    <Link to="/orders">Tvoje narudzbine</Link>
                </article>
                <article>
                    <h4>Kontakt</h4>
                    <Link to="/contact">Kontaktiraj nas</Link>
                    <Link to="/profile">Profil</Link>

                </article>
            </div>
            <div className="footer-copyright">
                <small>2023 Sandra Melovic &copy; All Rights Reserved</small>
            </div>
        </div>
    )
}

export default Footer
