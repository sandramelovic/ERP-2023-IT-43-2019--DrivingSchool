import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants";
import { Navigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import '../AdminDashboard/UpdateProduct.css'
import { useNavigate } from "react-router-dom";
import { setCategoryIdByCategory, setProgramTypeIdByProgramType } from "../../redux/actions/categoryActions";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  
  const { id } = useParams();
  const {  error, product } = useSelector((state) => state.productDetails);
  const user = localStorage.getItem('user')
  const token = JSON.parse(user).token

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [price, setPrice] = useState(product?.price);
  const [description, setDescription] = useState(product?.description);
  const [categoryId, setCategoryId] = useState("");
  const [programTypeId, setProgramTypeId] = useState(0);
  const [programImage, setProgramImage] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  //const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "A",
    "B",
    "C",
    "AM",
    "CE",
  ];

  const programTypes = [
    "Teorija",
    "Praksa",
  ];

  const productId = id;
  
  useEffect(() => {
    dispatch(getProductDetails(productId));
/*
  if (product) {
    setDescription(product.description );
    setPrice(product.price );
    setCategoryId(product.categoryId);
    setProgramTypeId(product.programTypeId);
    setOldImages(product.productImage);
  }*/
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products")
      dispatch({ type: UPDATE_PRODUCT_RESET });
    } 
  }, [
    dispatch,
    productId,
    alert,
    error,
    updateError,
    isUpdated,
    product
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("categoryId", setCategoryIdByCategory(categoryId));
    myForm.set("programTypeId", setProgramTypeIdByProgramType(programTypeId));
    myForm.set("user", JSON.parse(user).data.user)

 /*   images.forEach((image) => {
      myForm.append("images", image);
    });*/
    
    dispatch(updateProduct(productId, myForm, token, product));
  };

/*  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };*/

  return (
    <div>
        <Header/>

    <Fragment>
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Izmeni program</h1>
    
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Cena"
                required
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={product?.price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Opis"
                defaultValue={product?.description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                defaultValue={setCategoryIdByCategory(product?.categoryId)}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Izaberi kategoriju</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <StorageIcon />
              <select
                defaultValue={setProgramTypeIdByProgramType(product?.programTypeId)}
                onChange={(e) => setProgramTypeId(e.target.value)}
              >
                <option value="">Izaberi tip programa</option>
                {programTypes.map((programType) => (
                  <option key={programType} value={programType}>
                    {programType}
                  </option>
                ))}
              </select>
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
            //    onChange={updateProductImagesChange}
                multiple
              />
            </div>

           
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Izmeni
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
    <div style={{ marginTop: "51rem" }}>
            <Footer/>
    </div>
    </div>
  );
};

export default UpdateProduct;