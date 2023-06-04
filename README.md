# e-commerce-project

This is an e-commerce platform for fashion products, made using React, Tailwind, React-router-dom, Mockbee e-commerce template for backend, react-toastify, and razorpay payment integration. Randomly generated data is used.  

### Home Page  
There is home/landing page. Shows the available categories with some of the products from that category.  
### Product Listing Page  
A product listing page which shows all the products and a filters section.  
### Single Product Page  
A Product details page which shows the details of the products and the buttons to add the product to the cart or the wishlist.  
### Filters by  
On the products listing page, the user can filter the products on the basis of category, price, ratings, brand, material, or sort the products from low to high or high to low. 
### Wishlist Management  
There is wishlist page, which is a protected route, so the user can only go to the wishlist page or add the product to wishlist if he is logged. 
### Cart Management  
There is cart page, which is a protected route, so the user can only go to the cart page or add the product to cart if he is logged. In the cart page, The user can update the quantity of the product, remove from cart, or move the product from the cart.
### Search  
There is search icon in the header, clicking on which the the search input opens and the user can search the products by name.  

### Loading & Alerts  
React-testify has been used to show the alerts, when products are added to cart/wishlist, when user logs in, etc.  

### Authentication  
The user can sign up, sign in, sign in as guest and sign out of the website.  

### Address Management  
The user can save multiple addresses and choose from the saved address while purchasing the products.  

### Checkout  
The user can click on the buy now button in the cart page and then choose the shipping address from the saved addresses or can add a new address. after choosing the address, he will be able to make payment using razorpay and place order.
