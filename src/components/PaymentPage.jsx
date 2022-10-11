import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { request } from '../utils/request'
const PaymentPage = (props) => {
    const [payment, setPayment] = useState(null);
    const [currentUser, setCurrentUser] = useState(props.user);

    const { id } = useParams();

    useEffect(() => {
        request().get('/payment').then(response => {
            setPayment(response.data.find(payment => payment._id === id))
        })
    }, [props.user])

    console.log('Payments page data:', payment )
}

export default PaymentPage;