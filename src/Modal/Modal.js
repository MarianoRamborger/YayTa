import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';
import { GenerateJWT, DecodeJWT, ValidateJWT } from '../services/JWTservice'

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

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};


export default function SpringModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [formState, changeState] = React.useState( {username : null, password : null})
  const [errorState, changeErrorState] = React.useState({formError: null})
  


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

  const handleResetStates = () => {

    changeState ({ username : null, password : null})
    changeErrorState ({formError : null})

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

    

  };

  // const handleErrors = (error) => {
  //   changeErrorState({ formError :  error })
  // }


  if (props.modalState === true && controller === true) {
    handleOpen()
    
      
  }

  const debug = () => {
    console.log(props.callResponse)
  }

  const handshake =  async () => {
    const Username = formState.username
    const Password = formState.password


    const Claims = { Username, Password }
    const Header = { alg: "HS512" , typ: "JWT"}

    GenerateJWT(Header, Claims, null, res => {
      if (res.status === 200 ) {
        
        let response = res.data
 
        if (typeof Storage !== "undefined") {localStorage.setItem("JWT", res.data)} //loads on localstorage, si el navegador lo soporta.
      
        

        DecodeJWT(response, data => {


          console.log(data)
          props.changeResponse({ resp : response, data: data.data})
          if (res.status === 200) {
            handleClose() 
            props.LogIn()
          }
        })

   
        
   
  
      } else {
         props.changeResponse("error")
        console.log("error")
      }
    
    })



   
 
  }


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
            <p id="spring-modal-description"> Back-end en proceso. Probar user user.</p>
            <form className="modal-form">
              
              <input className="modal-input"  type="text" name="user" placeholder="user" onChange={handleUserNameChange} />
              <input className="modal-input" type="text"  name="password" placeholder="user" onChange={handlePasswordChange}/>
              <Button className="modal-button" size="small" variant="contained" color="primary" onClick={handshake}> INGRESAR </Button>
              <p className="form-error-text"> {errorState.formError} </p>
             
            </form>
            <p className="register-prompt"> No tenes cuenta? registrate! </p>
            <button onClick={debug}>DEBUG ME</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}