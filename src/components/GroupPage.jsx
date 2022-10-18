
import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

const GroupPage = (props) => {
    // const params = useParams();
    // const [group, setGroup] = useState();
    // const [currentUser, setCurrentUser] = useState(props.user);
    // const currentUser = props.user;
    const navigatePush = useNavigate();
    const [groupDebts, setGroupDebts] = useState([]);
    // const [categories, setCategories] = useState([]);
    // const [showGroupForm, setShowGroupForm] = useState(false);
    // const [displayGroups, setDisplayGroups] = useState(true);
    // const [description, setDescription] = useState('');
    // const [totalAmount, setTotalAmount] = useState()
    // const [newDebtCategory, setNewDebtCategory] = useState()
    // const [payee, setPayee] = useState(currentUser._id);
    
    const [members, setMembers] = useState([]);
    // const [membersName, setMembersName] = useState();
    // const [membersId, setMembersId] = useState();
    // const [debtCategory, setDebtCategory] = useState();


    const { id } = useParams();


    useEffect(  () => {
        
        axios.get(`${BASE_URL}/groups/${id}`)
        .then(res => {
            // setGroup(res.data)
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


      

    }, [id])
    

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

         
        // function handleCategorySelected(index, id){
        //     console.log('handleCategorySelected', index, id)
        //     const newCategoryCopy = [...categories]
        //     newCategoryCopy[index] = id;

        //     setNewDebtCategory(newCategoryCopy);
        // }

    

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

// function AddGroupDebt(props){
//     const [debt, setDebt] = useState({});
//     const [categoryId, setCategoryId] = useState();
//     const navigatePush = useNavigate();

    
    
//     const exitForm = () => {

//         // setShowGroupForm(true),
//         // setDisplayGroups(false)
//         // const [showGroupForm, setShowGroupForm] = useState(false);
//         // const [displayGroups, setDisplayGroups] = useState(true);
//         navigatePush(`/group`);
//     };

//     function handleInput(ev){
        
//         if(ev.target.name.startsWith('payer-')){
//             const id = ev.target.name.split('-')[1];
//             setDebt({
//                 ...debt, 
//                 payers: {
//                   ...debt.payers,
//                   [id]: ev.target.value  
//                 }
//             });
//         } else{
//             setDebt({
//                 ...debt, 
//                 [ev.target.name]: ev.target.value
                
//             });
//         }
//     }

//     const handleSubmit = (v) => {

//         console.log('handlesubmit')
//         v.preventDefault();

//         axios.post(`${BASE_URL}/postgroupdebt`, {
//             ...debt,
//             groupId: props.groupId
//         })
//         .then( res => {
//             console.log('res update group', res.data)
//             exitForm();
//         })
//         .catch(err => {
//             console.error('Error submitting data:', err)
//         })

        

//     };


//     return(
//         <div className="proupPaymentContainer">
//             <div className="proupPaymentwrapper">
//             <button onClick={exitForm}> EXIT </button>
//                 <form onSubmit={handleSubmit}>
//                     <input className="proupPaymentinput"
//                     onChange={handleInput}
//                     name="description"
//                     type="text"
//                     placeholder='Enter Description'
                
//                     />
//                     <input className="proupPaymentinput"
//                     onChange={handleInput}
//                     name="totalAmount"
//                     type="text"
//                     placeholder='Total $USD'
                
//                     />
//                     <div>
//                         <select defaultValue={-1} name="category" onChange={handleInput} >
//                             <option value={-1} disabled > Category </option>
//                             {
//                                 props.categories.map( (c) => (
//                                 <option value={c._id} key={c._id}>{c.categoryName}</option> 
//                                 )
//                                 )
//                             }


//                         </select>
//                     </div>
//                     <div>
//                         {

                            
//                             props.members.map((r) => 
//                                 <div className="groupMember" key={r._id}>
//                                     <div className="groupMemberContainer"> 
//                                         <p>{r.name}</p>
//                                     <input 
//                                         className="proupPaymentinput"
//                                         onChange={ handleInput} 
//                                         name={`payer-${r._id}`}
//                                         type="text"
//                                         placeholder="$USD"
//                                     />
//                                     </div>  
//                                 </div>
//                             )

                        
//                         }
//                     </div>
//                     <button> Submit Payment </button>
//                 </form>
//             </div>
//         </div>
//     )
    
// }// end of AddGroupDebt


