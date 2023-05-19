import React from "react";
import './Plans.css'
import {plansData} from '../../data/plansData'
import whiteTick from '../../assets/whiteTick.png'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Plans = () => {

    const navigate = useNavigate()

    const programs = () => {
        navigate('/programs')
    }
    return (
        <div className="plans-container" id="plans">
            <div className="blur plans-blur-1"></div>
            <div className="blur plans-blur-2"></div>
            <div className="program-header" style={{gap: '2rem'}}>
                <span className="stroke-text">DA LI SI SPREMAN/NA ZA </span>
                <span>DRUŽENJE I UČENJE </span>
                <span className="stroke-text">SA NAMA?</span>
            </div>

            {/* plans card */}
            <div className="plans">
                {plansData.map((plan, i) => (
                    <div className="plan" key={i}>
                        {plan.icon}
                        <span>{plan.name}</span>
                        <span>{plan.price} RSD</span>

                        <div className="features">
                            {plan.features.map((feature, i) =>(
                                <div className="feature">
                                    <img src={whiteTick} alt=""/>
                                    <span key={i}>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <span><Link to={`/programs/${i}`} className="btn">
                            Pogledaj više detalja
                            </Link></span>
                        </div>
                        <button className="btn" onClick={programs}>Istraži</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Plans