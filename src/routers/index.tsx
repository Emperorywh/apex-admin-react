import { createBrowserRouter } from "react-router";
import App from "../App";
import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Layout = lazy(() => import("../pages/layout"));

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: Layout },
            { path: "home", Component: Home },
        ]
    }
]);

export default router;