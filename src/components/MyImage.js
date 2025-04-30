import React, { useState } from "react";
import styled from "styled-components";

const MyImage = ({ imgs = [{ url: "" }] }) => {
  const [mainImage, setMainImage] = useState(imgs[0]);

  return (
    <Wrapper>
      <div className="grid grid-four-column">
        {imgs.map((curElm, index) => {
          return (
            <figure>
              <img
                src={curElm.url}
                alt={curElm.filename}
                className="box-image--style"
                key={index}
                onClick={() => setMainImage(curElm)}
              />
            </figure>
          );
        })}
      </div>
      {/* 2nd column  */}

      <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;

/*🔹 What is this component for?
This component is called MyImage. It's used to show multiple product images (like thumbnails), and when you click on one, it shows that image in a larger main view.

🧠 Step-by-step Explanation
js
Copy
Edit
import React, { useState } from "react";
This imports React and a special function called useState.

useState lets us create and manage a variable that can change — like remembering which image is currently selected.

js
Copy
Edit
import styled from "styled-components";
This lets us style our components using JavaScript.

We’ll use styled-components later to make this component look nice.

js
Copy
Edit
const MyImage = ({ imgs = [{ url: "" }] }) => {
This is a React functional component named MyImage.

It accepts a prop called imgs — this will be an array of image objects.

The = [{ url: "" }] part is a default value in case imgs is not provided (so your code won’t break).

js
Copy
Edit
const [mainImage, setMainImage] = useState(imgs[0]);
mainImage is the currently selected image to show in the big screen.

setMainImage is the function to change it.

useState(imgs[0]) means we start by showing the first image from the array.

🔽 Return JSX (the UI part):
js
Copy
Edit
return (
  <Wrapper>
Wrapper is a styled component (you’ll see the styles later). It wraps all the content and applies custom CSS.

js
Copy
Edit
    <div className="grid grid-four-column">
This is a grid layout with 4 columns.

Inside this div, we show all the small image thumbnails.

js
Copy
Edit
{imgs.map((curElm, index) => {
  return (
    <figure>
      <img
        src={curElm.url}
        alt={curElm.filename}
        className="box-image--style"
        key={index}
        onClick={() => setMainImage(curElm)}
      />
    </figure>
  );
})}
🔍 What’s happening here?
We’re looping through the array of images using .map().

curElm is the current image object (it has a url and maybe a filename).

For each image:

It shows a small <img /> thumbnail.

onClick={() => setMainImage(curElm)} means:
👉 when you click this thumbnail, update mainImage to be this image.

key={index} helps React keep track of items in the list.

js
Copy
Edit
<div className="main-screen">
  <img src={mainImage.url} alt={mainImage.filename} />
</div>
This shows the big version of the image that was clicked.

It always uses mainImage — which updates when you click a thumbnail.

✅ Result: What this component does
Shows 4 small images (thumbnails).

Shows 1 big image — the one currently selected.

When you click on any thumbnail, the main image updates to show that one.

 */