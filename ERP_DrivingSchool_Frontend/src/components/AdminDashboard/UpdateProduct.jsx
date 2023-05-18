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

//  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
 // const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
 // const [Stock, setStock] = useState(0);
  //const [images, setImages] = useState([]);
  //const [oldImages, setOldImages] = useState([]);
  //const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const productId = id;
  
  useEffect(() => {
    if (product && product.programId !== productId) {
      dispatch(getProductDetails(productId));
    } else {
   //   setName(product.name);
   //   setDescription(product.description);
      setPrice(product?.price);
      setCategory(product?.categoryId);
  //    setStock(product.Stock);
   //   setOldImages(product.images);
    }
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
    isUpdated
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

 //   myForm.set("name", name);
    myForm.set("price", price);
  //  myForm.set("description", description);
    myForm.set("categoryId", 2);
    myForm.set("programTypeId", 1);
    myForm.set("user", JSON.parse(user).data.user)
  //  myForm.set("Stock", Stock);

 /*   images.forEach((image) => {
      myForm.append("images", image);
    });*/
    dispatch(updateProduct(productId, myForm, token));
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
            <h1>Create Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value="Name"
           //     onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value="Opis"
            //    onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
            //    onChange={(e) => setStock(e.target.value)}
                value="10"
              />
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
              Create
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