import React from "react";
import './Login.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Form, Input } from 'antd'
import car_login from "../../assets/car_login.png"
import {useDispatch} from "react-redux"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import  {userLogin}  from "../../redux/actions/userActions";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import { value } from "promisify";
import { useState } from "react";

AOS.init();


function Login(){
  const styleObj = {
    color: "orange",
    fontWeight: 'bold',
    fontSize: 16,
    textDecoration: 'none'
}

//const { user, loading, isAuthenticated } = useSelector((state) => state.user);
const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const dispatch = useDispatch()

  const loginSubmit = (e) => {
    dispatch(userLogin(loginEmail, loginPassword));
  };
/*
const onFinish = (values) => {
  dispatch(userLogin(values))
  };*/

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


    return (

        <div className="login" id="login">
            <div className="loginCol">
            <div className="left-l">
                <Header/>
                <img data-aos='zoom-in-right'
                data-aos-duration='1600'
                src={car_login} alt="" className='car_login'/>
            </div>
            <div className="right-l">
                <Form className="login-form" name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    style={{
                      maxWidth: 600,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                 //   onFinish={onFinish}
                 onFinish={loginSubmit}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <h1>Prijava</h1>
                    <hr />
                    <Form.Item name='username' label='Korisnicko ime' rules={[{ required: true }]}>
                        <Input pattern="^[A-Za-z0-9]{3,16}$" placeholder="[A-Z. a-z, 0-9], min: 3, max: 16" value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name='password' label='Lozinka' rules={[{ required: true }]}>
                        <Input.Password pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.,=+?!@#$%^&*]).{8,}$" placeholder="(A-Z. a-z, 0-9, !...*) min: 8"  value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}/>
                    </Form.Item>

                    <button className="btn">Prijavi se</button>
                    <hr/>
                        Nemaš nalog? <Link to="/register" style={styleObj} > Registruj se! </Link>
                </Form>

            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login