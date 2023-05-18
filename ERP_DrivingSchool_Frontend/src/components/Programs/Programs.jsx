import React, { useEffect, useState } from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Skeleton from 'react-loading-skeleton'
import '../Programs/Programs.css'
import { NavLink } from "react-router-dom";
import { getProduct } from "../../redux/actions/productAction";
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from "react-alert";
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";

const Programs = () => {

    const { loading, error, products } = useSelector((state) => state.products)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(products)
      
    useEffect(() => {
        if (error){
            return alert.error(error)
        }
        dispatch(getProduct())
        setFilter(products)
    }, [dispatch, error])

    const Loading = () => {
        return (
            <>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
                <div className="col-md-3">
                    <Skeleton height={350} />
                </div>
            </>
        )
    }

     const filterPrograms = (programType) => {
         const updatedList = products.filter((x) => x.programTypeId === programType)
         setFilter(updatedList)
     }


    const ShowPrograms = () => {
        
        return (
            <>
               <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-dark me-4" onClick={() => setFilter(products)}>Svi programi</button>
                    <button className="btn btn-outline-dark me-4" onClick={() => filterPrograms(1)}>Teorija</button>
                    <button className="btn btn-outline-dark me-4" onClick={() => filterPrograms(2)}>Praksa</button>
                </div>
                {filter?.map((program) => {
                    return (
                       
                        <>
                            <div className="col-md-4 mb-5">
                                <div class="cont h-100  p-4" key={program.programId}>
                                    <img src={require(`../../assets/${program.programImage}`)} class="card-img-top" alt={program.programId} height="350px" />
                                    <div class="text-programs">
                                        
                                        <h4>Kategorija: {setCategory(program.categoryId)}</h4>
                                        <p>Tip: {setProgramType(program.programTypeId)}</p>
                                    </div>
                                    <NavLink to={`/programs/${program.programId}`} className="btn btn-warning btn-read-more">
                                        Procitaj vise
                                    </NavLink>
                                </div>
                            </div>
                        </>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <Header />
            <div className="container my-3 py-3">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Dostupni</span><span className="display-6 fw-bolder text-light"> programi </span></h1>
                        <hr />
                        <p className="car-text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading /> : <ShowPrograms />}
                </div>
            </div>
            <Footer />
        </div>

    )
}


export default Programs