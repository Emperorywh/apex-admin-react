import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

// 优化后：使用相对路径
const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("advanced-form") // 相对路径，不需要 /form-page/ 前缀
    },
    {
        path: "advanced-form", // 相对路径
        Component: lazy(() => import("@/pages/form-page/advanced-form")),
        handle: {
            title: "高级表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "base-form", // 相对路径
        Component: lazy(() => import("@/pages/form-page/base-form")),
        handle: {
            title: "基础表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "step-form", // 相对路径
        Component: lazy(() => import("@/pages/form-page/step-form")),
        handle: {
            title: "分步表单",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
];

export default routes; 