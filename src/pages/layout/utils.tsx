import { routes } from "@/routers";
import { RouteObject } from "react-router";
import * as AntdIcons from "@ant-design/icons";

export interface LevelKeysProps {
    key?: string;
    path?: string;
    children?: LevelKeysProps[];
}

// 深拷贝路由配置
const clonedRoutes: RouteObject[] = JSON.parse(JSON.stringify(routes));
// 获取布局路由
export const layoutRoutes = clonedRoutes[0]?.children || [];

/**
 * 获取菜单层级
 * @param menus 
 * @returns 
 */
export const getLevelKeys = (menus: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (menu: LevelKeysProps[], level = 1) => {
        menu.forEach((item) => {
            if (item.path) {
                key[item.path] = level;
            }
            if (item.children) {
                func(item.children, level + 1);
            }
        });
    };
    func(menus);
    return key;
};

/**
 * 动态创建图标组件
 * @param iconName 图标名称
 * @returns 图标组件
 */
export const createAntdIcon = (iconName: string): React.ReactNode => {
    if (!iconName) return null;
    // @ts-ignore
    const AntdIcon = AntdIcons?.[iconName];
    return AntdIcon ? <AntdIcon /> : null;
};

/**
 * 构建完整路径 - 处理相对路径到绝对路径的转换
 * @param routePath 路由路径（可能是相对或绝对路径）
 * @param parentPath 父路径
 * @returns 完整的绝对路径
 */
export const buildFullPath = (routePath: string, parentPath = ''): string => {
    if (!routePath) return parentPath || '/';
    
    // 如果是绝对路径，直接返回
    if (routePath.startsWith('/')) {
        return routePath;
    }
    
    // 相对路径需要拼接父路径
    if (parentPath) {
        return `${parentPath}/${routePath}`;
    }
    
    return `/${routePath}`;
};

/**
 * 根据当前路径生成需要展开的菜单键
 * @param pathname 当前路径
 * @returns 需要展开的父级菜单键数组
 */
export const getOpenKeysFromPath = (pathname: string): string[] => {
    if (pathname.split("/").length < 3) {
        return [];
    }
    
    const pathSegments = pathname.split("/").filter(Boolean);
    const openKeys: string[] = [];
    
    // 构建需要展开的父级路径
    for (let i = 1; i < pathSegments.length; i++) {
        const parentPath = "/" + pathSegments.slice(0, i).join("/");
        openKeys.push(parentPath);
    }
    
    return openKeys;
};
