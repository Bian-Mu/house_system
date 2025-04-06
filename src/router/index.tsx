import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import HouseDetails from "../HouseDetails";
import Login from "../component/Login/Login";
import Customer from "../component/Customer/Customer";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: null
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/customer",
        element: <Customer />
    },
    {
        path: "/",
        element: localStorage.getItem('token') ? <App /> : <Navigate to="/login" replace />
        // element: <App />
    },
    {
        path: "/houseInfo",
        element: localStorage.getItem('token') ? <HouseDetails /> : <Navigate to="/login" replace />
        // element: <HouseDetails />
    },
    {
        path: '*',
        element: <Navigate to="/login" replace />
    },
])

export default router