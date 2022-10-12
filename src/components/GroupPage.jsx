import React from "react";
import '../App.css';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { request } from '../utils/request'
import { useNavigate } from "react-router-dom";

const GroupPage = (props) => {
    const [group, setGroup] = useState(null);
    const [currentUser, setCurrentUser] = useState(props.user);
    const navigatePush = useNavigate();


    const { id } = useParams();

    useEffect(() => {
        request().get('/groups').then(response => {
            setGroup(response.data.find(group => group._id === id))
        })
    }, [props.user])

    function handleBack(ev){

        console.log('click');
        navigatePush(`/groups`);



    }

    return(

        <div className="content">
            Hello
            <button onClick={(ev) => handleBack(ev)}> Back </button>
        </div>


    )
}

export default GroupPage;