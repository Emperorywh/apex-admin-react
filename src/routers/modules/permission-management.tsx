import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

// 优化后：使用相对路径
const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("auth-button") // 相对路径
    },
    {
        path: "auth-button", // 相对路径，不需要 /permission-management/ 前缀
        Component: lazy(() => import("@/pages/permission-management/auth-button")),
        handle: {
            title: "按钮权限",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "auth-page", // 相对路径
        Component: lazy(() => import("@/pages/permission-management/auth-page")),
        handle: {
            title: "页面权限",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
];

export default routes; 