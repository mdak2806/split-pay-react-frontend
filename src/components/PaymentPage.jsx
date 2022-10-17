import React from "react";
import '../App.css';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../utils/request'
import { useNavigate } from "react-router-dom";

const PaymentPage = (props) => {
    const [payment, setPayment] = useState(null);
    // const [currentUser, setCurrentUser] = useState(props.user);
    const navigatePush = useNavigate();


    const { id } = useParams();

    useEffect(() => {
        request().get('/payment').then(response => {
            setPayment(response.data.find(payment => payment._id === id))
        })
        

    }, [props.user._id])

    console.log('Payments page data:', payment )

    function handleBack(ev){

        console.log('click');
        navigatePush(`/patment`);
    }

    return(

        <div className="content">
            Hello
            <button onClick={(ev) => handleBack(ev)}> Back </button>
        </div>
    )
}

   

export default PaymentPage;