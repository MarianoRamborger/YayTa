import React , {useState, useEffect} from 'react';
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
// import {AuthUser} from "./services/Authservice"


export const AuthContext = React.createContext()

const initialState = { isAuthenticated: false, user: null };

export const shoppingCartContext = React.createContext();

const shoppingCartInitialState = { shoppingList : [], total : 0 , totalWeight: 0}

let r2d = (number) => {
 //rounds to two decimals. Oddly, sin redondear la calculadora de peso se rompe al bajar de 0.8 a 0.6
  

  return Math.round(number * 100) / 100
}

//Ojo que no es el hook si no la función.
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
         
      localStorage.setItem("JWT", action.JWT)
  
      // if (localStorage.getItem("Shopping Cart")) {localStorage.removeItem("Shopping Cart")}
      // OJO, TENERLO ACA IMPLICA QUE UNA VEZ TE LOGUEAS PERDES EL CARRITO PARA SIEMPRE. FALTARÍA METERLO
      // EL CONTENIDO EN EL USUARIO

        return {
                ...state, isAuthenticated: true, user: action.user
               }             
      }
    
  

    case "LOGOUT": {
      
      localStorage.removeItem("JWT") ; localStorage.removeItem("userName") ; localStorage.removeItem("Shopping Cart")
      return { ...state, isAuthenticated: false, user: null
      }}
      default: return state
  }

}


