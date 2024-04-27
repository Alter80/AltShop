import React from "react";
import ReactDOM from "react-dom/client";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NotFound from "./NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import store from "./store";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrdersListScreen";

function Layout({ error }) {
  return (
    <>
      <Header />
      {error ? <NotFound /> : <Outlet />}
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Layout error />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/search/:keyword",
        element: <App />,
      },
      {
        path: "/page/:pageNumber",
        element: <App />,
      },
      {
        path: "/search/:keyword/page/:pageNumber",
        element: <App />,
      },
      {
        path: "/product/:productId",
        element: <ProductScreen />,
      },
      {
        path: "/cart/:productId?",
        element: <CartScreen />,
      },
      {
        path: "/admin/orderList",
        element: <OrderListScreen />,
      },
      {
        path: "/admin/productList",
        element: <ProductListScreen />,
      },
      {
        path: "/admin/productList/:pageNumber",
        element: <ProductListScreen />,
      },
      {
        path: "/admin/product/:id/edit",
        element: <ProductEditScreen />,
      },
      {
        path: "/admin/userList",
        element: <UserListScreen />,
      },
      {
        path: "/admin/user/:id/edit",
        element: <UserEditScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        path: "/profile",
        element: <ProfileScreen />,
      },
      {
        path: "/shipping",
        element: <ShippingScreen />,
      },
      {
        path: "/payment",
        element: <PaymentScreen />,
      },
      {
        path: "/placeOrder",
        element: <PlaceOrderScreen />,
      },
      {
        path: "/order/:orderId",
        element: <OrderScreen />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
