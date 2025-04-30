const filterReducer = (state, action) => {
  switch (action.type) {
    
    case "LOAD_FILTER_PRODUCTS":
      let priceArr = action.payload.map((curElem) => curElem.price);
      let maxPrice=Math.max(...priceArr);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters:{...state.filters,maxPrice,price:maxPrice},
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, company,color,price } = state.filters;

      if (text!="") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      if (category!=="all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        });
      }

      // if (company) {
      //   tempFilterProduct = tempFilterProduct.filter((curElem) => {
      //     return curElem.company === company;
      //   });
      // }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (c) => c.company === company
        );
      }
      
      if(color!=="all")
      {
        tempFilterProduct=tempFilterProduct.filter((curElem)=>
        curElem.colors.includes(color))
      }

      if(price)
      {
        tempFilterProduct=tempFilterProduct.filter(
          (curElem)=>curElem.price<=price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

      case "CLEAR_FILTERS":
        return{
          ...state,
          filters:{
            ...state.filters,
            text:"",
            category:"all",
            company: "all",
            color:"all",
            maxPrice:0,
            price:state.filters.maxPrice,
            minPrice:state.filters.price,
          }
        }

    default:
      return state;
  }
};

export default filterReducer;


  /*-----------------------------------------------------------------------------------------------
  🔁 What’s the Flow?
Your flow has three major operations:

✅ Load all products initially.

🧹 Filter products based on user input.

↕️ Sort the filtered products.

✅ 1. LOAD_FILTER_PRODUCTS
javascript
Copy
Edit
useEffect(() => {
  dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
}, [products]);
This runs once when products are available or change.

It dispatches the action to load the products into your reducer.

This action usually sets:

all_products → full unfiltered list

filter_products → same as all_products initially (but used for filtering/sorting)

⚠️ You didn’t paste the LOAD_FILTER_PRODUCTS case, but based on convention, it stores the product data.

🧹 2. FILTER_PRODUCTS + UPDATE_FILTERS_VALUE
updateFilterValue function
javascript
Copy
Edit
const updateFilterValue = (event) => {
  let name = event.target.name;
  let value = event.target.value;

  dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } });
};
When the user types text or selects a filter (like category/company), this function is called.

It updates the corresponding value in your filters object in state.

Example: { name: "category", value: "electronics" }

FILTER_PRODUCTS action (in reducer)
javascript
Copy
Edit
let tempFilterProduct = [...all_products]; // start fresh

const { text, category, company } = state.filters;

if (text) {
  tempFilterProduct = tempFilterProduct.filter((curElem) =>
    curElem.name.toLowerCase().includes(text)
  );
}

if (category) {
  tempFilterProduct = tempFilterProduct.filter((curElem) =>
    curElem.category === category
  );
}

if (company !== "all") {
  tempFilterProduct = tempFilterProduct.filter(
    (c) => c.company === company
  );
}
Applies filtering based on text, category, and company fields from filters.

Then it updates filter_products:

javascript
Copy
Edit
return {
  ...state,
  filter_products: tempFilterProduct,
};
↕️ 3. SORTING_PRODUCTS + sorting
sorting function
javascript
Copy
Edit
const sorting = (event) => {
  let userValue = event.target.value;
  dispatch({ type: "GET_SORT_VALUE", payload: userValue });
};
This is triggered when the user selects a sort option (e.g., “lowest”, “highest”, “a-z”, “z-a”).

It updates sorting_value in state.

Again, GET_SORT_VALUE reducer case is not shown, but it likely updates sorting_value.

SORTING_PRODUCTS action (in reducer)
javascript
Copy
Edit
const { filter_products, sorting_value } = state;
let tempSortProduct = [...filter_products];

const sortingProducts = (a, b) => {
  if (sorting_value === "lowest") return a.price - b.price;
  if (sorting_value === "highest") return b.price - a.price;
  if (sorting_value === "a-z") return a.name.localeCompare(b.name);
  if (sorting_value === "z-a") return b.name.localeCompare(a.name);
};

newSortData = tempSortProduct.sort(sortingProducts);

return {
  ...state,
  filter_products: newSortData,
};
Sorts the already filtered products (filter_products) using a comparator function.

🔄 useEffect Hook
javascript
Copy
Edit
useEffect(() => {
  dispatch({ type: "FILTER_PRODUCTS" });
  dispatch({ type: "SORTING_PRODUCTS" });
}, [products, state.sorting_value, state.filters]);
This ensures filtering happens first, then sorting, whenever:

Products are fetched

Filters are changed

Sort option is changed

🎁 Putting It All Together:
Products are loaded → stored in all_products & filter_products.

When user selects filters → filters is updated → FILTER_PRODUCTS runs.

Then filtered results are sorted by SORTING_PRODUCTS.

The updated sorted and filtered list is stored in filter_products.

This filter_products is what you ultimately display on your product listing page. */


  /*🔁 filterReducer Overview
Your filterReducer is a pure function that takes in the current state and an action, and returns a new state based on the action type. It’s used with React’s useReducer to manage complex state logic, especially for:

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