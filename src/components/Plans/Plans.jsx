import React from "react";
import './Plans.css'
import {plansData} from '../../data/plansData'
import whiteTick from '../../assets/whiteTick.png'


const Plans = () => {
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
                        <span>$ {plan.price}</span>

                        <div className="features">
                            {plan.features.map((feature, i) =>(
                                <div className="feature">
                                    <img src={whiteTick} alt=""/>
                                    <span key={i}>{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div>
                            <span>Pogledaj više detalja</span>
                        </div>
                        <button className="btn">Pridruži se</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Plans