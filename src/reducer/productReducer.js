const productReducer = (state,action) => {
    switch(action.type)
    {
        case "SET_LOADING":
            return{
                ...state,
                isLoading:true,
            }
        
        case "SET_API_DATA":
            const featureData=action.payload.filter((curElem)=>{
                return curElem.featured === true;
            });
            
        return{
            ...state,
            isLoading:false,
            products:action.payload,
            featureProducts:featureData,
             
        };
        
        case "API_ERROR":
            return{
                ...state,
                isLoading:false,
                isError:true,
            }
        
        
        case "SET_SINGLE_LOADING":
                return{
                    ...state,
                    isSingleLoading:true,
                }
        case "SET_SINGLE_PRODUCT":
            return{
                ...state,
                isSingleLoading:false,
                singleProduct:action.payload,
            };

        case "SET_SINGLE_ERROR":
                return{
                    ...state,
                    isSingleLoading:false,
                    isError:true,
                }
        
        
        
        default:
            return state;
            
    }
}

export default productReducer


// You're working with React Context API and useReducer to create a centralized state management system for product-related data in a React app. Let’s break it down piece by piece in a simple and detailed way so you understand how it all fits together.

// 🔷 Purpose of the Code
// You are:

// Fetching product data from an API

// Storing it in a central context

// Managing loading and error states

// Filtering and storing featured products

// Making the state available to other components using useContext

// 🔁 1. productReducer.js – Reducer Function
// This file contains a reducer function used by the useReducer hook to handle state changes.

// What is a Reducer? A reducer is a function that takes in the current state and an action, and returns a new state based on the action type.

// js
// Copy
// Edit
// const productReducer = (state,action) => {
//     switch(action.type)
//     {
//         case "SET_LOADING":
//             return {
//                 ...state,
//                 isLoading: true,
//             };
// 🔹 When we start fetching data, we set isLoading to true.

// js
// Copy
// Edit
//         case "SET_API_DATA":
//             const featureData = action.payload.filter((curElem) => {
//                 return curElem.featured === true;
//             });

//             return {
//                 ...state,
//                 isLoading: false,
//                 products: action.payload,
//                 featureProducts: featureData,
//             };
// 🔹 When API data is successfully fetched:

// Turn off loading.

// Store all products.

// Filter products with featured: true and store them separately.

// js
// Copy
// Edit
//         case "API_ERROR":
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//             };
// 🔹 If API call fails, turn off loading and set error flag.

// js
// Copy
// Edit
//         default:
//             return state;
//     }
// };
// 🔹 If action type doesn't match, return current state.

// 🌐 2. AppProvider – Context Provider
// This is the central provider that wraps your application and provides access to product data and state.

// js
// Copy
// Edit
// const AppContext = createContext();
// 🔹 Create a new context.

// js
// Copy
// Edit
// const API="https://api.pujakaitem.com/api/products";
// 🔹 API endpoint to fetch products.

// js
// Copy
// Edit
// const initialState = {
//   isLoading: false,
//   isError: false,
//   products: [],
//   featureProducts: [],
// };
// 🔹 Initial state for the reducer.

// 🔨 The Main Component:
// js
// Copy
// Edit
// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
// 🔹 useReducer is used instead of useState for more complex logic.

// 🔌 The API Call:
// js
// Copy
// Edit
//   const getProducts = async (url) => {
//     dispatch({ type: "SET_LOADING" });

//     try {
//       const res = await axios.get(url);
//       const products = await res.data;
//       dispatch({ type: "SET_API_DATA", payload: products });
//     } catch (error) {
//       dispatch({ type: "API_ERROR" });
//     }
//   };
// 🔹 When component mounts:

// Set loading state

// Try to fetch products

// On success: store them and filter featured

// On failure: set error

// ⚡ useEffect Hook:
// js
// Copy
// Edit
//   useEffect(() => {
//     getProducts(API);
//   }, []);
// 🔹 This runs only once (on first render), and calls the getProducts function to fetch data.

// 🧠 Context Provider:
// js
// Copy
// Edit
//   return (
//     <AppContext.Provider value={{ ...state }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
// 🔹 Makes the entire state available to any component that uses the context.

// 🔁 Custom Hook:
// js
// Copy
// Edit
// const useProductContext = () => {
//   return useContext(AppContext);
// };
// 🔹 A cleaner way to use the context in your components.

// ✅ How It All Works Together
// AppProvider wraps your app and provides context.

// On mount, it fetches products from API.

// useReducer updates state based on the response:

// Sets loading

// Sets products

// Sets featured products

// Handles errors

// Other components can use useProductContext() to access:

// products

// isLoading

// isError

// featureProducts

// 🔄 Example of Usage
// In another component:

// js
// Copy
// Edit
// import { useProductContext } from "../context/productContext";

// const ProductList = () => {
//   const { products, isLoading, isError } = useProductContext();

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading products!</p>;

//   return (
//     <ul>
//       {products.map(product => (
//         <li key={product.id}>{product.name}</li>
//       ))}
//     </ul>
//   );
// };

