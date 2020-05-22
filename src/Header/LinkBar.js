import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dropdown from 'react-bootstrap/Dropdown'
import {  Link } from "react-router-dom"

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

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="link-app-bar">
        <Toolbar className="link-bar">

         
        

        <Dropdown>
            <Dropdown.Toggle className="drop-down-toggle jello-horizontal">
                <h6 >Pantalones</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/frutas" className="dropdown-link">  Jeans </Dropdown.Item>
              <Dropdown.Item href="/frutas" className="dropdown-link">  Bengalinas </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Joggings</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/frutas" className="dropdown-link"> Calzas </Dropdown.Item>
              <Dropdown.Item href="/frutas" className="dropdown-link"> Calzas frizadas </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Camperas</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/frutas" className="dropdown-link"> Jean </Dropdown.Item>
              <Dropdown.Item href="/frutas" className="dropdown-link"> Jogging </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Remeras</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/frutas" className="dropdown-link">  Personaje </Dropdown.Item>
              <Dropdown.Item href="/frutas" className="dropdown-link">  De todo </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <button className="nav-link jello-horizontal" >  <Link  > Sweaters </Link> </button>
          <button  className="nav-link jello-horizontal"> <Link > Camisetas </Link> </button>
          <button className="nav-link jello-horizontal">   <Link  > Cinturones </Link>  </button>
          <button className="nav-link jello-horizontal">     <Link > Medias </Link>   </button>
          <button  className="nav-link jello-horizontal">   <Link > Accesorios </Link> </button>
          
        
       
         


        
        </Toolbar>
      </AppBar>
    </div>
  );
}
