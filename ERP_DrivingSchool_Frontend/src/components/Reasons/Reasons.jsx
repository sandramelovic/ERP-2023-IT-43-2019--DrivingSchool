import React from "react";
import './Reasons.css'
import image1 from "../../assets/image1.png"
import image2 from "../../assets/image2.png"
import image3 from "../../assets/image3.png"
import image4 from "../../assets/image4.png"
import nb from "../../assets/nb.png"
import adidas from "../../assets/adidas.png"
import audi from "../../assets/audi.png"
import tick from "../../assets/tick.png"


const Reasons = () => {
    return (
        <div className="Reasons" id="reasons">
            <div className="left-r">
                <img src={image1} alt="" />
                <img src={image2} alt="" />
                <img src={image3} alt="" />
                <img src={image4} alt="" />
            </div>
            <div className="right-r">
                <span>Neki od razloga</span>
                <div>
                    <span className="stroke-text">Zašto </span>
                    <span>da izabereš nas?</span>
                </div>

                <div className="details-r">
                    <div>
                        <img src={tick} alt=""></img>
                        <span>+40 iskusnih instruktora</span>
                    </div>
                    <div>
                        <img src={tick} alt=""></img>
                        <span>Uči pametnije i brže</span>
                    </div>                
                    <div>
                        <img src={tick} alt=""></img>
                        <span>Osvoji popuste za nove članove</span>
                    </div>               
                    <div>
                        <img src={tick} alt=""></img>
                        <span>Pouzdani partneri</span>
                    </div>                
                </div>
                <span style={{
                            color:'var(--gray)', 
                            fontWeight:"normal",
                        }}>
                            Naši partneri
                 </span>

                 <div className="partners">
                    <img src={nb} alt=""/>
                    <img src={adidas} alt=""/>
                    <img src={audi} alt=""/>
                 </div>
            </div>
        </div>
    )
}

export default Reasons