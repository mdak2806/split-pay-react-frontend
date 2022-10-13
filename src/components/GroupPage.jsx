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



    const { id } = useParams();

    useEffect( async () => {
        await request()
        .get('/groups')
        .then(response => {
            setGroup(response.data.find(group => group._id === id))

        })

        
        await axios.get (`${BASE_URL}/categories`)

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

    function debtShow(){
        // setGroupDebts(group.groupDebts)


        // setGroupDebts(group.groupDebts)
        console.log('groupdebts', groupDebts);


        return(
            <div className="content">

            {
                groupDebts.map((r) => 
                <div className="groups" key={r._id}>
                    <p>{r.description}</p>

                    <p>Members:</p>
                    {
                        
                        // r.users.map((u) => 
                        // <p> {u.name}</p>
                        // )
                    }
                
                    {/* <p>Pending Debts: {r.groupDebts.count()}</p> */}
                    </div>
                )
            }
        </div>
        )

    }

    return(

        <div className="content">
            Hello
            <button onClick={(ev) => handleBack(ev)}> Back </button>
            {
            debtShow()
            }
        </div>


    )
}

export default GroupPage;