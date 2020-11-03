import React, { Component } from 'react';
import './calculator.css';
import Button from './button'
import BodyImage from './bodyimage'

class Calculator extends Component{
    state={
        gender:'Male',
        initialvalue:{
            height:'150',
            weight:'90'
        },
        bmi:'',
        bmi_stats:''
    }
    retriveButtons=()=>{
        let template=null;
        switch(this.state.gender){
            case 'Male':
                    template=<div className="button_holder">
                    <div onClick={this.changeGender}><Button state={'active_but'} name={'Male'}/></div>
                    <div onClick={this.changeGender}><Button state={'inactive_but'} name={'Female'}/></div>
                </div>
                break;
            case 'Female':
                    template=<div className="button_holder">
                    <div onClick={this.changeGender}><Button state={'inactive_but'} name={'Male'}/></div>
                    <div onClick={this.changeGender}><Button state={'active_but'} name={'Female'}/></div>
                </div>
                break;
            default:
                template=null
        }
        return template;
    }

    changeGender=(event)=>{
        this.setState({
            gender:event.target.innerHTML,
        })
    }

    barChange=(event)=>{
        if(event.target.name==='height'){
            this.setState({
                initialvalue:{
                    height:event.target.value,
                    weight:this.state.initialvalue.weight
                }
            })
        }
        else{
            this.setState({
                initialvalue:{
                    height:this.state.initialvalue.height,
                    weight:event.target.value
                }
            })
        }
    }
    
    getBmi=()=>{
        let BMI=0;
        if(this.state.gender==='Male'){
            BMI=this.state.initialvalue.weight/((this.state.initialvalue.height/100)**2);
        }
        else{
            BMI=(this.state.initialvalue.weight)/((this.state.initialvalue.height/100)**2)+0.7;
        }
        if(BMI<18.5){
            this.setState({bmi_stats:'Underweight'})
        }
        if(BMI>18.5 && BMI<24.9){
            this.setState({bmi_stats:'Normal Weight'})
        }
        if(BMI>24.9 && BMI<29.9){
            this.setState({bmi_stats:'Overweight'})
        }
        if(BMI>29.9){
            this.setState({bmi_stats:'Obese'})
        }
        this.setState({
            bmi:BMI
        })
        document.getElementsByClassName('bmi_stats')[0].style.display="block";
        document.getElementsByClassName('bmi_stats')[1].style.display="block";
    }

    render(){
        return(
            <div>
                <h2 style={{fontFamily:'Montserrat, sans-serif',color:'#3ED715',textAlign:'center'}}>BMI Calculator</h2>
                {this.retriveButtons()}
                <BodyImage gender={this.state.gender}/>
                <p className="cal_text">Your Height: <span>{this.state.initialvalue.height}</span> cm</p>
                <div className="slidecontainer">
                    <input name="height" type="range" min="100" max="200" value={this.state.initialvalue.height} step="1" className="slider" onChange={this.barChange}/>
                </div>
                <p className="cal_text">Your Weight: <span>{this.state.initialvalue.weight}</span> kg</p>
                <div className="slidecontainer">
                    <input name="weight" type="range" min="40" max="140" value={this.state.initialvalue.weight} step="1" className="slider" onChange={this.barChange}/>
                </div>
                <p className="cal_text bmi_stats">Your BMI is: <span>{this.state.bmi}</span></p>
                <p className="cal_text bmi_stats">Your are <span>{this.state.bmi_stats}</span></p>
                <div onClick={this.getBmi} className="button_holder"><Button state={'active_but'} name={'Calculate my BMI'}/></div>
            </div>
        )
    }
}

export default Calculator;