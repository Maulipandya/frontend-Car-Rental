import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "./Firebase";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [open, setOpen] = useState(false);

  const storedCarData = JSON.parse(localStorage.getItem("Car Data"));
  const storedAddOns = JSON.parse(localStorage.getItem("customizations")) || [];

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const selectedName = location?.state?.car?.Name;

        if (!selectedName) {
          console.warn("No car name found in location state");
          return;
        }

        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filteredCars = carList.filter(
          (car) => car.Name?.toLowerCase().trim() === selectedName.toLowerCase().trim()
        );

        setCars(filteredCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCarDetails();
  }, [location]);


  // Calculate total cost
  const basePrice = Number(storedCarData?.PetrolPrice || 0);
  const addonPrice = storedAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const finalPrice = basePrice + addonPrice;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url("https://img.freepik.com/premium-vector/happy-guy-getting-car-as-birthday-present-vehicle-friend-grandfather-flat-vector-illustration_179970-3624.jpg?w=1800")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(7px)",
          zIndex: 1,
        },
      }}
    >
      <Card
        sx={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "500px",
          textAlign: "center",
          padding: "40px 30px",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#1D94FE",
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            Thank You!
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#333", fontWeight: "bold", opacity: 0.9, mb: 3 }}
          >
            Your booking has been confirmed. Enjoy your ride! 🚗💨
          </Typography>

          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => navigate("/rental-dashboard")}
          >
            Back to Home
          </Button>
          <br />
          <br />
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={() => setOpen(true)}
          >
            Final Bill
          </Button>

          {/* Final Bill Dialog */}
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle
              sx={{
                backgroundColor: "#1D94FE",
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "22px",
              }}
            >
              Final Bill Summary
            </DialogTitle>

            <DialogContent sx={{ padding: "24px" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography>
                  <strong>Brand:</strong> {storedCarData?.Brand || "N/A"}
                </Typography>
                <Typography>
                  <strong>Car Name:</strong> {storedCarData?.Name || "N/A"}
                </Typography>
                <Typography>
                  <strong>Base Price:</strong> ₹{basePrice}/day
                </Typography>

                <Typography>
                  <strong>Customizations Chosen:</strong>
                </Typography>
                {storedAddOns.length ? (
                  storedAddOns.map((addon, index) => (
                    <Typography key={index}>
                      • {addon.name || "Did Not Selected Any Customizations"} (+₹{addon.price})
                    </Typography>
                  ))
                ) : (
                  <Typography>No customizations selected</Typography>
                )}

                <Typography>
                  <strong>Total Customization Cost:</strong> ₹{addonPrice}
                </Typography>
                
                <Typography>
                  <strong>Security Deposit:</strong>  ₹5000
                </Typography>
                <Typography>
                  <strong>Final Price:</strong> ₹{finalPrice}/day
                </Typography>
                {/* <Typography>
                  <strong>Seating:</strong> {storedCarData?.Seating || "N/A"}
                  &nbsp; seater
                </Typography> */}
              </Box>
            </DialogContent>

            <DialogActions sx={{ justifyContent: "space-between", padding: "16px 24px" }}>
              <Button onClick={() => setOpen(false)} sx={{ color: "#1D94FE", fontWeight: "bold" }}>
                Close
              </Button>
              <Button
                sx={{
                  backgroundColor: "#1D94FE",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#0078D4",
                  },
                }}
                onClick={() => setOpen(false)} // Close the dialog and stay on the Thank You page
              >
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </Box>
  );
};

const buttonStyles = {
  backgroundColor: "#1D94FE",
  color: "white",
  fontSize: "18px",
  fontFamily: "monospace",
  padding: "12px 25px",
  fontWeight: "bold",
  borderRadius: "10px",
  border: "2px solid black",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#0078D4",
    transform: "scale(1.05)",
  },
};

export default ThankYou;
