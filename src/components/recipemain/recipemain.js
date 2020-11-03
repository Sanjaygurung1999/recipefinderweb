import React, { Component } from 'react';
import RecipeTemplate from './recipeTemplate';
import { GET_RECIPE, GET_NAME, GET_DIET } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import './searchbody.css';

class RecipeMain extends Component{
    state={
        recipes:[],
        searchword:'',
        selectdiet:'none',
        type:'',
    }
    componentWillMount(){
        this.getMoreRecipe();
    }
    getMoreRecipe= async () => {
        let URL='';
        if(this.state.type==='search'){
            URL=GET_NAME+this.state.searchword;
            const response = await fetch(URL);
            const jsonData = await response.json();
            this.setState({
                recipes:jsonData.results
            });
        }
        else if(this.state.type==='diet'){
            URL=GET_DIET+this.state.selectdiet;
            const response = await fetch(URL);
            const jsonData = await response.json();
            this.setState({
                recipes:jsonData.results
            });
        }
        else{
            const rand = Math.floor(Math.random()*100) + 1;
            URL=GET_RECIPE+rand;
            const response = await fetch(URL);
            const jsonData = await response.json();
            this.setState({
                recipes: [...this.state.recipes, ...jsonData.results]
            });
        }
      };
    getRecipes=()=>{
        return this.state.recipes.map((item,i)=>{
            return(
                <RecipeTemplate data={item} key={i}></RecipeTemplate>
            )
        })
    }
    changeSearchWord=(event)=>{
        this.setState({
            searchword:event.target.value,
            type:'search'
        })
        this.getMoreRecipe('search');
    }
    selectChange=(event)=>{
        this.setState({
            selectdiet:event.target.value,
            type:'diet'
        })
        this.getMoreRecipe('diet');
    }

    render(){
        return(
            <div className="recipe_wrapper">
                <div className="search_body">
                    <h3 style={{fontFamily:'Architects Daughter, cursive',color:'white',fontSize:'1.4em'}}>Much More Better Than Cook Books</h3>
                    <div style={{display:'flex'}}>
                        <div className="search_bar">
                            <input className="input_bar" type="text" placeholder="Search Recipes..." onChange={this.changeSearchWord}/>
                        </div>
                        <div className="select_option">
                            <select onChange={this.selectChange}>
                                <option defaultValue="none">Catergory</option>
                                <option value="gluten">Gluten Free</option>
                                <option value="keto">Ketogenic</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="paleo">Paleo</option>
                            </select>
                        </div>
                    </div>
                </div>
                <p className="h3_text1">Your Choice Of Search</p>
                <p className="h3_text2">Change the result using above search bar</p>
                <div className="recipe_flex_holder">
                    {this.getRecipes()}
                </div>
                <div className="load_more">
                    <FontAwesomeIcon icon={faAngleDown} style={{color:'#ffffff',fontSize:'1.6em'}} onClick={this.getMoreRecipe}/>
                </div>
            </div>
        )
    }
}
export default RecipeMain;