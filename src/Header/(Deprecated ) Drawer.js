import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import {  Link
} from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div 
      id={"drawer-div"}
      className={ clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom', 
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        
        <ListItem className={"list-topper-item"}>
        <h3> Productos </h3>
        </ListItem>

        <Divider/>
        
        

        <ListItem button >
        <Link to="../" className="drawerLink"> Ofertas</Link>
        </ListItem>

        <ListItem button >
        <Link to="/Frutas" className="drawerLink"> Frutas </Link>
        </ListItem>

        <ListItem button >
        <Link to="/Verduras" className="drawerLink"> Verduras </Link>
        </ListItem>
        
        
      </List>
     
    </div>
  );

  return (
    <div>
    
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)} className="icono" > {anchor}</MenuIcon>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      
    </div>
  );
}
