const FormatPrice = ({ price }) => {
    return Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price / 100);
  };
  
  export default FormatPrice;

  /*Great! This FormatPrice function is a small but super useful React component that helps format prices nicely in Indian currency style (INR). Let's break it down:

🔸 What does it do?
It takes a price (usually in paise, not rupees) and converts it into a formatted string like ₹1,234.00 using the Intl.NumberFormat API.

🔍 Step-by-step Explanation
js
Copy
Edit
const FormatPrice = ({ price }) => {
This is a React functional component that takes price as a prop.

js
Copy
Edit
Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
})
Intl.NumberFormat is a built-in JavaScript internationalization API.

"en-IN" = English (India) formatting style (so you'll get commas like: 1,00,000 instead of 100,000).

style: "currency" tells it to format as a currency.

currency: "INR" tells it to use Indian Rupees.

maximumFractionDigits: 2 ensures only two digits after the decimal.

js
Copy
Edit
.format(price / 100);
Prices are often stored in paise (like 99999 paise = ₹999.99), so dividing by 100 converts it into rupees.

The .format() method turns the number into a properly formatted currency string.

✅ Example:
If you pass:

js
Copy
Edit
<FormatPrice price={129999} />
It will output:

Copy
Edit
₹1,299.99
🔚 Finally:
js
Copy
Edit
export default FormatPrice;
This allows you to import and reuse the component anywhere like:

js
Copy
Edit
<p>{<FormatPrice price={product.price} />}</p> */