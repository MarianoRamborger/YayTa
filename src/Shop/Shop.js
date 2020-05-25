import React , {useContext} from 'react'
import Card from './Card/Card'
import DB from './DB.json'
import Message from '../Message/Message'
import {shoppingCartContext} from '../App'

// Fake DB

 // METER ACA EL CHECK DE CONTEXTO DE LA APP PARA PODER PASAR LA CANTIDAD COMO PROPS A LA CARD
 


 
    
const HomeShop = (props) => {
    let cardCount = props.reset

    const shopList = useContext(shoppingCartContext)
   
    
    return (
        

        <div >
        <p className="centered shop-title" > {props.title} </p>

           
             <div className="shopDiv">
            {
                
                
                DB.map(data => {
                     

                    if (props.search !== '') {
                        
                        if (data.title.toLowerCase().startsWith(props.search.toLowerCase())) {
                           
                           if (data.oferta  === props.target || data.type === props.target )  { 
                            let cantidad = 0
                            cardCount++
                            return <Card 
                                key = {data.id}
                                productId = {data.id}
                                title = {data.title}
                                image = {data.image}
                                price = {data.price}
                                desc = {data.desc}
                                stock = {data.stock}

                                {...shopList.state2.shoppingList.map(Qdata => {

                                    if (Qdata.productId === data.id) {
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
                        if (data.oferta  === props.target || data.type === props.target )  { 
                            cardCount++
                            let cantidad = 0
                        return <Card 
                        key = {data.id}
                        productId = {data.id}
                        title = {data.title}
                        image = {data.image}
                        price = {data.price}
                        desc = {data.desc}
                        stock = {data.stock}

                        

                        {...shopList.state2.shoppingList.map(Qdata => {

                            if (Qdata.productId === data.id) {
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

                {   cardCount  === 0 ? <Message message={"Lo sentimos. No hemos encontrado productos con ese nombre."}/> : null } 
                


            </div>
        </div>
    )
}

export default HomeShop