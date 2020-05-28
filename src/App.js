import React , {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
// import Axios from "axios";
// import JSRSASign from "jsrsasign";


import './App.css';
import Header from './Header/Header.js'
import Footer from './Footer/Footer.js'
import LinkBar from './Header/LinkBar.js'

import Shop from './Shop/Shop'


//https://www.freecodecamp.org/news/state-management-with-react-hooks/


export const AuthContext = React.createContext()

const initialState = { isAuthenticated: false, user: null, token: null };

export const shoppingCartContext = React.createContext();

const shoppingCartInitialState = { shoppingList : [], total : 0 }


//Ojo que no es el hook si no la función.
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("user", JSON.stringify(action.payload.user)); localStorage.setItem("token", JSON.stringify(action.payload.token));   
      return {
        ...state, isAuthenticated: true, user: action.payload.user, token: action.payload.token
      }}
    
    case "LOGOUT": {
      localStorage.clear()
      return { ...state, isAuthenticated: false, user: null, token: null
      }}
      default: return state
  }
}



const shoppingCartReducer = (state2, action2) => {
  switch (action2.type) {

    case "ADD": 
    let newProduct = true;
    for (let index = 0; index < state2.shoppingList.length; index++) {
      if  (state2.shoppingList[index].productId === action2.info.productId) {
        newProduct = false    
        state2.shoppingList[index].cantidad++  
        state2.total += action2.info.price
        
      }}
      if (newProduct === false) {
      return {
        ...state2
      }}
    if (newProduct === true) { state2.total += action2.info.price  
    return  {shoppingList : state2.shoppingList.push(action2.info),  ...state2 }} //Tomá nota de lo que solía ser este bug: array.push mete el nuevo elemento al final, y devuelve el length del array. Si devolvías el ...state2 antes,  te quedabas, en vez de con el array, con el length. Por eso se devuelve después.

     break

    case "PLUSONE": 

    for (let index = 0; index < state2.shoppingList.length; index++) {
     
      if (state2.shoppingList[index].productId === action2.info.productId) {
    
        state2.shoppingList[index].cantidad++
        state2.total += action2.info.price
      }}
      return { ...state2}


    case "TARGETNUMBER":

      let newProduct2 = true;
      for (let index = 0; index < state2.shoppingList.length; index++) {
        if  (state2.shoppingList[index].productId === action2.info.productId) {
          newProduct2 = false    
          let removePrice = state2.shoppingList[index].price * state2.shoppingList[index].cantidad
          state2.total -= removePrice

          console.log(action2.info.cantidad)
          if (action2.info.cantidad ===  0) {
            console.log("2www")
            state2.shoppingList.splice([index], 1)

          } else {
          state2.shoppingList[index].cantidad = action2.info.cantidad   
          state2.total += action2.info.price * action2.info.cantidad
        }
          
        }}
        if (newProduct2 === false) {
        return {
          ...state2

        }}
        
        if (newProduct2 === true && action2.info.cantidad === 0 )  {
          return {...state2}
        }

      if (newProduct2 === true  )  {
        if (state2.info === undefined) {console.log("ooopse")}
         state2.total += action2.info.cantidad * action2.info.price  
      return  {shoppingList : state2.shoppingList.push(action2.info),  ...state2 }} 
  

       break


      
      case "REMOVE":

        for (let index = 0; index < state2.shoppingList.length; index++) {
          if (state2.shoppingList[index].productId === action2.info.productId) {
    
            let removePrice = state2.shoppingList[index].price * state2.shoppingList[index].cantidad
            state2.total -= removePrice
            state2.shoppingList.splice([index], 1)
          }}
        
        return { ...state2}

      case "MINUSONE":
        for (let index = 0; index < state2.shoppingList.length; index++) {
          if (state2.shoppingList[index].productId === action2.info.productId) {
            if (state2.shoppingList[index].cantidad === 1) { state2.shoppingList.splice([index], 1); state2.total -= action2.info.price }
            else {state2.shoppingList[index].cantidad-- ; state2.total -= action2.info.price }
          }}
          return { ...state2}

        
   
      
       

    default: console.log("default")
    return {...state2}
  }}




//El hook propiamente dicho. Devuelve el estado, y dispatch. Dispatch es la función para llamar a las acciones en el reductor.

const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  //Acá iria el reducer del shopping Cart

  const [state2, dispatch2] = React.useReducer(shoppingCartReducer, shoppingCartInitialState )

  const [searchBarState, changeSearchBarState] = useState("")

  const handleSearchBarState = (event) => {
    changeSearchBarState(event.target.value)
  }

  const handleCleanSearchBar = () => {
    changeSearchBarState("")
    let searchBar = document.getElementById("searchBarInput")
    searchBar.value = ""
  }
 
  return (
    
    
    <AuthContext.Provider
    value = {{ state, dispatch } /*El default, switch corre hasta return state */}
    
    > 

    <shoppingCartContext.Provider 
    value = {{state2, dispatch2}}
    >
    

      <Router>
           <Header handleSearchBarState={handleSearchBarState}  clearSearchBar={handleCleanSearchBar}/>
           <LinkBar />
           
        <Switch>

    
          <Route exact path="/">
            <Shop  title={"Ofertas"} target={true} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Pantalones/Jeans">
            <Shop  title={"Jeans"} target={"Jean"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Pantalones/Bengalinas">
            <Shop  title={"Bengalinas"} target={"Bengalina"} search={searchBarState} reset={0}/>
          </Route>
        
          <Route path="/Joggings/Calzas">
            <Shop title={"Calzas"} target={"Calza"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Joggings/Calzas-Frizadas">
            <Shop title={"Calzas Frizadas"} target={"Calza-Frizada"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Camperas/Jean">
            <Shop title={"Camperas de Jean"} target={"Campera-Jean"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Camperas/Jogging">
            <Shop title={"Camperas deportivas"} target={"Campera-Jogging"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Remeras/Personajes">
            <Shop title={"Remeras de Personaje"} target={"Remera-Personaje"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Remeras/Todo">
            <Shop title={"Remeras"} target={"Remera-Personaje"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Sweaters">
            <Shop title={"Sweaters"} target={"Sweater"} search={searchBarState} reset={0}/>
          </Route>
               
          <Route path="/Camisetas">
            <Shop title={"Camisetas"} target={"Camiseta"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Cinturones">
            <Shop title={"Cinturones"} target={"Cinturon"} search={searchBarState} reset={0}/>
          </Route>
          
          <Route path="/Medias">
            <Shop title={"Medias"} target={"Media"} search={searchBarState} reset={0}/>
          </Route>

          <Route path="/Accesorios">
            <Shop title={"Accesorios"} target={"Accesorios"} search={searchBarState} reset={0}/>
          </Route>






          <Route path="*">
            <h2> 404 NOT FOUND  </h2>
          </Route>

        </Switch>

         <Footer />

      </Router>


      </shoppingCartContext.Provider> 

     </AuthContext.Provider>
  );
}

export default App;
