import React from 'react';
import {NavLink} from 'react-router-dom';


const SignedOutLinks=()=>{

    return(
        <ul className="right">
            <li><NavLink to='/' className="navLinks">LogIn</NavLink></li>
            <li><NavLink to='/' className="navLinks">SignOut</NavLink></li>
        </ul>
    )

}

export default SignedOutLinks;