import { Close } from "@mui/icons-material";
//toolbar=spacing and alignment in navbar
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [customOptions, setCustomOptions] = useState({
    babySeat: false,
    chauffeur: false,
    luggageRack: false,
  });

  const [selectedPayment, setSelectedPayment] = useState(null); //stores selcted payment option
  const [logoutDialog, setLogoutDialog] = useState(false); // Logout Dialog State
  const [cardName, setCardName] = useState(""); //stores credit/debit card details
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [gpayId, setGpayId] = useState(""); //stores gpay id
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); //controls payment confirmation dialog box visiblity
  const [errorMessage, setErrorMessage] = useState(""); //stores error messages
  const [selectedPlan, setSelectedPlan] = useState(null); //stores emi plans
  const [emiLocked, setEmiLocked] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false); //indicates weather payment was succcessful or not

  const validateFields = () => {
    if (!selectedPayment) return "* Please select a payment method";
    if (
      selectedPayment === "card" &&
      (!cardName || !cardNumber || !expiry || !cvv)
    )
      return "* Fill all fields";
    // if (selectedPayment === "gpay" && !gpayId)
    //   return "* Enter your Google Pay ID";
    return "";
  };

  const handlePayment = () => {
    const error = validateFields();
    setErrorMessage(error);

    if (!error) {
      setCustomizationOpen(true);
    }
  };

  const handleCardNameChange = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Allow only letters and spaces
    setCardName(value);
    setErrorMessage("");
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3); // Allow only numbers, max length 3
    setCvv(value);
    setErrorMessage("");
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits (MMYYYY)

    let month = value.slice(0, 2);
    let year = value.slice(2);

    if (month.length === 2) {
      month = Math.min(parseInt(month, 10), 12).toString().padStart(2, "0"); // Max 12
    }

    if (year.length === 4) {
      year = Math.max(parseInt(year, 10), 2025).toString(); // Min 2025
    }

    setExpiry(month + (year ? "/" + year : ""));
    setErrorMessage("");
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessage("");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#1D94FE" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="white" fontFamily={"monospace"}>
            Payment Process
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
            <Button
              onClick={() => navigate("/rental-dashboard")}
              variant="outlined"
              sx={{
                color: "white",
                border: "1.5px solid black",
                borderColor: "black",
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
                border: "1.5px solid black",
                borderColor: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" },
              }}
            >
              Logout
            </Button>
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
                    "&:hover": { backgroundColor: "#D1D1D1" },
                  }}
                >
                  <Close sx={{ fontSize: "18px" }} />
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    setLogoutDialog(false);
                    navigate("/login");
                  }}
                  sx={{
                    backgroundColor: "#1D94FE",
                    color: "white",
                    border: "2px solid black",
                    "&:hover": { backgroundColor: "#66B3FF" },
                  }}
                >
                  Yes, Logout
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Background Image with Blur Effect */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url("https://img.freepik.com/premium-vector/financial-management-concept-investment-flat-design-payment-finance-with-money-card_33771-1069.jpg?w=2000")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pt: 10, //padding top
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.25)", // Light blur overlay
            backdropFilter: "blur(2.7px)", // Increased blur effect
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "#1D94FE" }}
          >
            Choose a Payment Method
          </Typography>
          {/*mb=margin bottom for spacing*/}
          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
              width: "80%",
            }}
          >
            {["card", "gpay", "installment", "cod"].map((method) => (
              <Card
                key={method}
                sx={{
                  width: 300,
                  borderRadius: 3,
                  boxShadow: 3,
                  border:
                    selectedPayment === method
                      ? "2px solid #1D94FE"
                      : "2px solid black",
                  backgroundColor:
                    selectedPayment === method ? "#D6D6D6" : "#EAEAEAFF",
                  transition: "0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    border: "2px solid black",
                  },
                }}
              >
                <CardActionArea
                  onClick={() => {
                    setSelectedPayment(method);
                    setErrorMessage("");
                  }}
                >
                  <CardContent sx={{ textAlign: "center", color: "#1D94FE" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {method === "card"
                        ? "Credit/Debit Card"
                        : method === "gpay"
                        ? "Google Pay"
                        : method === "installment"
                        ? "Installments"
                        : "Cash on Delivery"}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          {/* Credit Card Form */}
          {selectedPayment === "card" && (
            <Card
              sx={{
                mt: 4,
                p: 3,
                width: "80%",
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <TextField
                  label="Cardholder Name"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cardName}
                  onChange={handleCardNameChange}
                />
                <TextField
                  label="Card Number"
                  type="number"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cardNumber}
                  onChange={handleInputChange(setCardNumber)}
                />
                <TextField
                  label="Expiry Date (MM/YYYY)"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YYYY"
                />
                <TextField
                  label="CVV"
                  type="password"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cvv}
                  onChange={handleCvvChange}
                  inputProps={{ maxLength: 3 }}
                />
                {errorMessage && (
                  <Typography
                    sx={{
                      mt: 1,
                      mb: 1,
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#1D94FE",
                    "&:hover": { backgroundColor: "#0073CC" },
                  }}
                  onClick={handlePayment}
                >
                  Pay Now
                </Button>
              </CardContent>
            </Card>
          )}
          <Dialog
            open={customizationOpen}
            onClose={() => setCustomizationOpen(false)}
            maxWidth="sm"
            fullWidth
            BackdropProps={{
              sx: { backgroundColor: "rgba(0, 0, 0, 0.015)" }, // Adjust opacity here
            }}
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
              RentHub Recommendeds!!
            </DialogTitle>

            <DialogContent
              sx={{ backgroundColor: "#EAEAEAFF", padding: "20px" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Select any additional options:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.babySeat}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          babySeat: !prev.babySeat,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Child Booster Seat
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.chauffeur}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          chauffeur: !prev.chauffeur,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Chauffeur
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.tyreInflator}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          tyreInflator: !prev.tyreInflator,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Tyre Inflator
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.luggageRack}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          luggageRack: !prev.luggageRack,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Luggage Rack
                    </Typography>
                  }
                />
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#EAEAEAFF",
                justifyContent: "center",
                paddingBottom: "16px",
              }}
            >
              <Button
                onClick={() => {
                  setCustomizationOpen(false);
                  setPaymentSuccess(true);
                }}
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
              >
                No, Thank You
              </Button>
              <Button
  onClick={() => {
    const selectedAddOns = [];

    if (customOptions.chauffeur)
      selectedAddOns.push({ name: "Private Chauffeur", price: 200 });
    if (customOptions.babySeat)
      selectedAddOns.push({ name: "Child Booster Seat", price: 700 });
    if (customOptions.tyreInflator)
      selectedAddOns.push({ name: "Tyre Inflator", price: 400 });
    if (customOptions.luggageRack)
      selectedAddOns.push({ name: "Car Top Box", price: 1400 });
    if (customOptions.carorganizers)
      selectedAddOns.push({ name: "Car Organizers", price: 1400 });

    localStorage.setItem("customizations", JSON.stringify(selectedAddOns));

    setCustomizationOpen(false);
    navigate("/thankyou");
  }}
  sx={{
    backgroundColor: "#1D94FE",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#0078D4",
    },
  }}
