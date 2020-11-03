import React, { Component } from 'react';
import './feed.css';
import Feedtemplate from './feedtemplate';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class Feed extends Component{
    state={
        recipes:[]
    }
    componentDidMount(){
        this.getMoreRecipe();
    }
    getMoreRecipe= async () => {
            const database=firebase.database();
            var recipes = database.ref('recipes');
            recipes.on('value', (snapshot)=>{
                snapshot.forEach((childSnapshot)=>{
                var childData = childSnapshot.val();
                childData['key']=childSnapshot.key;
                this.setState({
                    recipes:[...this.state.recipes,childData]
                })
            });     
        });
    }
    getRecipe=()=>{
        return this.state.recipes.map((item,i)=>{
            return(
                <Feedtemplate data={item} key={i}></Feedtemplate>
            )
        })
    }
    render(){
        return(
            <div className="feed_template_holder">
                {this.getRecipe()}
                <div id="like_snackbar">You liked the post...<img className="snack_img" alt=""src={"/icons/ok.svg"}/></div>
                <div id="dislike_snackbar">Liked removed...<img className="snack_img" alt="" src={"/icons/sad.svg"}/></div>
                <div id="login_snackbar">Please login first...</div>
            </div>
        )
    }
}
export default Feed;

