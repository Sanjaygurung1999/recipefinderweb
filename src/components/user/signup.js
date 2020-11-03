import React, { Component } from 'react';
import './sign.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import {CHECK_USER,REG_USER} from '../../config'

class SignUp extends Component{
    state={
        usercheck:''
    }
    showCheckStats=()=>{
        if(this.state.usercheck==='true'){
            return(
                <div className="usercheckstats" style={{color:'red'}}>Username already exist !</div>
            )
        }
        else if(this.state.usercheck==='false'){
            return(
                <div className="usercheckstats" style={{color:'green'}}>Username Available </div>
            )
        }
        else{

        }
    }
    showSnackbar=()=>{
        // Get the snackbar DIV
        const x = document.getElementById("signup_snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }
    registerUser=async()=>{
        const username=document.getElementById('username').value;
        const password=document.getElementById('password').value;
        const URL=REG_USER+username+"&password="+password+"&number=0";
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyurl+URL);
        const jsonData = await response.json();
        if(jsonData===1){
            this.showSnackbar();
        }
        else{
            alert("Failed !")
        }
    }
    
    CheckUser=async(searchword) => {
            const URL=CHECK_USER+searchword.target.value;
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const response = await fetch(proxyurl+URL);
            const jsonData = await response.json();
            if(jsonData===0){
                this.setState({
                    usercheck:'false'
                })
            }
            else if(jsonData===1){
                this.setState({
                    usercheck:'true'
                })
            }
        }

    render(){
        return(
            <div className="signup__container">
                <div className="container__child signup__thumbnail">
                    <div className="thumbnail__logo">
                    <h1 className="logo__text"><FontAwesomeIcon style={{color:"white"}} icon={faHamburger}/> Recipe Finder</h1>
                    </div>
                    <div className="thumbnail__content text-center">
                    <h1 className="heading--primary">Welcome</h1>
                    <h2 className="heading--secondary">Are you ready to join?</h2>
                    </div>
                    <div className="signup__overlay"></div>
                </div>
                <div className="container__child signup__form">
                    <form>
                    <div className="form-group">
                        <label htmlFor="username" style={{color:'#C70039'}}>Username</label>
                        <input className="form-control" type="text" name="username" id="username" onChange={this.CheckUser}  required/>
                    </div>
                    {this.showCheckStats()}<br></br>
                    <div className="form-group">
                        <label htmlFor="password" style={{color:'#C70039'}}>Password</label>
                        <input className="form-control" type="password" name="password" id="password" required />
                    </div>
                    <div className="m-t-lg">
                        <ul className="list-inline">
                        <li>
                            <button style={{textAlign:'center'}} className="btn btn--form" onClick={this.registerUser} >Sign Up</button>
                        </li>
                        <li>
                            <Link className="signup__link" to={'/login'}>I am already a member</Link>
                        </li>
                        </ul>
                    </div>
                    </form>  
                </div>
                <div id="signup_snackbar">Registered successfully !</div>
            </div>
        )
    }
    }

export default SignUp;
