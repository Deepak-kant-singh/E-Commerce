import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";

const Star = ({stars,reviews}) => {
    const ratingStar=Array.from({length:5},(elem,index)=>{
        let number=index+0.5;
        // debugger;
        return(
            <span key={index}>
            {stars >= index + 1 ? (
              <FaStar className="icon" />//full star
            ) : stars >= number ? (
              <FaStarHalfAlt className="icon" />//half star
            ) : (
              <AiOutlineStar className="icon" />//expty star
            )}
          </span>
        )
    })
  return (
    <Wrapper>
        <div className="icon-style">
            {ratingStar}
            <p>({reviews} customer reviews)</p>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star




/* Awesome! You're working with a Star Rating UI in React — this is a great practical example of using Array.from, conditional rendering, and icons. Let’s break it all down step-by-step in beginner-friendly language so you understand exactly what’s going on.

🔧 Code Recap:
jsx
Copy
Edit
const Star = ({ stars, reviews }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        <p>({reviews} customer reviews)</p>
      </div>
    </Wrapper>
  );
};
🧠 What's Happening?
✅ 1. Input Props
jsx
Copy
Edit
const Star = ({ stars, reviews }) =>
This component receives two props:

stars: A number like 4.3 (average rating)

reviews: A number like 127 (number of people who reviewed)

✅ 2. Creating 5 Star Slots
jsx
Copy
Edit
Array.from({ length: 5 }, (elem, index) => {
Array.from({ length: 5 }) creates an array with 5 empty items (1 for each star).

The callback gives us index = 0, 1, 2, 3, 4.

jsx
Copy
Edit
let number = index + 0.5;
This helps us decide whether to show a half star.

✅ 3. Conditional Star Logic
For each of the 5 star positions:

jsx
Copy
Edit
{stars >= index + 1 ? (
  <FaStar className="icon" />           // Full Star
) : stars >= number ? (
  <FaStarHalfAlt className="icon" />    // Half Star
) : (
  <AiOutlineStar className="icon" />    // Empty Star
)}
Let’s say stars = 3.6, and we go through all 5 indexes:

index 0: 3.6 >= 1 ✅ → Full Star

index 1: 3.6 >= 2 ✅ → Full Star

index 2: 3.6 >= 3 ✅ → Full Star

index 3: 3.6 >= 4 ❌ but 3.6 >= 3.5 ✅ → Half Star

index 4: 3.6 >= 5 ❌ → Empty Star

So, the result is: ⭐⭐⭐✨☆

✅ 4. Final Render
jsx
Copy
Edit
return (
  <Wrapper>
    <div className="icon-style">
      {ratingStar}                    // Star icons array
      <p>({reviews} customer reviews)</p>
    </div>
  </Wrapper>
);
This displays the stars and review count below it.

🧪 Output Example:
If stars={4.3} and reviews={89}, it will show:

scss
Copy
Edit
⭐ ⭐ ⭐ ⭐ ✨ (89 customer reviews)
🔌 Icons Used
You’ll need:

jsx
Copy
Edit
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
*/
