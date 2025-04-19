import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("advanced-form")
    },
    {
        path: "advanced-form",
        Component: lazy(() => import("@/pages/form-page/advanced-form")),
        handle: {
            title: "高级表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "base-form",
        Component: lazy(() => import("@/pages/form-page/base-form")),
        handle: {
            title: "基础表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "step-form",
        Component: lazy(() => import("@/pages/form-page/step-form")),
        handle: {
            title: "分步表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
];

export default routes;