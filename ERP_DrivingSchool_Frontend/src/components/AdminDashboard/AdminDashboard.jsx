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

          <div className="dashboardSummary">
            <div>
              <p>
                Ukupna zarada <br /> <span>{totalAmount},00 RSD</span>
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Programi</p>
                <p>{products?.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Porudžbine</p>
                <p>{orders?.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Kandidati</p>
                <p>{users?.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>

        </div>
      </div>
      <div style={{ marginTop: "60rem" }}>
        <Footer />
      </div>
    </div>

  );
};

export default AdminDashboard;