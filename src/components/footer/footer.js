import React from 'react';
import './footer.css';
import {CURRENT_YEAR} from '../../config'
const Footer=()=>{
    return(
        <div className="footer">
            <span>@RecipeFinder {CURRENT_YEAR} All rights reserved.</span>
        </div>
    )
}
export default Footer;