>
  Confirm & Continue
</Button>

            </DialogActions>
          </Dialog>

          {/* Google Pay Section */}
          {selectedPayment === "gpay" && (
            <Card
              sx={{
                mt: 4,
                p: 2,
                width: "80%",
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
              <TextField
  value="rentHub@okicicibank"
  fullWidth
  sx={{ mb: 2 }}
  InputProps={{
    readOnly: true,
  }}
  InputLabelProps={{ shrink: false }}
  variant="outlined"
/>

                
                {errorMessage && (
                  <Typography
                    sx={{
                      mt: 1,
                      mb: 1,
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#1D94FE",
                    "&:hover": { backgroundColor: "#0073CC" },
                  }}
                  onClick={handlePayment}
                >
                  Pay
                </Button>
              </CardContent>
            </Card>
          )}

          <Dialog
            open={customizationOpen}
            onClose={() => setCustomizationOpen(false)}
            maxWidth="sm"
            fullWidth
            BackdropProps={{
              sx: { backgroundColor: "rgba(0, 0, 0, 0.3)" }, // Adjust opacity here
            }}
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
              RentHub Recommendeds!!
            </DialogTitle>

            <DialogContent
              sx={{ backgroundColor: "#EAEAEAFF", padding: "20px" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Select any add ons for your rental car:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.babySeat}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          babySeat: !prev.babySeat,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Baby Seat
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.chauffeur}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          chauffeur: !prev.chauffeur,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Chauffeur
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.tyreInflator}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          tyreInflator: !prev.tyreInflator,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Tyre Inflator
                    </Typography>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={customOptions.luggageRack}
                      onChange={() =>
                        setCustomOptions((prev) => ({
                          ...prev,
                          luggageRack: !prev.luggageRack,
                        }))
                      }
                      sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                      Luggage Rack
                    </Typography>
                  }
                />
              </Box>
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#EAEAEAFF",
                justifyContent: "center",
                paddingBottom: "16px",
              }}
            >
              <Button
                onClick={() => {
                  setCustomizationOpen(false);
                  setPaymentSuccess(true);
                }}
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
              >
                No, Thank You
              </Button>
              <Button
  onClick={() => {
    const selectedAddOns = [];

    if (customOptions.chauffeur)
      selectedAddOns.push({ name: "Private Chauffeur", price: 200 });
    if (customOptions.babySeat)
      selectedAddOns.push({ name: "Child Booster Seat", price: 700 });
    if (customOptions.tyreInflator)
      selectedAddOns.push({ name: "Tyre Inflator", price: 400 });
    if (customOptions.luggageRack)
      selectedAddOns.push({ name: "Car Top Box", price: 1400 });
    if (customOptions.carorganizers)
      selectedAddOns.push({ name: "Car Organizers", price: 1400 });

    localStorage.setItem("customizations", JSON.stringify(selectedAddOns));

    setCustomizationOpen(false);
    navigate("/thankyou");
  }}
  sx={{
    backgroundColor: "#1D94FE",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#0078D4",
    },
  }}
