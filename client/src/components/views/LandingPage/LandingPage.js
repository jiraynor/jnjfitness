import React, { useEffect, useState } from 'react';
import cookies from 'react-cookies';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import FooterContainer from '../Footer/FooterContainer';
import TrainerComtainer from '../../../_containers/TrainerContainer';
import NavContainer from '../../../_containers/NavContainer';
import UserContainer from '../../../_containers/UserContainer';

const mdTheme = createTheme();

function DashboardContent() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    setUserType(cookies.load('userType'));
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavContainer />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* 공지사항 */}
              {userType === 'user' && <UserContainer />}
              {userType === 'trainer' && <TrainerComtainer />}
            </Grid>
          </Container>
          <FooterContainer sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
