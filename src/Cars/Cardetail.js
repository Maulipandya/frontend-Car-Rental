import "@fontsource/lovers-quarrel";
import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material"; //Paper: A simple container with a white background and shadow.
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase"; // Ensure the correct path to your Firebase config file

//Toolbar: A container that places content inside AppBar.
import React, { useEffect, useState } from "react"; //usestate is used to allow components to store and manage state within functional components
import { useLocation, useNavigate } from "react-router-dom";

const Cardetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state || {}; // Avoid errors if state is undefined
  const [cars, setCars] = useState([]);
  console.log(location);
  const [openDialog, setOpenDialog] = useState(false); //makes sure logout confirmation dialog is not initially displayed
  const [selectedModel, setSelectedModel] = useState(""); // Default or dynamically set model
  const handleLogoutClick = () => setOpenDialog(true); //opens the logout confirmation dialog when logout button is clicked
  const handleCloseDialog = () => setOpenDialog(false); //closes the dialog box
  const handleConfirmLogout = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  useEffect(() => {
    // console.log("location",location)
    // console.log("data.car",data.car)
    
    const fetchCarDetails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const carList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((car) => car.Name === selectedModel); // Filter based on selected model
        setCars(carList);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCarDetails();
  }, [selectedModel]); // Runs when selectedModel changes

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
        {/*zindex ensures that the appbar(title) appears above other contents*/}
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "65px !important",
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Left - Car Rental Information */}
            <Box
              sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Typography
                variant="h6"
                color="white"
                fontFamily="monospace"
                sx={{ fontSize: "26px" }}
              >
                Car Rental Information
              </Typography>
            </Box>

            {/* Center - Rent Hub */}
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
            <Box />
          </Box>

          {/* Right Section: Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              onClick={() => navigate("/rental-dashboard")}
              variant="outlined"
              sx={{
                color: "white",
                border: "1.5px solid black",
                fontWeight: "bold",
                fontSize: "14px",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={handleLogoutClick}
              variant="outlined"
              sx={{
                color: "white",
                border: "1.5px solid black",
                fontWeight: "bold",
                fontSize: "14px",
                px: 3,
                py: 1,
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Background with Image and Overlay */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('https://img.freepik.com/free-vector/car-rental-concept-illustration_114360-9916.jpg?t=st=1741321061~exp=1741324661~hmac=4c9d25ee1f96727a2229a672c72cd3fa6db8073196532708dd9238f0b6265cb7&w=1800')`,
backgroundSize: "cover", //ensures the image doesn't break when stretched
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat", //prevents image from repeating
          display: "flex",
          flexDirection: "column", //top to bottom
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          position: "relative",
          //creates a semi transparent white overlay
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.25)", // Soft white overlay
            backdropFilter: "blur(2.7px)",
            zIndex: 1, //ensures overlay appears above background but below content
          },
        }}
      >
        {/* Content Box */}
        <Box
          sx={{
            padding: "30px",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            maxWidth: "800px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "rgba(234, 234, 234, 0.8)", // Light Grey transparency
            border: "1px solid rgba(29, 148, 254, 0.5)",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1D94FE",
              fontWeight: "bold",
              mb: 2,
              textTransform: "uppercase",
            }}
          >
            Car Rental Confirmation
          </Typography>

          <TableContainer
            component={Paper}
            sx={{ boxShadow: 4, borderRadius: "8px" }}
          >
            {/*borderradius rounds the corner around the buttons*/}
            <Table sx={{width:"auto",height:"auto"}}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1D94FE", height: "50px" }}>
                  {[
                    "Brand",
                    "Car Name",
                    "Engine",
                    "Petrol Price",
                    "Diesel Price",
                    "Electric Price",
                    "Fuel Type",
                    "Transmission",
                    "Max Speed",
                    "Seating",
                  ].map((header, index) => (
                    <TableCell
                      key={index}
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <tbody>
                <tr style={{ height: "105px" }}>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.Brand}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.Name}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.Engine}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    ₹{data.car.PetrolPrice}/day
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    ₹{data.car.DieselPrice}/day
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    ₹{data.car.ElectricPrice}/day
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.FuelType}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.Transmission}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.MaxSpeed}
                  </td>
                  <td style={{ fontSize: "16px", padding: "8px" }}>
                    {data.car.Seating}
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableContainer>

          {/* Confirm Booking and Back Buttons */}
          <Box
            sx={{ display: "flex", gap: 2, mt: 3, justifyContent: "center" }}
          >
            <Button
              variant="contained"
              size="small"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 18px",
                textTransform: "uppercase",
                borderRadius: "6px",
                border: "2px solid black",
                backgroundColor: "#1D94FE",
                color: "white",
                "&:hover": { backgroundColor: "#66B3FF" }, // Two shades lighter
              }}
              onClick={() => {
                localStorage.setItem("Car Data",JSON.stringify(data.car));
                navigate("/information");
              }}
            >
              Confirm Booking
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                padding: "8px 18px",
                textTransform: "uppercase",
                borderRadius: "6px",
                border: "2px solid black",
                backgroundColor: "#EAEAEAFF",
                color: "#D32F2F", // Red text
                "&:hover": { backgroundColor: "#C0C0C0" }, // Two shades darker
              }}
              onClick={() => {
                console.log(`cars/${data.prevUrl}`);

                navigate(`/cars/${data.prevUrl}`);
              }}
            >
              <Close sx={{ fontSize: "18px" }} />
              Back
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
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
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#EAEAEAFF",
              color: "#D32F2F",
              border: "2px solid black",
              "&:hover": { backgroundColor: "#D1D1D1" },
            }}
          >
            <Close sx={{ fontSize: "18px" }} />
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
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
    </>
  );
};

export default Cardetail;
