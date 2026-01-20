// Routes configuration will go here

import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../features/admin/components/AdminLayout";
import Dashboard from "../features/admin/pages/Dashboard/Dashboard";
import AdminProducts from "../features/admin/pages/Products/Products";
import AddProduct from "../features/admin/pages/AddProduct/AddProduct";
import EditProduct from "../features/admin/pages/EditProduct/EditProduct";
import Orders from "../features/admin/pages/Orders/Orders";
import Messages from "../features/admin/pages/Messages/Messages";
import Categories from "../features/admin/pages/Categories/Categories";
import UserLayout from "../features/user/components/UserLayout";
import Home from "../features/user/pages/Home/Home";
import Products from "../features/user/pages/Products/Products";
import ProductDetail from "../features/user/pages/ProductDetail/ProductDetail";
import Cart from "../features/user/pages/Cart/Cart";
import Checkout from "../features/user/pages/Checkout/Checkout";
import OrderSuccess from "../features/user/pages/OrderSuccess/OrderSuccess";
import About from "../features/user/pages/About/About";
import Contact from "../features/user/pages/Contact/Contact";
import Login from "../features/user/pages/Login/Login";
import Signup from "../features/user/pages/Signup/Signup";
import AdminLogin from "../features/admin/pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/add", element: <AddProduct /> },
      { path: "products/edit/:id", element: <EditProduct /> },
      { path: "orders", element: <Orders /> },
      { path: "messages", element: <Messages /> },
      { path: "categories", element: <Categories /> },
    ],
  },
]);

export default router;
