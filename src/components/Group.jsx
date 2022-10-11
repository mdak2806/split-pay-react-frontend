import React from "react";
import axios from 'axios';
import '../App.css';
import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3000'

const Group = (props) => {

    const [currentUser, setCurrentUser] = useState(props.user);

    // console.log(currentUser, props)

    useEffect(() => {
        console.log('Component Mounting!');
        // console.log('currentUser:', currentUser)
        setCurrentUser(props.user);

        console.log(currentUser, props);

       

        // setCurrentUser({
        //     name: props.currentUser.name,
        //     email: props.currentUser.email,
        //     group: [props.currentUser.groups]
        // })
    }, [props.user]);

    // function groupIndex( )  {
    //     const groups = currentUser.groups
    //     console.log(groups)
    //     return(
    //         <div>
    //         {groups}
                
    //         </div>

    //     )


    // }

    // setCurrentUser({name: props.currentUser.name})



    return (
        <div className="content">
            Hello Group
            {currentUser ? currentUser.name : "no current user"}
            
            {/* {groupIndex} */}
            <br />
            <button>+ Group </button>
        </div>
    )
}

export default Group