import React, {useContext} from 'react'; //Vital para usar context
import {shoppingCartContext} from '../../App';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import {SpringModal} from '../../PicModal/Modal'


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function SingleCard(props) {
  const classes = useStyles();

  const [maxStock, showMaxStock] = React.useState(false)
  
  const ShopListAdd = () => {



    //Finds si se alcanzó el máx stock, lo displayea thus.
    ShopList.state2.shoppingList.find( product => {
      if (product.productId === props.productId) { 
        if (product.cantidad >= props.stock ) {

            return showMaxStock(true)
        }} return null   
      }) 
     
    ShopList.dispatch2({
        type: "ADD",
        info: {...props, cantidad: 1 
        }

    })
}

const ShopListRemove = () => {

  if (maxStock)  { showMaxStock(false) } //Borra la max stock warning al sacar 1.

  ShopList.dispatch2({
    type: "MINUSONE",
    info: {...props}
  })
}


const targetNumber = (number) => {

   
if (number < props.stock)
  {
    ShopList.dispatch2({
      type: "SPECIFIC",
      info: {...props, cantidad: number}
    })
    showMaxStock(false)
    
  }

  else if (number === props.stock)
  {
    ShopList.dispatch2({
      type: "SPECIFIC",
      info: {...props, cantidad: number}
    })
    showMaxStock(true)
  }
 
  
}

const ShopList = useContext(shoppingCartContext) /* CONTEXT */

const onChangeHandler = (event) => {
 
  if ( !isNaN(event.target.value) && 
  event.target.value > props.stock &&
   !event.target.value.includes(".") ) {
    
    showMaxStock(true)
    
  }

    if ( !isNaN(event.target.value) && 
    event.target.value <= props.stock &&
     !event.target.value.includes(".") ) {
      
      targetNumber(Number(event.target.value))
      
    }

   

}


  return (
    <Card className={`${classes.root} card`} id={props.id}>
      <CardActionArea className="card-area">
        {/* <CardMedia 
          className={`${classes.media} card-image`}
          image = {props.picture} style={
            { width: "20% !important", height: "400px"
             }}

         

          title={props.title}
         
        /> */}
          <SpringModal className={`card-image`} fullScreenClassName={"full-screen-control"}  image={props.picture} />



        <CardContent className="card-content">
          <Typography gutterBottom variant="h5" component="h2" className="card-title" >
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="class-actions">
        <Button size="small" color="primary" onClick={ShopListRemove}>
          <RemoveIcon className="shop-icons"  />
        </Button>
      
            <input  className="quantity-input" value={props.cantidad} onChange={onChangeHandler}    />
           
        <Button size="small" color="primary" onClick={ShopListAdd}>
          <AddIcon className="shop-icons"  />
        </Button>
        
      </CardActions>

        { maxStock ? 
          <div className="stock">
              <p> máx stock: {props.stock} </p> 
          </div>
        : null}

       

    </Card>
  );
}
