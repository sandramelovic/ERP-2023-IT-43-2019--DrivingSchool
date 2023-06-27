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
import { getAllPayments } from "../../redux/actions/paymentAction";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const { payments } = useSelector((state) => state.allPayments);
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { user } = useSelector((state) => state.userDetails);
    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const token = userFromLocalS.token
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.2 },

        {
            field: "date",
            headerName: "Datum",
            minWidth: 250,
            flex: 0.4,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 200,
            flex: 0.4,
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
            minWidth: 200,
            flex: 0.4,
        },
        {
            field: "subtotal",
            headerName: "Ukupno",
            type: "number",
            minWidth: 200,
            flex: 0.4,
        },


        {
            field: "actions",
            flex: 0.4,
            headerName: "Actions",
            minWidth: 350,
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
                const status = item.payment_status ? item.payment_status : "Unknown";

                rows.push({
                    id: item.orderId,
                    orderId: item.orderId,
                    status: status,
                    total: item.total / 100,
                    subtotal: item.subtotal / 100,
                    date: item.date,
                });
            } else {
                rows.push({
                    id: index,
                    orderId: item.orderId,
                    status: item.payment_status,
                    total: item.total / 100,
                    subtotal: item.subtotal / 100,
                    date: item.date,
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
        dispatch(getAllPayments(token))
        dispatch(getAllOrders(token));
    }, [dispatch, alert, error]);

    if (!orders) {
        return null;
    }

    if (!payments) {
        return null;
    }

    const ShowContent = () => {
        return (
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
            />
        )
    }

    return (
        <div>
            <Header />
            <Fragment>
                <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder text-warning" style={{ color: 'var(--darkGrey)' }}>{`${user.nameSurename}`}</span><span className="display-6 fw-bolder text-warning"> porudzbine </span></h1>
                <div className="myOrdersPage">
                    {loading ? <div className="spinner"><LoadingSpinner /></div> : <div className="content"><ShowContent /></div>}
                </div>
            </Fragment>
            <div style={{ marginTop: "50rem" }}>
                <Footer />
            </div>
        </div>
    );
};

export default MyOrders;