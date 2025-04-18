import { createBrowserRouter, redirect, RouteObject } from "react-router";
import App from "@/App";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home"));
const Layout = lazy(() => import("@/pages/layout"));

const routes: RouteObject[] = [
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Layout,
                children: [
                    {
                        index: true,
                        loader: () => redirect("/home")
                    },
                    {
                        path: "home",
                        Component: Home,
                        handle: {
                            title: "首页",
                            type: 'menu',
                            icon: 'HomeOutlined'
                        }
                    }
                ]
            }
        ]
    }
];

const router = createBrowserRouter(routes);

export default router;