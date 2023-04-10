import { Row } from "antd";
import React, { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import '../Cars/Cars.css'
import { getAllCars } from "../../redux/actions/carsAction";

const Cars = () => {
  const {cars, loadnig} = useSelector(state=>state.carsReducer)
  const dispach = useDispatch()

useEffect(() => {
  dispach(getAllCars())
}, [])

    return (
        <div className="cars" id="cars">
          Length of cars array is {cars.length}
        </div>
    )
}


export default Cars