>
  Confirm & Continue
</Button>

            </DialogActions>
          </Dialog>

          {/* Installment Section */}

          {selectedPayment === "installment" && (
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: "bold", color: "#1D94FE" }}
              >
                Select an EMI Plan
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                {[
                  { label: "15 Days", value: "15days" },
                  { label: "1 Month", value: "1month" },
                  { label: "3 Months", value: "3months" },
                ].map((plan) => (
                  <Card
                    key={plan.value}
                    sx={{
                      width: 250,
                      borderRadius: 3,
                      boxShadow: 3,
                      //dynamic border
                      border:
                        selectedPlan === plan.value
                          ? "2px solid #1D94FE"
                          : "2px solid black",
                      //dynamic background
                      backgroundColor:
                        selectedPlan === plan.value ? "#D6D6D6" : "#EAEAEAFF",
                      transition: "0.3s",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scale(1.05)",
                        border: "2px solid black",
                      },
                    }}
                    onClick={() => {
                      setSelectedPlan(plan.value);
                      setErrorMessage("");
                    }}
                  >
                    {/*sets selected payment method and clears error messages when user starts typing*/}
                    <CardActionArea>
                      <CardContent
                        sx={{ textAlign: "center", color: "#1D94FE" }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                          {plan.label}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: selectedPlan ? "#1D94FE" : "#C4C4C4",
                  color: selectedPlan ? "white" : "black",
                  border: "2px solid black",
                  "&:hover": selectedPlan ? { backgroundColor: "#0073CC" } : {},
                  cursor: selectedPlan ? "pointer" : "not-allowed",
                }}
                onClick={() => selectedPlan && setCustomizationOpen(true)}
                disabled={!selectedPlan}
              >
                LOCK THE EMI PLAN
              </Button>
              <Dialog
                open={customizationOpen}
                onClose={() => setCustomizationOpen(false)}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "10px",
                    backgroundColor: "#EAEAEAFF",
                  },
                }}
              >
                <DialogTitle
                  sx={{
                    backgroundColor: "#1D94FE",
                    color: "white",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    p: 2,
                  }}
                >
                  EMI Plan Locked
                </DialogTitle>

                <DialogContent
                  sx={{
                    backgroundColor: "#EAEAEAFF",
                    textAlign: "center",
                    fontSize: "18px",
                    p: 3,
                  }}
                >
                  Your EMI Plan for{" "}
                  {selectedPlan === "15days"
                    ? "15 Days"
                    : selectedPlan === "1month"
                    ? "1 Month"
                    : "3 Months"}{" "}
                  is successfully locked!
                </DialogContent>
                <Dialog
                  open={customizationOpen}
                  onClose={() => setCustomizationOpen(false)}
                  maxWidth="sm"
                  fullWidth
                  BackdropProps={{
                    sx: { backgroundColor: "rgba(0, 0, 0, 0.3)" }, // Adjust opacity here
                  }}
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
                    RentHub Recommendeds!!
                  </DialogTitle>

                  <DialogContent
                    sx={{ backgroundColor: "#EAEAEAFF", padding: "20px" }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      Select any add ons for your rental car:
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: 1,
                      }}
                    >
                      {[
                        {
                          label: "Private Chauffeur [Price:₹ 200 /day]",
                          key: "chauffeur",
                        },
                        {
                          label: "Child Booster Seat [Price:₹ 700]",
                          key: "babySeat",
                        },
                        {
                          label: "Tyre Inflator [Price:₹ 400]",
                          key: "tyreInflator",
                        },
                        {
                          label: "Car Top Box [Price:₹ 1400]",
                          key: "luggageRack",
                        },
                        {
                          label: "Car Organizers [Price: ₹ 1400]",
                          key: "carorganizers",
                        },
                      ].map((option) => (
                        <FormControlLabel
                          key={option.key}
                          control={
                            <Checkbox
                              checked={customOptions[option.key]}
                              onChange={() =>
                                setCustomOptions((prev) => ({
                                  ...prev,
                                  [option.key]: !prev[option.key],
                                }))
                              }
                              sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
                            />
                          }
                          label={
                            <Typography
                              sx={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {option.label}
                            </Typography>
                          }
                        />
                      ))}
                    </Box>
                  </DialogContent>

                  <DialogActions
                    sx={{
                      backgroundColor: "#EAEAEAFF",
                      justifyContent: "center",
                      paddingBottom: "16px",
                    }}
                  >
                    <Button
                      onClick={() => {
                        setCustomizationOpen(false);
                        setEmiLocked(true); // Open EMI Locked Dialog after closing customization
                      }}
                      sx={{
                        backgroundColor: "#D32F2F",
                        color: "white",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        fontSize: "14px",
                        "&:hover": { backgroundColor: "#B71C1C" },
                      }}
                    >
                      No, Thank You
                    </Button>
                    <Button
  onClick={() => {
    const selectedAddOns = [];

    if (customOptions.chauffeur)
      selectedAddOns.push({ name: "Private Chauffeur", price: 200 });
    if (customOptions.babySeat)
      selectedAddOns.push({ name: "Child Booster Seat", price: 700 });
    if (customOptions.tyreInflator)
      selectedAddOns.push({ name: "Tyre Inflator", price: 400 });
    if (customOptions.luggageRack)
      selectedAddOns.push({ name: "Car Top Box", price: 1400 });
    if (customOptions.carorganizers)
      selectedAddOns.push({ name: "Car Organizers", price: 1400 });

    localStorage.setItem("customizations", JSON.stringify(selectedAddOns));

    setCustomizationOpen(false);
    navigate("/thankyou");
  }}
  sx={{
    backgroundColor: "#1D94FE",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#0078D4",
    },
  }}
