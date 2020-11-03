import React, { Component } from 'react';
import './storyslider.css';
import StoryItem from './storyitem';
import { GET_RECOMMENDED} from '../../config';

class StorySlider extends Component{
    state={
        storyitem:[]
    }
    componentWillMount(){
        this.getGitHubUserWithFetch();
    }
    getGitHubUserWithFetch = async () => {
        const response = await fetch(GET_RECOMMENDED);
        const jsonData = await response.json();
        this.setState({
            storyitem:jsonData.results
        });
      };
    getRecipes=()=>{
        return this.state.storyitem.map((item,i)=>{
            return(
                <StoryItem data={item} key={i}></StoryItem>
            )
        })
    }
    render(){
        return(
            <div className="story_slider">
                {this.getRecipes()}
            </div>
        )
    }
}

export default StorySlider;