import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderItemToCart } from "../../redux/actions/orderItemAction";
import { NavLink, useParams } from "react-router-dom";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Skeleton from "react-loading-skeleton";
import '../SingleProgram/SingleProgram.css'
import { message } from 'antd'
import { getProductDetails, getProduct } from "../../redux/actions/productAction";
import useSelection from "antd/es/table/hooks/useSelection";
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";
import image from '../../assets/CarTheory.png'
import uploadPhotoGrayBack from '../../assets/uploadPhotoGrayBack.png'
import { useNavigate } from 'react-router-dom';

const SingleProgram = () => {

    const navigate = useNavigate();

    const state = useSelector((state) => state.orderItemReducer)
    const dispatch = useDispatch()

    const { id } = useParams();
    const { product, loading, error } = useSelector((state) => state.productDetails)
    const { products } = useSelector((state) => state.products)

    const addSingleProgram = (singleProgram) => {
        const hasDuplicates = state.some((obj) => {
            return obj.programId === singleProgram.programId;
        });
        if (hasDuplicates) {
            message.error('Već ste dodali program u korpu!');
        } else {
            dispatch(addOrderItemToCart(singleProgram));
            message.success('Program uspešno dodat u korpu!')
            navigate('/programs');
        }
    };


    useEffect(() => {
        dispatch(getProduct())
        if (id) {
            dispatch(getProductDetails(id));
          }
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
        if (!product) {
            return null; 
          }
        let imgString = products.find((item) => item.programId === product.programId)?.programImage

        const imagePath = imgString ? require(`../../assets/${imgString}`) : uploadPhotoGrayBack;

        return (
            <>
                <div className="col-md-6">

                    <img
                        src={imagePath ? imagePath : uploadPhotoGrayBack}
                        class="border border-warning border-5"
                        alt={product.programId}
                        height="400px"
                        width="500px" />
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
