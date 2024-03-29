import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// const BASE_URL = 'http://localhost:3000'
let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://split-pay-backend.herokuapp.com';
} // end rails deployment if-else

// Drop down for the users table

const UserDropdown = (props) => {


    // removing current user from the drop down as automatically assigned to the group
    const newUsers= props.users.filter((i) => i._id !== props.user._id)



    return (
        // A map for the drop down whilst providing the index of each user to use when setting state
        <div className="userDropDown">
           <select defaultValue={-1} onChange={(ev) => props.onChange (props.index, ev.target.value)}>
                <option value={-1} disabled  >Please Select a User </option>
                {
                newUsers.map( (u) => (
                    <option value={u._id} key={u._id}>{u.name}</option>    
                ))}

            </select>

        </div>
    )

} // User Drop down


const GroupNew = (props) => {

    const currentUser = props.user;
    const navigatePush = useNavigate();
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);


    useEffect( (ev) => {

        axios.get(`${BASE_URL}/users`)

        .then( res => {
            setUsers(res.data)

        })
        .catch(err => {
            console.warn(err)
        })
      
    }, []);

    function handleGroupMemeberSelected(index, id){
        // empty array and place user ID in the array creating the group
        const membersCopy = [...groupMembers];
        membersCopy[index] = id;
        
        //Remove duplicates
       const unquieMemebers = membersCopy.filter((val,id, membersCopy) => membersCopy.indexOf(val) === id);

       // setting the arrays as Group Members
        setGroupMembers(unquieMemebers);

    }

    
    function handleInput(ev){
        switch(ev.target.name){

            case 'name':
                setName(ev.target.value)
                break;
            case 'description':
                setDescription(ev.target.value)
                break;
                default: console.log('sign in better please');

        } // end of Switch

    };

    function addMemberDropdown (e){
        e.preventDefault();
        setGroupMembers([...groupMembers, null])
    }

    const handleSubmit = (ev) => {
        
        ev.preventDefault();

        axios.post(`${BASE_URL}/postgroup`, 
        {
            "name": name,
            "description": description,
            "users": groupMembers,

        })
        .then(res => {
            console.log('added groupMember', groupMembers)
            navigatePush(`/group`);
        })
        .catch( err => {
            console.error('Error submitting data', err)
        })

       

    }; // handleSubmit

    const exitForm = () => {
      navigatePush('/group')
    };

     
    return (

        <div className="showGroupContainer">
           <div className="addGroupFormContainer">
                <div className="addGroupFormWrapper">
                    <button onClick={exitForm}> EXIT </button>
                    <form onSubmit={handleSubmit}>
                    <input className="logininput"
                    onChange={handleInput}
                    name="name"
                    type="text"
                    placeholder='Enter Group Name'
                    />
                    <input className="logininput"
                    onChange={handleInput}
                    name="description"
                    type="text"
                    placeholder='Enter Description'
                    />
                   
                     {
                        groupMembers.map( (m, index) => (
                            <UserDropdown
                                user={currentUser} 
                                users={users} 
                                key={index} 
                                index={index} 
                                onChange={handleGroupMemeberSelected}
                            />
                            
                        ))
                    }
                    <button onClick={addMemberDropdown}> Add Member </button>
                    <button onClick={handleSubmit}>Submit Group</button>

                </form>

                </div>
            </div>

        </div>
        
    )
}

export default GroupNew