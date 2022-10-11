import '../App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = 'http://localhost:3000';

function SignUp( props){

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const [passwordDigest, setPasswordDigest] = useState('');

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
                setPasswordDigest(ev.target.value)
                // console.log("password:", ev.target.value);
                break;
                default: console.log('sign in better please');

        } // end of Switch


    } // handleInput

    async function handleSubmit (ev){
        ev.preventDefault();
        // prevent default / mount page
        // useEffect( () => {
        //     console.log('Component Mounting!');
        // }, []);

        try{

            //  setting new user details with states and posting to users
            const submitNewUser = await axios.post(`
            ${BASE_URL}/users`,{
                name:name,
                email:email, 
                passwordDigest:passwordDigest
            })
            .then( result => {
                localStorage.setItem("jwt", result.data.token.token)

                console.log("jwt", result.data.token.token);
                // set axios default headers to have an authorization key
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token.token;
                // call the function fetchUser that was passed in as a prop 
                this.props.fetchUser();

                // redirect 


            })

        }
        catch(err){

            console.warn(err)

        }

        

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
                    name="passwordDigest"
                    type="passwordDigest"
                    placeholder='Enter Password'
                    />
                <br/>
                <button>Sign Up</button>
             </form>


        </div>


    )








} // SignUp function


export default SignUp
