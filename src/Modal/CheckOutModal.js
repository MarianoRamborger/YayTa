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
  const [precioEnvio, changePrecioEnvio] = React.useState('')



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
        envioCalculator(event.target.value)
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

//////////////////////////////////////////////Calculador de Zona, considerar mover a otro componente
  const zonaCalculator = (cp) => {

    //Built en una función aparte para ir descartando los targets más likely (AMBA) ahorrando comprobaciones y ganando velocidad promedio.
    
    //z1
    if ((cp >= 1000) && (cp <= 1893)) { return  1}
    else if ((cp === 1924) || (cp === 2752) || (cp === 2760) || (cp === 2814) || (cp === 2930) || (cp === 2931) || (cp === 2935) || (cp === 2953) ) {  return 1}
   
    //z2 -rest of bsas, cordoba, entre rios, la pampa, santa fe.
    //Cordoba
    if (cp === 2400) {return 2}; if (cp === 2550) {return 2}; if (cp === 2580) {return 2}; if (cp === 2670) {return 2};
    if (cp === 5000) {return 2}; if (cp === 5111) {return 2}; if (cp === 5127) {return 2}; if (cp === 5166) {return 2};
    if (cp === 5186) {return 2}; if (cp === 5191) {return 2 }; if (cp === 2500) {return 2 }; if (cp === 5203 ) {return 2}; 
    if (cp === 5209) {return 2}; if (cp === 5236) {return 2}; if (cp === 5248) {return 2}; if (cp === 5280) {return 2};
    if (cp === 5291) {return 2}; if (cp === 5295) {return 2}; if (cp === 5870) {return 2}; if (cp === 5891) {return 2}; 
    if (cp === 5900) {return 2}; if (cp === 5960) {return 2}; if (cp === 5980) {return 2};if (cp === 6120) {return 2}; if (cp === 6275) {return 2};

    //Santa fe
    if ((cp >= 2000) & (cp <=2300)) {return 2}
    if ((cp >= 2520) & (cp <=3000)) {return 2}
    //Entre Rios
    if ((cp >= 2820) & (cp <=2840)) {return 2}
    if ((cp >= 3100) & (cp <=3280)) {return 2}
    //La Pampa
    if ((cp >= 6200) & (cp <=6221)) {return 2}
    if ((cp >= 6387) & (cp <=8200)) {return 2}

    //z3 - Catamarca,Chaco,Corrientes,Formosa,laRioja,Mendoza,Misiones,Neuquen,RioNegro,SanJuan,SanLuis,SdelEstero,Tucuman.
    //Camtamarca
    if ((cp >= 4700) & (cp <=4750)) {return 3}
    //Chaco
    if ((cp >= 3500) & (cp <=3541)) {return 3}
    if ((cp >= 3700) & (cp <=3743)) {return 3}
    //Corrientes
    if ((cp >= 3400) & (cp <=3485)) {return 3}
    //Formosa
    if ((cp >= 3600) & (cp <=3636)) {return 3}
    //La Rioja
    if ((cp >= 5300) & (cp <=5386)) {return 3}
    //Mendoza
    if ((cp >= 5500 ) & (cp <= 5620)) {return 3}
    //Misiones
    if ((cp >= 3300) & (cp <= 3384)) {return 3}
    //Neuquen
    if ((cp >= 8300) & (cp <= 8407)) {return 3}
    //Rio Negro
    if ((cp >= 8400) & (cp <= 8536)) {return 3}
    //San Juan
    if ((cp >= 5400) & (cp <= 5467)) {return 3}
    //SanLuis
    if ((cp >= 5700) & (cp <= 5883)) {return 3}
    //Santiago del Estero
    if ((cp >= 2354) & (cp <= 2357)) {return 3}
    if ((cp >= 3740) & (cp <= 3763)) {return 3}
    if ((cp >= 4184) & (cp <= 4354)) {return 3}
    //Tucuman
    if ((cp >= 4000) & (cp <= 4178)) {return 3}

    //z4 - Chubut, Jujuy, Salta, Santa Cruz, Tierra del Fuego.
    //Chubut
    if ((cp >= 9000) & (cp <= 9220)) {return 4}
    //Jujuy
    if ((cp >= 4500 ) & (cp <= 4514)) {return 4}
    if ((cp >= 4600) & (cp <= 4655)) {return 4}
    // Salta
    if ((cp >= 4400) & (cp <= 4651)) {return 4}
    // Santa Cruz
    if ((cp >= 9300) & (cp <= 9407)) {return 4}
    //Tierra del Fuego
    if ((cp === 9410) || (cp === 9420)) {return 4}

    else return 2
  }
  /////////////////////////////////////////////Calculador de Precio y Envio; considerar mover a otro componente ///////////////////////////////////////////////////////////
  const envioCalculator = (value, optionalType) => {

    console.log(optionalType)

    let zona = zonaCalculator(Number(value))
    let tipoEnvio = optionalType || checkoutFormState.tipoEnvio

    let pesoTotal = shopList.state2.totalWeight;

    console.log(tipoEnvio)

     if (tipoEnvio === 'local') {
       changePrecioEnvio(0)
     }


     if (tipoEnvio === 'sucursal') {

      if (zona === 1) {
        if (pesoTotal < 0.5) {changePrecioEnvio(180.26)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(184)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(200)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(202)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(209)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(260)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(361)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(373)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(429)}
      }
      if (zona === 2) {
        if (pesoTotal < 0.5) {changePrecioEnvio(212.26)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(229)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(269)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(298)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(371)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(482)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(631)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(787)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(942)}
      }
      if (zona === 3) {
        if (pesoTotal < 0.5) {changePrecioEnvio(215)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(233)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(271)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(314)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(381)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(502)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(674)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(863)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(1039)}
      }
      if (zona === 4) {
        if (pesoTotal < 0.5) {changePrecioEnvio(220)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(244)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(294)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(343)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(390)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(602)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(825)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(1048)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(1271)}
      }
    }

    if (tipoEnvio === 'domicilio') {

      if (zona === 1) {
        if (pesoTotal < 0.5) {changePrecioEnvio(271)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(319)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(321)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(323)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(326)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(359)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(465)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(481)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(511)}
      }
      if (zona === 2) {
        if (pesoTotal < 0.5) {changePrecioEnvio(296)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(345)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(355)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(375)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(445)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(503)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(681)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(809)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(961)}
      }
      if (zona === 3) {
        if (pesoTotal < 0.5) {changePrecioEnvio(297)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(346)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(357)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(390)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(459)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(556)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(709)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(901)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(1077)}
      }
      if (zona === 4) {
        if (pesoTotal < 0.5) {changePrecioEnvio(298)}
        if ((pesoTotal >= 0.5) && (pesoTotal < 1)) {changePrecioEnvio(349)}
        if ((pesoTotal >= 1) && (pesoTotal < 2)) {changePrecioEnvio(377)}
        if ((pesoTotal >= 2) && (pesoTotal < 3)) {changePrecioEnvio(416)}
        if ((pesoTotal >= 3) && (pesoTotal < 5)) {changePrecioEnvio(507)}
        if ((pesoTotal >= 5) && (pesoTotal < 10)) {changePrecioEnvio(647)}
        if ((pesoTotal >= 10) && (pesoTotal < 15)) {changePrecioEnvio(871)}
        if ((pesoTotal >= 15) && (pesoTotal < 20)) {changePrecioEnvio(1109)}
        if ((pesoTotal >= 20) && (pesoTotal < 25)) {changePrecioEnvio(1440)}
      }
    }

    

   }

  const handleChangeEnvioType =  (event) => {
    
    if (event.target.value === 'local') {
      
      changeCheckoutFormState({...checkoutFormState, tipoEnvio: "local" })
    
      changeFormErrors({...formErrors, envError:''})
      
    }
    else if (event.target.value === 'sucursal') {

      changeCheckoutFormState({...checkoutFormState, tipoEnvio: "sucursal" })
      changeFormErrors({...formErrors, envError:''})

    }
    else if (event.target.value === 'domicilio') {

      changeCheckoutFormState({...checkoutFormState, tipoEnvio: "domicilio" })
      changeFormErrors({...formErrors, envError:''})
     
    }

    envioCalculator(checkoutFormState.codPos, event.target.value)
    



    return null
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
  if ((checkoutFormState.codPos.length !== 4) || (isNaN(checkoutFormState.codPos))) { errorObject.cpError = "Ingrese un código postal válido" ; hasErrors = true}
  if ((checkoutFormState.tel.length < 7) || (checkoutFormState.tel.lenght > 15)) { errorObject.telError = "Ingrese un telefono válido" ; hasErrors = true}
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

       checkout(auth.state.user, shopList.state2.shoppingList, checkoutFormState, (res, err) => {
                  
   })

  }

 

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
              
              <label for="cod-postal"> Codigo Postal (4 digitos)</label>
              <input className="modal-input" id="cod-postal"  type="text" name="cod-postal" placeholder="Codigo postal" onChange={handleCheckoutFormState}/>
              <p className="form-error"> {formErrors.cpError} </p>

              <label for="tel"> Teléfono de contacto </label>
              <input className="modal-input" id="tel"  type="text" name="tel" placeholder="Teléfono" onChange={handleCheckoutFormState} />
              <p className="form-error"> {formErrors.telError} </p>

              <label for="more-comments"> Comentarios adicionales </label>
              <textarea  id="more-comments" rows="4" cols="50" onChange={handleCheckoutFormState} />
              <p className="form-error"> {formErrors.comError} </p>

              <div className="checkout-form-radio">

                <input type="radio" id="local" value="local" name="entrega" onChange={handleChangeEnvioType} />
                <label for="local"> Local </label> <br/>

                <input type="radio" id="sucursal" value="sucursal" name="entrega" onChange={handleChangeEnvioType}/>
                <label for="sucursal"> Sucursal </label> <br/>

                <input type="radio" id="domicilio" value="domicilio" name="entrega" onChange={handleChangeEnvioType}/>
                <label for="domicilio"> A domicilio </label> <br/>
                <p className="form-error"> {formErrors.envError} </p>

            
            </div>

            <div className="checkout-costs">
              <p>Precio: {shopList.state2.total} </p>

              <p>Costo de envío: {precioEnvio} </p>
            </div>

            <Button  color="primary" className="checkout-button pay-button" onClick={handleCheckout}> Pagar </Button>
            </form>

        
    
          </div>
        </Fade>
      </Modal>
    </div>
  );


}
