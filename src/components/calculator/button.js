import React from 'react'

const Button=(props)=>{
    return(
        <button className={props.state}>{props.name}</button>
    )
}

export default Button;