import React from 'react'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import  props  from 'react';
import '../App.css';
import {profileItem} from "../App.js";
import { HashRouter as  Link} from "react-router-dom";




function MyProfile (props){
    const currentUser = props.user;
    console.log(currentUser)


    return ( 
        
        <div className='profileContainer'>
          {profileItem.map(item => (
            <div className="profileWrapper">
              <img src={item.img} alt='' />
              <div className='infoContainer'>
                <h1>{item.title}</h1>
                <div className='profilebutton'>
                  <Link to={item.link}>Learn More</Link>
                </div>
                {/* <button>Learn More</button> */}
              </div>
            </div>
          ))}
         
        </div>
    
    );
    

} // function My profile


export default MyProfile