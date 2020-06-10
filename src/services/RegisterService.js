import axios from "axios";

export const RegisterUser = (Name, Email, Password, cb) => {
  axios
    .post("/api/users/create", {
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