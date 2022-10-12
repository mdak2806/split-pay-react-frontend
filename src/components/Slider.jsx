import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React from "react";
import '../App.css';

const Slider =() => {

    

        return (
            <div className="sliderContainer">
                <div className="arrow">
                    <ArrowLeftOutlined />
                </div>
                <div className="sliderWrapper">
                    <div className="slide">
                        <div className="slideImgContainer">
                            <img src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                        </div>
                        <div className="sliderInfo">
                            <h1>Split</h1>
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                            </p>
                            <button>SIGN IN NOW</button>
                        </div>
                    </div>
                </div>
                <div className="arrow">
                    <ArrowRightOutlined />
                </div>
           </div> 
        )

    
}


export default Slider;