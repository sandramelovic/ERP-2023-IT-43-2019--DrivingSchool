import React from "react";
import './Login.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Row, Col, Form, Input } from 'antd'
import car_login from "../../assets/car_login.png"
import {useSelector} from "react-redux"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();


const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const Login = () => {
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off">
                    <h1>Login</h1>
                    <hr />
                    <Form.Item name='username' label='username' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name='password' label='password' rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>

                    <button className="btn">Login</button>
                </Form>

            </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Login