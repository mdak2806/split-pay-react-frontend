import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:3000'


const GroupDropdown = (props) => {

    return (
        <div>
            {props.index + 1}. <select defaultValue={-1} onChange={(ev) => props.onChange (props.index, ev.target.value)}>
                <option value={-1} disabled  >Please Select a Group </option>
                {
                props.users.map( (u) => (
                    <option value={u._id} key={u._id}>{u.name}</option>    
                ))}

            </select>

        </div>
    )

} // Group Drop down

const Payment = (props) => {
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
    const [hideAddPaymentForm, setHideAddPaymentForm] = useState(true);
    const [amount, setAmount] = useState('');
    const [receipt, setReceipt] = useState('');
    const [group, setGroup] = useState('');
    const [payee, setPayee] = useState('');
    const [payer, setPayer] = useState('');


    const navigatePush = useNavigate();

    const currentUser = props.user

    useEffect( (ev) => {
   
        setFilteredPayments(currentUser.payments);
        
        axios.get(`${BASE_URL}/current_user/payments`)

        .then( res => {
            setUsers(res.data)
            console.log('users data', res.data)

        })
        .catch(err => {
            console.warn(err)
        })
   

      
    }, []);

    function handlePaymentShow(id, e){
        // console.log(id)
        console.log('clicked', id);
        
        // console.log('key', key)

        navigatePush(`/payments/${id}`);


    }

    function addPayment(){
        setShowAddPaymentForm(true)
        setHideAddPaymentForm(false)
    } // addPayment

    function backToAddPayment(){
        setShowAddPaymentForm(false)
        setHideAddPaymentForm(true)
    }


    function handleInput (ev){
        switch(ev.target.amount){
            case 'amount':
              setAmount(ev.target.value)
              break;
            case 'receipt':
              setReceipt(ev.target.value)
              break;
            case 'group':
              setGroup(ev.target.value)
              break;
            case 'payee':
              setPayee(ev.target.value)
              break;
            case 'payer':
              setPayer(ev.target.value)
              break;
            
            default: return;
            
          }
    }
   
    console.log(props.user);

    return (
      <div className="payment" >
        {showAddPaymentForm ? 
                    
            <div className="shwoPaymentContainer">
                <div className="shwoPaymentWrapper">
                    <div className="shwoPaymentTitle">hello</div>
                    <form onSubmit={backToAddPayment}>
                        <input className="paymentInput"
                                onChange={handleInput}
                                name="Amount"
                                type="Amount"
                                placeholder='Amount'
                        />
                        <input className="paymentInput"
                                onChange={handleInput}
                                name="Receipt"
                                type="Receipt"
                                placeholder='Receipt'
                        />
                        <input className="paymentInput"
                                onChange={handleInput}
                                name="Group"
                                type="Group"
                                placeholder='Group'
                        />
                        <input className="paymentInput"
                                onChange={handleInput}
                                name="Payee"
                                type="Payee"
                                placeholder='Payee'
                        />
                        <input className="paymentInput"
                                onChange={handleInput}
                                name="Payer"
                                type="Payer"
                                placeholder='Payer'
                        />

                        <button>Submit</button>
                    </form>   
                </div>
            </div>
            : null
        } 
        { hideAddPaymentForm ?             
        <div className="paymentcontainer">
          <div className="paymentwrapper">
            <div className="paymenttitle">Hello Payment</div>
            
                {/* <form onSubmit={handleSubmit}> */}
                    <button className="paymentbutton" onClick={addPayment}>
                        + Payment
                    </button>
                    
                    
                <div className="hidePaymentForm">
                    <div className="paymentMenuContainer">
                        {/* <div className="paymentMenu"> */}
                            <div className="paymentMenuItem">
                                <p>Payee</p>
                            </div>
                            <div className="paymentMenuItem">
                                <p>Payer</p>
                            </div>
                            <div className="paymentMenuItem">
                                <p>Amount</p>
                            </div>
                            <div className="paymentMenuItem">
                                <p>Receipt</p>
                            </div>
                        {/* </div> */}
                    </div>
                
                    <div className="paymentInfoForm">
                        {
                            filteredPayments.map((r) => 
                                <div onClick={(e) => handlePaymentShow(r._id, e)} className="payments" key={r._id}>
                                    <div className="paymentInfoFormPayment">
                                        <p>{r.payee.name}</p>
                                    </div>
                                    <div className="paymentInfoFormPayment">
                                        <p>{r.payer.name}</p>
                                    </div>
                                    <div className="paymentInfoFormPayment">
                                        <h4>{r.paymentAmount}</h4> 
                                    </div>
                                    <div className="paymentInfoFormPayment">
                                        <p>{r.receipt}</p>
                                    </div>
                                </div>
                            )
                        }
                       
                    </div>
                
                </div>
               
                    
                    
                    
            </div>
            
        </div>
        : null
        }
               
      </div>
    )
}

export default Payment;