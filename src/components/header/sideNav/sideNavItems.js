import React from 'react';
import './sidenav.css';
import FontAwesome from 'react-fontawesome';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from '@fortawesome/free-solid-svg-icons'

const SideNavItems=()=>{
    const items=[
        {
            type:"title",
            text:"RecipeFinder"
        },
        {
            type:"option",
            icon:"home",
            text:"Home",
            link:"/"
        },
        {
            type:"option",
            icon:"calculator",
            text:"BMI calculator",
            link:"/calculator"
        },
        {
            type:"option",
            icon:"users",
            text:"Feed",
            link:"/feed"
        },
        {
            type:"option",
            icon:"sign-in",
            text:"Register",
            link:"/register"
        },
    ]
    const logoutUser=()=>{
        localStorage.removeItem("username");
    }
    const showItems=()=>{
        return items.map((item,i)=>{
            let template=null;
            switch(item.type){
                case 'option':
                    if(item.text==='Register' && localStorage.getItem("username")!==null){
                        template=<div key={i} className={item.type}>
                            <div onClick={logoutUser}>
                            <FontAwesome style={{color:"white"}} name={item.icon}/>
                                Logout
                            </div>
                        </div>
                    }
                    else{
                        template=<div key={i} className={item.type}>
                            <Link to={item.link}>
                            <FontAwesome style={{color:"white"}} name={item.icon}/>
                            {item.text}
                            </Link>
                        </div>
                    }
                    break;
                case 'title':
                    template=<div key={i} className={item.type}><FontAwesomeIcon style={{color:"white"}} icon={faHamburger}/>
                     {item.text}</div>
                    break;
                default:
                    template=null;
            }
            return template;
        })
    }
    return(
        <div>
            {showItems()}
        </div>
    )
}

export default SideNavItems;