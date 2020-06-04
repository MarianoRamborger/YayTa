import React, {useContext, useState, useEffect} from 'react'; //Vital para usar context
import { fade, makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../App';
import { AuthUser} from '../services/Authservice'

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
import { 
 // GenerateJWT, 
  DecodeJWT, ValidateJWT 
  //,ValidateJWT 
        } from '../services/JWTservice'



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
  const [callResponse, changeResponse] = React.useState({ resp: null, data: null } )



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
    if (isModalOpen !== false) {toggleModal(false)}
   
    
  }

  

// desktop


 const LogIn = (Username, Password) => {
   
    AuthUser(Username, Password, (res, err) => {
      if (err) {
        console.log("que macana no loguea. AGREGAME UN ERROR DESPUES")
      }
      else {
        if (res.status === 200 ) { //ultimately el check de si el handshake fue efectivo o no
          handleMobileMenuClose()
          handleMenuClose()

    
            isLogged.dispatch({ type: "LOGIN", email: Username, JWT: res.data.JWT})
            
           
            
            
        }}    
    })
  }



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

  useEffect(() => {

    if (!isLogged.state.isAuthenticated && typeof Storage !== "undefined" && localStorage.getItem("JWT") !== null) {
        console.log("hooking why dos veces? revisar")

           let j = localStorage.getItem("JWT")
      
           ValidateJWT(j, data => {
             if (data.data == "ERROR") { localStorage.removeItem("JWT")  }
             else {
              isLogged.dispatch({ type: "LOGIN", Email: data.data, JWT: j})
             } 
           })  

        
        }
        }

      
    ) //lista de dependencias. UseEffect solo va a shootear si los estados listados acá cambianesto cambia.

  
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
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              className= "account-circle on"
            >
            <AccountCircle />
            </IconButton>    
          :
          ///////////////////
          //////////////////////////////////////////
            <React.Fragment>
            <Button  className="login-button" onClick={handleModelToggler}> <AccountCircle />  
             </Button>
             <Modal modalState={isModalOpen} handleModalToggler={handleModelToggler} LogIn={LogIn} changeResponse={changeResponse} callResponse={callResponse} /> 
             
             </React.Fragment>
          } 

          </div>



        {/* Mobile Profile */}
          <div className={`${classes.sectionMobile} push`}>
          <IconButton
              className ="shopping-cart-icon on"
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
              <Modal modalState={isModalOpen} handleModalToggler={handleModelToggler} LogIn={LogIn}  islogged={isLogged.state.isAuthenticated} /> 
             
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