>
  Confirm & Continue
</Button>

                  </DialogActions>
                </Dialog>
              </Dialog>
            </Box>
          )}

          {/* CASH ON DELIVERY */}

          {selectedPayment === "cod" && (
            <Card
              sx={{
                mt: 4,
                p: 3,
                width: "80%",
                maxWidth: 400,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <TextField
                  label="Full Name"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cardName}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^A-Za-z\s]/g, ""); // Only letters & spaces
                    setCardName(value);
                    setErrorMessage("");
                  }}
                  error={errorMessage && !cardName}
                  helperText={
                    errorMessage && !cardName ? "Name is required" : ""
                  }
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10); // Only digits, max 10
                    setCardNumber(value);
                    setErrorMessage("");
                  }}
                  error={errorMessage && cardNumber.length !== 10}
                  helperText={
                    errorMessage && cardNumber.length !== 10
                      ? "Enter a valid 10-digit number"
                      : ""
                  }
                />
                <TextField
                  label="Delivery Location"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={gpayId}
                  onChange={(e) => {
                    setGpayId(e.target.value);
                    setErrorMessage("");
                  }}
                  error={errorMessage && !gpayId}
                  helperText={
                    errorMessage && !gpayId ? "Location is required" : ""
                  }
                />
                {errorMessage && (
                  <Typography
                    sx={{
                      mt: 1,
                      mb: 1,
                      color: "red",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {errorMessage}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#1D94FE",
                    "&:hover": { backgroundColor: "#0073CC" },
                  }}
                  onClick={() => {
                    if (!cardName || cardNumber.length !== 10 || !gpayId) {
                      setErrorMessage("Please fill all fields correctly.");
                      return;
                    }
                    setConfirmDialogOpen(true); // Open Confirmation Dialog
                  }}
                >
                  Confirm Order
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Confirmation Dialog */}
          <Dialog
            open={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
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
                p: 2,
              }}
            >
              Confirm Your Details
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
                sx={{ fontSize: "18px", fontWeight: "bold", mb: 1 }}
              >
                Name: {cardName}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: "bold", mb: 1 }}
              >
                Phone: {cardNumber}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: "bold", mb: 2 }}
              >
                Location: {gpayId}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "red", fontWeight: "bold" }}
              >
                * Full payment expected on delivery *
              </Typography>
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#EAEAEAFF",
                justifyContent: "center",
                pb: 2,
              }}
            >
              <Button
                onClick={() => setConfirmDialogOpen(false)}
                sx={{
                  backgroundColor: "#EAEAEAFF",
                  color: "#D32F2F",
                  border: "2px solid black",
                  "&:hover": { backgroundColor: "#C0C0C0" },
                }}
              >
                <Close sx={{ fontSize: "18px" }} />
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setConfirmDialogOpen(false);
                  setCustomizationOpen(true); // Open Customization Dialog
                }}
                sx={{
                  backgroundColor: "#1D94FE",
                  color: "white",
                  border: "2px solid black",
                  "&:hover": { backgroundColor: "#66B3FF" },
                }}
              >
                Yes, Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* Customization Dialog */}
          <Dialog
            open={customizationOpen}
            onClose={() => setCustomizationOpen(false)}
            maxWidth="sm"
            fullWidth
            BackdropProps={{
              sx: { backgroundColor: "rgba(0, 0, 0, 0.3)" }, // Adjust opacity here
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#1D94FE",
                color: "white",
                textAlign: "center",
                fontSize: "22px",
                fontWeight: "bold",
                p: 2,
              }}
            >
              RentHub Recommendeds!!
            </DialogTitle>

            <DialogContent
              sx={{ backgroundColor: "#EAEAEAFF", padding: "20px" }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Select any add ons for your rental car:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                }}
              >
                {[
                  {
                    label: "Private Chauffeur [Price:₹ 200 /day]",
                    key: "chauffeur",
                  },
                  {
                    label: "Child Booster Seat [Price:₹ 700]",
                    key: "babySeat",
                  },
                  { label: "Tyre Inflator [Price:₹ 400]", key: "tyreInflator" },
                  { label: "Car Top Box [Price:₹ 1400]", key: "luggageRack" },
                  {
                    label: "Car Organizers [Price: ₹ 1400]",
                    key: "carorganizers",
                  },
                ].map((option) => (
                  <FormControlLabel
                    key={option.key}
                    control={
        <Checkbox checked={customOptions[option.key]}
            onChange={() =>
                setCustomOptions((prev) => ({
                    ...prev,
                    [option.key]: !prev[option.key]}))
                        }
                        sx={{ transform: "scale(1.5)", color: "#1D94FE" }}
        />}
                    label={
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        {option.label}
                </Typography>
                    }/>
                ))}
            </Box>
            </DialogContent>

            <DialogActions
            sx={{
                backgroundColor: "#EAEAEAFF",
                justifyContent: "center",
                pb: 2,
            }}
            >
            <Button
                onClick={() => {
                setCustomizationOpen(false);
                  navigate("/thankyou"); // Redirect to Thank You Page
                }}
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "white",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  fontSize: "14px",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
              >
                No, Thank You
              </Button>

              <Button
  onClick={() => {
    const selectedAddOns = [];

    if (customOptions.chauffeur)
      selectedAddOns.push({ name: "Private Chauffeur", price: 200 });
    if (customOptions.babySeat)
      selectedAddOns.push({ name: "Child Booster Seat", price: 700 });
    if (customOptions.tyreInflator)
      selectedAddOns.push({ name: "Tyre Inflator", price: 400 });
    if (customOptions.luggageRack)
      selectedAddOns.push({ name: "Car Top Box", price: 1400 });
    if (customOptions.carorganizers)
      selectedAddOns.push({ name: "Car Organizers", price: 1400 });

    localStorage.setItem("customizations", JSON.stringify(selectedAddOns));

    setCustomizationOpen(false);
    navigate("/thankyou");
  }}
  sx={{
    backgroundColor: "#1D94FE",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: "#0078D4",
    },
  }}
