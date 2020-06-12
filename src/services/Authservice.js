import axios from "axios";
import {SL} from './SL'


export const AuthUser = (Email, Password, cb) => {
  axios
    .post(`${SL}/api/users/auth`, {
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