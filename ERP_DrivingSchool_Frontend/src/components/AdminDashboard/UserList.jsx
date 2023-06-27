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
import { getAllUsers, clearErrors, deleteUser } from "../../redux/actions/userActions";
import { DELETE_USER_RESET } from "../../redux/constants/userConstants";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const UsersList = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const alert = useAlert();
  const user = localStorage.getItem('user')
  const token = JSON.parse(user).token
  const { error, users, loading } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id, token));
  };

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers(token));
  }, [dispatch, alert, error, deleteError, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "username",
      headerName: "Korisničko ime",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Ime i prezime",
      minWidth: 300,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 200,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "Admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Akcije",
      minWidth: 250,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item.userId,
        role: item.role,
        username: item.username,
        name: item.nameSurename,
      });
    });

    const ShowContent = () => {
      return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
      )
    }

  return (
    <div>
        <Header/>
    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">SVI KANDIDATI</h1>
          {loading ? <div className="spinner"><LoadingSpinner /></div> : <div className="content"><ShowContent /></div>}
        </div>
      </div>
    </Fragment>
    <div style={{ marginTop: "51rem" }}>
            <Footer/>
    </div>
    </div>
  );
};

export default UsersList;