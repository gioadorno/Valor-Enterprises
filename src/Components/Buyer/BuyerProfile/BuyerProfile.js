import { Box } from "@mui/material";
import ProfileNav from "./ProfileNav";
import NavBar from '../NavBar';
import MobileNav from "../MobileNav";
import GuestLogin from "../../routes/GuestLogin/GuestLogin";

const BuyerProfile = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
    
  if(!user?.result?.name || user?.result?.accountLevel != 'Buyer') {
      return (
          <GuestLogin />
      )
  };
  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', pb: 5 }}>
        <NavBar />
        <ProfileNav />
        <MobileNav />
    </Box>
  )
}

export default BuyerProfile