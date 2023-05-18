import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderItemToCart } from "../../redux/actions/orderItemAction";
import { NavLink, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Skeleton from "react-loading-skeleton";
import '../SingleProgram/SingleProgram.css'
import { message } from 'antd'
import { getProductDetails } from "../../redux/actions/productAction";
import useSelection from "antd/es/table/hooks/useSelection";
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";
import image from '../../assets/CarTheory.png'

const SingleProgram = () => {

    const state = useSelector((state) => state.orderItemReducer)
    const dispatch = useDispatch()

    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails)

    const addSingleProgram = (singleProgram) => {
        const hasDuplicates = state.some((obj) => {
            return obj.programId === singleProgram.programId;
        });
        if (hasDuplicates) {
            message.error('Već ste dodali program u korpu!');
        } else {
            dispatch(addOrderItemToCart(singleProgram));
            message.success('Program uspešno dodat u korpu!');
        }
    };


    useEffect(() => {
        dispatch(getProductDetails(id))

    }, [dispatch, id])

    const Loading = () => {
        return (
            <>
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={400} />
                </div>
                <div className="col-md-6">
                    <Skeleton height={50} width={300} />
                    <Skeleton height={75} />
                    <Skeleton height={25} width={150} />
                    <Skeleton height={50} />
                    <Skeleton height={150} />
                    <Skeleton height={50} width={100} />
                    <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />


                </div>
            </>
        )
    }

    const ShowSingleProduct = () => {
      //  console.log(product.programImage)
       // let image = require(`../../assets/${product.programImage}`);
      //  console.log(image)
        return (
            <>
                <div className="col-md-6">
                    <img src="https://img.freepik.com/premium-photo/man-driving-car-road_39704-846.jpg?size=626&ext=jpg&ga=GA1.1.1387875020.1669902428&semt=ais" class="border border-warning border-5" alt="{singleProgram.programId}" height="400px" width="500px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-light">
                        Kategorija: {product.categoryId}
                    </h4>
                    <h1 className="display-5 text-warning">
                        Polaži <u>{(setProgramType(product.programTypeId).slice(0, -1)).toLowerCase()}u</u> kategorije: <u>{setCategory(product.categoryId).toLowerCase()}</u>
                    </h1>
                    <p className="display-6 fw-bold my-4 text-warning">
                        {product.price},00 <span className="text-light">RSD</span>
                    </p>
                    <p className="lead text-light">
                        {product.description}
                    </p>
                    <button className=" btn-outline-dark px-4 py-2 btn-add-to-cart" onClick={() => addSingleProgram(product)}>
                        Dodaj u korpu
                    </button>
                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                        Pregledaj korpu
                    </NavLink>

                </div>
            </>
        )
    }

    return (
        <div>
            <Header />
            <hr style={{ borderColor: "white" }} />
            <div className="container py-5">
                <div className="row py-5">
                    {loading ? <Loading /> : <ShowSingleProduct />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SingleProgram
