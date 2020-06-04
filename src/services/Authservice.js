import axios from "axios";

export const AuthUser = (Email, Password, cb) => {
  axios
    .post("/api/users/auth", {
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