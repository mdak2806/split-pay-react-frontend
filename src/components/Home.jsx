import React from "react";
import '../App.css';
import Group from "./Group";
import User from "./User";
import UserDebt from "./UserDebt";
import Payment from "./Payment";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
// import React, {useState} from "react";
// import axios from 'axios';


function Home (){




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

                        <div className="right">
                            <div className="menu">SIGN UP</div>
                            <div className="menu">SIGN IN</div>
                        </div>
                    </div>
                </div>

        
                <Routes>
                    <Route path="/user" element={<User/>} />
                    
                    <Route path="/group" element={<Group/>} />
                                       
                    <Route path="/userdebt" element={<UserDebt/>} />
                                          
                    <Route path="/payment" element={<Payment/>} />                            
                </Routes>  
        
            </Router>
        </div>




    );









} // Home function

export default Home