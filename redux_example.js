 // with multiple reducer
 let redux = require("redux")
 
 
 // "action" is a object with property of type with other properties and "action-creator" is the function that returns the object ( action ) . imagine action as customer of our cake shop

  let ORDERED_CAKE = "ORDERED_CAKE";
  let RESTOCK_CAKE = "RESTOCK_CAKE";
  let ORDERED_ICECREAM = "ORDERED_ICECREAM";
  let RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

  // defining actions
  let orderCake = () => {
    return {
      type: ORDERED_CAKE,
      quantity: 1
    }
  }
  
  let stockCake = (qty=1) =>{
    return{
      type : RESTOCK_CAKE ,
      payload : qty
    }
  }
 
  let orderIcecream = (qty=1)=>{
    return{
      type : ORDERED_ICECREAM ,
      payload : qty
    }
  }
  
  let stockIcecream = (qty=1)=>{
    return{
      type : RESTOCK_ICECREAM ,
      payload : qty
    }
  }


  // Initial state of a component represent as an object
  let initialCakeState = {
    numOfCake: 10 
  }
  let initialIcecreamState = {
    numOfIcecream: 20 
  }
  
  // defining reducer
  //reducer = ( initialState , action ) => newState
  
  // reducer is a pure function that takes state and action then returns updated state . imagine reducer as a shopkeeper who get the cake or reduce it . shopkker can be multiple .
  
  //we could have other properties in our state so it is necessary to first create a copy of that state before returning then return the updated state 
  
  let cakeReducer = ( state = initialCakeState , action )=>{
    switch(action.type){
      case ORDERED_CAKE : return { ...state ,
        numOfCake : state.numOfCake - 1
      }
      case RESTOCK_CAKE: return {
        ...state , 
        numOfCake : state.numOfCake + action.payload
      }
      default : return state
    }
  }
  
  
  let icecreamReducer = ( state = initialIcecreamState , action )=>{
    switch(action.type){
      case ORDERED_ICECREAM : return { ...state ,
        numOfIcecream : state.numOfIcecream - action.payload
      }
      case RESTOCK_ICECREAM: return {
        ...state , 
        numOfIcecream : state.numOfIcecream + action.payload
      } 
      // buy cake get icecream free
      case ORDERED_CAKE : return {
        ...state ,
        numOfIcecream : state.numOfIcecream - 1 
      }
      default : return state
    }
  }
  
  
  // defining store
  let rootReducers = redux.combineReducers({cake : cakeReducer ,
      icecream : icecreamReducer
  })
  
  let store = redux.createStore(rootReducers)
  
  console.log("initialstate",store.getState())
  
  
 let unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
  })
  //subscribe method returns unsubscribe method
  
  store.dispatch(orderCake())
  store.dispatch(stockCake(10))
  store.dispatch(stockIcecream(10))
  
  //no action will be exicuted after unsubscribe invoted . so put it at last
   //unsubscribe()

  // in redux  we invote a action in dispatch  function, what we pass as agrument in that action function called payload . the name could be anything but we call it payload .
  
  //  UI => ACTION => REDUCER => REDUX_STORE => UI
  
  // compelete circle of redux app
  
  //more 
  
  //bindActionCreators . first arguments are actions ,second argument is what to bind to .
  /*
  let actions = redux.bindActionCreators({orderCake,stockCake},store.dispatch)
   actions.stockCake(2)
*/
