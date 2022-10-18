import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const GroupPage = (props) => {
    const params = useParams();
    const [group, setGroup] = useState();
    const currentUser = props.user;
    const navigatePush = useNavigate();
    const [groupDebts, setGroupDebts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newDebtCategory, setNewDebtCategory] = useState()
    const payee = currentUser._id;
    const [members, setMembers] = useState([]);
    console.log(params, group, newDebtCategory, payee)

    const { id } = useParams();


    useEffect(  () => {
        
        axios.get(`${BASE_URL}/groups/${id}`)
        .then(res => {
            setGroup(res.data)
            setGroupDebts(res.data.groupDebts);
            setMembers(res.data.users);

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


      

    }, [props.user, id])
    

    function handleBack(ev){
        navigatePush(`/group`);
    }
         
    function handleCategorySelected(index, id){
        console.log('handleCategorySelected', index, id)
        const newCategoryCopy = [...categories]
        newCategoryCopy[index] = id;

        setNewDebtCategory(newCategoryCopy);
    }

        console.log(handleCategorySelected);
    

        const renderForm = () => {
            navigatePush(`/groups/${id}/expense`);

        };

    
        return(
            <div className="debtShowContainer">
                <div className="debtShowWrapper">
                   <button  className="groupShowButton" onClick={(ev) => handleBack(ev)}> Back </button>
                   {
                                <div className="debtShowInfoContainer">
                                    <div className="debtShowInfoLeft">
                                        <p> Group Members</p>
                                    </div>
                                    <div className="debtShowInfoRight">
                                {
                                        members.map((r) => 
                                        <p>{r.name}</p>
                                        )
                                }
                                    </div>
                                </div>

                    }
                    <br /> <br />
                   <button onClick={renderForm}>+ Group Expense </button>
                    <div className="debtGroupInfoForm">
                        
                            {
                                groupDebts.map((r) => 
                                    <div className="debtShow">
                                    <div className="debtShowGroups" key={r._id}>
                                        <p>{r.description}</p>
                                    </div>

                                    <div className="debtShowGroups" key={r._id}>
                                        <p>$USD {r.amount}</p>
                                    </div>
                                </div>

                                )
                            }
                          
                        
                    </div>
                </div>
            </div>
        )
}

export default GroupPage;
