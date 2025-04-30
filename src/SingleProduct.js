import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import Star from "./components/Star";
import AddToCart from "./components/AddToCart";

const API = "https://api.pujakaitem.com/api/products";

const SingleProduct = () => {
  const { getSingleProduct, isSingleLoading, singleProduct } =
    useProductContext();

  const { id } = useParams();

  const {
    id: alias,
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}?id=${id}`);
  }, []);

  if (isSingleLoading) {
    return <div className="page_loading">Loading.....</div>;
  }

  return (
    <Wrapper>
      <PageNavigation title={name} />
      <Container className="container">
        <div className="grid grid-two-column">
          {/* product Images  */}
          <div className="product_images">
            <MyImage imgs={image} />
          </div>

          {/* product dAta  */}
          <div className="product-data">
            <h2>{name}</h2>
            <Star stars={stars} reviews={reviews}/>
            
            <p className="product-data-price">
              MRP:
              <del>
                <FormatPrice price={price + 250000} />
              </del>
            </p>
            <p className="product-data-price product-data-real-price">
              Deal of the Day: <FormatPrice price={price} />
            </p>
            <p>{description}</p>
            <div className="product-data-warranty">
              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Free Delivery</p>
              </div>

              <div className="product-warranty-data">
                <TbReplace className="warranty-icon" />
                <p>30 Days Replacement</p>
              </div>

              <div className="product-warranty-data">
                <TbTruckDelivery className="warranty-icon" />
                <p>Thapa Delivered </p>
              </div>

              <div className="product-warranty-data">
                <MdSecurity className="warranty-icon" />
                <p>2 Year Warranty </p>
              </div>
            </div>

            <div className="product-data-info">
              <p>
                Available:
                <span> {stock > 0 ? "In Stock" : "Not Available"}</span>
              </p>
              <p>
                ID : <span> {id} </span>
              </p>
              <p>
                Brand :<span> {company} </span>
              </p>
            </div>
            <hr/>
            {stock> 0 && <AddToCart product={singleProduct}/>}
          </div>
        </div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }

  .product_images {
    display: flex;
    align-items: center;
  }

  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;

/* 
This is a Product Details Page. When a user clicks on a product, this page:

Gets the product's ID from the URL.

Fetches detailed info about that product from the API.

Displays everything — images, price, brand, description, stock status, and warranty info.

🔍 1. Importing Tools and Components
js
Copy
Edit
import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProductContext } from "./context/productcontext";
import PageNavigation from "./components/PageNavigation";
import MyImage from "./components/MyImage";
import { Container } from "./styles/Container";
import FormatPrice from "./Helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
You're bringing in:

React hooks like useEffect (for fetching data) and useParams (to read the product ID from the URL)

Some custom components:

PageNavigation: shows breadcrumb/title at the top.

MyImage: shows product images.

FormatPrice: formats the price in INR ₹.

Icons for warranty and delivery.

🌐 2. Set Up API and Read Context
js
Copy
Edit
const API = "https://api.pujakaitem.com/api/products";
const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
const { id } = useParams();
You set the base URL for the API.

You use the custom context hook to get the function (getSingleProduct) to fetch one product and some state (isSingleLoading, singleProduct).

You grab the product id from the route (e.g., /singleProduct/abc123).

🧠 3. Extract Product Data
js
Copy
Edit
const {
  id: alias,
  name,
  company,
  price,
  description,
  category,
  stock,
  stars,
  reviews,
  image,
} = singleProduct;
You're pulling individual fields from the singleProduct object like name, price, image, etc., to use directly in JSX.

⚙️ 4. Fetch Product Data on Mount
js
Copy
Edit
useEffect(() => {
  getSingleProduct(`${API}?id=${id}`);
}, []);
When the page loads for the first time, it calls getSingleProduct() with the product’s id to fetch data from the API.

⏳ 5. Show Loading While Data is Fetching
js
Copy
Edit
if (isSingleLoading) {
  return <div className="page_loading">Loading.....</div>;
}
If data is still loading, show a loading message instead of an empty page.

🖼️ 6. Display Product Information
This part is the UI section inside return(...).

Top Navigation
js
Copy
Edit
<PageNavigation title={name} />
Breadcrumb-style navigation showing the product name.

Grid Layout: Images and Details
js
Copy
Edit
<Container className="container">
  <div className="grid grid-two-column">
You're using two columns:

Left: Product Images (MyImage)

Right: Product Details

🔧 Product Details Include:
Name

Stars & Reviews

Original MRP (slightly increased price)

Actual Price

Description

Warranty/Delivery Icons (with icons and short info)

Stock info, Product ID, Brand Name

You use a bunch of small styled divs to organize this.

Example:

js
Copy
Edit
<p className="product-data-price product-data-real-price">
  Deal of the Day: <FormatPrice price={price} />
</p>
That formats and displays the actual deal price.

🎨 Styling With styled-components
The Wrapper constant is a styled <section> component that:

Adds padding, layout, icon styles, responsive tweaks

Controls everything like grid layout, spacing, background, font-size, etc.

✅ Summary of Flow
Page loads

id is read from URL

getSingleProduct() fetches that product from the API

If loading, show spinner

When ready, display product details with a clean UI and icons

*/