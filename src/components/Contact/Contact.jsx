import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Contact = () => {
    return (
        <div>
            <Header/>
            <div className="container mb-5 bg-warning">
                <div className="row">
                    <div className="col-12 text-center py-4 my-4">
                        <h1>Kontaktiraj nas</h1>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md 5 d-flex justify-content-center">
                        <img src="https://w7.pngwing.com/pngs/376/601/png-transparent-gmail-logo-inbox-by-gmail-icon-email-google-contacts-gmail-logo-angle-text-heart-thumbnail.png" alt="Contact Us" height="300px" width="300px" />
                    </div>
                    <div className="col-md-6">
                        <form >
                            <div class="mb-3">
                                <label for="exampleForm" class="form-label">Ime i prezime:</label>
                                <input type="text" class="form-control" id="exampleForm" placeholder="Sandra Melovic" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email adresa:</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="ime@primer.com" />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Tekst poruke:</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                            </div>
                            <button type="submit" class="btn btn-outline-dark">Posalji</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact