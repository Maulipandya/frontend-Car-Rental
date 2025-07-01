
  import { onAuthStateChanged } from "firebase/auth";//shows if user is loggedin or not
import React from "react";//default tp create any react based website
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";//to move from one page to another
import { auth } from "./Firebase"; // connects website to firebase

  import Aboutus from "./Aboutus";
import "./App.css";
import Cardetail from './Cars/Cardetail';
import Cars from './Cars/Cars';
import Dashboard from "./Dashboard";
import Information from "./Information";
import Login from "./Login";
import Payment from "./Payment";
import Register from "./Register";
import Thankyou from "./Thankyou";
import Userprofile from "./Userprofile";

  function App() {
    React.useEffect(() => {
      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is logged in:", user);
        } else {
          console.log("No user is logged in.");
        }
      });
      return () => unsubscribe(); // Cleanup function in order to make website faster
    }, []);
    return (
      <Router>
        <Routes>
          {/* Redirect the default home page to Login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Authentication Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Publicly Accessible Pages */}
          <Route path="/rental-dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/information" element={<Information />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/aboutus" element={<Aboutus />} />

          {/* Car Pages */}
          <Route path="/cars/:company" element={<Cars />} />
          <Route path="/cardetail" element={<Cardetail />} />


        
          {/* Redirect all unknown routes to /login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }

  export default App;
