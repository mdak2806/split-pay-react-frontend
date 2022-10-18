import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BASE_URL = 'http://localhost:3000'

function GroupExpense (props){
    const [debt, setDebt] = useState({});
    // const [categoryId, setCategoryId] = useState();
    const navigatePush = useNavigate();
    const [categories, setCategories] = useState([]);
    // const [group, setGroup] = useState();
    const [members, setMembers] = useState([]);
    // const [newMembers, setNewMembers] = useState([]);



    // Get the params for group ID
    const { id } = useParams();

    console.log('groupId', props.groupId)
    
    useEffect(  () => {
        
        axios.get(`${BASE_URL}/groups/${id}`)
        .then(res => {
            // setGroup(res.data)
            // set member and exclude Current USER
            setMembers(res.data.users.filter((i) => i._id !== props.user._id))

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


      

    }, [])
    
    const exitForm = () => {


        navigatePush(`/groups/${id}`);
    };

    function handleInput(ev){
        
        if(ev.target.name.startsWith('payer-')){
            const id = ev.target.name.split('-')[1];
            setDebt({
                ...debt, 
                payers: {
                  ...debt.payers,
                  [id]: ev.target.value  
                }
            });
        } else{
            setDebt({
                ...debt, 
                [ev.target.name]: ev.target.value
                
            });
        }
    }


    const handleSubmit = (v) => {

        v.preventDefault();

        axios.post(`${BASE_URL}/postgroupdebt`, {
            ...debt,
            groupId: id
        })
        .then( res => {
            console.log('res update group', res.data)
            exitForm();
        })
        .catch(err => {
            console.error('Error submitting data:', err)
        })

        

    };


    return(
        <div className="proupPaymentContainer">
            <div className="proupPaymentwrapper">
            <button onClick={exitForm}> EXIT </button>
                <form onSubmit={handleSubmit}>
                    <input className="proupPaymentinput"
                    onChange={handleInput}
                    name="description"
                    type="text"
                    placeholder='Enter Description'
                
                    />
                    <input className="proupPaymentinput"
                    onChange={handleInput}
                    name="totalAmount"
                    type="text"
                    placeholder='Total $USD'
                
                    />
                    <div>
                        <select defaultValue={-1} name="category" onChange={handleInput} >
                            <option value={-1} disabled > Category </option>
                            {
                                categories.map( (c) => (
                                <option value={c._id} key={c._id}>{c.categoryName}</option> 
                                )
                                )
                            }


                        </select>
                    </div>
                    <div>
                        {

                            
                                members.map((r) => 
                                <div className="groupMember" key={r._id}>
                                    <div className="groupMemberContainer"> 
                                        <p>{r.name}</p>
                                    <input 
                                        className="proupPaymentinput"
                                        onChange={ handleInput} 
                                        name={`payer-${r._id}`}
                                        type="text"
                                        placeholder="$USD"
                                    />
                                    </div>  
                                </div>
                            )

                        
                        }
                    </div>
                    <button> Submit Payment </button>
                </form>
            </div>
        </div>
    )
    
}// end of AddGroupDebt

export default GroupExpense;
