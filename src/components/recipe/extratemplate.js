import React from 'react'

const ExtraTemplate=(props)=>{
    const getDatas=()=>{
        let template=null
        switch(props.type){
            case 'ingre':
                return props.data.map((item,i)=>{
                    return(
                        template=<div class="extra_wrapper_item" key={i}>
                            <img alt="" src={"https://spoonacular.com/cdn/ingredients_100x100/"+item.image}/>
                            <p>{item.name}</p>
                        </div>
                    )
                })
            case 'equip':
                return props.data.map((item,i)=>{
                    return(
                        template=<div class="extra_wrapper_item" key={i}>
                            <img alt="" src={"https://spoonacular.com/cdn/equipment_100x100/"+item.image}/>
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