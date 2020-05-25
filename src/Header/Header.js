import React, {useContext, useState} from 'react'; //Vital para usar context
import { fade, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../App';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button'
import ShoppingCart from '../Shop/Cart/ShoppingCart'
import Badge from '@material-ui/core/Badge';
import {shoppingCartContext} from '../App'
import Modal from '../Modal/Modal'
import ClearIcon from '@material-ui/icons/Clear';
import 'bootstrap/dist/css/bootstrap.min.css';




const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



  const PrimarySearchAppBar = (props) => {


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isModalOpen, toggleModal] = useState(false)



  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const handleModelToggler = () => {
    if (isModalOpen === false)  { toggleModal(true) }
    if (isModalOpen === true) {toggleModal(false)}
    
  }


// desktop

 // Función de Login temporal. Modifica el estado del Provider desde el Consumer
 const LogIn = () => {
    handleMobileMenuClose()
    isLogged.dispatch({
    type: "LOGIN",
    payload: "eee"
})}

const LogOut = () => {
  handleMenuClose()
  handleMobileMenuClose()
  isLogged.dispatch({
  type: "LOGOUT"
  
})}

const isLogged = useContext(AuthContext) /* CONTEXT */

const cartContext = useContext(shoppingCartContext)

  const menuId = 'primary-search-account-menu';
  const renderMenu = (


    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className="profile-menu-button">Profile</MenuItem>
      <MenuItem onClick={handleMenuClose} className="profile-menu-button">My account</MenuItem>
      <MenuItem onClick={LogOut} className="profile-menu-button">Log Out</MenuItem>

    </Menu>

    
  );

// mobile 

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

    </Menu>
  );

 

  
  return (

 
    <div  >
      <AppBar position="static" className="header-app-bar"   >

        <Toolbar className="toolbar-color app-bar" id="header-bar"  >
         
          {/* SearchBar */}
          <div className={classes.search} id="searchBar">
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase 
              id="searchBarInput"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.handleSearchBarState}
             />      
          </div>
         
          <ClearIcon  onClick={props.clearSearchBar} className="pull"/>
          

          
          <Typography  id="web-title" > 
           Ya & Ta 
          </Typography>

          
          <div  />
          <div className={`${classes.sectionDesktop} push`}  >


          {/* Desktop Profile*/}
          
          <IconButton className="shopping-cart-icon" > 
           <Badge badgeContent={cartContext.state2.shoppingList.length} color="secondary" > <ShoppingCart /> </Badge>
          </IconButton>
          
          { 
            isLogged.state.isAuthenticated 
          ? 
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              className= "account-circle"
            >
            <AccountCircle />
            </IconButton>    
          :
          ///////////////////
          //////////////////////////////////////////
            <React.Fragment>
            <Button  className="login-button" onClick={handleModelToggler}> <AccountCircle />  
             </Button>
             <Modal modalState={isModalOpen} handleModalToggler={handleModelToggler} LogIn={LogIn}  /> 
             
             </React.Fragment>
          } 

          </div>



        {/* Mobile Profile */}
          <div className={`${classes.sectionMobile} push`}>
          <IconButton
              className ="shopping-cart-icon"
              >
                <Badge badgeContent={cartContext.state2.shoppingList.length} color="secondary"> <ShoppingCart/> </Badge>  
              {/* <ShoppingCart /> */}
          </IconButton>

          {
              isLogged.state.isAuthenticated 
              ?
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        className="account-circle"
                      >
                      <AccountCircle />
                    </IconButton>
                  </MenuItem>
              :
              <React.Fragment>
                <Button  className="login-button" onClick={handleModelToggler}> <AccountCircle />  
              </Button>
              <Modal modalState={isModalOpen} handleModalToggler={handleModelToggler} LogIn={LogIn}  /> 
             
             </React.Fragment>
          }
          </div>

        </Toolbar>

      </AppBar>
      
      {renderMobileMenu}
      {renderMenu}
      
      
    </div>
   
  
  );
 
}

export default PrimarySearchAppBar