import React from 'react';
import './sidenav.css';
import SideNav from 'react-simple-sidenav';
import SideNavItems from './sideNavItems';

const sideNavigation=(props)=>{
    return(
        <div>
            <SideNav navStyle={{background:'#242424'}} showNav={props.showNav} onHideNav={props.onHideNav}>
                <SideNavItems />
            </SideNav>
        </div>
    )
}

export default sideNavigation;