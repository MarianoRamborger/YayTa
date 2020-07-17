import axios from "axios";
import {SL} from './SL'


export const RegisterUser = (Name, Email, Password, Phone, cb) => {
  axios
    .post(`${SL}/api/users/create`, {
        name: Name,
        email: Email,
        password: Password,
        phone: Phone
    })
    .then(function(res) {
      cb(res);
    })
    .catch(function(err) {
      cb(err, true);
    });
};