import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3000'

const UserDebt = (props) => {
   
    const [currentUser, setCurrentUser] = useState(props.user);

    console.log(currentUser, props)

    useEffect( () => {
        console.log('Component Mounting!');
        console.log('currentUser:', currentUser)
        // setCurrentUser({
        //     name: props.currentUser.name,
        //     email: props.currentUser.email,
        //     group: [props.currentUser.groups]
        // })
    }, []);


    return (
        <div className="content">
            Hello UserDebt
            {currentUser ? currentUser.name : "no current user"}
        </div>
    )
};




export default UserDebt