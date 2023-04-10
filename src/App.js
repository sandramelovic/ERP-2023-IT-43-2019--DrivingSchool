import './App.css';
import Hero from './components/Hero/Hero';
import Program from './components/Program/Program';
import Reasons from './components/Reasons/Reasons';
import Plans from './components/Plans/Plans';
import Testimonials from './components/Testimonials/Testimonials';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register/Register';
import { Header } from 'antd/es/layout/layout';
import Home from './components/Home/Home'
import About from './components/About/About'
import Cars from './components/Cars/Cars';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/about" element={<About />}/>
          <Route exact path="/cars" element={<Cars />}/>
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;
