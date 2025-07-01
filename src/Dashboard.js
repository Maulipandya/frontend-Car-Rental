import "@fontsource/lovers-quarrel";//rent hub title
import { Close } from "@mui/icons-material";//Cancel button in the logout box
import Carousel from "react-multi-carousel";//sliding car boxes animation
import "react-multi-carousel/lib/styles.css";
import { Card, CardContent, CardMedia, Container } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
//appbar,toolbar=navbar
//avatar=profile image
//boxx,grid=layout
//typography=text
import { AppBar, Avatar, Box, Grid, Toolbar,Button, Typography,Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";//tp fetch car brand info
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./Firebase"; // connection to the database

const Dashboard = () => {
  const navigate = useNavigate();
  const deals = [
    { title: "Explore Lamborghini Models ", desc: "Luxury speed with premium service.", img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/164543/revuelto-exterior-right-front-three-quarter-2.jpeg?isig=0&q=80" },
    { title: "Explore Toyota Models ", desc: "Spacious and comfortable SUV models.", img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124027/urban-cruiser-hyryder-exterior-right-front-three-quarter-72.jpeg?isig=0&q=80" },
    { title: "Explore Tata Models ", desc: "Affordable car models with top quality service.", img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/39345/tiago-exterior-right-front-three-quarter-31.jpeg?isig=0&q=80" },
    { title: "Explore BMW Cars ", desc: " Luxury, Power, and Precision in every drive.", img: "https://imgd.aeplcdn.com/370x208/n/szh050b_1640709.jpg?q=80" },
    { title: "Explore Maruti Suzuki Models ", desc: "Family-friendly rides with comfort and reliability.", img: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115777/ertiga-exterior-right-front-three-quarter-5.jpeg?isig=0&q=80" }
];
//we are telling the website how many cars to show at once on different screen sizes
const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1600 }, items: 4 },
  desktop: { breakpoint: { max: 1600, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};
  const [hovered, setHovered] = useState(null);//remembers which car box your mouse is hovering (touching) over, so it can show a dark box with extra info on it.
  const [carBrands, setCarBrands] = useState([]);
  const [logoutDialog, setLogoutDialog] = useState(false);//logout popup dialog
  useEffect(() => {
    //goes to your Firebase cloud, grabs the "Vehicles" collection, and stores the brand name, image, and path in the carBrands list.
    const fetchCarBrands = async () => {
      try {
        const vehiclesRef = collection(db, "Vehicles");
        const querySnapshot = await getDocs(vehiclesRef);
        const brands =[];

        querySnapshot.forEach((doc) => {
          brands.push({
            name: doc.id, // The brand name (e.g., BMW, Toyota)
            image: doc.data().image, // The image URL from Firestore
            path: `/${doc.id.toLowerCase()}`, // Navigation path
          });
        });

        setCarBrands(brands);
      } catch (error) {
        console.error("Error fetching car brands:", error);
      }
    };

    fetchCarBrands();
  }, []);

  return (
    <>
      <Box sx={{ backgroundColor: "#EAEAEA", minHeight: "120vh" }}>
        {/* Navbar */}
        <AppBar position="sticky" sx={{ backgroundColor: "#1D94FE",height:"65px" }}>
          <Toolbar>
          <Avatar
              sx={{
                
                cursor: "pointer",
                bgcolor: "#5C5C5C",
                "&:hover": { bgcolor: "#6E6E6E" },
              }}
              onClick={() => navigate("/userprofile")}
            />
            &nbsp;&nbsp;
            <InfoIcon
              sx={{
                
                cursor: "pointer",
                height: "47px",
                color: "#5C5C5C",
                width: "auto",
                "&:hover": { color: "#6E6E6E" },
              }}
              onClick={() => navigate("/aboutus")}
            />
            <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "50px" }}>
              
              
                <center>
                  <Box sx={{fontFamily: "Lovers Quarrel, cursive", 
      textAlign: "center", 
      fontSize: "50px",  // Increased font size
}}>
                  Rent Hub
                  </Box>
                  </center>
            </Typography>
            <Button onClick={() => setLogoutDialog(true)} // Open Logout Dialog
    variant="outlined" sx={{height:"35px",width:"120px",color: "white", border:"1.5px solid black",borderColor: "black", fontWeight: "bold",
        "&:hover": { backgroundColor: "white", color: "black" }
    }}>
    Logout
</Button>
<Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)} maxWidth="xs" fullWidth>
    <DialogTitle sx={{
        backgroundColor: "#1D94FE",color: "white",textAlign: "center",fontSize: "22px",
        fontWeight: "bold",padding: "16px"}}>
        Confirm Logout
    </DialogTitle>

    <DialogContent sx={{ backgroundColor: "#EAEAEAFF", padding: "20px", textAlign: "center" }}>
        <Typography variant="body1" sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Are you sure you want to log out?
        </Typography>
    </DialogContent>

    <DialogActions sx={{ backgroundColor: "#EAEAEAFF", justifyContent: "center", paddingBottom: "16px" }}>
        <Button onClick={() => setLogoutDialog(false)} sx={{ backgroundColor: "#EAEAEAFF", 
                color: "#D32F2F", border: "2px solid black", "&:hover": { backgroundColor: "#D1D1D1" } 
            }}>
            <Close sx={{ fontSize: "18px" }} />
            Cancel
        </Button>

        <Button onClick={() => { setLogoutDialog(false); navigate("/login"); }} 
sx={{ backgroundColor: "#1D94FE", color: "white", border: "2px solid black", 
            "&:hover": { backgroundColor: "#66B3FF" } 
            }}>
            Yes, Logout
        </Button>
</DialogActions>
</Dialog>
          </Toolbar>
        </AppBar>

        {/* Car Grid */}
        <Grid
          container
          spacing={1.5}
          padding={'7.5px'}
          justifyContent="center"
          sx={{
            marginBottom: "15px",
            marginTop:"10px"
          }}
        >
          {carBrands.map((brand, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "2.3px solid black",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate("/cars/" + brand.name)}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                {/* Overlay */}
                {hovered === index && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      textAlign: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography variant="h6">{brand.name}</Typography>
                    <Typography variant="body2">
                      Click to explore more models
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Container sx={{ textAlign: "center", py: 5 }}>
  <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1D94FE", mb: 2 }}>
    Our Best Sellers !!
  </Typography>
  <Carousel 
  responsive={responsive} 
  autoPlay={true} 
  infinite={true} 
  autoPlaySpeed={2000} 
  showDots={false} 
  arrows={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  keyBoardControl={true}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
>
  {deals.map((deal, index) => {
    return (
      <Card
        key={index}
        onClick={() => {
          const brandMatch = deal.title.match(/Explore (\w+)/);
          if (brandMatch && brandMatch[1]) {
            navigate(`/cars/${brandMatch[1]}`);
          }
        }}
        sx={{
          maxWidth: 545,
          m: 2,
          cursor: "pointer",
          border: "2px solid #1D94FE",
          "&:hover": {
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.03)",
          },
        }}
      >
        <CardMedia component="img" height="200" image={deal.img} alt={deal.title} />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>{deal.title}</Typography>
          <Typography variant="body2" color="text.secondary">{deal.desc}</Typography>
        </CardContent>
      </Card>
    );
  })}
</Carousel>

</Container>
      </Box>
    </>
  );
};

export default Dashboard;
