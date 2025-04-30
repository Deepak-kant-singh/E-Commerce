import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API="https://api.pujakaitem.com/api/products";

const initialState={
  isLoading:false,
  isError:false,
  products:[],
  featureProducts:[],
  isSingleLoading:false,
  singleProduct:{},

};


const AppProvider = ({ children }) => {

  const[state,dispatch]=useReducer(reducer,initialState);


  const getProducts= async(url)=>{
    dispatch({type:"SET_LOADING"})
      
    try {
      const res= await axios.get(url);
      const products=await res.data;
      dispatch({type:"SET_API_DATA",payload:products});
    } catch (error) {
      dispatch({type:"API_ERROR"})
      
    }
  };

  // my 2nd api call for single product
const getSingleProduct=async(url)=>{
  dispatch({type:"SET_SINGLE_LOADING"});
  try{
    const res = await axios.get(url);
    const singleProduct=await res.data;
    dispatch({type:"SET_SINGLE_PRODUCT",payload:singleProduct});

  }
  catch(error){
    dispatch({type:"SET_SINGLE_ERROR"});
  }
}


  useEffect(()=>{
    getProducts(API);
  },[]);
  return (
    <AppContext.Provider value={{ ...state,getSingleProduct}}>
      {children}
    </AppContext.Provider>
   );
};

// custom hooks
const useProductContext = () => {
  return useContext(AppContext);
//   <AppContext.Provider> makes the data available.

// useProductContext() allows other components to access that data easily.
};

export { AppProvider, AppContext, useProductContext };


/*
You're setting up a global state management system using React Context and useReducer to:

Fetch all products from an external API.

Filter and store featured products.

Fetch a single product when needed.

Make this state accessible to any component using a custom hook.

🔧 1. Context Setup
js
Copy
Edit
const AppContext = createContext();
You're creating a React context to hold and share your product-related data (state and functions) globally across components — without prop drilling.

🧱 2. Initial State
js
Copy
Edit
const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};
Defines the shape of your state for useReducer. You're tracking:

Loading/error states for API calls.

Fetched data for:

All products

Featured products

A single product

⚙️ 3. Reducer Function
(Imported from productReducer.js)
Handles dispatched actions like:

SET_LOADING: Show loading spinner while API call is in progress.

SET_API_DATA: Store fetched products & extract featured products.

SET_SINGLE_LOADING, SET_SINGLE_PRODUCT: Same idea for a single product.

🌐 4. API Calls
js
Copy
Edit
const getProducts = async (url) => { ... }
const getSingleProduct = async (url) => { ... }
You're making asynchronous HTTP requests using axios:

getProducts() hits the products API once on app load.

getSingleProduct() is exposed so other components can fetch single product data on demand (e.g., on product detail page).

Each one:

Dispatches a loading action

Makes the API call

Dispatches success or error actions with the data (or logs the error)

📦 5. AppProvider Component
js
Copy
Edit
<AppContext.Provider value={{ ...state, getSingleProduct }}>
  {children}
</AppContext.Provider>
Wraps your application with context.

Shares:

The entire state (via spread ...state)

The getSingleProduct() function (needed by product detail pages)

Runs getProducts() once at mount using useEffect() to populate product data immediately when the app starts.

🛠️ 6. Custom Hook for Cleaner Access
js
Copy
Edit
const useProductContext = () => useContext(AppContext);
A simple wrapper around useContext() — so in your components, you can write:

js
Copy
Edit
const { isLoading, products, getSingleProduct } = useProductContext();
Instead of importing and using useContext(AppContext) every time.

✅ Example Usage Flow
On app start:

getProducts() is called in useEffect

Products and featured products are stored via reducer

On product details page:

getSingleProduct(id) is called with dynamic URL

Response is stored in singleProduct

💡 Final Thoughts
This setup is:

Lightweight state management (no Redux needed)

Great for medium-sized apps

Centralized, reusable, and scalable

Easy to connect to any UI component via useProductContext()*/