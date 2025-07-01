import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {db} from './Firebase'//Brings the db object that connects the website to Firebase Firestore database.
import { collection, addDoc } from "firebase/firestore";//collection helps point to the right database collection (like a table).
//addDoc adds a new document (row) into that collection.
import "./Register.css";

function Register() {
    const navigate = useNavigate();
//setName is a function to change the name when user types.
    // State variables to store user input and error messages
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showDialog, setShowDialog] = useState(false); // Controls success dialog visibility
    const [nameError, setNameError] = useState("");

    // Function to handle form submission
    const handleSubmit = async() => {
        const userData={
            name: name,
            phone:phone,
            address:address,
            email:email,
        };
        localStorage.setItem("userProfileData", JSON.stringify(userData));
        // Check if all fields are filled
        if (!name || !phone || !address || !email || !password || !confirmPassword) {
            setError("* All fields are required");
            return;
        }
        if (nameError) {
            setError("* Please correct the highlighted errors");
            return;
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            setError("* Passwords do not match");
            return;
        }

        // Logging user input (for debugging purposes)
        console.log("Name:", name);
        console.log("Phone:", phone);
        console.log("Address:", address);
        console.log("Email:", email + "@gmail.com"); // Appending "@gmail.com" to email input
        console.log("Password:", password);
        console.log("Confirmed Password:", confirmPassword);

        // Store user data in localStorage
        localStorage.setItem("registeredUser", JSON.stringify({ name, password }));
        //await logic saves the user info into Firebase database.
        try {
            await addDoc(collection(db, "loginUsers"), {
                username: name,
                password: password,
                timestamp: new Date()
            });
            console.log("User added to Firestore");
        } catch (error) {
            console.error("Error adding user to Firestore: ", error);
            setError("Error saving to database");
            return;
        }
        // Show success dialog
        setShowDialog(true);
    };

    // Function to handle dialog confirmation and navigate to login page
    const handleConfirm = () => {
        setShowDialog(false);
        navigate("/login");
    };

    return (
        <div className="body2">
            <div className="register-container">
                <h1 style={{ color: "#522258", marginBottom: "30px" }}>Sign Up</h1>

                {/* Name Input */}
                <div className="form-row">
    <label>Name:</label>
    <input
        type="text"
        style={{ backgroundColor: "#f8f8f8", border: '1.5px solid black' }}
        value={name}
        placeholder="Enter Your Name"
        onChange={(e) => {
            const regex = /^[A-Za-z0-9@. ]+$/; // allows letters, numbers, @, dot, and space
            if (e.target.value === "" || regex.test(e.target.value)) {
                setName(e.target.value);
                setNameError(""); // Clear error when valid
            } else {
                setNameError("* Only letters, numbers, spaces, '@' and '.' are allowed");
            }
        }}
    />
    {nameError && <p className="error-text">{nameError}</p>}
</div>



{/* Phone Input */}
<div className="form-row">
    <label>Phone:</label>
    <input 
        type="text" 
        style={{ backgroundColor: "#f8f8f8", border:'1.5px solid black' }}
        value={phone} 
        placeholder="Enter Yor Phone Number"
        onChange={(e) => {
            const regex = /^[0-9]{0,10}$/;
            if (regex.test(e.target.value)) {
                setPhone(e.target.value);
            }
        }} 
    />
</div>


                {/* Address Input */}
                <div className="form-row">
                    <label>Address:</label>
                    <input type="text"
                    placeholder="Enter Your Address"
                    style={{ backgroundColor: "#f8f8f8", border:'1.5px solid black' }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} />
                </div>

                {/* Email Input */}
                <div className="form-row">
                    <label>Email: </label>
                    <input type="email"
                    placeholder="Enter Your Email"
                    style={{ backgroundColor: "#f8f8f8", border:'1.5px solid black' }}
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* Password Input */}
                <div className="form-row">
                    <label>Password:</label>

                    <input type="password"
                    placeholder="Enter a Password"
                    style={{ backgroundColor: "#f8f8f8", border:'1.5px solid black' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* Confirm Password Input */}
                <div className="form-row">
                    <label>Confirm Password:</label>
                    <input type="password"
                    placeholder="Confirm The Password"
                    style={{ backgroundColor: "#f8f8f8", border:'1.5px solid black' }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>

                <br />

                {/* Display error message if any */}
                {error && <p className="error-text">{error}</p>}

                {/* Buttons for Sign Up and navigation to Login */}
                <div className="button-container">
                    <button onClick={handleSubmit}>Sign Up</button>
                    <button className="gray-button" onClick={() => navigate("/login")}>Already registered?</button>
                </div>

                {/* Success Dialog Box */}
                {showDialog && (
                    <div className="dialog-overlay">
                        <div className="dialog-box">
                            <p>Registration Successful!</p>
                            <button className="confirm-button" onClick={handleConfirm}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
