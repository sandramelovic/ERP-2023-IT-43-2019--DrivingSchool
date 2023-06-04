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
import uploadPhotoWhiteBack from '../../assets/uploadPhotoWhiteBack.png'
import SweetPagination from "sweetpagination";

const Programs = () => {

  const { loading, error, products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState([]);
  const [selectedProgramType, setSelectedProgramType] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProduct())

  }, [dispatch, error])

  useEffect(() => {
    if (products && products.length > 0) {
      setFilter(products);
      setCurrentPageData(products.slice(0, 6));
    }
  }, [products]);
  
  useEffect(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    setCurrentPageData(filter.slice(startIndex, endIndex));
  }, [filter, currentPage]);

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
    setSelectedProgramType(programType)
    setCurrentPage(1)
  }

  const resetFilter = () => {
    setFilter(products)
    setSelectedProgramType(null)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const ShowPrograms = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className={`btn btn-outline-dark me-4 ${selectedProgramType === null ? 'active' : ''}`} onClick={resetFilter}>Svi programi</button>
          <button className={`btn btn-outline-dark me-4 ${selectedProgramType === 1 ? 'active' : ''}`} onClick={() => filterPrograms(1)}>Teorija</button>
          <button className={`btn btn-outline-dark me-4 ${selectedProgramType === 2 ? 'active' : ''}`} onClick={() => filterPrograms(2)}>Praksa</button>
        </div>
        {currentPageData?.map((program) => {
          return (
            <div className="col-md-4 mb-5" key={program.programId}>
              <div className="cont h-100  p-4">
                <img
                  src={program.programImage ? require(`../../assets/${program.programImage}`) : uploadPhotoWhiteBack}
                  className="card-img-top"
                  alt={program.programId}
                  height="300px"
                />
                <div className="text-programs">
                  <h4>Kategorija: {setCategory(program.categoryId)}</h4>
                  <p>Tip: {setProgramType(program.programTypeId)}</p>
                </div>
                <NavLink
                  to={`/programs/${program.programId}`}
                  className="btn btn-warning btn-read-more"
                >
                  Procitaj vise
                </NavLink>
              </div>
            </div>
          );
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
            <p className="car-text"> U autoskolama se obično nude različiti programi za obuku vozača, koji se prilagođavaju potrebama i ciljevima svakog pojedinca. Evo nekoliko uobičajenih programa koji se mogu pronaći u autoskolama:
              <br></br>
              <b>●	Program za početnike:</b> Ovaj program je namenjen osobama koje nemaju prethodno iskustvo u vožnji. Uključuje teorijsku obuku o saobraćajnim pravilima i sigurnosti, kao i praktičnu obuku vožnje sa instruktorom.
              <br></br>
              <b>●	Program za sticanje vozačke dozvole:</b> Ovaj program je usmeren na pripremu polaznika za polaganje vozačkog ispita. Obuhvata teorijsku obuku o propisima i pravilima saobraćaja, kao i praktičnu obuku vožnje. U sklopu ovog programa, polaznici se pripremaju za polaganje teorijskog i praktičnog ispita.
              <br></br>
              <b>●	Napredni programi vožnje:</b> Ovi programi su namenjeni vozačima koji već imaju vozačku dozvolu, ali žele poboljšati svoje veštine i znanje o vožnji. Mogu obuhvatati napredne tehnike vožnje, upravljanje u specifičnim uslovima, vožnju po auto-putu, vožnju u lošim vremenskim uslovima, itd.
              <br></br>
              <b>●	Programi defanzivne vožnje:</b> Ovi programi se fokusiraju na razvijanje veština defanzivne vožnje i bezbednosti na putu. Uče vozače kako da prepoznaju potencijalne opasnosti, izbegavaju rizične situacije i reaguju na nepredviđene situacije.
              <br></br>
              <b>●	Programi za specifične kategorije vozila:</b> Autoskole također mogu nuditi obuku za vožnju određenih kategorija vozila, poput motocikala, kamiona ili autobusa. Ovi programi obično imaju posebne zahteve i pravila zbog specifičnosti vozila.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowPrograms />}
        </div>
        <SweetPagination
          currentPageData={setCurrentPageData}
          dataPerPage={6}
          getData={filter}
          navigation={true}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  )
}

export default Programs;
