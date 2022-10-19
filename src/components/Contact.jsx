import { EmailOutlined, Home, Phone } from "@material-ui/icons";
import React from "react";
import '../App.css';



const Contact = () => {
    return (
        <div className="contactContainer">
            <h1>Contact Us</h1>
            <div className="contactInfo">
                <Home /> <h3>221B Baker Street, London</h3>
            </div>
            <div className="contactInfo">
                <Phone /> <h3>+1 234 56 78</h3>
            </div>
            <div className="contactInfo">
                <EmailOutlined/> <h3>contact@splitpay.com</h3>
            </div>

        </div>
    )
}

export default Contact