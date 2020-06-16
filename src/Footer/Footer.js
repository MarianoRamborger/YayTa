import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={`${classes.root} footer`} >
      <AppBar position="static" className="footer-app-bar">
      <p className="footer-text">
            Av. Sáenz 2159, Boulogne.       Telefono: 4763-5754
            </p>
        {/* <Toolbar id="footer-bar">
        
        </Toolbar> */}
      </AppBar>
    </div>
  );
}
