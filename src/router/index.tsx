import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HouseDetails from "../HouseDetails";

const router = createBrowserRouter([
    {
        path: "/admin",
        element: null
    },
    {
        path: "/login",
        element: null
    },
    {
        path: "/",
        element: <App />
    },
    {
        path: "/houseInfo",
        element: <HouseDetails />
    }
])

export default router