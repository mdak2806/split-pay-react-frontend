
import React from 'react'
import '../App.css';
import {profileItem} from "../App.js";
import { NavLink as Link} from "react-router-dom";

function MyProfile (){



    return ( 
        
        <div className='profileContainer'>
          {profileItem.map(item => (
            <div className="profileWrapper">
              <img src={item.img} alt=''/>
              <div className='infoContainer'>
                <h1>{item.title}</h1>
                <div className='profilebutton'>
                  <Link to={item.link}>Learn More</Link>
                </div>
              </div>
            </div>
          ))}
         
        </div>
    
    );
    

} // function My profile


export default MyProfile