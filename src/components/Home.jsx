import React from "react";
import '../App.css';
import Group from "./Group";
import User from "./User";
import GroupDebt from "./GroupDebt";
import UserDebt from "./UserDebt";
import Payment from "./Payment";


import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
// import React, {useState} from "react";
import axios from 'axios';


function Home (){




    return(

        <div className="App">
            <Router>

             <header>

            <h1> Split Pay App</h1>
             
                <nav>
                    <Link to="/">Home</Link>
                    {' '} | {' '}
                    <Link to="/group">Group</Link>
                    {' '} | {' '}
                    <Link to="/user">User</Link>
                    {' '} | {' '}
                    <Link to="/groupdebt">Group Debts</Link>
                    {' '} | {' '}
                    <Link to="/userdebt">User Debts</Link>
                    {' '} | {' '}
                    <Link to="/payment">Payments</Link>
                </nav>
            </header> 



                <Routes>
                   {/* <Route path="/" >
                         <Home/>
                    </Route>  */}
                    <Route path="/user" >
                         <User/>
                    </Route> 
                    <Route path="/group" >
                         <Group/>
                    </Route> 
                    <Route path="/groupdebt" >
                         <GroupDebt/>
                    </Route> 
                    <Route path="/userdebt" >
                         <UserDebt/>
                    </Route> 
                    <Route path="/payment" >
                         <Payment/>
                    </Route>  
                </Routes>


        
            </Router>


        </div>




    );

} // Home function

export default Home