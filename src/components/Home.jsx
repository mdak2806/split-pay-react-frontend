import React from "react";
import '../App.css';
import Group from "./Group";
import User from "./User";
import UserDebt from "./UserDebt";
import Payment from "./Payment";
import Login from './Login';
import MyProfile from './MyProfile';
import SignUp from './SignUp';
import {useState, useEffect} from 'react';
import axios from "axios";


import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";

// import axios from 'axios';

let BASE_URL ='http://localhost:3000'

function Home ( props ){

    const [currentUser, setCurrentUser] = useState(null);

    // useEffect not usedEffect (might cause errors down the line)
    useEffect( () => {
        console.log('Component Mounting!');
        fetchUser();
    }, []);

    // function to set current user
    function fetchUser () {
        let token = "Bearer " + localStorage.getItem("jwt");
        axios.get(`${BASE_URL}/current_user`, {
          headers: {
            'Authorization': token
          }
        })
        .then(res => {

            // TODO: BELOW MIGHT BE AN ERROR should be in object
          setCurrentUser(res.data)
            // this.setState({currentUser: res.data})
        })
        .catch(err => console.warn(err))
    };

    // function to log-out user
    function handleLogOut (){
        setCurrentUser(undefined)
        localStorage.removeItem("jwt");
        axios.defaults.headers.common['Authorization'] = undefined;

    }



    return(

        <div className="App">
            <Router>
                <div className="container">
                    <div className="wrapper">
                        <div className="left">
                            <h1 Navigate >Split Pay App</h1>
                            <Link to="/">Split Pay App</Link>
                        </div>

                        <div className="center">
                            <div className="centermenu">
                                <Link to="/group">Group</Link>
                            </div>
                            <div className="centermenu">
                                <Link to="/user">User</Link>
                            </div>
                            
                            <div className="centermenu">
                                <Link to="/userdebt">User Debts</Link>
                            </div>
                            
                            <div className="centermenu">
                            <Link to="/payment">Payments</Link>
                            </div>       
                        </div>  
                        {
                            currentUser !== null
                            ?
                            (
                            <div className="right">
                                <div className="menu">
                                <Link to="/profile">Profile</Link>
                                </div>
    
                                <div className="menu">
                                <Link onClick={handleLogOut} to="/">Logout</Link>
                                </div>
                            </div>
                            )
                            :
                            (
                            <div className="right">
                                <div className="menu">
                                <Link to="/signup">SIGN UP</Link>
                                </div>
    
                                <div className="menu">
                                <Link to="/login">SIGN IN</Link>
                                </div>
                            </div>
                            )


                        }
                     
                    </div>
                </div>

        
                <Routes>
                    <Route path="/user" element={<User user={currentUser}/>} />
                    
                    <Route path="/group" element={<Group user={currentUser}/>} />
                                       
                    <Route path="/userdebt" element={<UserDebt user={currentUser}/>} />
                                          
                    <Route path="/payment" element={<Payment user={currentUser}/>} />     

                    <Route path="/login" element={<Login/>} />    

                    {/* <Route path="/signup" element={<SignUp/>} />     */}

                    <Route path="/profile" element={<MyProfile user={currentUser}/>} />                            
                </Routes>  
        
            </Router>
        </div>




    );

} // Home function

export default Home