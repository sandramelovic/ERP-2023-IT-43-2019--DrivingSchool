import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./MyOrder.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors } from "../../redux/actions/orderAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getUserDetails } from "../../redux/actions/userActions";

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { user } = useSelector((state) => state.userDetails);
    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const token = userFromLocalS.token
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 250,
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
            minWidth: 250,
            flex: 0.3,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 370,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    if (orders) {
        orders?.forEach((item, index) => {
            if (item.orderId) {
                rows.push({
                    id: item.orderId,
                    orderId: item.orderId,
                    itemsQty: item.userId,
                    amount: item.total,
                    status: item.date,
                });
            } else {
                rows.push({
                    id: index,
                    orderId: item.orderId,
                    itemsQty: item.userId,
                    amount: item.total,
                    status: item.date,
                });
            }
        });
    }

    useEffect(() => {
        dispatch(getUserDetails(userFromLocalS.data.user.userId, token))

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getAllOrders(token));
    }, [dispatch, alert, error]);

    if (!orders) {
        return null; 
    }

    return (
        <div>
            <Header />
            <Fragment>

                <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder text-warning" style={{ color: 'var(--darkGrey)' }}>{`${user.nameSurename}`}</span><span className="display-6 fw-bolder text-warning">'s porudzbine </span></h1>

                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />
                </div>
            </Fragment>
            <div style={{ marginTop: "50rem" }}>
                <Footer />
            </div>
        </div>
    );
};

export default MyOrders;