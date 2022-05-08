import React, { useEffect, useState, Fragment } from 'react';
import cookies from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { Toolbar, IconButton, Typography, Divider, List } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import {
  Logout,
  Menu,
  ChevronLeft,
  People,
  Description,
  LiveHelp,
  Sports,
  Notifications,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function NavComponent({ goTo }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCookie_user = cookies.load('user');
    if (getCookie_user) {
      const cookies_user = JSON.parse(getCookie_user.substr(2));
      setUser(cookies_user);
      setUserType(cookies.load('userType'));
    }
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const onLogoutHandler = (event) => {
    event.preventDefault();
    axios.get('/api/auth/signout').then((response) => {
      if (response.data.success) {
        navigate('/signin');
      } else {
        alert('로그아웃에 실패 했습니다.');
      }
    });
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          {userType === 'trainer' ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <Menu />
            </IconButton>
          ) : (
            <></>
          )}
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            JnJ Fitness
          </Typography>
          <Typography>{user.name} 님 환영합니다.</Typography>
          <IconButton color="inherit" onClick={onLogoutHandler}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItemButton onClick={() => goTo('dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="메인화면" />
          </ListItemButton>
          {userType === 'trainer' ? (
            <>
              <ListItemButton onClick={() => goTo('userList')}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                <ListItemText primary="회원 목록" />
              </ListItemButton>
              <ListItemButton onClick={() => goTo('trainerList')}>
                <ListItemIcon>
                  <Sports />
                </ListItemIcon>
                <ListItemText primary="트레이너 목록" />
              </ListItemButton>
              <ListItemButton onClick={() => goTo('ptManager')}>
                <ListItemIcon>
                  <Description />
                </ListItemIcon>
                <ListItemText primary="PT 관리" />
              </ListItemButton>
              <ListItemButton onClick={() => goTo('noticeManager')}>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="공지 관리" />
              </ListItemButton>
              <ListItemButton onClick={() => goTo('qnaManager')}>
                <ListItemIcon>
                  <LiveHelp />
                </ListItemIcon>
                <ListItemText primary="QnA 관리" />
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemButton onClick={() => goTo('qna')}>
                <ListItemIcon>
                  <LiveHelp />
                </ListItemIcon>
                <ListItemText primary="QnA" />
              </ListItemButton>
            </>
          )}
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>
    </>
  );
}

export default NavComponent;
