import { NavLink } from "react-router-dom";
import FormatPrice from "../Helpers/FormatPrice";

const Product =(curElem)=>{
    const {id,name,image,price,category}=curElem;
    return(
        <NavLink to={`/singleProduct/${id}`}>
         <div className="card">
        <figure>
          <img src={image} alt={name} />
          <figcaption className="caption">{category}</figcaption>
        </figure>

        <div className="card-data">
          <div className="card-data-flex">
            <h3>{name}</h3>
            <p className="card-data--price">{<FormatPrice price={price}/>}</p>
          </div>
        </div>
      </div>

        </NavLink>
    )

}
export default Product;



// Product Component
// This component is used inside the FeatureProduct list.

// It represents a single product card that:

// Shows an image

// Shows the category name as a caption

// Shows product name and price

// Wraps everything in a clickable link

// 🔹 Props Received
// js
// Copy
// Edit
// const { id, name, image, price, category } = curElem;
// The curElem passed from FeatureProduct is destructured to get individual product details.

// 🔹 NavLink
// js
// Copy
// Edit
// <NavLink to={`/singleProduct/${id}`}>
// Clicking a product card takes the user to a single product detail page.

// The URL will look like: /singleProduct/1234

// 🔹 What’s Rendered
// Inside each card:

// 🖼️ Image of the product

// 📛 Category as a figcaption (styled)

// 🏷️ Product name and price in a div

// Example:

// html
// Copy
// Edit
// <div class="card">
//   <figure>
//     <img src="image.jpg" />
//     <figcaption>electronics</figcaption>
//   </figure>
//   <div class="card-data">
//     <h3>Smartphone</h3>
//     <p class="card-data--price">$799</p>
//   </div>
// </div>
// 🔗 How They Work Together
// FeatureProduct gets data from context (featureProducts)

// It loops through the array and renders Product component for each item.

// Each Product shows an individual product card.

// Clicking a card routes to the single product detail page.

// ✅ What to Do Next?
// If you want to build the single product page (/singleProduct/:id), you'll need:

// A route in App.js using react-router-dom

// A component like SingleProduct.js to fetch and display product details by id

// Let me know if you want help setting that up!







// You said:
// what is figure


// ChatGPT said:
// Great question! Let's talk about <figure> in HTML — it shows up a lot in your product card component.

// 🔸 What is <figure>?
// <figure> is a semantic HTML5 tag used to group media content like images, charts, videos, etc., along with an optional caption.

// It is usually used with <figcaption>, which is a caption/description for the media.

// 🧱 Basic Structure:
// html
// Copy
// Edit
// <figure>
//   <img src="image.jpg" alt="Product Image" />
//   <figcaption>This is a caption</figcaption>
// </figure>
// In your case:

// jsx
// Copy
// Edit
// <figure>
//   <img src={image} alt={name} />
//   <figcaption className="caption">{category}</figcaption>
// </figure>
// 🔍 Why use <figure>?
// It's semantic — improves accessibility and SEO.

// Helps browsers and assistive tech understand that the image and caption are a unit.

// Makes your HTML cleaner and more meaningful.

