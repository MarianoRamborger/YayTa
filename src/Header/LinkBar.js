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

         
        
        <button className="nav-link jello-horizontal" >  <Link to="/" > Ofertas </Link> </button>
        <Dropdown>
            <Dropdown.Toggle className="drop-down-toggle jello-horizontal nav-link-toggler">
                <h6 >Pantalones</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
               <Link to="/Pantalones/Jeans" className="nav-link nav-link-toggler"> Jeans </Link> 
              <Link to="/Pantalones/Bengalinas" className="nav-link nav-link-toggler"> Bengalinas </Link> 
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Joggings</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to="/Joggings/Calzas" className="nav-link nav-link-toggler"> Calzas </Link> 
               <Link to="/Joggings/Calzas-Frizadas" className="nav-link nav-link-toggler"> Calzas Frizadas </Link>  
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown >
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Camperas</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Link to="/Camperas/Jean" className="nav-link nav-link-toggler"> De Jean </Link> 
               <Link to="/Camperas/Jogging" className="nav-link nav-link-toggler"> Deportivas </Link> 
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" className="drop-down-toggle jello-horizontal">
                <h6>Remeras</h6>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                  <Link to="/Remeras/Personajes" className="nav-link"> De Personaje </Link>   
                  <Link to="/Remeras/Todo" className="nav-link"> De todo! </Link>   
            </Dropdown.Menu>
          </Dropdown>

          <button className="nav-link jello-horizontal" >  <Link to="/Sweaters" > Sweaters </Link> </button>
          <button  className="nav-link jello-horizontal"> <Link to="/Camisetas" > Camisetas </Link> </button>
          <button className="nav-link jello-horizontal">   <Link to="/Cinturones" > Cinturones </Link>  </button>
          <button className="nav-link jello-horizontal">     <Link to="/Medias"> Medias </Link>   </button>
          <button  className="nav-link jello-horizontal">   <Link to="/Accesorios"> Accesorios </Link> </button>
          

        
        </Toolbar>
      </AppBar>
    </div>
  );
}
