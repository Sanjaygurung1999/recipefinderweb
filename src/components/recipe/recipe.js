import React, { Component } from 'react';
import './recipe.css'
import Button from '../calculator/button';
import '../calculator/calculator.css'
import ExtraTemplate from './extratemplate'
import NutriTemplate from './nutritemplate'

class Recipe extends Component{
    state={
        detail:{
            title:'',
            serving:'',
            cookingtime:'',
            image:'',
            healthscore:''
        },
        instruction:[],
        ingredients:[],
        nutritions:[],
        equipments:[],
        extra:'Ingredients'
    }

    componentWillMount(){
       this.getRecipeInst();
    }
    getRecipeInst= async () =>{
        const URL='https://api.spoonacular.com/recipes/'+this.props.match.params.id+'/information?includeNutrition=false&apiKey=ab80bcbf49d34d67b19040ff729ec558'
        const URL1='https://api.spoonacular.com/recipes/'+this.props.match.params.id+'/equipmentWidget.json?apiKey=ab80bcbf49d34d67b19040ff729ec558'
        const URL2='https://api.spoonacular.com/recipes/'+this.props.match.params.id+'/nutritionWidget.json?apiKey=ab80bcbf49d34d67b19040ff729ec558'
        const response = await fetch(URL);
        const jsonData = await response.json();
        const response1 = await fetch(URL1);
        const jsonData1 = await response1.json();
        const response2 = await fetch(URL2);
        const jsonData2 = await response2.json();
            this.setState({
                detail:{
                    title:jsonData['title'],
                    serving:jsonData['servings'],
                    cookingtime:jsonData['cookingMinutes'],
                    image:jsonData['image'],
                    healthscore:jsonData['healthScore']
                },
                instruction:jsonData['analyzedInstructions'][0]['steps'],
                ingredients:jsonData['extendedIngredients'],
                equipments:jsonData1['equipment'],
                nutritions:jsonData2
            });
            }
    renderInst=()=>{
        return this.state.instruction.map((item,i)=>{
            return(
            <p key={i}>{item.step}</p>
            )
        })
    }
    renderBut=()=>{
        let template=null;
        switch(this.state.extra){
            case 'Ingredients':
                    template=<div className="button_holder">
                    <div onClick={this.changeExtra}><Button state={'active_but'} name={'Ingredients'}/></div>
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Equipments'}/></div>
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Nutritions'}/></div>
                    </div>
                break;
            case 'Equipments':
                    template=<div className="button_holder">
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Ingredients'}/></div>
                    <div onClick={this.changeExtra}><Button state={'active_but'} name={'Equipments'}/></div>
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Nutritions'}/></div>
                    </div>
                break;
            case 'Nutritions':
                template=<div className="button_holder">
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Ingredients'}/></div>
                    <div onClick={this.changeExtra}><Button state={'inactive_but'} name={'Equipments'}/></div>
                    <div onClick={this.changeExtra}><Button state={'active_but'} name={'Nutritions'}/></div>
                    </div>
                break;
            default:
                template=null
        }
        return template;
    }
    changeExtra=(event)=>{
        this.setState({
            extra:event.target.innerHTML,
        })
    }

    renderExtra=()=>{
        let template=null;
        switch(this.state.extra){
            case 'Ingredients':
                template=<ExtraTemplate data={this.state.ingredients} type={'ingre'}></ExtraTemplate>
                break;
            case 'Equipments':
                template=<ExtraTemplate data={this.state.equipments} type={'equip'}></ExtraTemplate>
                break;
            case 'Nutritions':
                template=<NutriTemplate data={this.state.nutritions}></NutriTemplate>
                break;
            default:
                template=null;
        }
        return template;
    }

    render(){
        return(
            <div className="detail_wrapper">
                <img style={{width:'100%'}} class="detail_img" alt="" src={this.state.detail.image}/>
                <span className="h2_text">{this.state.detail.title}</span>
                <div className="detail_serve">
                    <div className="detail_serve_into">
                        <span>Cooking Time</span>
                        <span style={{fontWeight:'bold'}}>{this.state.detail.cookingtime} <span>min</span></span>
                    </div>
                    <div className="detail_serve_into">
                        <span>Serving</span>
                        <span style={{fontWeight:'bold'}}>{this.state.detail.serving} <span>people</span></span>
                    </div>
                    <div className="detail_serve_into">
                        <span>Health Score</span>
                        <span style={{fontWeight:'bold'}}>{this.state.detail.healthscore}</span>
                    </div>
                </div>
                {this.renderBut()}
                {this.renderExtra()}
                {this.renderInst()}
            </div>
        )
    }
}

export default Recipe;