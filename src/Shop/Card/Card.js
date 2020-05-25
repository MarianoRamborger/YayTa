import React, {useContext} from 'react'; //Vital para usar context
import {shoppingCartContext} from '../../App';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';




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

  
const ShopListAdd = () => {
    ShopList.dispatch2({
        type: "ADD",
        info: {...props, cantidad: 1 
        }

    })
}

const ShopListRemove = () => {
  ShopList.dispatch2({
    type: "MINUSONE",
    info: {...props}
  })
}


const targetNumber = (number) => {
  ShopList.dispatch2({
    type: "TARGETNUMBER",
    info: {...props, cantidad: number}
  })
}



const ShopList = useContext(shoppingCartContext) /* CONTEXT */




const onChangeHandler = (event) => {
    
    if ( !isNaN(event.target.value) && 
    event.target.value <= props.stock &&
     !event.target.value.includes(".") ) {
      

      targetNumber(Number(event.target.value))
    }
   
}



  return (
    <Card className={`${classes.root} card`} id={props.id}>
      <CardActionArea className="card-area">
        <CardMedia 
          className={`${classes.media} card-image`}
          image = {props.image} style={
            { width: "20% !important", height: "400px"
            }}
                                                        
          title={props.title}
         
        />
         
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
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
    </Card>
  );
}
