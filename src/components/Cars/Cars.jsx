import React, { useEffect, useState } from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import { getAllCars } from '../../redux/actions/carsAction'
import Skeleton from 'react-loading-skeleton'
import '../Cars/Cars.css'

const Cars = () => {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  let componentMounted = true

  useEffect(() => {
    const getCars = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:4000/vehicles")
      if (componentMounted) {
        setData(await response.clone().json())
        setFilter(await response.json())
        setLoading(false)
      }
    }

    getCars()
  }, [])

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

  const filterCars = (type) => {
    const updatedList = data.filter((x) => x.type === type)
    setFilter(updatedList)
  }
  const ShowCars = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5 local-bootstrap">
          <button className="btn btn-outline-dark me-4" onClick={() => setFilter(data)}>Sva vozila</button>
          <button className="btn btn-outline-dark me-4" onClick={() => filterCars("Automobil")}>Automobili</button>
          <button className="btn btn-outline-dark me-4" onClick={() => filterCars("Kamion")}>Kamioni</button>
          <button className="btn btn-outline-dark me-4" onClick={() => filterCars("Motor")}>Motori</button>
        </div>
        {filter.map((car) => {
          return (
            <>
              <div className="col-md-4 mb-5">
                <div class="card h-100 text-center p-4" key={car.vehicleId}>
                  <img src={car.carImage} class="card-img-top" alt={car.vin} height="150px" />
                  <div class="card-body">
                    <p className="info">
                      <b>Ccm:</b> {car.ccm}
                    </p>
                    <p className="info">
                      <b>Vin:</b> {car.vin}
                    </p>
                    <p className="info">
                      <b>Godiste:</b> {car.yearOfProduction}
                    </p>
                    <p className="info">
                      <b>Opis:</b> {car.description}
                    </p>
                  </div>
                  <div>
                    <h5 style={{width:"400px"}}>{car.name}</h5>
                    <h1 class=" text-center lead fw-bold">
                      Tip: {car.type.substring(0, 12)}
                    </h1>
                    </div>
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
            <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Vozni</span><span className="display-6 fw-bolder text-light"> park </span></h1>
            <hr />
            <p className="car-text"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
              but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
              sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowCars />}
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default Cars