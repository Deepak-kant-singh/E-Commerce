import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color:"all",
    maxPrice:0,
    price:0,
    minPrice:0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // to set the list view
  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "company") {
      value = event.target.value;
    }

    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
  };


  // to clear filters
  const clearFilters=()=>{
    dispatch({type:"CLEAR_FILTERS"})
  }

  // to sort the product
  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORTING_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  // to load all the products for grid and list view
  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

/*Your filterReducer is a pure function that takes in the current state and an action, and returns a new state based on the action type. It’s used with React’s useReducer to manage complex state logic, especially for:

Filtering products

Sorting products

Switching between grid and list views

🧠 What does ...state mean?
js
Copy
Edit
return { 
  ...state,
  something: newValue
}
The ...state is called the spread operator. It copies all the current properties of the state object into the new object, so you don’t lose anything unintentionally.

✅ Example: If state = { a: 1, b: 2 }, then:

js
Copy
Edit
{ ...state, b: 3 }
→ becomes { a: 1, b: 3 }
So, you're always keeping the whole state intact, and only changing the part you care about in each action.

✅ case "LOAD_FILTER_PRODUCTS":
js
Copy
Edit
return {
  ...state,
  filter_products: [...action.payload],
  all_products: [...action.payload],
};
📌 What it does:

Loads the product data from the API (via context) into two arrays:

all_products: original copy (used as reference for filtering)

filter_products: active display list that gets filtered/sorted

🎯 Affects: Initial load of product list in UI.

✅ case "SET_GRID_VIEW":
js
Copy
Edit
return {
  ...state,
  grid_view: true,
};
📌 What it does:

Tells the app to use grid layout for product display.

🎯 Affects: Product display layout on the UI.

✅ case "SET_LIST_VIEW":
js
Copy
Edit
return {
  ...state,
  grid_view: false,
};
📌 What it does:

Tells the app to switch to list layout.

🎯 Affects: UI layout toggle (list/grid)

✅ case "GET_SORT_VALUE":
js
Copy
Edit
return {
  ...state,
  sorting_value: action.payload,
};
📌 What it does:

Stores the user's selected sorting option (e.g. lowest, highest, a-z, z-a).

🎯 Affects: What value is used in the next sorting step.

✅ case "SORTING_PRODUCTS":
js
Copy
Edit
const { filter_products, sorting_value } = state;
let tempSortProduct = [...filter_products];
📌 What it does:

Sorts the filtered list based on sorting_value.

js
Copy
Edit
const sortingProducts = (a, b) => {
  if (sorting_value === "lowest") return a.price - b.price;
  if (sorting_value === "highest") return b.price - a.price;
  if (sorting_value === "a-z") return a.name.localeCompare(b.name);
  if (sorting_value === "z-a") return b.name.localeCompare(a.name);
};
📌 How sorting happens:

lowest: sorts by price ascending

highest: price descending

a-z: name ascending

z-a: name descending

js
Copy
Edit
newSortData = tempSortProduct.sort(sortingProducts);
Performs the actual sorting

js
Copy
Edit
return {
  ...state,
  filter_products: newSortData,
};
🎯 Affects: The displayed order of products

✅ case "UPDATE_FILTERS_VALUE":
js
Copy
Edit
const { name, value } = action.payload;
return {
  ...state,
  filters: {
    ...state.filters,
    [name]: value,
  },
};
📌 What it does:

Updates a specific filter field in the state (e.g. text, company, category)

🎯 Affects: Internal state of your active filters (not visible to user directly, but triggers re-filtering)

✅ case "FILTER_PRODUCTS":
js
Copy
Edit
let { all_products } = state;
let tempFilterProduct = [...all_products];
const { text, category, company } = state.filters;
📌 What it does:

Takes the full list and filters it step-by-step based on user inputs.

💬 Text filter:
js
Copy
Edit
if (text) {
  tempFilterProduct = tempFilterProduct.filter((curElem) => {
    return curElem.name.toLowerCase().includes(text);
  });
}
📂 Category filter:
js
Copy
Edit
if (category) {
  tempFilterProduct = tempFilterProduct.filter((curElem) => {
    return curElem.category === category;
  });
}
🏢 Company filter:
js
Copy
Edit
if (company !== "all") {
  tempFilterProduct = tempFilterProduct.filter(
    (c) => c.company === company
  );
}
Finally:

js
Copy
Edit
return {
  ...state,
  filter_products: tempFilterProduct,
};
🎯 Affects: Filters out items that don’t match current user-selected filters and updates UI.

✅ default: (Fallback)
js
Copy
Edit
return state;
If no case matches, return the current state unchanged.

🧩 Summary of What It Affects in App:

Action Type	What It Changes	Affects on UI
LOAD_FILTER_PRODUCTS	Initial product data	Grid/List shows loaded products
SET_GRID_VIEW	grid_view = true	Shows products in grid style
SET_LIST_VIEW	grid_view = false	Shows products in list style
GET_SORT_VALUE	Sets selected sort type	Triggers sorting effect
SORTING_PRODUCTS	Orders products based on sort	Updates order of products in list/grid
UPDATE_FILTERS_VALUE	Updates the filters object	Used to later filter the product list
FILTER_PRODUCTS	Applies all active filters	Filters displayed products in real-time */