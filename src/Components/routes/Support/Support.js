import { Box, Paper, Typography } from "@mui/material";
import background from './background.jpg';
import NavBar from "../Public/Homepage_Components/NavBar";
import MobileNav from "../Public/Homepage_Components/MobileNav";

const Support = () => {
  return (
    <Box sx={{ display: 'flex', position: 'relative', height: '100vh', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
        <NavBar />
            <Paper sx={{ boxShadow: 5, width: { xs: '100%', sm: '60%', xl: '45%' }, height: { xs: '80%', sm: '55%', xl: '40%' }, borderRadius: '1em', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20, pt: 5, pb: { xs: 10, xl: 0 }, mt: {xs: 2, xl: 10} }}>
                <Typography variant='h5' sx={{ textAlign: 'center', width: '80%', fontFamily: 'Rubik' }}>
                    Thank you for visiting our website here at KeygleeDispo. We are continously providing updates and new features to bring you the best user experience possible. If you have any questions, or need help in regards to the website or in doing business with us, please contact us at the email below.
                </Typography>
                <a style={{ paddingTop: '1em', fontSize: '1.8em', fontFamily: 'Rubik', color: '#079fcd', paddingBottom: '2em' }} href='mailto:info@keygleedispo.com'>info@keygleedispo.com</a>
            </Paper>
        <MobileNav />
        <img src={background} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, left: 0 }} />
    </Box>
  )
}

export default Support