>
  Confirm & Continue
</Button>

            </DialogActions>
          </Dialog>

          {/* EMI Confirmation Dialog */}
          <Dialog
            open={emiLocked}
            onClose={() => setEmiLocked(false)}
            sx={{
              "& .MuiPaper-root": {
                borderRadius: "10px",
                backgroundColor: "#EAEAEAFF",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#1D94FE",
                color: "white",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "16px",
                marginBottom: "-2px",
              }}
            >
              EMI Plan Locked
            </DialogTitle>

            <DialogContent
              sx={{
                backgroundColor: "#EAEAEAFF",
                textAlign: "center",
                fontSize: "18px",
                padding: "20px 24px",
              }}
            >
              Your EMI Plan for{" "}
              {selectedPlan === "15days"
                ? "15 Days"
                : selectedPlan === "1month"
                ? "1 Month"
                : "3 Months"}{" "}
              is successfully locked!
            </DialogContent>

            <DialogActions
              sx={{
                backgroundColor: "#EAEAEAFF",
                justifyContent: "center",
                paddingBottom: "16px",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#C4C4C4",
                  border: "2px solid black",
                  color: "black",
                  "&:hover": { backgroundColor: "#1D94FE", color: "white" },
                  "&:active": { backgroundColor: "#1878D3", color: "white" },
                }}
                onClick={() => {
                  setEmiLocked(false);
                  navigate("/thankyou");
                }}
              >
                OKAY
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Dialog
          open={paymentSuccess}
          onClose={() => setPaymentSuccess(false)}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "10px",
              backgroundColor: "#EAEAEAFF",
            },
          }}
        >
          {/* Title Bar */}
          <DialogTitle
            sx={{
              backgroundColor: "#1D94FE",
              color: "white",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              padding: "16px",
              marginBottom: "-2px",
            }}
          >
            🎉 Yay! Payment Completed
          </DialogTitle>

          {/* Content */}
          <DialogContent
            sx={{
              backgroundColor: "#EAEAEAFF",
              textAlign: "center",
              fontSize: "18px",
              padding: "20px 24px",
            }}
          >
            Your payment was successful!
          </DialogContent>

          {/* OKAY Button */}
          <DialogActions
            sx={{
              backgroundColor: "#EAEAEAFF",
              justifyContent: "center",
              paddingBottom: "16px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4C4C4",
                border: "2px solid black",
                color: "black",
                "&:hover": { backgroundColor: "#1D94FE", color: "white" },
                "&:active": { backgroundColor: "#1878D3", color: "white" },
              }}
              onClick={() => {
                setPaymentSuccess(false);
                navigate("/thankyou");
              }}
            >
              OKAY
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Payment;
