import axios from "axios";

export const upCart = async (user, cart, cb) => {
   
    try {
        await axios.put('/api/cart/upload', {
            user: user,
            cart: cart
        })
        .then(function(res) {
            cb(res);
          })
   
    }
    catch (err) {console.log(err)}
}

export const checkout = async (user, cart, cb) => {
    
    try {
        await axios.post('/api/checkout', {
            user: user,
            cart: cart
        })
        .then(function(res) {
            cb(res)
            window.open(res.data)
            //this opens in a new window the thingie to pay

        })
    }
    catch(err) {console.log(err)}
}

export const downCart = async (user, cb ) => {
    console.log(user)
    try { await axios.post('/api/cart/download', {
        user: user
    })
    .then(function(res) {
        console.log(res)
        cb(res)
    })
}
catch(err) {console.log(err)}
}

