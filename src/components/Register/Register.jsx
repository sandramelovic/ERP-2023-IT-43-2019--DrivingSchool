import React from "react";
import '../Login/Login.css'
import './Register.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Row, Col, Form, Input, DatePicker } from 'antd'
import car_login from "../../assets/car_login1.png"
import { useSelector } from "react-redux"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Register = () => {
    return (

        <div className="login">
            <div className="loginCol">
                <div className="left-l">
                    <Header />
                    <img data-aos='slide-right'
                        data-aos-duration='1600'
                        src={car_login} alt="" className='car_login' />
                </div>
                <div className="right-l">
                    <Form className="register-form" name="basic"
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
                        <h1>Register</h1>
                        <hr />
                        <Form.Item name="ime" label="Ime" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="prezime" label="Prezime" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="broj telefona" label="Broj telefona" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="jmbg" label="JMBG" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="adresa" label="Adresa">
                            <Input />
                        </Form.Item>
                        <Form.Item name='korisnicko ime' label='Korisnicko ime' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='lozinka' label='Lozinka' rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>

                        <button className="btn">Sign up</button>
                    </Form>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register