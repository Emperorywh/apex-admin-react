import { lazy } from "react";
import { redirect, RouteObject } from "react-router";

const routes: RouteObject[] = [
    {
        index: true,
        loader: () => redirect("drag-table")
    },
    {
        path: "drag-table",
        Component: lazy(() => import("@/pages/list-page/drag-table")),
        handle: {
            title: "拖动表格 drag-table",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "edit-table",
        Component: lazy(() => import("@/pages/list-page/edit-table")),
        handle: {
            title: "可编辑表格 edit-table",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    },
    {
        path: "pro-table",
        Component: lazy(() => import("@/pages/list-page/pro-table")),
        handle: {
            title: "高级表格 pro-table",
            type: 'menu',
            icon: 'AppstoreOutlined'
        }
    }
];

export default routes;