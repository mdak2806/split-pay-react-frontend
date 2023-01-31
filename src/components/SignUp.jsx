import '../App.css';
import axios from 'axios';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";

// const BASE_URL = 'http://localhost:3000';
let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://split-pay-backend.herokuapp.com';
} // end rails deployment if-else

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
        <div className="logincontainer">
            <div className="loginwrapper">
                <div className="logintitle">Sign Up </div>
                <form onSubmit={handleSubmit}>
                    <input className="logininput"
                    onChange={handleInput}
                    name="name"
                    type="name"
                    placeholder='Enter Name'
                    />
                    <input className="logininput"
                    onChange={handleInput}
                    name="email"
                    type="email"
                    placeholder='Enter email'
                    />
                    <input className="logininput"
                    onChange={handleInput}
                    name="password"
                    type="password"
                    placeholder='Enter Password'
                    />
                    <button>Sign Up</button>
                </form>
           </div>
        </div>
    )








} // SignUp function


export default SignUp