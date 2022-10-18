import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const GroupPage = (props) => {
    const params = useParams();
    const [group, setGroup] = useState();
    const currentUser = props.user;
    // const [currentUser, setCurrentUser] = useState(props.user);
    const navigatePush = useNavigate();
    const [groupDebts, setGroupDebts] = useState([]);
    const [categories, setCategories] = useState([]);
    // const [showGroupForm, setShowGroupForm] = useState(false);
    // const [displayGroups, setDisplayGroups] = useState(true);
    // const [description, setDescription] = useState('');
    // const [totalAmount, setTotalAmount] = useState()
    const [newDebtCategory, setNewDebtCategory] = useState()
    // const [payee, setPayee] = useState(currentUser._id);
    const payee = currentUser._id
    
    const [members, setMembers] = useState([]);
    // const [membersName, setMembersName] = useState();
    // const [membersId, setMembersId] = useState();
    // const [debtCategory, setDebtCategory] = useState();
    console.log(params, group, newDebtCategory, payee)

    const { id } = useParams();


    useEffect(  () => {
        
        axios.get(`${BASE_URL}/groups/${id}`)
        .then(res => {
            setGroup(res.data)
            // console.log('group', res.data)
            setGroupDebts(res.data.groupDebts);
            setMembers(res.data.users);
            // console.log('members',members);
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


      

    }, [props.user, id])
    

    function handleBack(ev){

        // console.log('click');
        navigatePush(`/group`);
      


    }

   

    // function DebtShow(){
        // setGroupDebts(group.groupDebts)
      


        // // setGroupDebts(group.groupDebts)
        // console.log('groupdebts', groupDebts);
        // console.log('group cat', debtCategory);
        // console.log('members', members);
        // console.log('members name', membersName);
        // members.map((r) => {
        //     console.log('names', r.name)
        //  })

         
        function handleCategorySelected(index, id){
            console.log('handleCategorySelected', index, id)
            const newCategoryCopy = [...categories]
            newCategoryCopy[index] = id;

            setNewDebtCategory(newCategoryCopy);
        }

        // Delete
        console.log(handleCategorySelected);
    

        const renderForm = () => {
            // setShowGroupForm(true);
            // setDisplayGroups(false);
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

        // }

   
  

  
    // <GroupExpense members={members} categories={categories} groupId={params.id}/> 


    // return(

    //     <div className="groupShowContainer">
    //         <div className="groupShowWrapper">
            
    //         {/* <button  className="groupShowButton" onClick={(ev) => handleBack(ev)}> Back </button> */}
    //         <div className='groupShowInfo'>
    //         {
    //         showGroupForm ?
    //         <AddGroupDebt members={members} categories={categories} groupId={params.id}/> 
    //         :
    //         null


    //         }

    //         { displayGroups ?
    //             <DebtShow />
    //             : 
    //             null
    //         }
           

               
    //          </div>
    //        </div>
    //     </div>


    // )
}

export default GroupPage;
