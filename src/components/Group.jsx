import React from "react";
import '../App.css';
import axios from 'axios';
import '../App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BASE_URL = 'http://localhost:3000'

const Group = (props) => {

    const currentUser = props.user;

    const [filteredGroups, setFilteredGroups] = useState([]);
    const [key, setKey] = useState([]);
    const navigatePush = useNavigate();



    // const [myMap, setMyMap] = useState(new Map());
    // const updateMap = (k,v) => {
    //   setMyMap(myMap.set(k,v));
    // }


    // const columns = [
    //     {field: 'groupName', headerName: 'Group Name'}, 
    //     {field: 'description', headerName: 'Description'}
    // ]

    // console.log(currentUser, props)

    useEffect( () => {
        // console.log('Component Mounting!');
        // console.log('currentUser:', currentUser)

        // console.log(currentUser);

        setFilteredGroups(currentUser.groups);

        console.log(filteredGroups);

      
    }, []);

    function handleGroupShow( id){
        console.log(id)
        console.log('clicked');
        console.log('key', key)

        // navigatePush(`/groups/${id}`);


    }


    return (
        <div className="content">
            Hello Group
           {/* {currentUser} */}
            <br />

            <div className="userGroups">
                {
                    filteredGroups.map((r) => 
                    // <Link path=`${'groups'}/${r._id}`, params={r._id}>
                    <div onClick={handleGroupShow(r._id)} className="groups" key={r._id}>
                        <h4>{r.groupName}</h4> 
                        <p>{r.description}</p>
                    </div>
                    // </Link>
                    )
                }
         
            </div>
            

            <button>+ Group </button>
        </div>
    )
}

export default Group