import { createBrowserRouter, redirect, RouteObject } from "react-router";
import { lazy } from "react";
import PermissionManagement from "./modules/permission-management";
import FormPage from "./modules/form-page";
import ListPage from "./modules/list-page";
import MenuNested from "./modules/menu-nested";

export const routes: RouteObject[] = [
    {
        path: "/",
        Component: lazy(() => import("@/pages/layout")),
        children: [
            {
                index: true,
                loader: () => redirect("home")
            },
            {
                path: "home",
                Component: lazy(() => import("@/pages/home")),
                handle: {
                    title: "首页",
                    type: 'menu',
                    icon: 'HomeOutlined'
                }
            },
            {
                path: "data-screen",
                Component: lazy(() => import("@/pages/data-screen")),
                handle: {
                    title: "数据大屏",
                    type: 'menu',
                    icon: 'AppstoreOutlined'
                }
            },
            {
                path: "internationalization",
                Component: lazy(() => import("@/pages/internationalization")),
                handle: {
                    title: "国际化",
                    type: 'menu',
                    icon: 'AppstoreOutlined'
                }
            },
            {
                path: "permission-management",
                handle: {
                    title: "权限管理",
                    type: 'menu',
                    icon: 'HeatMapOutlined'
                },
                children: PermissionManagement
            },
            {
                path: "form-page",
                handle: {
                    title: "表单页面",
                    type: 'menu',
                    icon: 'HeatMapOutlined'
                },
                children: FormPage
            },
            {
                path: "list-page",
                handle: {
                    title: "列表页面",
                    type: 'menu',
                    icon: 'HeatMapOutlined'
                },
                children: ListPage
            },
            {
                path: "menu-nested",
                handle: {
                    title: "菜单嵌套",
                    type: 'menu',
                    icon: 'HeatMapOutlined'
                },
                children: MenuNested
            }
        ]
    },
    {
        path: "/login",
        Component: lazy(() => import("@/pages/login")),
        handle: {
            title: "登录",
        }
    }
];

const router = createBrowserRouter(routes);

export default router; 