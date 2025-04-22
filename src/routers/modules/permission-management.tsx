import { lazy } from "react";
import { redirect, RouteObject } from "react-router";


const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("/permission-management/auth-button")
    },
    {
        path: "/permission-management/auth-button",
        Component: lazy(() => import("@/pages/permission-management/auth-button")),
        handle: {
            title: "按钮权限",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "/permission-management/auth-page",
        Component: lazy(() => import("@/pages/permission-management/auth-page")),
        handle: {
            title: "页面权限",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
];

export default routes;