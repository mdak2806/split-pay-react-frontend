import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = 'http://localhost:3000'




const Payment = (props) => {
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [users, setUsers] = useState([]);
    const navigatePush = useNavigate();

    const currentUser = props.user

    useEffect( (ev) => {
   
        setFilteredPayments(currentUser.payments);
        
        axios.get(`${BASE_URL}/users`)

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


    console.log(props.user);

    return (
      <div className="payment" >
        <div className="paymentcontainer">
          <div className="paymentwrapper">
            <div className="paymenttitle">Hello Payment</div>
            
                {/* <form onSubmit={handleSubmit}> */}
                    <button className="paymentbutton">+ Payment</button>
                    <div className="paymentMenuContainer">
                        {/* <div className="paymentMenu"> */}
                            <div className="paymentMenuItem">
                                <p>Payee</p>
                            </div>
                            <div className="paymentMenuItem">
                                <p>Payer</p>
                            </div>
                            <div className="paymentMenuItem">
                                <p>paymentAmount</p>
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
    )
}

export default Payment;