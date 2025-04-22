import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("/form-page/advanced-form")
    },
    {
        path: "/form-page/advanced-form",
        Component: lazy(() => import("@/pages/form-page/advanced-form")),
        handle: {
            title: "高级表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "/form-page/base-form",
        Component: lazy(() => import("@/pages/form-page/base-form")),
        handle: {
            title: "基础表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "/form-page/step-form",
        Component: lazy(() => import("@/pages/form-page/step-form")),
        handle: {
            title: "分步表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
];

export default routes;