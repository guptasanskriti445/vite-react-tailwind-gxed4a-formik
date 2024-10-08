import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// import Home from './Home';  // Import Home component
// import AboutUs from './AboutUs'; // Import About Us component

const DashboardLayout = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" anchor="left">
        <Box sx={{ width: 240 }}>
          <div style={{ height: 64 }} /> {/* Space for AppBar */}
          <Divider />
          <List>
            {['Home', 'About Us', 'Profile', 'Settings', 'NotificationForm'].map((text) => (
              <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(' ', '-')}`}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: 8 }} // Adding margin to account for AppBar height
      >
        <Switch>
          {/* <Route path="/home">
            <Home />
          </Route> */}
          {/* <Route path="/about-us">
            <AboutUs />
          </Route> */}
          {/* <Route path="/profile">
            <Typography paragraph>This is the Profile page.</Typography>
          </Route> */}
          {/* <Route path="/settings">
            <Typography paragraph>This is the Settings page.</Typography>
          </Route> */}
          <Route path="/notifications">
            <Typography paragraph>This is the Notifications page.</Typography>
          </Route>
          {/* <Route path="/">
            <Typography paragraph>Welcome to the Dashboard!</Typography>
          </Route> */}
        </Switch>
      </Box>
    </Router>
  );
};

export default DashboardLayout;
