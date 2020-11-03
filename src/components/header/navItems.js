import React from 'react';
import {Link} from 'react-router-dom';

const NavItems=()=>{
    const items=[
        {
            text:"Home",
            link:"/"
        },
        {
            text:"BMI calculator",
            link:"/calculator"
        },
        {
            text:"Feed",
            link:"/feed"
        },
        {
            text:"Register",
            link:"/register"
        },
    ]
    const logoutUser=()=>{
        localStorage.removeItem("username");
        window.location.reload();
    }
    const showItems=()=>{
        return items.map((item,i)=>{
            if(item.text==='Register' && localStorage.getItem("username")===null){
                return(
                    <Link key={i} to={item.link} style={{marginLeft:'20px',backgroundColor:"white",padding:'2px 5px',borderRadius:'5px',color:'#C70039'}}>
                        <div>{item.text}</div>
                    </Link>
                )
            }
            else if(item.text==='Register' && localStorage.getItem("username")!==0){
                return(
                    <Link key={i} style={{marginLeft:'20px',backgroundColor:"white",padding:'2px 5px',borderRadius:'5px',color:'#C70039'}}>
                        <div onClick={logoutUser}>Logout</div>
                    </Link>
                )
            }
            else{
                return(
                    <Link key={i} to={item.link} style={{marginLeft:'20px'}}>
                        <div>{item.text}</div>
                    </Link>
                )      
            }
        })
    }
    return(
        <div className="header_item">
            {showItems()}
        </div>
    )
}

export default NavItems;