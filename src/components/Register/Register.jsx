import React from "react";
import '../Login/Login.css'
import './Register.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Form, Input, DatePicker } from 'antd'
import car_login from "../../assets/car_login1.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch } from "react-redux"
import {userRegister} from '../../redux/actions/userActions';
import {Link} from 'react-router-dom'

AOS.init();


function Register() {
    const styleObj = {
        color: "orange",
        fontWeight: 'bold',
        fontSize: 16,
        textDecoration: 'none'
    }
    const dispatch = useDispatch()

    function onFinish(values) {
        dispatch(userRegister(values))
        console.log('Success:', values);
    }
    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    };
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
                        <h1>Registracija</h1>
                        <hr />
                        <Form.Item name="nameSurename" label="Ime i prezime" rules={[{ required: true }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="phoneNumber" label="Broj telefona" rules={[{ required: true }]}>
                            <Input pattern="^[0-9]{9,10}$" placeholder="ex. 0645667865"/>
                        </Form.Item>
                        <Form.Item name="jmbg" label="JMBG" rules={[{ required: true }]}>
                            <Input pattern="^[0-9]{13}$"/>
                        </Form.Item>
                        <Form.Item name="birthDate" label="Datum rodjenja">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="address" label="Adresa">
                            <Input />
                        </Form.Item>
                        <Form.Item name='username' label='Korisnicko ime' rules={[{ required: true }]}>
                            <Input pattern="^[A-Za-z0-9]{3,16}$" placeholder="[A-Z. a-z, 0-9], min: 3, max: 16"/>
                        </Form.Item>
                        <Form.Item name='password' label='Lozinka' rules={[{ required: true }]}>
                            <Input.Password pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[.,=+?!@#$%^&*]).{8,}$" placeholder="(A-Z. a-z, 0-9, !...*) min: 8"/>
                        </Form.Item>

                        <button className="btn">Registruj se</button>
                        <hr/>
                        Već imaš nalog? <Link to="/login" style={styleObj} > Prijavi se! </Link>
                    </Form>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Register