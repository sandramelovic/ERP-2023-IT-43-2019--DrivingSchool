import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addOrderItemToCart } from "../../redux/actions/orderItemAction";
import { deleteOrderItemFromCart } from "../../redux/actions/orderItemAction";
import { orderItemReducer } from '../../redux/reducers/orderItemReducer'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../Cart/Cart.css'
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";
import uploadPhotoWhiteBack from '../../assets/uploadPhotoWhiteBack.png'

const Cart = () => {
    const state = useSelector((state) => state.orderItemReducer)
    const dispatch = useDispatch()

    const [user, setUser] = useState([]);

    const deleteSingleProgram = (item) => {
        dispatch(deleteOrderItemFromCart(item))
    }

    const cartItems = (cartItem) => {
        return (
            <div className="px-4 my-5 bg-light rounded-3">
                <div className="container py-4">
                    <button onClick={() => deleteSingleProgram(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                    <div className="row justify-content-center">
                        <div className="col-md-5 ">
                            <img src={cartItem.programImage ? require(`../../assets/${cartItem.programImage}`) : uploadPhotoWhiteBack}  alt={cartItem.price} height="200px" width="250px" />
                        </div>
                        <div className="col-md-4">
                            <h3>
                            {setProgramType(cartItem.programTypeId)} kategorije: {setCategory(cartItem.categoryId).toLowerCase()}
                            </h3>
                            <p className="lead fw-bold">
                            Cena: {cartItem.price} RSD 
                            </p>
                            <p className="btn btn-danger" onClick={() => deleteSingleProgram(cartItem)}>Ukloni iz korpe</p>
                            <hr></hr>
                           <div className="myProgram">
                           <Link to={`/programs/${cartItem.programId}`}>Pregled proizvoda</Link>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                    <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>Nema proizvoda u Vašoj korpi</Typography>
          <Link to="/programs">Pregledaj proizvode</Link>
        </div>
                    </div>
                </div>
            </div>
        )
    }
    const button = () => {
        return (
            <div className="container">
                <div className="row">
                    { localStorage.getItem('user') !== 'undefined' && cartItems.length !== 0 && localStorage.getItem('user') != null ? (
                        <div>

                        <Link to="/checkout" className="btn btn-warning w-25 m-4">
                            Plaćanje
                        </Link>
                        <Link to="/programs" className="btn btn-warning w-25 m-4">
                            Nastavi kupovinu
                        </Link>
                       </div>
                    ) : (
                        <Link to="/login" className="btn btn-warning mb-5 w-25">
                            Prijavi se za plaćanje
                        </Link>
                    )}
                </div>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Tvoja</span><span className="display-6 fw-bolder text-light"> korpa </span></h1>
                        {state?.length === 0 && emptyCart()}
                        {state?.length !== 0 && state?.map(cartItems)}
                        {state?.length !== 0 && button()}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart