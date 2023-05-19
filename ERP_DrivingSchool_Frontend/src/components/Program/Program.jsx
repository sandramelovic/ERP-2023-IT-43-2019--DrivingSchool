import React from 'react'
import './Program.css'
import {programsData} from '../../data/programsData'
import RightArrow from '../../assets/rightArrow.png'

const Program = () => {
    return (
        <div className='Program' id='program'>
            {/* header */}
            <div className='program-header'>
                <span className='stroke-text'>Polaži</span>
                <span>deo </span>
                <span className='stroke-text'>koji želiš</span>
            </div>

            <div className='program-categories'>
                {programsData.map((program)=>(
                    <div className='category'>
                        {program.image}
                        <span>
                            {program.heading}
                        </span>
                        <span>
                            {program.details}
                        </span>
                        <div className="join-now">
                            <img src={RightArrow}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Program