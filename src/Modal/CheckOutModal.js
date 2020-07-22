import React, {useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
import {checkout} from '../services/CartService'
import { AuthContext } from '../App';
import {shoppingCartContext} from '../App'


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});


Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};


export default function CheckOutModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const auth = useContext(AuthContext) 
  const shopList = useContext(shoppingCartContext)
  const [checkoutFormState, changeCheckoutFormState] = React.useState({direccion:'',codPos:'',tel:'',comentarios:'',tipoEnvio:"Seleccione un tipo de envío"})
  const [formErrors, changeFormErrors] = React.useState({dirError:'', cpError:'', telError:'', comError:'',envError:'' })



  //Form State onChange handling.---------------------------------------------------------
  const handleCheckoutFormState = (event) => {
    switch (event.target.id) {
      
      case "direccion": 
        changeCheckoutFormState({...checkoutFormState, direccion: event.target.value })
        changeFormErrors({...formErrors, dirError:''})
        break

      case "cod-postal":
        changeCheckoutFormState({...checkoutFormState, codPos: event.target.value })
        changeFormErrors({...formErrors, cpError:''})
        break

      case "tel":
        changeCheckoutFormState({...checkoutFormState, tel: event.target.value })
        changeFormErrors({...formErrors, telError:''})
       break

      case "more-comments":
        changeCheckoutFormState({...checkoutFormState, comentarios: event.target.value })
        changeFormErrors({...formErrors, comError:''})
        break

      default: 
      break  
    }
  }
  
  const handleChangeEnvioPrice = (event) => {
    
    if (event.target.value === 'local') {
      
      changeCheckoutFormState({...checkoutFormState, tipoEnvio: 0 })
      changeFormErrors({...formErrors, envError:''})
    }
    else if (event.target.value === 'sucursal') {

      changeCheckoutFormState({...checkoutFormState, tipoEnvio: 2 })
      changeFormErrors({...formErrors, envError:''})
    }
    else if (event.target.value === 'domicilio') {

      changeCheckoutFormState({...checkoutFormState, tipoEnvio: 5 })
      changeFormErrors({...formErrors, envError:''})
    }


  } 

//---------------------------------------------------------------------------

  const handleOpen = () => {
   
    setOpen(true);
    
  };

  const handleClose = () => {
      setOpen(false)
  }

  
//Checkout handling ---------------------------------------------------------------  
  const handleCheckout  = () => {

    changeFormErrors({dirError:'', cpError:'', telError:'', comError:'',envError:''})

    let hasErrors = false
    let errorObject = {dirError:'', cpError:'', telError:'', comError:'',envError:''}

    
  if (checkoutFormState.direccion.length < 5) { errorObject.dirError = "Ingrese una dirección válida."; hasErrors = true}
  if ((checkoutFormState.codPos.length < 3) || (checkoutFormState.codPos > 8)) { errorObject.cpError = "Ingrese un código postal válido" ; hasErrors = true}
  if (( checkoutFormState.tel.length < 7) || (checkoutFormState.tel.lenght > 15)) { errorObject.telError = "Ingrese un telefono válido" ; hasErrors = true}
  if (checkoutFormState.comentarios.length > 300) {errorObject.comError = "El limite máximo es 300 caracteres" ; hasErrors = true}
  if (checkoutFormState.tipoEnvio === "Seleccione un tipo de envío") {errorObject.envError = "Seleccione un tipo de envío" ; hasErrors = true}


  if (hasErrors === true) {
    changeFormErrors ({
      dirError: errorObject.dirError,
      cpError: errorObject.cpError,
      telError: errorObject.telError,
      comError: errorObject.comError,
      envError: errorObject.envError
    })
  }


  if (hasErrors === false) {

  }

  //   checkout(auth.state.user, shopList.state2.shoppingList, (res, err) => {
                  
  //  })

  }

//----------------------------------------------------------------------------------  

  return (
  
    <div>

    <Button  color="primary" onClick={handleOpen} className="checkout-button"> Check-out </Button>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
      
        disableScrollLock={true}
        hideBackdrop={false}
        //
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={`${classes.paper} checkout-div`}>
            <h2 id="checkout-modal-title"> CheckOut </h2>
          
            <form className="modal-form checkout-modal">
            
              <label for="direccion"> Dirección de entrega </label>
              <input className="modal-input" id="direccion" type="text" name="direccion" placeholder="Dirección de entrega" onChange={handleCheckoutFormState} />
              <p className="form-error"> {formErrors.dirError} </p>
              
              <label for="cod-postal"> Codigo Postal </label>
              <input className="modal-input" id="cod-postal"  type="text" name="cod-postal" placeholder="Codigo postal" onChange={handleCheckoutFormState}/>
              <p className="form-error"> {formErrors.cpError} </p>

              <label for="tel"> Teléfono de contacto </label>
              <input className="modal-input" id="tel"  type="text" name="tel" placeholder="Teléfono" onChange={handleCheckoutFormState} />
              <p className="form-error"> {formErrors.telError} </p>

              <label for="more-comments"> Comentarios adicionales </label>
              <textarea  id="more-comments" rows="4" cols="50" onChange={handleCheckoutFormState} />
              <p className="form-error"> {formErrors.comError} </p>

              <div className="checkout-form-radio">

                <input type="radio" id="local" value="local" name="entrega" onChange={handleChangeEnvioPrice} />
                <label for="local"> Local </label> <br/>

                <input type="radio" id="sucursal" value="sucursal" name="entrega" onChange={handleChangeEnvioPrice}/>
                <label for="sucursal"> Sucursal </label> <br/>

                <input type="radio" id="domicilio" value="domicilio" name="entrega" onChange={handleChangeEnvioPrice}/>
                <label for="domicilio"> A domicilio </label> <br/>
                <p className="form-error"> {formErrors.envError} </p>

            
            </div>

            <div className="checkout-costs">
              <p>Precio: {shopList.state2.total} </p>

              <p>Costo de envío: {checkoutFormState.tipoEnvio} </p>
            </div>

            <Button  color="primary" className="checkout-button pay-button" onClick={handleCheckout}> Pagar </Button>
            </form>

        
    
          </div>
        </Fade>
      </Modal>
    </div>
  );


}
