import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';


class Feedtemplate extends Component{
    state={
        fav:"false",
        likes:{}
    }
    componentDidMount(){
        this.getLikes();
    }
    getLikes=async()=>{
        var ref= firebase.database().ref('likes/'+this.props.data.key);
        ref.once('value').then((snapshot)=>{ 
            if(snapshot.val()!==null){
                this.setState({
                    likes:snapshot.val()
                })
                const username=localStorage.getItem("username");
                if(this.state.likes.hasOwnProperty(username)){
                    this.setState({
                        fav:"true"
                    })
                }
            }
            else{
                this.setState({
                    likes:{}
                })
            }
        }, function(error){
        });
    }
    getDiv=()=>{
        if(this.props.data.difficulty==='Easy'){
            return(
                <div style={{backgroundColor:'#5CA773'}}>{this.props.data.difficulty}</div>
            )
        }
        else if(this.props.data.difficulty==='Medium'){
            return(
                <div style={{backgroundColor:'#b1a93a'}}>{this.props.data.difficulty}</div>
            )
        }
        else{
            return(
                <div style={{backgroundColor:'#d1481e'}}>{this.props.data.difficulty}</div>
            )
        }
    }
    setFav=()=>{
        if(localStorage.getItem("username")!==null){
            if(this.state.fav==="true"){
                this.setState({
                    fav:'false'
                })
                this.showDislikeSnackbar();
                firebase.database().ref('likes/'+this.props.data.key+"/"+localStorage.getItem("username")).remove();
            }
            else{
                this.setState({
                    fav:'true'
                })
                this.showLikeSnackbar();
                const username=localStorage.getItem("username");
                firebase.database().ref('likes/'+this.props.data.key+"/"+username).set("true");
            }
        }
        else{
            this.showLoginSnackbar();
        }
    }
    showLikeSnackbar=()=>{
        // Get the snackbar DIV
        const x = document.getElementById("like_snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }
    showDislikeSnackbar=()=>{
        // Get the snackbar DIV
        const x = document.getElementById("dislike_snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }
    showLoginSnackbar=()=>{
        // Get the snackbar DIV
        const x = document.getElementById("login_snackbar");
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
    }

    getFav=()=>{
        if(this.state.fav==="false"){
            return(
                <div className="feed_template_extra">
                    <img src={"/icons/heart-active.svg"} className="feed_like_img" alt="" onClick={this.setFav}/><span style={{fontFamily:'Montserrat, sans-serif',marginLeft:'8px'}}>{Object.keys(this.state.likes).length}</span>
                </div>
            )
        }
        else{
            return(
                <div className="feed_template_extra">
                    <img src={"/icons/heart-inactive.svg"} className="feed_like_img" alt="" onClick={this.setFav}/><span style={{fontFamily:'Montserrat, sans-serif',marginLeft:'8px',fill:"red"}}>{Object.keys(this.state.likes).length}</span>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="feed_template">
                <div className="feed_template_info">
                    <img className="feed_template_user_img" src={"https://sanjaygurung.000webhostapp.com/recipefinder/pics/sanjay.jpg"} alt=""/>
                    <div style={{marginLeft:'15px'}}>
                       <span style={{fontFamily:'Tangerine, cursive'}}>{this.props.data.uploadBy}</span><br/>
                       <span style={{fontFamily:'Montserrat, sans-serif',fontSize:'0.85em',color:'#424242'}}>{this.props.data.recipeName}</span>
                    </div>
                </div>
                <Link to={'/userrecipe/'+this.props.data.key}>
                    <div className="feed_template_img" style={{backgroundImage:`url(https://sanjaygurung.000webhostapp.com/recipefinder/recipe/${this.props.data.uploadpicname}`}}>
                        {this.getDiv()}
                    </div>
                </Link>
               {this.getFav()}
            </div>
        )
    }
}

export default Feedtemplate;