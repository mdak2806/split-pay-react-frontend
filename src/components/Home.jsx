import React from "react";
import '../App.css';
import Group from "./Group";
import Contact from "./Contact";
import Payment from "./Payment";
import Login from './Login';
import MyProfile from './MyProfile';
import SignUp from './SignUp';
import GroupPage from "./GroupPage";
import PaymentPage from './PaymentPage';
import {useState, useEffect} from 'react';
import Slider from './Slider';
import axios from "axios";
import logo from "../logo3.png"
import GroupNew from './GroupNew';
import GroupExpense from './GroupExpense';
import '../App.css';
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";


// let BASE_URL ='http://localhost:3000'
let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://split-pay-app-mw.herokuapp.com';
} // end rails deployment if-else
function Home ( props ){

    const [currentUser, setCurrentUser] = useState(null);
    const groupMembers = props.groupMembers;

    console.log(currentUser);

    // useEffect not usedEffect (might cause errors down the line)
    useEffect( () => {
        fetchUser();
    }, []);
    // function to set current user
    function fetchUser () {
        let token =  localStorage.getItem("jwt");
        // truthy conditional check statement for the token and make sure its present
        // i.e. the user is logged in (token present) 
        if (token){
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.get(`${BASE_URL}/current_user`)
            .then(res => {
    
                // TODO: BELOW MIGHT BE AN ERROR should be in object
              setCurrentUser(res.data)
                // this.setState({currentUser: res.data})
            })
            .catch(err => console.warn(err))
        }
      
    };
    // function to log-out user
    function handleLogOut (){
        setCurrentUser(null)
        localStorage.removeItem("jwt");
        axios.defaults.headers.common['Authorization'] = undefined;
        // navigatePush('/home');
    }
    return(
        <div className="App">
            <Router>
                <div className="container">
                    <div className="wrapper">
                        <div className="left">
                            <div className="logocontainer">
                                <img src={logo} alt=''/>
                            </div>
                            <div className="logoTitle">
                            <Link to="/">Split Pay</Link>
                            </div>
                        </div>
                        {
                            currentUser !== null
                            ?
                            (
                                <><div className="wrapper">
                                        <div className="left">
                                            <div className="centercontainer">
                                                <div className="center">
                                                    <div className="centermenu">
                                                        <Link to="/group">Group</Link>
                                                    </div>
                                                    <div className="centermenu">
                                                        <Link to="/payment">Payments</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><div className="right">
                                            <div className="menu">
                                                <Link to="/profile">Profile</Link>
                                            </div>
                                            <div className="menu">
                                                <Link onClick={handleLogOut} to="/">Logout</Link>
                                            </div>
                                        </div></>
                            )
                            :
                            (
                            <><div className="right">
                                            <div className="menu">
                                                <Link to="/signup">SIGN UP</Link>
                                            </div>
                                            <div className="menu">
                                                <Link to="/login">SIGN IN</Link>
                                            </div>
                                        </div></>
                            )
                        }
                     </div>
                    </div>
               
        
                <Routes>
                    {currentUser && 
                    <>
                    <Route path="/contact" element={<Contact/>} />
                    
                    <Route path="/group" element={<Group setGroupMembers={groupMembers} user={currentUser} {...useState}/>} />

                    <Route path="/groupnew" element={<GroupNew setGroupMembers={groupMembers} user={currentUser} {...useState}/>} />

                    <Route path="/groups/:id/expense" element={<GroupExpense setGroupMembers={groupMembers} user={currentUser} {...useState}/>} />



                    <Route path="/groups/:id" element={<GroupPage user={currentUser} groupMembers={groupMembers}  {...useState}/>}
                    />
                     <Route path="/payment/:id" element={<PaymentPage user={currentUser} {...useState}/>}
                    />
                                          
                    <Route path="/payment" element={<Payment user={currentUser} {...useState}/>} />     
                    
                    <Route path="/profile" element={<MyProfile fetchUser={fetchUser} user={currentUser} {...useState}/>} /> 
                    </>}
                    <Route path="/login" element={<Login fetchUser={fetchUser} user={currentUser} {...useState}/>} />    
                    <Route path="/signup" element={<SignUp fetchUser={fetchUser} {...useState}/>} />    
                     
                    <Route exact path='/' element={<Slider/>} /> 
                                        
                </Routes>  

                <div className="footercontainer">
                    <div className="footerLeft">
                        <h1>Split Pay</h1>
                        <div className="footerDesc">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or rendomised words which don't look even slightly believable.
                        </div>
                        <div className="socialContainer">
                            <div className="facebook">
                                <Facebook />
                            </div>
                            <div className="ins">
                                <Instagram />
                            </div>
                            <div className="twitter">
                                <Twitter />
                            </div>
                        </div>
                    </div>
                    <div className="footerCenter">
                        <h1>Useful Links</h1>
                        <div className="footerLinks">
                            <div className="linkitem">
                            <Link to="/">Home</Link>
                            </div>
                            <div className="linkitem">
                            <Link to="/group">Group</Link>
                            </div>
                            <div className="linkitem">
                            <Link to="/profile">My profile</Link>
                            </div>
                            <div className="linkitem">Terms</div>
                        </div>
                    </div>
                    <div className="footerRight">
                        <h1>Contact</h1>
                        <div className="contactItem">221B Baker Street, London</div>
                        <div className="contactItem">+1 234 56 78</div>
                        <div className="contactItem">contact@splitpay.com</div>
                    </div>
                </div>
        
            </Router>
        </div>
    );
} // Home function
export default Home