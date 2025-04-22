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
export const layoutRoutes = clonedRoutes[0]?.children?.[0]?.children || [];

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
