import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Button from '@material-ui/core/Button';

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

  
  const handleOpen = () => {
   
    setOpen(true);
    
  };

  const handleClose = () => {
      setOpen(false)
  }


  
  return (
  
    <div>

    <Button  color="primary" onClick={handleOpen} className="checkout-button"> Check-out </Button>

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
            <h2 id="spring-modal-title"> CheckOut </h2>
          
            {/* <p id="spring-modal-description"> Por favor, ingrese su email y contraseña </p>
            <form className="modal-form">
              
              <input className="modal-input"  type="text" name="user" placeholder="Email" onChange={handleUserNameChange} />
              <input className="modal-input" type="text"  name="password" placeholder="Contraseña" onChange={handlePasswordChange}/>

              <Button className="modal-button" size="small" variant="contained" color="primary" onClick={handshake}> INGRESAR </Button>
              <Button className="modal-button" size="small" variant="contained" color="primary" onClick={props.handleLogMode}> Registrate </Button>
              <p className="form-error-text"> {props.error} </p>
             
            </form> */}
    
          </div>
        </Fade>
      </Modal>
    </div>
  );


}
