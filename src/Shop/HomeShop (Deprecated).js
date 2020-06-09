import React from 'react'
import Card from './Card/Card'
import DB from './DB.json'
// Fake DB

 

    

const HomeShop = () => {
    return (
        <div>
        <h2 className="centered"> Ofertas </h2>

             <div className="shopDiv">
            {
                
                DB.map(data =>{

                    if (data.oferta === true) {
                
                    return <Card 
                    key = {data.id}
                    productId = {data.id}
                    title = {data.title}
                    picture = {data.picture}
                    price = {data.price}
                    desc = {data.desc}
                    
                />
                    }
                    else return null

                })
            
            }
            </div>
        </div>
    )
}

export default HomeShop