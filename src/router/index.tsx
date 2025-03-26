import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NewPageApp from "../NewPageApp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/houseInfo",
        element: <NewPageApp />
    }
])

export default router