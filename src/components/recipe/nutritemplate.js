import React from 'react'

const NutriTemplate=(props)=>{
    const getBad=()=>{
        return props.data.bad.map((item,i)=>{
            return(
                <div key={i} className="nutri_wrapper_item">
                    <span>{item.title}</span>
                    <span>{item.amount}</span>
                </div>
            )
        })
    }
    const getGood=()=>{
        return props.data.good.map((item,i)=>{
            return(
                <div key={i} className="nutri_wrapper_item">
                    <span>{item.title}</span>
                    <span>{item.amount}</span>
                </div>
            )
        })
    }
    return(
        <div className="nutri_wrapper">
            <div className="nutri_wrapper_item">
                <span style={{fontWeight:'bold'}}>Type</span>
                <span style={{fontWeight:'bold'}}>Amount</span>
            </div>
            {getBad()}
            {getGood()}
        </div>
    )
}

export default NutriTemplate