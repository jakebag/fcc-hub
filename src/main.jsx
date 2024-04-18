import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Pages
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Cart from "./components/Cart.jsx";
import Orders from "./components/Orders.jsx";
import Profile from "./components/Profile.jsx";
import Products from "./components/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Home from "./components/Home.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/cart", element: <Cart /> },
      { path: "/orders", element: <Orders /> },
      { path: "/profile", element: <Profile /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:id", element: <ProductDetails /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
