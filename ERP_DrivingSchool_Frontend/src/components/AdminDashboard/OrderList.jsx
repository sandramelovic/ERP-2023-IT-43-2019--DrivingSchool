import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getAllOrders, clearErrors } from "../../redux/actions/orderAction";
import { DELETE_ORDER_RESET } from "../../redux/constants/orderConstants";
//import { deleteOrder, getAllOrders, clearErrors} from "../../actions/orderAction";
import { Navigate } from "react-router-dom";
import { getAllUsers } from "../../redux/actions/userActions";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const token = JSON.parse(localStorage.getItem('user')).token

   const { error, orders } = useSelector((state) => state.allOrders);
   const { users } = useSelector((state) => state.allUsers);

  /* const { error: deleteError, isDeleted } = useSelector((state) => state.order);
 
   const deleteOrderHandler = (id) => {
     dispatch(deleteOrder(id));
   };
 */
   useEffect(() => {
  /*   if (error) {
       alert.error(error);
       dispatch(clearErrors());
     }
 
     if (deleteError) {
       alert.error(deleteError);
       dispatch(clearErrors());
     }
 
     if (isDeleted) {
       alert.success("Order Deleted Successfully");
       history.push("/admin/orders");
       dispatch({ type: DELETE_ORDER_RESET });
     }
 */
     dispatch(getAllOrders(token));
     dispatch(getAllUsers(token));
 //  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 50, flex: 0.2 },

    {
      field: "username",
      headerName: "Username",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "date",
      headerName: "Datum",
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
          return params.getValue(params.id, "status") === "paid"
              ? "greenColor"
              : "redColor";
      },
  },

    {
      field: "total",
      headerName: "+ ostali troskovi",
      type: "number",
      minWidth: 100,
      flex: 0.3,
  },
  {
      field: "subtotal",
      headerName: "Ukupno",
      type: "number",
      minWidth: 100,
      flex: 0.4,
  },

    
  ];
  
  const rows = [];

    orders &&
      orders.forEach((item) => {
        const user = users.find((user) => user.userId === item.userId);
  const username = user ? user.username : 'Nepoznat';
  const status = item.payment_status ? item.payment_status : "Unknown";

        rows.push({
          id: item.orderId,
          orderId: item.orderId,
          username: username,
          status: status,
          total: item.total ,
          subtotal: item.subtotal ,
          date: item.date,
        });
      });
  
  return (
    <div>
      <Header />
      <Fragment>

        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">SVE PORUDŽBINE</h1>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              
            />
          </div>
        </div>
      </Fragment>
      <div style={{ marginTop: "51rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default OrderList;