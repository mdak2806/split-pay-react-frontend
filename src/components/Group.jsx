import React from "react";
import '../App.css';
import axios from 'axios';
import '../App.css';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BASE_URL = 'http://localhost:3000'

const UserDropdown = (props) => {

    return (
        <div>
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
    // import { request } from '../utils/request'

    const [filteredGroups, setFilteredGroups] = useState([]);
    const [key, setKey] = useState([]);
    const navigatePush = useNavigate();
    const [group, setGroup] = useState();
    const [description, setDescription] = useState('');
    const [groupName, setGroupName] = useState('');
    const[name, setName] = useState([]);
    const[email, setEmail] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect( () => {
   

        setFilteredGroups(currentUser.groups);
        
        axios.get(`${BASE_URL}/users`)

        .then( res => {
            setUsers(res.data)
            console.log('users data', res.data)

        })
        .catch(err => {
            console.warn(err)
        })
        // request().get('/users').then(response => {
        //     setUsers(response.data.find(user => user.email === email))
        // })

        // console.log('Users', users)

        // console.log(filteredGroups);

      
    }, []);

    function handleGroupMemeberSelected(index, id){
        console.log('handleGroupMemeberSelected', index, id )
        const membersCopy = [...groupMembers];
        membersCopy[index] = id;
        setGroupMembers(membersCopy)
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

            case 'name':
                setName( ev.target.value)
                // console.log("email:", ev.target.value);
                break;

            case 'email':
                setEmail(ev.target.value)
                // console.log("password:", ev.target.value);
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

    function addGroup(){
        console.log()

        return(

            <div className="logincontainer">
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
                   
                    <input className="logininput"
                    onChange={handleInput}
                    name="user.name"
                    type="user.name"
                    placeholder='Enter User Name'
                    />
                    <input className="logininput"
                    onChange={handleInput}
                    name="user.email"
                    type="user.email"
                    placeholder='Enter User Email'
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
                    <button onClick={addMemberDropdown}> Add Memeber </button>
                    <button>Create Group</button>

                </form>
            </div>
        )


    }

    function handleSubmit(ev){



    } // handleSubmit


    return (
        <div className="content">
            Hello Group
           {/* {currentUser} */}
            <br />
            <button onClick={addGroup}>+ Group </button>

            {
            addGroup()
            }

            <div className="userGroups">
                {
                    filteredGroups.map((r) => 
                    // <Link path=`${'groups'}/${r._id}`, params={r._id}>
                    <div onClick={(e) => handleGroupShow(r._id, e)} className="groups" key={r._id}>
                        <h4>{r.groupName}</h4> 
                        <p>{r.description}</p>
                    </div>
                    // </Link>
                    )
                }
         
            </div>
            

        </div>
    )
}

export default Group