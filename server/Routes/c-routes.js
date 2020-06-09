const express = require('express');
const UserModel = require('../Models/User');
const productModel = require('../Models/Products');
const router = express.Router();
const Joi = require('@hapi/joi');
const _ = require('lodash')

const {Product, validateProduct} = productModel
const {User, validateUser, validatePassword} = UserModel

router.put('/cart/upload', async (req, res) => {
    const {user, cart} = req.body
 
    try {
        
    let DBuser = await User.findOne({email: user});

    if (!DBuser){
        return res.status(400).send('User not found')
    }
    let products = await Product.find({})

    if (!products) {
        return res.status(400).send('Products not found')
    }
    DBuser.shoppingCart = []

   cart.map (Cartproduct => {
       products.map(DBproduct => {
        
           if (Cartproduct.name === DBproduct.name){
            
            if (Cartproduct.cantidad <= DBproduct.stock || DBproduct.stock > 0) { 

                DBuser.shoppingCart.push ({
                   
                    productId : DBproduct._id,
                    name : DBproduct.name,
                    type: DBproduct.type,
                    picture: DBproduct.picture,
                    price: DBproduct.price,
                    desc: DBproduct.desc,
                    cantidad:  Cartproduct.cantidad

                })
            }

            else {
                (console.log(`Falta stock de ${Dbproduct.name}`))
                DBuser.shoppingCart.push ({
                    productId: DBproduct._id,
                    name : DBproduct.name,
                    type: DBproduct.type,
                    picture: DBproduct.picture,
                    price: DBproduct.price,
                    desc: DBproduct.desc,
                    cantidad:  Dbproduct.stock })
            }
           } 
       })
                   //CREAR OBJETOS NUEVOS PARA EL CARRITO, TOMA COMPRUEBA STOCK, Y TOMA PRECIO DE LA DB. TODO LO DEMAS  + CANTIDAD DEL CART DE LA PAG   
   })
   DBuser.save()
   
   return res.status(200).send(DBuser.shoppingCart)
}
    catch {
        return res.status(500).send('Server Error')
    }

})

router.post('/cart/download', async (req, res) => { 

    const user = req.body.user

    try {
        let DBuser = await User.findOne({email: user});

    if (!DBuser){
        return res.status(400).send('User not found')
    }
    return res.status(200).send(DBuser.shoppingCart)

    }
    catch {
    return res.status(500).send('Server Error')   
    }


})


module.exports = router