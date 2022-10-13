import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BASE_URL = 'http://localhost:3000'

const UserDropdown = (props) => {

    return (
        <div className="userDropDown">
          {props.index + 1}. <select defaultValue={-1} onChange={(ev) => props.onChange (props.index, ev.target.value)}>
                <option value={-1} disabled  >Please Select a User </option>
                {
                props.users.map( (u) => (
                    <option value={u._id} key={u._id}>{u.name}</option>    
                ))}

            </select>

        </div>
    )

} // User Drop down


const Group = (props) => {

    const currentUser = props.user;
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [key, setKey] = useState([]);
    const navigatePush = useNavigate();
    const [group, setGroup] = useState();
    const [description, setDescription] = useState('');
    const [groupName, setGroupName] = useState('');
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [newUserGroup, setNewUserGroup] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [displayGroups, setDisplayGroups] = useState(true);


    useEffect( (ev) => {
   
        setFilteredGroups(currentUser.groups);

        // Users DATA to be able to map over for the filter
        axios.get(`${BASE_URL}/current_user/groups`)

        .then( res => {
            setGroups(res.data)
            console.log('users data', res.data)

        })
        .catch(err => {
            console.warn(err)
        })
        
        // Users DATA to be able to map over for the filter
        axios.get(`${BASE_URL}/users`)

        .then( res => {
            setUsers(res.data)
            console.log('users data', res.data)

        })
        .catch(err => {
            console.warn(err)
        })
   
        console.log('groups info', filteredGroups);

      
    }, []);

    function handleGroupMemeberSelected(index, id){
        console.log('handleGroupMemeberSelected', index, id )
        console.log('current user', currentUser._id);

        // empty array and place user ID in the array creating the group
        const membersCopy = [...groupMembers, currentUser._id];
        membersCopy[index] = id;
        
        //Remove duplicates
       const unquieMemebers = membersCopy.filter((val,id, membersCopy) => membersCopy.indexOf(val) == id);

       // setting the arrays as Group Members
        setGroupMembers(unquieMemebers);

        console.log('groupMembers', groupMembers )

    }


    function handleInput(ev){
        switch(ev.target.name){

            case 'groupName':
                setGroupName(ev.target.value)
                // console.log("groupName:", ev.target.value);
                break;
            case 'description':
                setDescription(ev.target.value)
                // console.log("desciption:", ev.target.value);
                break;
                default: console.log('sign in better please');

                // TODO: change the console log to an error notification so the user can see its wrong

        } // end of Switch


    };

    function addMemberDropdown (e){
        e.preventDefault();
        setGroupMembers([...groupMembers, null])
    }

    function handleGroupShow(id, e){
        // console.log(id)
        console.log('clicked', id);
        
        // console.log('key', key)

        navigatePush(`/groups/${id}`);


    }

    function AddGroupForm(){

        return(

            <div className="addGroupFormContainer">
                <div className="addGroupFormWrapper">
                    {/* <div className="addGroupTitle">Add Group</div> */}
                    <button onClick={exitForm}> EXIT </button>
                    <form onSubmit={handleSubmit}>
                    <input className="logininput"
                    onChange={handleInput}
                    name="groupName"
                    type="groupName"
                    placeholder='Enter Group Name'
                    />
                    <input className="logininput"
                    onChange={handleInput}
                    name="description"
                    type="description"
                    placeholder='Enter Description'
                    />
                   
                     {
                        groupMembers.map( (m, index) => (
                            <UserDropdown 
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
            


            
        )


    }

    const handleSubmit = (ev) => {
        
        ev.preventDefault();
        console.log('Post new group');

        axios.post(`${BASE_URL}/postgroup`, 
        // "" need to match backend data
        {
            "groupName": groupName,
            "description": description,
            "users": groupMembers,

        })
        .then(res => {
            // TODO this should take you to the groups ID
            console.log('res new group: ', res.data);
            setGroupMembers([]);
            setGroups([res.data, ...groups ])

            setShowGroupForm(false);
            setDisplayGroups(true);
        })
        .catch( err => {
            console.error('Error submitting data', err)
        })

       

    }; // handleSubmit

    const renderForm = () => {
        setShowGroupForm(true);
        setDisplayGroups(false);
    };
    const exitForm = () => {
        setShowGroupForm(false);
        setDisplayGroups(true);
    };

     
    return (

        <div className="showGroupContainer">
            <div className="showGroupWrapper">
            {
                showGroupForm ? <AddGroupForm /> : null
            }
            {   displayGroups ? 
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
                        
                            {/* <p>Pending Debts: {r.groupDebts.count()}</p> */}
                        </div>
                        )
                    }

                    </div>
                </div>
                : null
            }

            </div>

        </div>
        
            
          
           
         
            

     
    )
}

export default Group