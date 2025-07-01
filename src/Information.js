import { Close, DirectionsCar } from "@mui/icons-material";
import AccessTime from '@mui/icons-material/AccessTime';
import CalendarToday from '@mui/icons-material/CalendarToday';
import Event from '@mui/icons-material/Event';
import Info from '@mui/icons-material/Info';
import LocationOn from '@mui/icons-material/LocationOn';
import {
    AppBar, Box, Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem, TextField, Toolbar, Typography
} from "@mui/material";
import Divider from '@mui/material/Divider';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const locations = ["Satellite","Memnagar","Navrangpura", "Bopal", "Maninagar", "Gota"];
const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
};

const Information = () => {
    const navigate = useNavigate();
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [rentalDuration, setRentalDuration] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [durationType, setDurationType] = useState(""); // "Daily", "Weekly", "Monthly", or "Custom"
    const [customDays, setCustomDays] = useState(""); // Used if "Custom" is selected
    const [open, setOpen] = useState(false);

    const updateReturnDate = (startDate, days) => {
        if (startDate && days) {
            const pickupDate = new Date(startDate);
            pickupDate.setDate(pickupDate.getDate() + parseInt(days, 10));
            setReturnDate(formatDate(pickupDate.toISOString().split("T")[0]));
        } else {
            setReturnDate("");
        }
    };

    return (
        <>

<Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{
                    backgroundColor: "#1D94FE",
                    color: "white",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    padding: "16px"
                }}>
                    Confirm Rental Details
                </DialogTitle>

                <DialogContent sx={{ backgroundColor: "#EAEAEAFF", padding: "24px" }}>
                    {[{ icon: LocationOn, label: "Pick-up Location", value: pickup },
                    { icon: LocationOn, label: "Drop-off Location", value: drop },
                    { icon: Event, label: "Pick-up Date", value: formatDate(date) },
                    { icon: AccessTime, label: "Pick-up Time", value: time },
                    { icon: CalendarToday, label: "Rental Duration", value: `${rentalDuration} days` },
                    { icon: Info, label: "Return Date", value: returnDate }].map(({ icon: Icon, label, value }, index) => (
                        <>
                            <Typography sx={{ display: "flex", alignItems: "center", gap: 1, fontSize: 18 }}>
                                <Icon sx={{ color: index % 2 === 0 ? "#1D94FE" : "#A6A6A6", fontSize: 28 }} />
                                <strong>{label}:</strong> {value}
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                        </>
                    ))}
                </DialogContent>

                <DialogActions sx={{ backgroundColor: "#EAEAEAFF", justifyContent: "center", paddingBottom: "16px" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            color: "black",
                            border: "2px solid black",
                            "&:hover": { backgroundColor: "#D4D4D4" }
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#1D94FE",
                            color: "white",
                            border: "2px solid black",
                            "&:hover": { backgroundColor: "#539EF8", color: "white" }
                        }}
                        onClick={() => navigate("/payment")}
                    >
                        Yes, Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Navbar */}
            <AppBar position="fixed" sx={{ backgroundColor: "#1D94FE", top: 0, left: 0, width: "100%", zIndex: 1100 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" color="white" fontFamily={"monospace"}>Rental Information</Typography>
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
> Rent Hub</Box>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button onClick={() => navigate("/rental-dashboard")} variant="outlined" sx={{ color: "white", border: "1.5px solid black", fontWeight: "bold", "&:hover": { backgroundColor: "white", color: "black" } }}>
                            Dashboard
                        </Button>
                        <Button 
    onClick={() => setLogoutDialog(true)} // Open Logout Dialog
    variant="outlined"
    sx={{
        color: "white", border:"1.5px solid black",borderColor: "black", fontWeight: "bold",
        "&:hover": { backgroundColor: "white", color: "black" }
    }}
>
    Logout
</Button>
<Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)} maxWidth="xs" fullWidth>
    <DialogTitle sx={{
        backgroundColor: "#1D94FE",
        color: "white",
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "bold",
        padding: "16px"
    }}>
        Confirm Logout
    </DialogTitle>

    <DialogContent sx={{ backgroundColor: "#EAEAEAFF", padding: "20px", textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Are you sure you want to log out?
        </Typography>
    </DialogContent>

    <DialogActions sx={{ backgroundColor: "#EAEAEAFF", justifyContent: "center", paddingBottom: "16px" }}>
        <Button 
            onClick={() => setLogoutDialog(false)} 
            sx={{ 
                backgroundColor: "#EAEAEAFF", 
                color: "#D32F2F", 
                border: "2px solid black", 
                "&:hover": { backgroundColor: "#D1D1D1" } 
            }}
        >
            <Close sx={{ fontSize: "18px" }} />
            Cancel
        </Button>

        <Button 
            onClick={() => { setLogoutDialog(false); navigate("/login"); }} 
            sx={{ 
                backgroundColor: "#1D94FE", 
                color: "white", 
                border: "2px solid black", 
                "&:hover": { backgroundColor: "#66B3FF" } 
            }}
        >
            Yes, Logout
        </Button>
    </DialogActions>
</Dialog>

                    </Box>
                </Toolbar>
            </AppBar>

            {/* Background with Blur */}
            <Box sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                marginTop: "71px",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: `url('https://img.freepik.com/premium-vector/man-woman-couple-stuck-traffic-jam-highway-cars-crowded-street-city-transportation-downtown-scenery-with-skyscrapers-transport-people-drive-roadway-vector-concept_533410-5928.jpg?w=1060')`,
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
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    backdropFilter: "blur(2.7px)",
                    zIndex: 1,
                },
            }}>

                {/* Rental Information Card */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 400,
                    backgroundColor: "white",
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    zIndex: 2,
                    position: "relative"
                }}>
                    <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#1D94FE", textAlign: "center" }}>
                        <DirectionsCar sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} /> Rental Information
                    </Typography>

                    <TextField select label="Pick-up Location" fullWidth value={pickup} onChange={(e) => setPickup(e.target.value)}>
                        {locations.map((location) => <MenuItem key={location} value={location}>{location}</MenuItem>)}
                    </TextField>

                    <TextField select label="Drop-off Location" fullWidth value={drop} onChange={(e) => setDrop(e.target.value)}>
                        {locations.map((location) => <MenuItem key={location} value={location}>{location}</MenuItem>)}
                    </TextField>

                    <TextField
                        label="Pick-up Date"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            updateReturnDate(e.target.value, rentalDuration);
                        }}
                        inputProps={{ min: new Date().toISOString().split("T")[0] }}
                    />

                    <TextField label="Pick-up Time" type="time" fullWidth InputLabelProps={{ shrink: true }} value={time} onChange={(e) => setTime(e.target.value)} />

                    <TextField
                        select
                        label="Rental Duration"
                        fullWidth
                        value={durationType}
                        onChange={(e) => {
                            setDurationType(e.target.value);
                            let days;
                            if (e.target.value === "Daily") days = 1;
                            else if (e.target.value === "Weekly") days = 7;
                            else if (e.target.value === "Monthly") days = 30;
                            else days = ""; // Custom case
                            setRentalDuration(days);
                            if (date && days) updateReturnDate(date, days);
                        }}
                    >
                        <MenuItem value="Daily">1 Day</MenuItem>
                        <MenuItem value="Weekly">7 Days (1 Week)</MenuItem>
                        <MenuItem value="Monthly">30 Days (1 Month)</MenuItem>
                        <MenuItem value="Custom">Custom</MenuItem>
                    </TextField>

                    {durationType === "Custom" && (
                        <TextField
                            label="Enter Days"
                            type="number"
                            fullWidth
                            value={customDays}
                            onChange={(e) => {
                                setCustomDays(e.target.value);
                                setRentalDuration(e.target.value);
                                if (date) updateReturnDate(date, e.target.value);
                            }}
                        />
                    )}

                    {returnDate && <Typography sx={{ mt: 1, fontWeight: "bold", color: "#1D94FE" }}>Return Date: {returnDate}</Typography>}

                    <Button variant="contained" sx={{ mt: 2, backgroundColor: "#1D94FE", "&:hover": { backgroundColor: "#0056B3", color: "white" } }}
                        onClick={() => setOpen(true)} disabled={!pickup || !drop || !date || !time || !rentalDuration}>
                        Proceed
                    </Button>
                </Box>
                
            </Box>
            
        </>
    );
};

export default Information;
