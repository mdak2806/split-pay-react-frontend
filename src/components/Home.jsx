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
import PaymentPage from './PaymentPage';
import {useState, useEffect} from 'react';
import Slider from './Slider';
import axios from "axios";

import '../App.css';
import { useNavigate } from "react-router-dom";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ArrowLeftOutlined, Facebook, Instagram, Twitter } from "@material-ui/icons";

// import axios from 'axios';

let BASE_URL ='http://localhost:3000'

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
                            {/* <h1 Navigate >Split Pay App</h1> */}
                            <Link to="/">Split Pay App</Link>
                        </div>
                        <div className="centercontainer">
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
                </div>  {/* container */}



               

        
                <Routes>
                    {currentUser && 
                    <>
                    <Route path="/user" element={<User user={currentUser} {...useState}/>} />
                    
                    <Route path="/group" element={<Group user={currentUser} {...useState}/>} />
                    
                    <Route path="/groups/:id" element={<GroupPage user={currentUser} {...useState}/>}
                    />
                     <Route path="/payment/:id" element={<PaymentPage user={currentUser} {...useState}/>}
                    />
                                       
                    <Route path="/userdebt" element={<UserDebt user={currentUser} {...useState}/>} />
                                          
                    <Route path="/payment" element={<Payment user={currentUser} {...useState}/>} />     
                    
                    <Route path="/profile" element={<MyProfile fetchUser={fetchUser} user={currentUser} {...useState}/>} /> 
                    </>}
                    <Route path="/login" element={<Login fetchUser={fetchUser} user={currentUser} {...useState}/>} />    

                    <Route path="/signup" element={<SignUp fetchUser={fetchUser} {...useState}/>} />    
                     
                    <Route exact path='/' element={<Slider/>} /> 
                                        
                </Routes>  

                {/* <div className="sliderContainer"> */}
                    {/* <img src="https://assets-global.website-files.com/602b4f8c33acd255f0f81c8f/62301d1547933a7c8e4e054b_Mr%20Yum%20-%20Split%20%26%20Pay%20-%201600%20x%20900%20-%20Blog%20Header.jpg"></img> */}


                {/* </div>   */}


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
                            <div className="linkitem">Home</div>
                            <div className="linkitem">Group</div>
                            <div className="linkitem">My profile</div>
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