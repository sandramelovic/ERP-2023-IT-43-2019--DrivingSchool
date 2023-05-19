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

const MyOrders = () => {
    const dispatch = useDispatch();

    const alert = useAlert();
    const { payments } = useSelector((state) => state.allPayments);
    const { loading, error, orders } = useSelector((state) => state.allOrders);
    const { user } = useSelector((state) => state.userDetails);
    const userFromLocalS = JSON.parse(localStorage.getItem('user'))
    const token = userFromLocalS.token
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.3 },

        {
            field: "date",
            headerName: "Datum",
            minWidth: 250,
            flex: 0.5,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 250,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "succeeded"
                    ? "greenColor"
                    : "redColor";
            },
        },

        {
            field: "total",
            headerName: "Ukupno",
            type: "number",
            minWidth: 370,
            flex: 0.4,
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
                const paymentArray = payments.find(paymentArr => paymentArr.length > 0 && paymentArr[0].orderId === item.orderId);
                const payment = paymentArray ? paymentArray[0] : null;
                const status = payment ? payment.status : "Unknown";
                rows.push({
                    id: item.orderId,
                    orderId: item.orderId,
                    status: status,
                    total: item.total,
                    date: item.date,
                });
            } else {
                rows.push({
                    id: index,
                    orderId: item.orderId,
                    status: payments.find(payment => payment.orderId === item.orderId)?.status,
                    total: item.total,
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

    return (
        <div>
            <Header />
            <Fragment>

                <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder text-warning" style={{ color: 'var(--darkGrey)' }}>{`${user.nameSurename}`}</span><span className="display-6 fw-bolder text-warning"> porudzbine </span></h1>

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