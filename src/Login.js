import { collection, getDocs, query, where } from "firebase/firestore";//for login check
import React, { useEffect, useState } from "react";//usestate remembers values like username nd passowrd 
//useeffect is used for doing something after the page loads
import { useNavigate } from "react-router-dom";
import { firestore } from "./Firebase"; // to check if user exists

import "./Login.css";

function Login() {
    const navigate = useNavigate();

    // State variables to store user input and error messages
    const [uname, setUname] = useState("");//remembers what user wrote it username
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("");//shows errors if any
    const [isAnimating, setIsAnimating] = useState(true); // so car comes to a stop nd not move forever in a loop

    useEffect(() => {
        // after page loads starts a timer 
        //settimeout waits for 4s then stops car(setisanimating)
        //empty bracket means do it only once after the page loads
        setTimeout(() => {
            setIsAnimating(false);
        }, 4000);
    }, []);

    // logic for what happens when u click on login button
    const handleSubmit = async () => {
        const usernamePattern = /^[a-zA-Z0-9._-]+$/;//regular expressions
        //allows only letters,numbers,dots and dashes in username box..no emojis
        //so no one can submit empty form(validations)
        if (!uname || !pwd) {
            return setError("* Both fields are required"); // Ensures both fields are filled
        }

        console.log("Username:", uname);
        console.log("Password:", pwd);

        try {
            // Check if user exists in Firestore
            const usersRef = collection(firestore, "loginUsers");//goes to firestore collection named loginusers
            const q = query(usersRef, where("username", "==", uname), where("password", "==", pwd));//a search query that makes sure username nd passowrd in firestore database mathces the ones that are written in login page 
            const querySnapshot = await getDocs(q);//to check if the user exists in database

            if (!querySnapshot.empty) {
                // If user exists, redirect to dashboard after 1 second
                console.log("User authenticated! Redirecting...");
                setTimeout(() => navigate("/rental-dashboard"), 1000);
            } else {
                // If credentials are incorrect, show error
                setError("Wrong Credentials");
                setUname(""); // Clear input fields when error shows
                setPwd("");
            }
        } catch (error) {
            console.error("Error checking user data:", error);
            setError("Error verifying login. Please try again.");
        }
    };

    return (
        <div className="body">
            {/* Animated car image that stops moving after 4 seconds */}
            <img 
                src="https://i.pinimg.com/736x/5f/62/cb/5f62cb5f4094fbfd7d284a7de8eccdbe.jpg" 
                alt="Moving Car"
                className={`moving-car ${!isAnimating ? "parked" : ""}`}//stops after 4 seconds as we established above code for isanimating
            />

            {/* Login Form Container */}
            <div className="login-container moved-up">
    <h1 style={{ color: "black" }}>Login</h1>

    {/* Username Input */}
    <label><b>Username:</b></label>
    <input 
        type="text"
        placeholder="Enter Your Email Id"
        style={{ backgroundColor: "white", width: "100%", padding: "10px", marginBottom: "10px" }}
        value={uname}
        onChange={(e) => setUname(e.target.value)}//when u type in inbox it removes placeholder nd stores whatever user wrties in it
    />

    {/* Password Input */}
    <label><b>Password:</b></label>
    <input 
        type="password"
        placeholder="Enter Your Password"
        style={{ backgroundColor: "white", width: "100%", padding: "10px", marginBottom: "10px" }}
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
    />

    {/* Error Message */}
    {error && <p className="error-text">{error}</p>}

    {/* Login Button */}
    <button 
        className="login-button" 
        onClick={handleSubmit}
        style={{ width: "100%",height:"40px", padding: "10px", marginTop: "10px" }}
    >
        Login
    </button>

    {/* Register Navigation */}
    <button 
        className="login-button-2" 
        onClick={() => navigate("/register")}
        style={{ width: "100%", height:"40px", padding: "10px", marginTop: "10px" }}
    >
        Not registered yet?
    </button>

    {/* Forgot Password Link */}
<div style={{ marginTop: "15px", textAlign: "center" }}>
    <a 
        href="#" 
        style={{ 
            color: "#1d94fe", 
            textDecoration: "underline", 
            fontWeight: "500", 
            fontSize: "15px", 
            fontFamily: "Arial, sans-serif",
            cursor: "pointer"
        }}
    >
        Forgot password?
    </a>
</div>

</div>

        </div>
    );
}

export default Login;
