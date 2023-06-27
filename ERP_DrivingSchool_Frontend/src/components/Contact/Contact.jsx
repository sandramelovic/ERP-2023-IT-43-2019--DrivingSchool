import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import emailImg from '../../assets/email.png'
import { useRef } from 'react'
import emailjs from '@emailjs/browser';
import { message } from 'antd'
import { motion } from 'framer-motion'

const Contact = () => {

    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_f94aanx', 'template_5r73c6m', form.current, '0NEzGDX1T7zClyUYI')
            .then((result) => {
                console.log(result);
                message.success('Uspesno ste poslali e-mail!')
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    };

    return (
        <div>
            <Header />
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5 }}
                className="container mb-5 ">
                <div className="row">
                    <div className="col-12 text-center py-4 my-4 text-warning">
                        <h1>Kontaktiraj nas</h1>
                        <hr />
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md 5 d-flex justify-content-center">
                        <img src={emailImg} alt="Contact Us" height="400px" width="400px" />
                    </div>
                    <div className="col-md-6">
                        <form ref={form} onSubmit={sendEmail}>
                            <div class="mb-3">
                                <label for="exampleForm" class="form-label text-warning">Ime i prezime:</label>
                                <input type="text" class="form-control" id="exampleForm" name="user_name" placeholder="Sandra Melovic" required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-warning">Email adresa:</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" name="user_email" placeholder="ime@primer.com" required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-warning">Naslov:</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" name="subject" placeholder="Naslov" required />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label text-warning">Tekst poruke:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" name="message" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-warning">Posalji</button>
                        </form>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    )
}

export default Contact