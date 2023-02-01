import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import '../App.css';
import {sliderItems} from "../App.js";
import { NavLink as Link} from "react-router-dom";


const Slider =() => {
        
        const [slideIndex, setslideIndex] = useState(0)

        const handleClick = (direction) => {
            if(direction === "left"){
                setslideIndex(slideIndex > 0 ? slideIndex -1 : 2);
            } else {
                setslideIndex(slideIndex < 2 ? slideIndex +1 : 0);
            }
        };
        console.log(slideIndex)


        return (
            <div className="sliderContainer">
                <div className="arrow" direction="left" 
                     onClick={() => handleClick("left")}
                     style={{ left:  "10px" }}
                >
                    <ArrowLeftOutlined />
                </div>
                <div className="sliderWrapper" slideIndex={slideIndex} style={{  transform: `translateX(${slideIndex * -100}vw)`}}>  
                    {sliderItems.map((item) => (
                    <div className="slide" key={item.id}>
                        <div className="slideImgContainer">
                            <img src={item.img} alt='' />
                        </div>
                        <div className="sliderInfo">
                            <h1>{item.h1}</h1>
                            <p>{item.p}</p>
                            <div className="sliderInfoButton">
                                <Link to="/login">LOGIN NOW</Link>   
                            </div>
                           
                            <br></br>
                            <div className="sliderInfoButton">
                                <Link to="/signup">SIGN UP NOW</Link>   
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="arrow"  direction="right" 
                     onClick={() => handleClick("right")}
                     style={{ right:  "10px" }}
                     >
                    <ArrowRightOutlined />
                </div>
           </div> 
        ) 
}


export default Slider;