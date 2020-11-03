import React from 'react'
import {Link} from 'react-router-dom';

const StoryItem=(props)=>{
    const url='https://spoonacular.com/recipeImages/'+props.data.id+'-556x370.jpg'
    return(
        <Link style={{color:'#242424',textDecoration:'none'}} className="story_item" to={'/recipe/'+props.data.id}>
            <img alt="" src={url} className="story_img"></img>
            <span>{props.data.title}</span>
        </Link>
    )
}

export default StoryItem;