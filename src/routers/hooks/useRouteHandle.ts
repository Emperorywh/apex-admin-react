import { useMatches } from "react-router";
import { RouteHandleType } from "../index.types";

/**
 * 自定义钩子，用于获取当前路由的 handle 数据
 */
export function useRouteHandle(): RouteHandleType {
    const matches = useMatches();
    const currentRoute = matches[matches.length - 1];
    return (currentRoute.handle as RouteHandleType) || {};
}