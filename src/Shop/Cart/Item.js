import React, {useContext} from 'react';
import {shoppingCartContext} from '../../App'
//import { makeStyles, useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {SpringModal} from '../../PicModal/Modal'
import CardActionArea from '@material-ui/core/CardActionArea';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));




export default function MediaControlCard(props) {
  const classes = useStyles();
  // const theme = useTheme();

  const shopList = useContext(shoppingCartContext)
  const [maxStock, showMaxStock] = React.useState(false)

  const plusOne = () => {
    
    if (props.props.cantidad >= props.props.stock) {
      showMaxStock(true)
    }
    
    shopList.dispatch2({
      type: "PLUSONE",
      info: {...props.props}

    })
    

  }

  const remove = () => {

    showMaxStock(false)

    shopList.dispatch2 ({
      type: "REMOVE",
      info: {...props.props}
    })
  }

  const minusOne = () => {
    showMaxStock(false)

    shopList.dispatch2 ({
      type: "MINUSONE",
      info: {...props.props}
    })
  }


  return (

    <Card className={classes.root}>
  
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h6" variant="h6" className="cart-item-title"> 
            {`${props.props.name}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
           <div className="cart-item-text">
             <p> {`$ ${props.props.price}.`} </p>
             <p> {`Cantidad: ${props.props.cantidad}`} </p>
              
                { maxStock ? 
                        
                            <p> máx stock: {props.props.stock} </p> 
                      
               : null} 

           </div>

         
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <IconButton onClick={ plusOne } >
                <AddIcon  />
          </IconButton>
          <IconButton onClick={minusOne} >
                <RemoveIcon />
          </IconButton>
          <IconButton onClick={remove} >
                <DeleteIcon />
          </IconButton>
        
        </div>
      </div>
      {/* <CardMedia 

        className={`shopping-cart-item-image ${classes.cover}`}
        image={`${props.props.picture}`}
        name={`${props.props.name}`}  
      /> */}

      <CardActionArea className="card-area">
      <SpringModal className={`Scard-image`} fullScreenClassName={"full-screen-control"}  image={props.props.picture} />

      </CardActionArea>

    </Card>
    
  );
}

