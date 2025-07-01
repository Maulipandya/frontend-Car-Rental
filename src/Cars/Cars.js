import { Close } from "@mui/icons-material";
import {
  AppBar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, Toolbar, Typography
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import {React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";//useparams= it lets you get info from the url like cars-toyota we get toyota
import { db } from "../Firebase"; // Ensure firebase is correctly imported
import "../Pages.css";
//shows a list of cars for a selected brand.
const Cars = () => {
  const [open, setOpen] = useState(false); //state for car selection dialog
  const [selectedCar, setSelectedCar] = useState(null); //stores selected car details
  const [logoutDialog, setLogoutDialog] = useState(false); // Logout confirmation

  const [cars, setCars] = useState([]);//stores list of all cars fetched from database
  const navigate = useNavigate();
  const { company } = useParams();//company gets the brand from the url
  console.log(company);

  //opens dialog when a car model is selected
  const handleOpenDialog = (car) => {
    setSelectedCar(car);
    setOpen(true);
  };
  //closes dialog and redirect to cardetail when clicked on yes
  const handleCloseDialog = () => setOpen(false);
  //close the car selection dialog box
  const handleConfirm = () => {
    setOpen(false);
    if (selectedCar) {
        navigate("/cardetail", { state: { car: selectedCar, prevUrl : company } }); // Pass selected car data
    }
};
//car:selectedcar=pass the selected car's details
//prevurl:company=Also send which company (like 'Toyota') the car belongs to

  useEffect(() => {
    const fetchCarModels = async () => {
      try {
        console.log("doc01")
// Reference to the cars collection in the Firestore database
        const vehiclesRef = collection(db, "Vehicles", company, 'cars');
        const querySnapshot = await getDocs(vehiclesRef);// Get the car models from Firestore
        const veh = [];
// Loop through the querySnapshot and push each car document data into the 'veh' array
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data())
          veh.push(doc.data())
        });

        setCars(veh);// Store the fetched car models into the state
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };

    fetchCarModels();// Invoke the function to fetch car models
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1D94FE",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="white" fontFamily={"monospace"}>
          {company} Cars
          </Typography>
          <Box
    sx={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Lovers Quarrel, cursive",
      fontSize: "36px",
      color: "white",
    }}
  >
    Rent Hub
  </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => navigate("/rental-dashboard")}
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "black",
                border: "1.5px solid black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => setLogoutDialog(true)} // Open Logout Dialog
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "black",
                border: "1.5px solid black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        {/*maps over above cars array and displays each card in grid*/}
        <Grid
          container
          spacing={3}
          padding={'7.5px'}
          sx={{ marginTop: "70px", justifyContent: "center" }}
        >
          {cars.map((car, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>{/*to change total no of cards in one line change md*/}
              <Box
                sx={{
                  backgroundColor: "#EAEAEAFF",
                  borderRadius: "12px",
                  boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
                  },
                  textAlign: "center",
                  padding: "16px",
                  cursor: "pointer",
                  border: "2px solid black",
                }}
                onClick={() => handleOpenDialog(car)}
              >
                {/* Display car image, name, price, and details */}
                <img
                  src={car.Image}
                  alt={car.Name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid black",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ mt: 2, fontWeight: "bold", color: "#1D94FE" }}
                >
                  {car.Name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "black", fontWeight: "bold", fontSize: "18px" }}
                >
                  {car.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "black" }}>
                  {car.details}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Car Selection Confirmation Dialog */}
        <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
  <DialogTitle sx={{ backgroundColor: "#1D94FE",color: "#FFF", textAlign: "center", fontWeight: "bold", p: 2 , fontFamily:"monospace"}}>
    Confirm Your Selection
  </DialogTitle>

  <DialogContent sx={{ textAlign: "center", p: 3, backgroundColor: "#EAEAEAFF" }}>
    {selectedCar && (
      <Box>
        <Typography variant="h6" fontWeight="bold" color="black">
          {selectedCar.Brand} {selectedCar.Name}<br/>
        </Typography>

        {selectedCar.Image && (
          <Box
            component="img"
            src={selectedCar.Image}
            alt={selectedCar.Name}
            sx={{
              backgroundColor:'white',
              width: "100%",
              height: "auto",
              maxHeight: 250,
              objectFit: "contain",
              borderRadius: 2,
              my: 2,
              border: "2px solid #1D94FE"
            }}
          />
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: 1.5,
            textAlign: "left",
            maxWidth: 320,
            mx: "auto",
            p: 2,
            backgroundColor: "#EAEAEAFF",
            borderRadius: 2
          }}
        >
          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Engine:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>{selectedCar.Engine}</Typography>

          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Transmission:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>{selectedCar.Transmission}</Typography>

          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Petrol Price:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>₹{selectedCar.PetrolPrice}/day</Typography>

          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Diesel Price:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>₹{selectedCar.DieselPrice}/day</Typography>
          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Electric Price:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>₹{selectedCar.ElectricPrice}/day</Typography>
            
          <Typography fontWeight="bold" color="black" sx={{ textAlign: "right", pr: 1 }}>Seating:</Typography>
          <Typography sx={{ borderBottom: "1px solid #1D94FE", pb: 0.5, color: "black" }}>{selectedCar.Seating}</Typography>
          
        </Box>
 {/* Additional car details */}
        {selectedCar.details && (
          <Typography variant="body2" sx={{ mt: 2, fontStyle: "italic", color: "black" }}>
            {selectedCar.details}
          </Typography>
        )}
      </Box>
    )}
  </DialogContent>

  <DialogActions sx={{ justifyContent: "center", pb: 2, backgroundColor: "#EAEAEAFF" }}>
    <Button
      onClick={handleCloseDialog}
      sx={{
        backgroundColor: "#EAEAEAFF",
        color: "#D32F2F",
        border: "2px solid black",
        "&:hover": { backgroundColor: "#C0C0C0" },
      }}
    >
      <Close sx={{ fontSize: "18px", mr: 1 }} />
      Cancel
    </Button>
    <Button
      onClick={handleConfirm}
      sx={{
        backgroundColor: "#1D94FE",
        color: "white",
        border: "2px solid black",
        "&:hover": { backgroundColor: "#66B3FF" },
      }}
    >
      Confirm
    </Button>
  </DialogActions>
</Dialog>
{/* Logout Confirmation Dialog */}
        <Dialog
          open={logoutDialog}
          onClose={() => setLogoutDialog(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            sx={{
              backgroundColor: "#1D94FE",
              color: "white",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              padding: "16px",
            }}
          >
            Confirm Logout
          </DialogTitle>

          <DialogContent
            sx={{
              backgroundColor: "#EAEAEAFF",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Are you sure you want to log out?
            </Typography>
          </DialogContent>

          <DialogActions
            sx={{
              backgroundColor: "#EAEAEAFF",
              justifyContent: "center",
              paddingBottom: "16px",
            }}
          >
            <Button
              onClick={() => setLogoutDialog(false)}
              sx={{
                backgroundColor: "#EAEAEAFF",
                color: "#D32F2F",
                border: "2px solid black",
                "&:hover": { backgroundColor: "#C0C0C0" },
              }}
            >
              <Close sx={{ fontSize: "18px", mr: 1 }} />
              Cancel
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                backgroundColor: "#1D94FE",
                color: "white",
                border: "2px solid black",
                "&:hover": { backgroundColor: "#66B3FF" },
              }}>
              Yes, Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Cars;