const shoppingCartReducer = (state2, action2) => {
  switch (action2.type) {

    case "ADD": 
    let newProduct = true;

    //Loops thru shopping cart, si está just adds +1 a ese producto.
    for (let index = 0; index < state2.shoppingList.length; index++) {
        if  (state2.shoppingList[index].productId === action2.info.productId) {
          //A new product es añadido.
          newProduct = false    
          state2.shoppingList[index].cantidad++  
          state2.total += action2.info.price
          state2.totalWeight += action2.info.weight
        
      }}
        if (newProduct === false) {
          //Follow up: Si un product existente recibió +1, return rest of the state.
        return {
          ...state2
        }}

        //Si truly era un nuevo producto tho, añadilo.
    if (newProduct === true) { 
      state2.total += action2.info.price;  
      state2.totalWeight += action2.info.weight;
        return  {shoppingList : state2.shoppingList.push(action2.info),  ...state2 }
      } //Tomá nota de lo que solía ser este bug: array.push mete el nuevo elemento al final, y devuelve el length del array. Si devolvías el ...state2 antes,  te quedabas, en vez de con el array, con el length. Por eso se devuelve después.

     break

    case "PLUSONE": 

    //Loops thru cart, finds matching product, adds one en cantidad.
    for (let index = 0; index < state2.shoppingList.length; index++) {
     
      if (state2.shoppingList[index].productId === action2.info.productId) {
    
        state2.shoppingList[index].cantidad++
        state2.total += action2.info.price
        state2.totalWeight += action2.info.weight;
      }}
      return { ...state2}


    case "TARGETNUMBER":
   // Same logic as add, first checks if product already exists.

      let newProduct2 = true;
      for (let index = 0; index < state2.shoppingList.length; index++) {
        if  (state2.shoppingList[index].productId === action2.info.productId) {
          //if it does
          newProduct2 = false    
          let removePrice = state2.shoppingList[index].price * state2.shoppingList[index].cantidad
          let removeWeight = state2.shoppingList[index].weight * state2.shoppingList[index].cantidad
          state2.total -= removePrice
          state2.totalWeight -= removeWeight

          // Calculates and removes the price and weight of the product currenly on the card.
          if (action2.info.cantidad ===  0) {
              //Si es zero, deletes it altogether.
            state2.shoppingList.splice([index], 1)

          } else {
            // if not, it replaces it with the new target number.
          state2.shoppingList[index].cantidad = action2.info.cantidad   
          state2.total += action2.info.price * action2.info.cantidad
          state2.totalWeight += action2.info.weight * action2.info.cantidad
        }
          
        }}
        if (newProduct2 === false) {
          //And then returns the state.
        return {
          ...state2

        }}
        
        if (newProduct2 === true && action2.info.cantidad === 0 )  {
          // Else if its a new product, and the quantity is 0, do nothing.
          return {...state2}      
        }

      if (newProduct2 === true  )  {
        if (state2.info === undefined) { return null}

         // Pero si el producto es indeed new, it adds it with a quantity equal to the number.
         state2.total += action2.info.cantidad * action2.info.price 
         state2.totalWeight += action2.info.cantidad * action2.info.weight
         
      return  {shoppingList : state2.shoppingList.push(action2.info),  ...state2 }} 
  

       break
 
      case "REMOVE":
 
      // Iterates thru cart, if matching id, remove it.
        for (let index = 0; index < state2.shoppingList.length; index++) {
          if (state2.shoppingList[index].productId === action2.info.productId) {
    
            let removePrice = state2.shoppingList[index].price * state2.shoppingList[index].cantidad
            let removeWeight = state2.shoppingList[index].weight * state2.shoppingList[index].cantidad
            state2.total -= removePrice
            state2.totalWeight -= removeWeight
            state2.shoppingList.splice([index], 1)
          }}
        
        return { ...state2}

      case "MINUSONE":
        //iterates thru cart
        for (let index = 0; index < state2.shoppingList.length; index++) {
          if (state2.shoppingList[index].productId === action2.info.productId) {

            //should quantity become 0, clipeala.
            if (state2.shoppingList[index].cantidad === 1) { state2.shoppingList.splice([index], 1); 
              console.log(`Se le restará ${action2.info.weight} a ${state2.totalWeight}`)
              console.log(0.20000000000000007 -0.2)
              state2.total -= action2.info.price ; state2.totalWeight =  r2d(state2.totalWeight - action2.info.weight)}


            else {state2.shoppingList[index].cantidad-- 
              console.log(`Se le restará ${action2.info.weight} a ${state2.totalWeight}`) 
              state2.total -= action2.info.price ; state2.totalWeight =  r2d(state2.totalWeight - action2.info.weight) }
              //POSSIBLY AGREGAR r2d in this fashion al resto
          }}
          return { ...state2}

      case "LOAD": 
        state2.shoppingList = action2.loadedShoppingList
        console.log(state2.shoppingList)
        let pricetotal = 0
        for (let index = 0; index < state2.shoppingList.length; index++) {
           pricetotal += state2.shoppingList[index].price * state2.shoppingList[index].cantidad 
        }
        state2.total = pricetotal

        return {...state2}

      case "EMPTY": {
          state2.shoppingList = []
          state2.total = 0
          return {...state2}
      }

      case "TEST": {
          console.log("TEST")
          break
      }


   
    
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

  // const cartContext = useContext(shoppingCartContext)

  useEffect(( ) => {

    //CAREFUL. SIEMPRE SIEMPRE EN LOGIN, DEBE BORRARSE EL LOCALSTORAGE DEL CARRITO Y PASARLO AL CARRITO DEL USER.
      //ALSO CAREFUL, PARA HACER ESTO PROPERLY DEBERIA COMPROBAR QUE EN LA DB ESTÉN LOS OBJETOS CON LA ID Y STOCK POSITIVO
       // PARA EVITAR QUE ALGUIEN SE LOGUEE MIL AÑOS DESPUÉS EN UNA PC QUE TENGA EN EL LOCAL STORAGE UNA PRENDA QUE YA SE ACABÓ 
    if ( localStorage.getItem("Shopping Cart") !== null ) {
        dispatch2({
        type: "LOAD",
        loadedShoppingList: JSON.parse(localStorage.getItem("Shopping Cart"))
      })
      
    }
    else { console.log( "no hay carrito")}
    
  }, [])


  // ELIMINATE THIS CONSOLE.LOG
  // const saveme = () => {
  //   console.log(state2.shoppingList)
  // }



  useEffect(( ) => { //El que guarda el carrito en el state.
   // if (!state.isAuthenticated) {
      localStorage.setItem("Shopping Cart", JSON.stringify(state2.shoppingList))
   // }
    }, [state, state2])
    //Cada vez que alguien se loguee/desloguee o el carrito cambie, shoot this.

  return (
    
    
    <AuthContext.Provider
    value = {{ state, dispatch } /*El default, switch corre hasta return state */}
    > 

    <shoppingCartContext.Provider 
    value = {{state2, dispatch2}}
   >
    

      <Router >
           <Header handleSearchBarState={handleSearchBarState}  clearSearchBar={handleCleanSearchBar}  />
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
