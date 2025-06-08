import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("menu-1")
    },
    {
        path: "menu-1",
        Component: lazy(() => import("@/pages/menu-nested/menu-1")),
        handle: {
            title: "菜单-1",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "menu-2",
        handle: {
            title: "菜单-2",
            type: 'menu',
            icon: 'AppstoreOutlined'
        },
        children: [
            {
                path: "menu-2-1",
                Component: lazy(() => import("@/pages/menu-nested/menu-2/menu-2-1")),
                handle: {
                    title: "菜单-2-1",
                    type: 'menu',
                    icon: 'AppstoreOutlined'
                }
            },
            {
                path: "menu-2-2",
                handle: {
                    title: "菜单-2-2",
                    type: 'menu',
                    icon: 'AppstoreOutlined'
                },
                children: [
                    {
                        path: "menu-2-2-1",
                        Component: lazy(() => import("@/pages/menu-nested/menu-2/menu-2-2/menu-2-2-1")),
                        handle: {
                            title: "菜单-2-2-1",
                            type: 'menu',
                            icon: 'AppstoreOutlined'
                        }
                    },
                    {
                        path: "menu-2-2-2",
                        Component: lazy(() => import("@/pages/menu-nested/menu-2/menu-2-2/menu-2-2-2")),
                        handle: {
                            title: "菜单-2-2-2",
                            type: 'menu',
                            icon: 'AppstoreOutlined'
                        }
                    },
                    {
                        path: "menu-2-2-3",
                        Component: lazy(() => import("@/pages/menu-nested/menu-2/menu-2-2/menu-2-2-3")),
                        handle: {
                            title: "菜单-2-2-3",
                            type: 'menu',
                            icon: 'AppstoreOutlined'
                        }
                    },
                ]
            },
            {
                path: "menu-2-3",
                Component: lazy(() => import("@/pages/menu-nested/menu-2/menu-2-3")),
                handle: {
                    title: "菜单-2-3",
                    type: 'menu',
                    icon: 'AppstoreOutlined'
                }
            },
        ]
    },
    {
        path: "menu-3",
        Component: lazy(() => import("@/pages/menu-nested/menu-3")),
        handle: {
            title: "菜单-3",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    }
];

export default routes;