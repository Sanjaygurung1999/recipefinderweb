import React from 'react'
import './calculator.css'

const BodyImage=(props)=>{
    return(
        <div style={{textAlign:'center'}}>
            <img alt="noimg" className="calculator_img" src={"/icons/"+props.gender+".svg"}/>
        </div>
    )
}

export default BodyImage;