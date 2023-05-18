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

  /*    let outOfStock = 0;
    
      products &&
        products.forEach((item) => {
          if (item.Stock === 0) {
            outOfStock += 1;
          }
        });
    */
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
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [2, 10],
      },
    ],
  };

  return (
    <div className="adminDashboard">
      <Header />
      <div className="dashboard">

        <Sidebar />
        <div className="dashboardContainer">

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> <span>{totalAmount}</span>
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products?.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders?.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users?.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>

        </div>
      </div>
      <div style={{ marginTop: "91rem" }}>
        <Footer />
      </div>
    </div>

  );
};

export default AdminDashboard;