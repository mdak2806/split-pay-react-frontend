import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = 'http://localhost:3000'


const Group = (props) => {

    const currentUser = props.user;
    const navigatePush = useNavigate();
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);


    useEffect( (ev) => {
   
        // setFilteredGroups(currentUser.groups);

        // Users DATA to be able to map over for the filter
        axios.get(`${BASE_URL}/current_user/groups`)

        .then( res => {
            setGroups(res.data)


        })
        .catch(err => {
            console.warn(err)
            console.log(currentUser);
            console.log(users);
        })
        
        // Users DATA to be able to map over for the filter
        axios.get(`${BASE_URL}/users`)

        .then( res => {
            setUsers(res.data)

        })
        .catch(err => {
            console.warn(err)
        })
      
    }, []);

    function handleGroupShow(id, e){
        navigatePush(`/groups/${id}`);
    }

    const renderForm = () => {
      navigatePush('/groupnew')
       
    };

    return (

        <div className="showGroupContainer">
            <div className="showGroupWrapper">
       
                <div>
                 <button onClick={renderForm}>+ Group </button>
                 <div className="userGroups">
                    {
                        groups.map((r) => 
                        <div onClick={(e) => handleGroupShow(r._id, e)} className="userGroupContainer" key={r._id}>
                            <div className="userGroupItem">
                                <h4>{r.groupName}</h4>
                            </div> 
                            <div className="userGroupItem">
                                <p>{r.description}</p>
                            </div>
                            <div className="userGroupItem">
                                <p>Pending Debts: {r.groupDebts.length}</p>
                            </div>
                            <div className="groupMemberContainer">
                                <select>
                                    <option>Members:</option>
                                    <option>
                                {
                                    
                                    r.users.map((u) => 
                                    <p key={u._id}> {u.name}</p>
                                    )
                                }
                                    </option>
                                </select>
                            </div>
                        
                        </div>
                        )
                    }

                    </div>
                </div>
       
            </div>

        </div>

    )
}

export default Group