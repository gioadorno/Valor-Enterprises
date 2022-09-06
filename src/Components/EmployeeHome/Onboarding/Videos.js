import { Box, Container, Paper, Fade, Typography, Toolbar , Modal, Button} from '@mui/material';
import MobileNav from '../MobileNav';
import OuterBar from '../OuterBar';
import foundationDoc from './4. Foundation of Love Graphic.pdf';
import vocabDoc from './12. General Vocab.pdf';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { AccountContext } from '../../Login/Account';

const Videos = () => {
    const { loggedIn } = useContext(AccountContext);
    const [ isLoggedIn, setIsLoggedIn ] = useState(loggedIn);
    const [ openVideo, setOpenVideo] = useState(null);
    const [ openFoundation, setOpenFoundation ] = useState(false);
    const [ openVocab, setOpenVocab ] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn === false) {
          navigate('/');
        }
      },[])


  return (
    <Box sx={{ display: 'flex' }}>
            <Modal sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }} onClose={() => setOpenFoundation(false)} open={openFoundation}>
                <object data={foundationDoc} type='application/pdf' width='80%' height='100%'>
                    <Typography sx={{ color: 'white' }}>No document here</Typography>
                </object>
            </Modal>
            <Modal sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%', justifyContent: 'center' }} onClose={() => setOpenVocab(false)} open={openVocab}>
                <object data={vocabDoc} type='application/pdf' width='80%' height='100%'>
                    <Typography sx={{ color: 'white' }}>No document here</Typography>
                </object>
            </Modal>
        <Container maxWidth="2xl" sx={{ mt: 4, mb: 4, display: 'flex', alignItems: 'center', height: { xs: '100%' , xl: '100vh'}, justifyContent: 'flex-start', flexDirection: 'column', pb: 4   }}>
                    <Fade in={openVideo === null} timeout={600}>
                <Paper sx={{ width: '100%', height: { xs: '100vh' , xl: '100vh' }, boxShadow: 4, borderRadius: '1em', overflowY: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2, pb: 10 }}>
                    <Typography variant='h3' sx={{ textAlign: 'center', pb: 5 }}>Onboarding</Typography>
                    <Toolbar sx={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', pb: 2 }}>
                        <Button size='large' onClick={() => setOpenFoundation(true)}>
                            Foundation of Love
                        </Button>
                        <Button size='large' onClick={() => setOpenVocab(true)}>
                            Vocab Sheet
                        </Button>
                    </Toolbar>
                <iframe allowfullscreen="allowfullscreen" width="90%" height="100%" src="https://www.youtube.com/embed/videoseries?list=PLSLWr8VERNo_pmFlozjvnu_20jAHS2Ky8" title="Onboarding Videos" frameborder="5" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </Paper>
                    </Fade>
        </Container>
        <MobileNav />
    </Box>
  )
}

export default Videos