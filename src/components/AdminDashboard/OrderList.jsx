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

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const user = localStorage.getItem('user')
  const token = JSON.parse(user).token

   const { error, orders } = useSelector((state) => state.allOrders);
 
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
 //  }, [dispatch, alert, error, deleteError, history, isDeleted]);
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 100,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

    orders &&
      orders.forEach((item) => {
        rows.push({
          id: item.orderId,
          itemsQty: item.userId,
          amount: item.total,
          status: item.date,
        });
      });
  
  return (
    <div>
      <Header />
      <Fragment>

        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">ALL ORDERS</h1>

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