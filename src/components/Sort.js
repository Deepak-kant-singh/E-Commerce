import React from "react";
import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useFilterContext } from "../context/Filter_Context";

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } =
    useFilterContext();
  return (
    <Wrapper className="sort-section">
      {/* 1st column  */}
      <div className="sorting-list--grid">
        <button
          className={grid_view ? "active sort-btn" : "sort-btn"}
          onClick={setGridView}>
          <BsFillGridFill className="icon" />
        </button>

        <button
          className={!grid_view ? "active sort-btn" : " sort-btn"}
          onClick={setListView}>
          <BsList className="icon" />
        </button>
      </div>
      {/* 2nd column  */}
      <div className="product-data">
        <p>{`${filter_products.length} Product Available`}</p>
      </div>

      {/* 3rd column  */}
      <div className="sort-selection">
        <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            onChange={sorting}>
            <option value="lowest">Price(lowest)</option>
            <option value="#" disabled></option>
            <option value="highest">Price(highest)</option>
            <option value="#" disabled></option>
            <option value="a-z">Price(a-z)</option>
            <option value="#" disabled></option>
            <option value="z-a">Price(z-a)</option>
          </select>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;


/*✅ Purpose of this Component: Sort
This component allows the user to:

Switch between Grid and List view

See how many products are available

Choose how to sort products (by price or name)

### 🔁 Step-by-Step Explanation:
```js
import React from "react"; import styled from "styled-components"; import { BsFillGridFill, BsList } from "react-icons/bs"; import { useFilterContext } from "../context/Filter_Context";

markdown
Copy
Edit

- You're importing `React` to use JSX.
- `styled-components`: For writing CSS directly in JS (CSS-in-JS).
- `BsFillGridFill` & `BsList`: Icons for grid and list view from `react-icons`.
- `useFilterContext`: Custom hook to access global filter state.

---

### ```js
const { filter_products, grid_view, setGridView, setListView, sorting } = useFilterContext();
You're pulling these values from the context:

filter_products: The filtered product list

grid_view: A true/false flag — whether grid view is active

setGridView: Function to switch to grid view

setListView: Function to switch to list view

sorting: Function to change sorting option (like lowest to highest)

🧩 JSX Layout Explained
```js
<Wrapper className="sort-section"> ```
You're wrapping the whole UI in a styled component named Wrapper which contains 3 main sections.

✅ 1st Column: View Switch Buttons
js
Copy
Edit
<div className="sorting-list--grid">
  <button className={grid_view ? "active sort-btn" : "sort-btn"} onClick={setGridView}>
    <BsFillGridFill className="icon" />
  </button>

  <button className={!grid_view ? "active sort-btn" : " sort-btn"} onClick={setListView}>
    <BsList className="icon" />
  </button>
</div>
Two buttons:

Grid icon button switches to grid view

List icon button switches to list view

className={grid_view ? "active sort-btn" : "sort-btn"}:

Adds an "active" class if grid view is active (for styling).

✅ 2nd Column: Product Count
js
Copy
Edit
<div className="product-data">
  <p>{`${filter_products.length} Product Available`}</p>
</div>
This shows how many products are currently available after filtering.

✅ 3rd Column: Sorting Dropdown
js
Copy
Edit
<div className="sort-selection">
  <form action="#">
    <label htmlFor="sort"></label>
    <select name="sort" id="sort" className="sort-selection--style" onClick={sorting}>
      <option value="lowest">Price(lowest)</option>
      <option value="#" disabled></option>
      <option value="highest">Price(highest)</option>
      <option value="#" disabled></option>
      <option value="a-z">Price(a-z)</option>
      <option value="#" disabled></option>
      <option value="z-a">Price(z-a)</option>
    </select>
  </form>
</div>
A <select> dropdown lets users choose how to sort products:

Lowest price, highest price, alphabetical order, etc.

onClick={sorting} triggers the context’s sorting function when the dropdown is clicked.

🧑‍🎨 CSS using styled-components
You style everything with:

js
Copy
Edit
const Wrapper = styled.section`
Key parts:

.sorting-list--grid: Flex layout with gap between buttons

.sort-btn: Styles for view switch buttons

.active: Styles for the active view button (black bg, white text)

.sort-selection: Styles for the dropdown and its options

This ensures the component looks nice and responsive.

✅ Summary:

Feature	How it works
Grid/List View	User clicks buttons → updates context → re-renders product view
Product Count	Shows how many products match current filters
Sort Products	Dropdown changes sort type → updates state → list is re-sorted */
