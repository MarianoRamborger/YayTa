import React, {useContext} from 'react';
import {shoppingCartContext} from '../../App'
import { AuthContext } from '../../App';
import {checkout} from '../../services/CartService'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';

import LocalMallIcon from '@material-ui/icons/LocalMall';
import Item from './Item'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button'




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
    right: false,
  });

  const shopList = useContext(shoppingCartContext)
  const auth = useContext(AuthContext)


  const handleCheckout  = () => {
    checkout(auth.state.user, shopList.state2.shoppingList, (res, err) => {
                    
                     
   })
  }
  

   
  


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    // Here cart-list la clase para avoidear el overflow
    <div
      id = {"shopping-cart-div"}
      className={clsx(`${classes.list} cart-list`,   {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="cart-list">
        <ListItem className={"list-topper-item"} >  <h3>   Mi Carrito  </h3> 
         <IconButton onClick={toggleDrawer(anchor, false)}>
         <CloseIcon className={"close-icon"} />
        </IconButton> 
         </ListItem>
      </List>
      <Divider />
      <List className="product-list">

      {

         shopList.state2.shoppingList.map(data => {
      
           
           return <Item props={data} key={data.productId} />
         } 
         )
        
       
      }
    
      </List>
      <Divider />
      <List className="checkout-list">
      <ListItem >
      <div className="totals-div">
      <h3 className="shopping-cart-total"> Total : ${shopList.state2.total} </h3>
      <h3 className="shopping-cart-total"> Peso : {shopList.state2.totalWeight}Kgs </h3>
      </div>
      </ListItem>

      <ListItem >
        <Button  color="primary" onClick={handleCheckout} className="checkout-button">  Check-out  </Button>
      </ListItem>
    
      </List>
    </div>
  );

  return (
    <div>
    
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <LocalMallIcon onClick={toggleDrawer(anchor, true)} className="icono" > {anchor}</LocalMallIcon>
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
