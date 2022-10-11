import React from "react";
import '../App.css';
import Group from "./Group";
import User from "./User";
import UserDebt from "./UserDebt";
import Payment from "./Payment";
import Login from './Login';
import MyProfile from './MyProfile';
import SignUp from './SignUp';
import GroupPage from "./GroupPage";
import {useState, useEffect} from 'react';

import '../App.css';
import { useNavigate } from "react-router-dom";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { request } from '../utils/request'




function Home ( props ){

    const [currentUser, setCurrentUser] = useState(null);
    // const navigatePush = useNavigate();
    // useEffect not usedEffect (might cause errors down the line)
    useEffect( () => {
        console.log('Component Mounting!');
        fetchUser();
    }, []);

    // function to set current user
    function fetchUser () {
        let token =  localStorage.getItem("jwt");
        // truthy conditional check statement for the token and make sure its present
        // i.e. the user is logged in (token present) 
        if (token){
            request().get(`/current_user`)
            .then(res => {
    
                // TODO: BELOW MIGHT BE AN ERROR should be in object
              setCurrentUser(res.data)
              console.log(`Setting current user to`, res.data)
                // this.setState({currentUser: res.data})
            })
            .catch(err => console.warn(err))
        }
      
    };

    // function to log-out user
    function handleLogOut (){
        setCurrentUser(null)
        localStorage.removeItem("jwt");
        // navigatePush('/home');

    }



    return(

        <div className="App">
            <Router>
                <div className="container">
                    <div className="wrapper">
                        <div className="left">
                            {/* <h1 Navigate >Split Pay App</h1> */}
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
                            localStorage.getItem("jwt") !== null
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
                    {/* setting up a conditional for rendering to ensure current user saved and loaded */}
                    {currentUser &&

                    <>
                    <Route path="/user" element={<User user={currentUser} {...useState}/>} />
                    
                    <Route path="/group" element={<Group user={currentUser} {...useState}/>} />
                    
                    <Route path="/group/:id" element={<GroupPage user={currentUser} {...useState}/>}
                    />
                                       
                    <Route path="/userdebt" element={<UserDebt user={currentUser} {...useState}/>} />

                    <Route path="/profile" element={<MyProfile user={currentUser} {...useState}/>} />  
                                          
                    <Route path="/payment" element={<Payment user={currentUser} {...useState}/>} /> 
                    </>}    

                    <Route path="/login" element={<Login fetchUser={fetchUser} user={currentUser} {...useState}/>} />    

                    <Route path="/signup" element={<SignUp fetchUser={fetchUser} {...useState}/>} />    

                                            
                </Routes>  
        
            </Router>
        </div>




    );

} // Home function

export default Home