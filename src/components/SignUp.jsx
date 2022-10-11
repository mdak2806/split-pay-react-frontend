import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:3000';

function SignUp( props){

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigatePush = useNavigate();


      // handle typing in the form
      function handleInput (ev) {

        switch(ev.target.name){

            case 'name':
                setName(ev.target.value)
                console.log("name:", ev.target.value);
                break;

            case 'email':
                setEmail( ev.target.value)
                // console.log("email:", ev.target.value);
                break;

            case 'password':
                setPassword(ev.target.value)
                // console.log("password:", ev.target.value);
                break;
                default: console.log('sign in better please');

                // TODO: change the console log to an error notification so the user can see its wrong

        } // end of Switch


    } // handleInput

    async function handleSubmit (ev){
        ev.preventDefault();
        // prevent default / mount page
        // useEffect( () => {
        //     console.log('Component Mounting!');
        // }, []);
        const request = {'name': name, 'email': email, 'password': password}

        // axios post new user

        // try{

            //  setting new user details with states and posting to users
            // const submitNewUser = await 
            await axios.post(`${BASE_URL}/signup`, request)
            .then( result => {
                console.log('signup:', result.data);

                // set our local storage to have a json web token
                localStorage.setItem("jwt", result.data.token)

                // console.log("jwt", result.data.token.token);
                // // set axios default headers to have an authorization key
                // axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token.token;
                // call the function fetchUser that was passed in as a prop 
                props.fetchUser();
                navigatePush('/profile');

                // redirect 


            })
            .catch(err => {
                console.warn(err)
            })

        // }
        // catch(err){

        //     console.warn(err)

        // }

        

    } // handleSubmit



    return(

        <div className="content">
            <form onSubmit={handleSubmit}>
                <label>Sign Up </label>
                <br/>
                    <input
                    onChange={handleInput}
                    name="name"
                    type="name"
                    placeholder='Enter Name'
                    />
                <br/>
                    <input
                    onChange={handleInput}
                    name="email"
                    type="email"
                    placeholder='Enter email'
                    />
                <br/>
                    <input
                    onChange={handleInput}
                    name="password"
                    type="password"
                    placeholder='Enter Password'
                    />
                <br/>
                <button>Sign Up</button>
             </form>


        </div>


    )








} // SignUp function


export default SignUp
