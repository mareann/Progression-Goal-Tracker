import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';

import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

const Nav = props =>  (

	<div>

    <MuiThemeProvider>

    <AppBar
    title="Progression"
    />
    <Drawer open={() => props.open}>
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem onClick={() => props.close}>Close Menu</MenuItem>
    </Drawer>

  </MuiThemeProvider>
  </div>
);


export default Nav;


