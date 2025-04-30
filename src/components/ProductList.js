import React from 'react';
import { useFilterContext } from '../context/Filter_Context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
    const {filter_products,grid_view} = useFilterContext();

    if(grid_view === true)
    {
        return < GridView products={filter_products}/>
    }

    if(grid_view === false)
    {
        return <ListView products={filter_products}/>
    }
}

export default ProductList

/*
Absolutely! Let's break down this ProductList component line by line so you understand exactly what it's doing and how it fits into your app 👇

🔍 Code:
js
Copy
Edit
import React from 'react';
import { useFilterContext } from '../context/Filter_Context';
import GridView from './GridView';
import ListView from './ListView';
✅ What's happening here?
You're importing React (needed for JSX).

You're importing your custom Filter Context hook, useFilterContext, so you can access the global filter state.

You also import two components:

GridView: displays products in a grid format (like cards).

ListView: displays products in a vertical list format (like rows).

js
Copy
Edit
const ProductList = () => {
✅ Defining the component
This component will decide how to show the filtered products based on the user's chosen view type (grid or list).

js
Copy
Edit
    const { filter_products, grid_view } = useFilterContext();
✅ Accessing context
You're getting two values from FilterContext:

filter_products: This is the list of products after filters and sorting have been applied.

grid_view: A boolean that tells whether the user selected grid view (true) or list view (false).

These values come from your filterReducer state.

js
Copy
Edit
    if (grid_view === true) {
        return <GridView products={filter_products} />;
    }

    if (grid_view === false) {
        return <ListView products={filter_products} />;
    }
✅ Conditional rendering
If grid_view is true, render the <GridView /> component, passing it the filtered products.

If grid_view is false, render <ListView /> instead.

Each view component will loop through the products and display them in its own style/layout.

js
Copy
Edit
export default ProductList;
✅ Exporting the component
This allows you to use <ProductList /> in any other part of your app (like a product page).

🔄 Where This Fits In Your App:
jsx
Copy
Edit
<FilterContextProvider>
  <App />
</FilterContextProvider>
Somewhere inside your App, you're probably rendering a page with:

jsx
Copy
Edit
<Filters />
<ProductList />
So this ProductList is part of the main content area. It automatically reacts to filter changes, thanks to the FilterContext.

🧠 Real-Life Analogy
Imagine you're shopping on Amazon.

You select "grid view" to see items as cards in rows.

Or switch to "list view" to see big product images and more details.

ProductList is like the logic that checks "How does the user want to see the products?" and then shows them accordingly — by calling either GridView or ListView.

 */