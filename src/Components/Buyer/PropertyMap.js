import NavBar from "./NavBar";
import MobileNav from "./MobileNav";
import Map from "./Map/Map";
import { Box } from "@mui/material";
import GuestLogin from "../routes/GuestLogin/GuestLogin";

const PropertyMap = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    
    if(!user?.result?.name || user?.result?.accountLevel != 'Buyer') {
        return (
            <GuestLogin />
        )
    };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
        <NavBar />
        <Map />
        <MobileNav />
    </Box>
  )
}

export default PropertyMap