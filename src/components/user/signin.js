import React from 'react';
import './sign.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'
import {LOGIN_USER} from '../../config'

const SignIn=()=>{
    const loginUser=async()=>{
        const username=document.getElementById('signin-username').value;
        const password=document.getElementById('signin-password').value;
        const URL=LOGIN_USER+username+"&password="+password;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const response = await fetch(proxyurl+URL);
        const jsonData = await response.json();
        if(jsonData!==0){
            localStorage.setItem("username",jsonData[0]["username"]);
            window.location.reload();
        }
        else{
            alert("Username or password incorrect !");
        }
    }
    console.log(localStorage.getItem("username"));
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
                <form action="#">
                <div className="form-group">
                    <label htmlFor="username" style={{color:'#C70039'}}>Username</label>
                    <input className="form-control" type="text" name="username" id="signin-username"  required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" style={{color:'#C70039'}}>Password</label>
                    <input className="form-control" type="password" name="password" id="signin-password" required />
                </div>
                <div className="m-t-lg">
                    <ul className="list-inline">
                    <li>
                        <button style={{textAlign:'center'}} className="btn btn--form" onClick={loginUser}>Login</button>
                    </li>
                    <li>
                        <Link className="signup__link" to={'/register'}>Register</Link>
                    </li>
                    </ul>
                </div>
                </form>  
            </div>
        </div>
    )
}

export default SignIn;
