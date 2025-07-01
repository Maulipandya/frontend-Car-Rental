import { Build, CheckCircle, DirectionsCar, LocalOffer, SupportAgent, TrendingUp } from "@mui/icons-material";
import {AppBar,Box,Button,Card,CardContent,Container,Grid,
        Toolbar,Typography,Dialog,DialogTitle,DialogContent,Link
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
{
    icon: <CheckCircle sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "Trusted & Verified",
    description: "All cars are thoroughly inspected and verified for safety and quality.",
},
{
    icon: <LocalOffer sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "Best Price Guarantee",
    description: "We offer competitive pricing with exclusive discounts and deals.",
},
{
    icon: <SupportAgent sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to assist you.",
},
{
    icon: <TrendingUp sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "Dynamic Pricing",
    description: "Enjoy flexible pricing options based on demand and availability.",
},
{
    icon: <Build sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "Customizable Rentals",
    description: "Tailor your rental experience with add-ons and flexible durations.",
},
{
    icon: <DirectionsCar sx={{ fontSize: 50, color: "#1D94FE" }} />,
    title: "12+ Brands Available",
    description: "Choose from a wide variety of top automobile brands.",
},
];

function Aboutus() {
const navigate = useNavigate();
const [open, setOpen] = useState(false);
const handleOpenDialog = () => setOpen(true);

return (
    <>
    <AppBar position="sticky" sx={{ backgroundColor: "#1D94FE" }}>
    <Toolbar>
        <Typography variant="h6" color="white"
            fontFamily="monospace" sx={{ fontSize: "26px" }}>
            About Us
        </Typography>
    <Box sx={{flex: 1,display: "flex",justifyContent: "center",
            alignItems: "center",fontFamily: "Lovers Quarrel, cursive",
            fontSize: "50px",color: "white"}}>
            Rent Hub
    </Box>
<Box sx={{ display: "flex", gap: 2 }}>
    <Button onClick={() => navigate("/rental-dashboard")}
            variant="outlined"
            sx={{color: "white",
                border: "1.5px solid black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "white", color: "black" }}}>
            BACK
    </Button>
</Box>
        </Toolbar>
    </AppBar>

    <Container sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1D94FE" }}>
        Why Choose Us?
        </Typography>
        <br />
        <Typography sx={{fontSize: "1.2rem",maxWidth: "800px",margin: "auto",
            lineHeight: 1.8,color: "#333",textAlign: "center"}}>
        <b style={{ color: "#1D94FE", fontSize: "1.4rem" }}>Rent Hub</b> is more than just a car rental
        platform— it’s a{" "}
        <span style={{ color: "#1D94FE", fontWeight: "bold" }}>
            gateway to seamless travel experiences.
        </span>
<br />
        </Typography>
    </Container>

    <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 3, textAlign: "center", boxShadow: 3, borderRadius: 3 }}>
            {feature.icon}
            <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mt: 1 }}>
                {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {feature.description}
                </Typography>
            </CardContent>
            </Card>
        </Grid>
        ))}
    </Grid>
<br />

      {/* Terms and Conditions */}
    <Typography
        variant="body2"
        sx={{textAlign: "center",mb: 5,fontSize: "1rem",color: "#333"}}>
        By using Rent Hub, you agree to our{" "}
        <Link onClick={handleOpenDialog}
        sx={{color: "#1D94FE",cursor: "pointer",textDecoration: "underline",
            fontWeight: "bold"}}>
    Terms and Conditions
        </Link>
        .
    </Typography>

    <Dialog open={open} onClose={() => setOpen(false)}
PaperProps={{
    sx: {backgroundColor: "#EAEAEAFF",padding: 2,borderRadius: 3,maxWidth: "600px",
    mx: "auto"},
}}>
        <DialogTitle sx={{ color: "#1D94FE", fontWeight: "bold" }}>
            Terms and Conditions
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "70vh", overflowY: "auto" }}>
<Typography variant="body1" sx={{ mb: 2 }}>
    Welcome to <b>Rent Hub</b>! These Terms & Conditions govern your use of our mobile application and website services. 
    By accessing or using Rent Hub, you agree to comply with these terms. If you do not agree, please do not use our services.
