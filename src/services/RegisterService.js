import axios from "axios";
import {SL} from './SL'


export const RegisterUser = (Name, Email, Password, cb) => {
  axios
    .post(`${SL}/api/users/create`, {
        name: Name,
        email: Email,
        password: Password
    })
    .then(function(res) {
      cb(res);
    })
    .catch(function(err) {
      cb(err, true);
    });
};