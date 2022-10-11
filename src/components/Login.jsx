import React from "react";
import axios from "axios";
import {useState, useEffect} from 'react';


const BASE_URL = 'http://localhost:3000';

function Login ( props ){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleInput (ev){
        switch(ev.target.name){
            case 'email':
              setEmail(ev.target.value)
              break;
            case 'password':
              setPassword(ev.target.value)
          }
    }

    function handleSubmit (ev) {
        //create a request object we can pass through to knock
        const request = {'email': email, 'password': password}

        //do an axios post request where we can send through the user details to rails and login
        axios.post(`${BASE_URL}/user_token`, {auth: request})
        .then(result => {
             // set our local storage to have a json web token validating our login
            localStorage.setItem("jwt", result.data.jwt)
            // set axios default headers to have an authorization key
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.jwt;

            // TODO ask LUKE how to pass props from one function to another and potentially how to simplify all these posts/requests
            this.props.setUser();
            this.props.history.push('/my_profile');
        })
        .catch(err => {
            console.warn(err)
        })
            ev.preventDefault();
    }

    return(

        <div>
        <form onSubmit={handleSubmit}>
        <label>Login Form</label>
        <br/>
        <input
          onChange={handleInput}
          name="email"
          type="email"
          placeholder='Enter Email'
        />
        <br/>
        <input
          onChange={handleInput}
          name="password"
          type="password"
          placeholder='Enter Password'
        />
        <br/>
        <button>Login</button>
      </form>


        </div>


    )


} // Login function

export default Login

