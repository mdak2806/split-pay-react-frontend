import React from "react";
import '../App.css';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { request } from '../utils/request'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const GroupPage = (props) => {
    const [group, setGroup] = useState();
    const [currentUser, setCurrentUser] = useState(props.user);
    const navigatePush = useNavigate();
    const [groupDebts, setGroupDebts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showGroupForm, setShowGroupForm] = useState(false);
    const [displayGroups, setDisplayGroups] = useState(true);
    const [description, setDescription] = useState('');
    const [totalAmount, setTotalAmount] = useState()
    const [newDebtCategory, setNewDebtCategory] = useState()
    const [payee, setPayee] = useState(currentUser._id);
    
    const [members, setMembers] = useState([]);
    const [membersName, setMembersName] = useState();
    const [membersId, setMembersId] = useState();
    const [debtCategory, setDebtCategory] = useState();


    const { id } = useParams();

    useEffect(  () => {
        
        axios.get(`${BASE_URL}/groups/${id}`)
        .then(res => {
            setGroup(res.data)
            console.log('group', res.data)
            setGroupDebts(res.data.groupDebts);
            setMembers(res.data.users);
            // setMembersName(res.data.users.name);
            // setDebtCategory(res.data.groupDebts.category);
            // setDebtCategory(groupDebts.category.categoryName)

        })
        .catch(err => {
            console.warn(err)
        })

        
        axios.get (`${BASE_URL}/categories`)

        .then(res => {
            setCategories(res.data)
            console.log('categories', res.data)
        })
        .catch(err => {
            console.warn(err)
        })


      

    }, [props.user])
    

    function handleBack(ev){

        console.log('click');
        navigatePush(`/groups`);
      


    }

   

    function DebtShow(){
        // setGroupDebts(group.groupDebts)
      


        // setGroupDebts(group.groupDebts)
        console.log('groupdebts', groupDebts);
        console.log('group cat', debtCategory);
        console.log('members', members);
        // console.log('members name', membersName);
        members.map((r) => {
            console.log('names', r.name)
         })

        
    
        return(
            <div className="content">
            <button onClick={renderForm}>+ Group </button>

            {
                groupDebts.map((r) => 
                <div className="groups" key={r._id}>
                    <p>{r.description}</p>
                    <p>$USD {r.amount}</p>
                </div>

                )
            }
            {
                 <div>
                 {
                     members.map((r) => 
                     <p>{r.name}</p>
                     )
                 }
                 </div>
            }

        </div>
        )

        }

   
  

    function handleCategorySelected(index, id){
        console.log('handleCategorySelected', index, id)
        const newCategoryCopy = [...categories]
        newCategoryCopy[index] = id;

        setNewDebtCategory(newCategoryCopy);
    }

  

    const renderForm = () => {
        setShowGroupForm(true);
        setDisplayGroups(false);
    };

    const exitForm = () => {
        setShowGroupForm(false);
        setDisplayGroups(true);
    };

    return(

        <div className="content">
            Hello
            <button onClick={(ev) => handleBack(ev)}> Back </button>
            { displayGroups ?
                <DebtShow />
                : 
                null
            }



                <AddGroupDebt members={members} categories={categories}/>

 
           
        </div>


    )
}

function AddGroupDebt(props){
    const [debt, setDebt] = useState({});
    
    function handleInput(ev){
        
        setDebt({
            ...debt, 
            [ev.target.name]: ev.target.value
        });
    }

    const handleSubmit = (ev) => {

        console.log('handlesubmit')

    };


    return(
        <div className="logincontainer">
            <form onSubmit={handleSubmit()}>
                <input className="logininput"
                onChange={handleInput}
                name="description"
                type="text"
                placeholder='Enter Description'
            
                />
                <input className="logininput"
                onChange={handleInput}
                name="totalAmount"
                type="text"
                placeholder='Total $USD'
            
                />
                <div>
                    <select defaultValue={-1} onChange={handleInput} >
                        <option value={-1} disabled > Category </option>
                        {
                            props.categories.map( (c) => (
                               <option value={c._id} key={c._id}>{c.categoryName}</option> 
                            )
                            )
                        }


                    </select>
                </div>
                <div>
                    {

                         
                        props.members.map((r) => 
                            <div  key={r._id}>
                            <label > {r.name}
                            <input 
                                className="logininput"
                                onChange={handleInput}
                                name={r._id}
                                type="text"
                                placeholder="$USD"
                            />
                            </label>  
                            </div>
                        )

                    
                    }
                </div>
                <button> Submit Payment </button>
            </form>
        </div>
    )
    
}// end of AddGroupDebt

export default GroupPage;

