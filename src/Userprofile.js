import {
  AppBar, Box, Button, Card, CardContent, Dialog, DialogActions,
  DialogContent,
  TextField, Toolbar, Typography
} from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebase"; // Ensure this points to your Firebase config


function Userprofile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    licenseNumber: "",
    licenseExpiry: "",
    resetPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userProfileData"));
    if (storedData) {
      setFormData(storedData);
    }
  }, []);
  const [errors, setErrors] = useState({});
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({});
  
    if (name === "name" && !/^[A-Za-z0-9@\s]*$/.test(value)) return; // Allow letters, numbers, @, and spaces
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return; // Only digits, max 10
    if (name === "licenseNumber" && !/^\d*$/.test(value)) return; // Only numbers
  
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  {/*VALIDATIONS!!*/}
  const validate = () => {
    let newErrors = {};

    const safeTrim = (value) => (value ? value.trim() : "");
    const today = new Date().toISOString().split("T")[0];

    if (!safeTrim(formData.name)) newErrors.name = "Name is required";
    // else if (!/^[A-Za-z\s]+$/.test(formData.name)) newErrors.name = "Only letters allowed";

    if (!safeTrim(formData.phone) || formData.phone.length !== 10) 
        newErrors.phone = "Phone number must be exactly 10 digits";

    if (!safeTrim(formData.licenseNumber)) 
        newErrors.licenseNumber = "License number is required";
    else if (!/^\d+$/.test(formData.licenseNumber)) 
        newErrors.licenseNumber = "Only numbers allowed";

    if (!safeTrim(formData.email)) 
        newErrors.email = "Email is required";
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) 
        newErrors.email = "Invalid email format";

    if (!safeTrim(formData.address))
        newErrors.address = "Address is required";
    else if (formData.address.length < 10)
        newErrors.address = "Address must be at least 10 characters";

    if (!safeTrim(formData.resetPassword))
        newErrors.resetPassword = "Password is required";

    // if (!safeTrim(formData.confirmPassword))
    //     newErrors.confirmPassword = "Confirm Password is required";
    // else if (formData.confirmPassword !== formData.resetPassword) {
    //     newErrors.confirmPassword = "Passwords do not match";
    // }

    if (!safeTrim(formData.licenseExpiry)) {
        newErrors.licenseExpiry = "*License expiry date is required";
    } else if (formData.licenseExpiry < today) {
        newErrors.licenseExpiry = "*Date must be today or in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};


const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      // Save to Firestore
      await setDoc(doc(db, "userProfiles", formData.email), {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        email: formData.email,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry,
      });

      console.log("User profile saved successfully!");
      setOpenSaveDialog(true);
    } catch (error) {
      console.error("Error saving user profile:", error);
      alert("Failed to save user data. Please try again.");
    }
  };
  }

  const handleSaveConfirm = () => {
    setOpenSaveDialog(false);
    navigate("/rental-dashboard");
  };

  return (
    <div style={{ backgroundColor: "#EAEAEAFF", minHeight: "100vh",
    display: "flex", flexDirection: "column",
    backgroundImage: "url('https://www.shutterstock.com/image-vector/car-insurance-concept-man-draws-260nw-2575052639.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative"}}>
        <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(2.3px)",
        backgroundColor: "rgba(255, 255, 255, 0.15)", // Adjust transparency as needed
      }}
    ></div>
    <div style={{ position: "relative", zIndex: 1 }}>
      
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1D94FE", top: 0, left: 0, width: "100%", zIndex: 1100 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
      variant="h6"
      color="white"
      fontFamily="monospace"
      sx={{ fontSize: "26px" }}
    >            User Profile
          </Typography>
          <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Lovers Quarrel, cursive",
      fontSize: "50px",
      color: "white",
    }}
  >
    Rent Hub
  </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            
          <Button onClick={() => navigate("/rental-dashboard")} variant="outlined" sx={{ color: "white", border: "1.5px solid black", borderColor: "black", fontWeight: "bold", "&:hover": { backgroundColor: "white", color: "black" } }}>BACK</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Form Card */}
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginTop: "70px" }}>
        <Card sx={{ width: 400, padding: 3, borderRadius: 2, boxShadow: 3,border:"2.5px solid black" }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} margin="normal" />
              <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} margin="normal" inputProps={{ maxLength: 10 }} />
              <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleChange} error={!!errors.address} helperText={errors.address} margin="normal" />
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} margin="normal" />
              <TextField fullWidth label="License Number" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} error={!!errors.licenseNumber} helperText={errors.licenseNumber} margin="normal" />
              <TextField fullWidth type="date" label="License Expiry Date" name="licenseExpiry" value={formData.licenseExpiry} onChange={handleChange} error={!!errors.licenseExpiry} helperText={errors.licenseExpiry} margin="normal" inputProps={{ min: today }} InputLabelProps={{ shrink: true }} placeholder=""/>
              <TextField fullWidth type="password" label="Reset Password" name="resetPassword" value={formData.resetPassword} onChange={handleChange} error={!!errors.resetPassword} helperText={errors.resetPassword} margin="normal" />
              {/* <TextField fullWidth type="password" label="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={!!errors.confirmPassword} helperText={errors.confirmPassword} margin="normal" /> */}
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#1D94FE", color: "#fff", mt: 2, "&:hover": { backgroundColor: "#177ACC" } }}>Save Changes</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Back Confirmation Dialog */}
      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
  <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      Your changes have been saved!
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button onClick={handleSaveConfirm} sx={{ backgroundColor: "#1D94FE", color: "white", "&:hover": { backgroundColor: "#177ACC" } }}>
      OK
    </Button>
  </DialogActions>
</Dialog>



      {/* Save Confirmation Dialog */}
      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="h6">Your changes have been saved successfully!</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleSaveConfirm} sx={{ backgroundColor: "#1D94FE", color: "white", "&:hover": { backgroundColor: "#66B3FF" } }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </div>
    </div>
  );
}

export default Userprofile;