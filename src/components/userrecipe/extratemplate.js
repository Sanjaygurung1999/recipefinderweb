import React from 'react'

const ExtraTemplate=(props)=>{
    console.log(props)
    const getDatas=()=>{
        let template=null
        switch(props.type){
            case 'ingre':
                return props.data.map((item,i)=>{
                    return(
                        template=<div class="extra_wrapper_item" key={i}>
                            <p>{item.name}</p>
                        </div>
                    )
                })
            case 'equip':
                return props.data.map((item,i)=>{
                    return(
                        template=<div class="extra_wrapper_item" key={i}>
                            <p>{item.name}</p>
                        </div>
                    )
                })
            default:
                template=null;
            return template;
        }

    }
    return(
        <div className="extra_wrapper">{getDatas()}</div>
    )
}

export default ExtraTemplate;