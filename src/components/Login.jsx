import React from "react";
import axios from "axios";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';

const BASE_URL = 'http://localhost:3000';

function Login ( props ){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigatePush = useNavigate();


    function handleInput (ev){
        switch(ev.target.name){
            case 'email':
              setEmail(ev.target.value)
              break;
            case 'password':
              setPassword(ev.target.value)
              break;
            default: return;
          }
    }

    function handleSubmit (ev) {
        //create a request object we can pass through to knock
        ev.preventDefault();
        const request = {'email': email, 'password': password}

        //do an axios post request where we can send through the user details to rails and login
        axios.post(`${BASE_URL}/login`, request)
        .then(result => {
             // set our local storage to have a json web token validating our login
            localStorage.setItem("jwt", result.data.token)
            // set axios default headers to have an  authorization key
             props.fetchUser();
            navigatePush('/profile');
        })
        .catch(err => {
            console.warn(err)
        })
        
    }

    return(

        <div className="logincontainer">
          <div className="loginwrapper">
            <div className="logintitle">Login Form</div>
            <form onSubmit={handleSubmit}>
                    <input className="logininput"
              onChange={handleInput}
              name="email"
              type="email"
              placeholder='Enter Email'
            />
                    
                    <input className="logininput"
              onChange={handleInput}
              name="password"
              type="password"
              placeholder='Enter Password'
            />
                <button className="loginbutton">Login</button>
            </form>
          </div>
        </div>
    )


} // Login function

export default Login

