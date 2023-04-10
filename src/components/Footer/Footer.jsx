import React from "react";
import { Link } from "react-scroll";
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
                    <h4>Permalinks</h4>
                    <Link to="/about">About</Link>
                    <Link to="/plans">Plans</Link>
                    <Link to="/programs">Programs</Link>
                    <Link to="/testimonials">Testimonials</Link>
                    <Link to="/reasons">Reasons</Link>
                </article>
                <article>
                    <h4>Insights</h4>
                    <Link to="/about">Blog</Link>
                    <Link to="/plans">Case studies</Link>
                    <Link to="/programs">Events</Link>
                    <Link to="/testimonials">Communities</Link>
                    <Link to="/reasons">FAQs</Link>
                </article>
                <article>
                    <h4>Get in touch</h4>
                    <Link to="/about">Contact us</Link>
                    <Link to="/plans">Support</Link>

                </article>
            </div>
            <div className="footer-copyright">
                <small>2023 Sandra Melovic &copy; All Rights Reserved</small>
            </div>
        </div>
    )
}

export default Footer
