import React , { useState, useContext, useEffect} from 'react'
import Card from './Card/Card'
import Message from '../Message/Message'
import {shoppingCartContext} from '../App'
import getDB from '../services/DbService'


// Fake DB

 
const HomeShop = (props) => {
    
    const [DB, updateDB] = useState(["Loading"])

    const DBfetch = async () => {

        let x = await getDB()
        if (x === undefined) { x = []}
        else {
        updateDB(await getDB())
    }
   }

    let cardCount = props.reset

    const shopList = useContext(shoppingCartContext)
   
    useEffect(( ) => {   
            
     DBfetch()
 
       }, [])

    return (
        
        <div >
        <p className="centered shop-title" > {props.title} </p>
           
          

             <div className="shopDiv">
            {     

              

                DB.map(data => {
                     
                    if (DB[0] === "Loading") { return <Message key = "loadingmsg" message={"Cargando..."}/>}

                    else if (props.search !== '') {
                        
                        if (data.name.toLowerCase().startsWith(props.search.toLowerCase())) {
                           
                           if (data.onSale  === props.target || data.type === props.target )  { 
                            let cantidad = 0
                            cardCount++
                            return <Card 
                                key = {data._id}
                                productId = {data._id}
                                name = {data.name}
                                picture = {data.picture}
                                price = {data.price}
                                desc = {data.desc}
                                stock = {data.stock}

                                {...shopList.state2.shoppingList.map(Qdata => {

                                    if (Qdata.productId === data._id) {
                                        cantidad = Qdata.cantidad
                                        return null
                                    
                                    
                                    } else return null
                                    })}

                                    cantidad = {cantidad}
                                
                                
                                
                            />
                        }   else return null
                        }   else return null


                    } 
                   

              
                    else { 
                        if (data.onSale  === props.target || data.type === props.target )  { 
                            cardCount++
                            let cantidad = 0
                        return <Card 
                        key = {data._id}
                        productId = {data._id}
                        name = {data.name}
                        picture = {data.picture}
                        price = {data.price}
                        desc = {data.desc}
                        stock = {data.stock}

                        

                        {...shopList.state2.shoppingList.map(Qdata => {

                            if (Qdata.productId === data._id) {
                                cantidad = Qdata.cantidad
                                return null
                              
                               
                            } else return null
                        })}

                        cantidad = {cantidad}

                        

                        
                        
                        />
                    }
                    else return null
                }})
                
                
              
               
                
                }

                {   cardCount  === 0 && DB[0] != "Loading" ? <Message message={"Lo sentimos. No hemos encontrado productos con ese nombre."}/> : null } 
                


            </div>
        </div>
    )
}

export default HomeShop