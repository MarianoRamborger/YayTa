import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
// import { GenerateJWT, DecodeJWT, ValidateJWT } from '../services/JWTservice'

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


let controller = true;

console.log("modal mounted")

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};


export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formState, changeState] = React.useState( {username : "", password : ""})
  const [registerFormState, changeRegisterState] = React.useState( {name: "", username : "", password : ""})
  
 

  const handleUserNameChange = (event) => {
    changeState ( {
      username : event.target.value,
      password : formState.password,
    }) 
  }

  const handlePasswordChange = (event) => {
    changeState ( {
      username : formState.username,
      password : event.target.value,
    })
   
  }
  const handleRegisterNameChange = (event) => {
    changeRegisterState ( {
      name: event.target.value,
      username : registerFormState.username,
      password : registerFormState.password,
    }) 
  }
  const handleRegisterUsernameChange = (event) => {
    changeRegisterState ( {
      name: registerFormState.name,
      username : event.target.value,
      password : registerFormState.password,
    }) 
  }
  const handleRegisterPasswordChange = (event) => {
    changeRegisterState ( {
      name: registerFormState.name,
      username : registerFormState.username,
      password : event.target.value,
    }) 
  }


  const handleResetStates = () => {

    changeState ({ username : null, password : null})


  }

  const handleOpen = () => {
    controller = false
    setOpen(true);
    
  };

  const handleClose = () => {
    
    props.handleModalToggler()

    setOpen(false);   
    
    controller = true;

    handleResetStates();
    props.handleErrorMsg("")

    console.log("CLOSING DOWN")
    

  };



  if (props.modalState === true && controller === true) {
    handleOpen()
  
  }

  const handshake =  async () => {
    const Username = formState.username
    const Password = formState.password

    if (Username.trim().length > 4 && Password.trim().length > 3) {
      
      props.LogIn(Username, Password)
      controller = true // esta linea lo hace funcionar.. pero no es lo mejor porque hace que se abra el modal ni bien se desloguea uno.
      //consderar arreglar later on.

    }

    else  {
      props.handleErrorMsg("Ingrese nombre de usuario y contraseña válidos")
    }  
  }

  const register =  async () => {
    const Name = registerFormState.name
    const Username = registerFormState.username
    const Password = registerFormState.password
 
    if (Name.trim().length > 3 || Username.trim().length > 4 || Password.trim().length > 5) {

      props.Register(Name, Username, Password)
      controller = true
    }
    else  {
      props.handleErrorMsg("Todos los campos deben poseer al menos cuatro caracteres.")
    }
  
  }
  

  
 
 if (props.logMode === true) {

  return (
  
    <div>
  
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title"> Login </h2>
          
            <p id="spring-modal-description"> Por favor, ingrese su email y contraseña </p>
            <form className="modal-form">
              
              <input className="modal-input"  type="text" name="user" placeholder="Email" onChange={handleUserNameChange} />
              <input className="modal-input" type="text"  name="password" placeholder="Contraseña" onChange={handlePasswordChange}/>

              <Button className="modal-button" size="small" variant="contained" color="primary" onClick={handshake}> INGRESAR </Button>
              <Button className="modal-button" size="small" variant="contained" color="primary" onClick={props.handleLogMode}> Registrate </Button>
              <p className="form-error-text"> {props.error} </p>
             
            </form>
            {/* <p className="register-prompt"> No tenes cuenta? registrate! </p> */}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
else {
  return (<div>
  
 
  <Modal
    aria-labelledby="spring-modal-title"
    aria-describedby="spring-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
  >
    <Fade in={open}>
      <div className={classes.paper}>
        <h2 id="spring-modal-title"> Registro </h2>
      
        <p id="spring-modal-description"> Por favor, ingrese los datos solicitados </p>
        <form className="modal-form">
          
          <input className="modal-input"  type="text" name="name" placeholder="Nombre" onChange={handleRegisterNameChange} />
          <input className="modal-input"  type="text" name="user" placeholder="Email" onChange={handleRegisterUsernameChange} />
          <input className="modal-input" type="text"  name="password" placeholder="Contraseña" onChange={handleRegisterPasswordChange}/>

          <Button className="modal-button" size="small" variant="contained" color="primary" onClick={register}> Registrarme </Button>
          <Button className="modal-button" size="small" variant="contained" color="primary" onClick={props.handleLogMode}> Atrás </Button>
     
          <p className="form-error-text"> {props.error} </p>
         
        </form>
        {/* <p className="register-prompt"> No tenes cuenta? registrate! </p> */}
      </div>
    </Fade>
  </Modal>
</div>)

}
 

}
