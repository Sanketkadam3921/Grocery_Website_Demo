// Routes configuration will go here

import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../features/admin/components/AdminLayout";
import Dashboard from "../features/admin/pages/Dashboard/Dashboard";
import Products from "../features/admin/pages/Products/Products";
import AddProduct from "../features/admin/pages/AddProduct/AddProduct";
import Home from "../features/user/pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "products/add", element: <AddProduct /> },
    ],
  },
]);

export default router;
