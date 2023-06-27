import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getAdminProduct, clearErrors, deleteProduct } from "../../redux/actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import { token } from "morgan";
import { useNavigate } from 'react-router-dom'
import { setCategory, setProgramType } from "../../redux/actions/categoryActions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();
  const { error, products, loading } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const user = localStorage.getItem('user')
  const token = JSON.parse(user).token

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id, token));
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
      alert.success("Product Deleted Successfully");
      navigate("/adminDashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted]);


  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "category",
      headerName: "Kategorija",
      minWidth: 270,
      flex: 0.6,
    },
    {
      field: "programType",
      headerName: "Tip programa",
      minWidth: 350,
      flex: 0.6,
    },
    {
      field: "price",
      headerName: "Cena",
      type: "number",
      minWidth: 250,
      flex: 0.3,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Akcije",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  products &&
    products.forEach((item) => {
      rows.push({
        id: item.programId,
        price: item.price,
        category: setCategory(item.categoryId),
        programType: setProgramType(item.programTypeId),
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

      <Header />
      <Fragment>
        <div className="dashboard">
          <SideBar />
          <div className="productListContainer">
            <h1 id="productListHeading">SVI PROGRAMI</h1>
            {loading ? <div className="spinner"><LoadingSpinner /></div> : <div className="content"><ShowContent /></div>}
          </div>
        </div>
      </Fragment>
      <div style={{ marginTop: "51rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default ProductList;