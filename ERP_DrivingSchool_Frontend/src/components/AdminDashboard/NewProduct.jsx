import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../redux/actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../redux/constants/productConstants";
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { setCategoryIdByCategory, setProgramTypeIdByProgramType } from "../../redux/actions/categoryActions";


const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  const navigate = useNavigate();

  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [categoryId, setCategoryId] = useState("");
  const [programTypeId, setProgramTypeId] = useState(0);
  const [programImage, setProgramImage] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  //const [imagesPreview, setImagesPreview] = useState([]);


 const user = localStorage.getItem('user')
 const token = JSON.parse(user).token

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

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("categoryId", setCategoryIdByCategory(categoryId));
    myForm.set("programTypeId", setProgramTypeIdByProgramType(programTypeId));
   

  /*  images.forEach((image) => {
      myForm.append("images", image);
    });*/
    dispatch(createProduct(myForm,token));
  };

 /* const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
  };
*/
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
            onSubmit={createProductSubmitHandler}
          >
            <h1>Kreiraj program</h1>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Cena"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Opis proizvoda"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={categoryId}
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
                value={programTypeId}
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
            //    onChange={createProductImagesChange}
                multiple
              />
            </div>

           

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Kreiraj
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

export default NewProduct;