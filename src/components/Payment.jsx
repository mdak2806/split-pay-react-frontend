import React from "react";
import '../App.css';
import axios from 'axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const BASE_URL = 'http://localhost:3000'

const Payment = (props) => {

    const currentUser = props.user;

    const [filteredPayment, setFilteredPayment] = useState([]);
    const [key, setKey] = useState([]);
    const navigatePush = useNavigate();  

    useEffect( () => {
        
        setFilteredPayment(currentUser.payment);

        console.log(filteredPayment);

      
    }, []);

    function handlePaymentShow(id, e){
        // console.log(id)
        console.log('clicked', id);
        
        // console.log('key', key)

        navigatePush(`/payment/${id}`);


    }


    return (
        <div className="content">
            Hello Payment
           {/* {currentUser} */}
            <br />

            <div className="userPayment">
                {
                    filteredPayment.map((r) => 
                    // <Link path=`${'groups'}/${r._id}`, params={r._id}>
                    <div onClick={(e) => handlePaymentShow(r._id, e)} className="payment" key={r._id}>
                        <h4>{r.paymentName}</h4> 
                        <p>{r.description}</p>
                    </div>
                    // </Link>
                    )
                }
         
            </div>
            

            <button>+ expense </button>
        </div>
    )
}

export default Payment