</Typography>

<Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    ELIGIBILITY
</Typography>
<Typography variant="body2" component="div">
    <ul>
        <li>Be at least 18 years old (or the legal age in your region).</li>
        <li>Provide accurate and complete information during registration.</li>
        <li>Use the platform for lawful purposes only.</li>
    </ul>
</Typography>

<Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    USER RESPONSIBILITIES
</Typography>
<Typography variant="body2" component="div">
    <ul>
      <li>You will not engage in fraudulent activities.</li>
      <li>You will respect other users and service providers.</li>
      <li>You are responsible for verifying the legitimacy of listings before making any payments.</li>
      <li>Rent Hub is not liable for any disputes between users and rental providers.</li>
    </ul>
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    PAYMENTS & FEES
  </Typography>
  <Typography variant="body2" component="div">
    <ul>
      <li>Rent Hub does not process payments directly. Transactions occur between users and rental companies.</li>
      <li>We are not responsible for refunds, disputes, or failed transactions.</li>
      <li>Any fees displayed are subject to change.</li>
    </ul>
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    ACCOUNT SUSPENSION & TERMINATION
  </Typography>
  <Typography variant="body2" component="div">
    <ul>
      <li>You violate any terms of this agreement.</li>
      <li>Fraudulent or suspicious activity is detected.</li>
      <li>You engage in harmful or illegal behavior.</li>
    </ul>
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    LIMITATION OF LIABILITY
  </Typography>
  <Typography variant="body2" component="div">
    Rent Hub is an <b>intermediary platform</b> and is not responsible for:
    <ul>
      <li>The accuracy of vehicle listings.</li>
      <li>Losses, damages, or injuries resulting from rentals.</li>
      <li>Service disruptions due to technical issues or third-party actions.</li>
    </ul>
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    PRIVACY POLICY
  </Typography>
  <Typography variant="body2" sx={{ mb: 2 }}>
    Your use of Rent Hub is also governed by our <b>Privacy Policy</b>, which explains how we collect, use, and protect your personal information.
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    MODIFICATIONS TO TERMS
  </Typography>
  <Typography variant="body2" sx={{ mb: 2 }}>
    We may update these Terms & Conditions at any time. Continued use of the app after changes means you accept the revised terms.
  </Typography>

  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2, color: "#1D94FE" }}>
    CONTACT US
  </Typography>
  <Typography variant="body2">
    If you have any questions or concerns, please contact us at: <br />
    📧 <b>maulipandya.21.ce@iite.indusuni.ac.in</b> <br />
    📍 <b>Indus University</b>
  </Typography>
</DialogContent>
<Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
    <Button
      variant="contained"
      sx={{ backgroundColor: "#1D94FE", color: "white" }}
      onClick={() => setOpen(false)}
    >
      I Agree
    </Button>
  </Box>

      </Dialog>

      <br />

      {/* Team Members */}
      <Container
        sx={{
          textAlign: "center",
          py: 5,
          backgroundColor: "#eaeaeaff",
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3} sx={{ mt: 1.5 }}>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" sx={{ minWidth: "150px" }}>
                  IU2141050114
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#1D94FE", fontWeight: "bold" }}
                >
                  [Mauli Pandya]
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" sx={{ minWidth: "150px" }}>
                  IU2141050112
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#1D94FE", fontWeight: "bold" }}
                >
                  [Dhruvin Pandya]
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" sx={{ minWidth: "150px" }}>
                  IU2141050125
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#1D94FE", fontWeight: "bold" }}
                >
                  [Jainil Patani]
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" sx={{ minWidth: "150px" }}>
                  IU2141050088
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#1D94FE", fontWeight: "bold" }}
                >
                  [Darshit Mewada]
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Typography variant="h6" sx={{ minWidth: "150px" }}>
                IU2141050098
                </Typography>
                <Typography variant="h6"
                sx={{ color: "#1D94FE", fontWeight: "bold" }}>
                [Nandini Nagar]
                </Typography>
            </Box>
            </Box>
        </Grid>
        </Grid>
    </Container>
    </>
);
}

export default Aboutus;
