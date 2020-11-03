import React from 'react';
import './recipemain.css'
import {Link} from 'react-router-dom';

const RecipeTemplate=(props)=>{
    return(
      <Link to={'/recipe/'+props.data.id} style={{textDecoration:'none'}}>
        <div className="recipe_flex">
          <div style={{backgroundImage:`url(https://spoonacular.com/recipeImages/`+props.data.id+`-556x370.jpg)`}} className="recipe_template">
          </div>
              <p className="recipe_git">{props.data.title}</p>
        </div>
      </Link>

    )
}

export default RecipeTemplate;