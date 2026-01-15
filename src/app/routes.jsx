// Routes configuration will go here

import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../features/admin/components/AdminLayout";
import Dashboard from "../features/admin/pages/Dashboard/Dashboard";
import AdminProducts from "../features/admin/pages/Products/Products";
import AddProduct from "../features/admin/pages/AddProduct/AddProduct";
import UserLayout from "../features/user/components/UserLayout";
import Home from "../features/user/pages/Home/Home";
import Products from "../features/user/pages/Products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/add", element: <AddProduct /> },
    ],
  },
]);

export default router;
