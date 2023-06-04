import React, { useEffect } from "react";
//import Sidebar from "./Sidebar.js";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Sidebar from './Sidebar'
import "../AdminDashboard/AdminDashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../redux/actions/productAction";
import { getAllUsers } from "../../redux/actions/userActions";
import { getAllOrders } from "../../redux/actions/orderAction";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const user = localStorage.getItem('user')
  const token = JSON.parse(user).token
  const userJSON = JSON.parse(user).data
  console.log(userJSON)
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);

  const { orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders(token));
    dispatch(getAllUsers(token));
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.total;
    });

  const lineState = {
    labels: ["Početni iznos", "Trenutna zarada"],
    datasets: [
      {
        label: "ZARADA",
        backgroundColor: ["orange"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  return (
    <div className="adminDashboard">
      <Header />
      <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Admin</span><span className="display-6 fw-bolder text-light"> panel </span></h1>

      <div className="dashboard">

        <Sidebar />
        <div className="dashboardContainer">

          <div class="p-4">
            <div class="welcome">
              <div class="content rounded-3 p-3 text-warning">
                <h1 class="fs-3">Zdravo {userJSON.user.username}! </h1>
                <p class="mb-0">Dobrodošao/la na admin panel!</p>
              </div>
            </div>
          </div>
          <div className="dashboardSummary">
            <div>
              <p>
                Ukupna zarada:  <span>{totalAmount},00 RSD</span>
              </p>
            </div>
            <section class="statistics mt-4">

              <div class="row">
               
                <div class="col-lg-4">
                  <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                    <i class="uil-envelope-shield fs-2 text-center bg-primary rounded-circle"></i>
                    <div class="ms-3">
                      <div class="d-flex align-items-center text-warning">
                        <h3 class="mb-0">{products?.length}</h3> <span class="d-block ms-2">Programi</span>
                      </div>
                      <Link to='/admin/products' style={{textDecoration: 'none', color: 'var(--darkgray)'}}> <p class="fs-normal mb-0">Klikni i pregledaj programe</p></Link>
                    </div>
                  </div>
                </div>
               
                <div class="col-lg-4">
                  <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
                    <i class="uil-file fs-2 text-center bg-danger rounded-circle"></i>
                    <div class="ms-3">
                      <div class="d-flex align-items-center text-warning">
                        <h3 class="mb-0">{users?.length}</h3> <span class="d-block ms-2">Kupci</span>
                      </div>
                      <Link to='/admin/users' style={{textDecoration: 'none', color: 'var(--darkgray)'}}> <p class="fs-normal mb-0">Klikni i pregledaj kupce</p></Link>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="box d-flex rounded-2 align-items-center p-3">
                    <i class="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
                    <div class="ms-3">
                      <div class="d-flex align-items-center text-warning">
                        <h3 class="mb-0">{orders?.length}</h3> <span class="d-block ms-2">Porudzbine</span>
                      </div>
                      <Link to='/admin/orders' style={{textDecoration: 'none', color: 'var(--darkgray)'}}> <p class="fs-normal mb-0">Klikni i pregledaj porudzbine</p></Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>

        </div>
      </div>
      <div style={{ marginTop: "63rem" }}>
        <Footer />
      </div>
    </div>

  );
};

export default AdminDashboard;