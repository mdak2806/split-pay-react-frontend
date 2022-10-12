import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import '../App.css';


const BASE_URL = 'http://localhost:3000'

function MyProfile (props){
    const currentUser = props.user;
    console.log(currentUser)

    // const [currentUser, setCurrentUser] = useState({ 
    //     name: '', 
    //     password: ''
    // });
    // const [loading, setLoading] = useState( true );
    // const [error, setError] = useState( null );

    // useEffect(() => {
    //     let token = "Bearer " + localStorage.getItem("jwt");
    //     axios.get(`${BASE_URL}/current_user`, {
    //     headers: {
    //         'Authorization': token
    //     }
    //     }) // axios 

    //     .then(res => {
    //         // changing the state of loading 
    //         setLoading(false);
    //         // TODO check if this is correct
    //         setCurrentUser({
    //             name: res.data.name, 
    //             password: res.data.password
    //         }) 
    //         console.log('current user:', res.data)
    //     }) // then 

    //     .catch(err => {
    //         console.warn('Error loading for My profile current user:', err)
    //         setLoading(false);
    //         setError(err)
    //     });
    //     // array if data comes from the router, so not responding to data keep the array empty. This then works asa componentDidMount - loads one time
    // }, []);// Use effect function 

    return ( 
        
        <div className='content'>
          <h1>Hello {currentUser.name}</h1>
          <h4>Your email is {currentUser.email}</h4>
        </div>
    
    );
    

} // function My profile


export default MyProfile