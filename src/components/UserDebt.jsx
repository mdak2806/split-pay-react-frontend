import React from "react";
import '../App.css';
// import axios from 'axios';
import { useState, useEffect } from "react";

// const BASE_URL = 'http://localhost:3000'

const UserDebt = (props) => {
   
    const currentUser = props.user;
    // const [currentUser, setCurrentUser] = useState(props.user);

    console.log(currentUser, props)

    useEffect( () => {
        console.log('Component Mounting!');
        console.log('currentUser:', currentUser)
        // setCurrentUser({
        //     name: props.currentUser.name,
        //     email: props.currentUser.email,
        //     group: [props.currentUser.groups]
        // })
    }, [props.user._id]);


    return (
        <div className="content">
            Hello UserDebt
            {currentUser.name}
        </div>
    )
}

export default UserDebt