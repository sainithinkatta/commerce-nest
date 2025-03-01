# CommerceNest

## 1. Project Overview

**CommerceNest** is a full-stack application built using MongoDB, Express.js, Vue.js, Node.js. 
This platform allows users to browse and manage products, search them, add them to the cart, update quantities, and securely proceed with checkout.
The application features a dynamic, responsive front-end built with Vue.js and Vite for fast development and optimized builds. 
The front-end is styled using TailwindCSS, providing an intuitive, user-friendly experience. 
The back-end is powered by Express.js, which handles API routes user authentication.
MongoDB serves as the database for managing user accounts, products, and cart data.

CommerceNest integrates with a public product API (fakestoreapi.com) to fetch product details and users can interact with a full-featured cart system, allowing them to increase, decrease, or remove products from the cart. 
Upon checkout, users receive a confirmation email containing the details of their order.

Key Features:
- **User Authentication**: Secure sign-up and login using JWT tokens.
- **Product Page**: View available products and add them to the cart.
- **Product Detail Page**: View detailed product information and add to cart.
- **Search Product**: Search products that you want to look out.
- **Selecting Searched Product**: Search bar display list of available items from the query.
- **Cart Operations**: Search bar display list of available items from the query.
- **Responsive UI**: Built with **Vue.js** and styled using **TailwindCSS** for a responsive design across devices.
- **Backend API**: Product data fetched from **fakestoreapi.com**.
- **Email Notifications**: After checkout, users receive an email with a list of purchased products.


## 2. Tech Stack

- **Frontend**: 
  - Vue.js
  - Vite
  - Axios (for API requests)
  - Vue Router (For managing client-side navigation )
  - TailwindCSS (for styling)

- **Backend**:
  - Express.js (RESTful API server)
  - Node.js
  - Mongoose (MongoDB ODM)

- **Database**:
  - MongoDB Atlas (cloud database)

- **Products Data**:
  - fakestoreapi.com – A public API for fetching product data (e.g., product details, prices, and descriptions) that integrates with the frontend for product browsing and cart management.

- **Authentication**:
  - JSON Web Tokens (JWT)
 
- **Email Notifications**:
  - EmailJS – A service for sending automated emails upon successful checkout or other user actions, enabling email confirmations.


## 3. API Endpoints

### Authentication Routes:
- `POST /api/create-account`: Register a new user.
- `POST /api/login`: Login and receive a JWT token.
- `GET /api/get-user`: Get details of the logged-in user. (Protected route)
- `POST /api/logout`: Logout the user by invalidating the JWT token.
- `GET /api/checkAuth`: Check if the user is authenticated. (Validates JWT token)

## Product & Cart Management Routes:
- `GET /api/products`: Fetch all products available in the store.
- `GET /api/products/:productId`: Fetch details of a specific product by its ID.
- `POST /api/cart`: Add a product to the cart.
- `DELETE /api/cart/:productId`: Remove a product from the cart.
- `PUT /api/cart/:productId`: Update the quantity of a product in the cart.


## 4. Features & Functionalities

- **User Authentication**: Secure login/signup using JWT tokens.
- **Product Management**: Browse, view, and manage products from a public API (FakeStore API).
- **Search For Specific Product**: Search for a specific producty that you want from search bar.
- **Cart Management**: Add, update product quantities, and remove items from the cart.
- **Checkout & Order Confirmation**: Users can proceed with checkout and will receive an email confirming their order.
- **Responsive UI**: Fully responsive front-end developed with **Vue.js** and styled using **TailwindCSS**.
- **Category Filtering**: Filter products based on categories for an organized browsing experience.
- **User Session Management**: JWT token authentication to maintain the user's login state across the session.

## 5. Authentication & Security

- **JWT-based Authentication**: Secures login and manages user sessions using JWT tokens.
- **CORS**: Cross-origin resource sharing enabled for secure communication between frontend and backend.

## 6. Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js**
- **npm** or **yarn**
- **MongoDB Atlas** account


### Cloning the Repository

1. Visit the GitHub repository at `https://github.com/sainithinkatta/commerce-nest`
2. Select where you want to clone the repository
3. Clone the repository:
   ```bash
   git clone https://github.com/sainithinkatta/commerce-nest
   ```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```bash
   # .env file content:
   PORT=8000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend/notes-app directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


## Future Enhancements

* **User Profile Customization**: Allow users to customize their profiles (e.g., profile picture, display name, etc.) and enhance their personal experience.

* **Product Wishlist**: Implement a wishlist feature where users can save products they are interested in purchasing later. This can help improve user engagement and retention.

* **Product Recommendations**: Implement a recommendation system that suggests products based on the user’s browsing history or purchasing behavior using machine learning or predefined algorithms.

* **Admin Dashboard**: Build an admin dashboard where administrators can manage products, view sales analytics, and oversee user activity.

Here's a contributors section to include in your README:

## Contributors
Sai Nithin Reddy Katta.
