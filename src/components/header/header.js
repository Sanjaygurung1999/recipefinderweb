import React from 'react';
import './header.css';
import FontAwesome from 'react-fontawesome';
//components
import SideNav from './sideNav/sidenav';
import NavItems from './navItems';


const Header=(props)=>{
    const navBars=()=>{
        return(
            <div className="bars">
                <FontAwesome name="bars" style={{padding:'10px',cursor:'pointer',color:'white'}} onClick={props.onOpenNav}/>
            </div>
        )
    }
    return(
        <header className="header">
            <SideNav {...props}/>
            <div className="headerOpt">
            {navBars()}
            <div className="header_main">
                <div>
                    <span style={{fontFamily:'Tangerine, cursive'}}>Recipe </span>
                    <span style={{fontFamily:'Titillium Web, sans-serif'}}>Finder</span>
                </div>
                <div className="header_sub">
                    <NavItems/>
                </div>
            </div>
            </div>
        </header>
    )
}

export default Header;