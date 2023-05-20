import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import Home from './components/Home/Home'
import Cars from './components/Cars/Cars';
import Programs from './components/Programs/Programs';
import SingleProgram from './components/SingleProgram/SingleProgram';
import Cart from './components/Cart/Cart'
import Contact from './components/Contact/Contact'
import AdminDashboard from './components/AdminDashboard/AdminDashboard'
import Sidebar from './components/AdminDashboard/Sidebar';
import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/AdminDashboard/ProductList';
import NewProduct from './components/AdminDashboard/NewProduct';
import store from './redux/store';
import UpdateProduct from './components/AdminDashboard/UpdateProduct';
import OrderList from './components/AdminDashboard/OrderList';
import ProtectedRoute from './components/Route';
import { Switch } from '@material-ui/core';
import UsersList from './components/AdminDashboard/UserList';
import UpdateUser from './components/AdminDashboard/UpdateUser';
import Profile from './components/Profile/Profile';
import UpdateProfile from './components/Profile/UpdateProfile';
import MyOrders from './components/Profile/MyOrder';
import OrderDetails from './components/Profile/OrderDetails';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder'
import Payment from './components/Cart/Payment'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/OrderSuccess';
import Reasons from './components/Reasons/Reasons';
import PrivateRoutes from './components/Route';
import Search from './components/Search/Search';

const App = () => {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey(token) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    const data = await axios.get("http://localhost:4000/stripeapikey", config);

    setStripeApiKey(data.data.stripeApiKey)
  }

  useEffect(() => {


    // store.dispatch(loadUser());

    getStripeApiKey();
  }, []);


  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/cars" element={<Cars />} />
          <Route exact path="/programs" element={<Programs />} />
          <Route exact path="/programs/:id" element={<SingleProgram />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path="/search" element={<Search/>} />

          <Route element={<PrivateRoutes isAdmin={false} />}>
            <Route exact path='/checkout' element={<Shipping />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/me/update' element={<UpdateProfile />} />
            <Route exact path='/orders' element={<MyOrders />} />
            <Route exact path='/order/:id' element={<OrderDetails />} />
            <Route exact path='/order/confirm' element={<ConfirmOrder />} />
            <Route exact path='/success' element={<OrderSuccess />} />
            <Route
              exact
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          </Route>

          <Route element={<PrivateRoutes isAdmin={true} />}>
            <Route exact path='/adminDashboard' element={<AdminDashboard />} />
            <Route exact path='/admin/products' element={<ProductList />} />
            <Route exact path='/admin/product' element={<NewProduct />} />
            <Route exact path='/admin/product/:id' element={<UpdateProduct />} />
            <Route exact path='/admin/orders' element={<OrderList />} />
            <Route exact path='/admin/users' element={<UsersList />} />
            <Route exact path='/admin/user/:id' element={<UpdateUser />} />
          </Route>
          
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
