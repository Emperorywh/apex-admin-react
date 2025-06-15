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



/**
 * 树形结构节点接口
 */
export interface TreeNode {
    id?: string | number;
    key?: string | number;
    path?: string;
    title?: string;
    label?: string;
    level?: number;
    parentId?: string | number;
    parentKey?: string | number;
    children?: TreeNode[];
    [key: string]: any;
}

/**
 * 扁平化配置选项
 */
export interface FlattenOptions {
    /** 子节点字段名，默认 'children' */
    childrenKey?: string;
    /** 是否包含层级信息，默认 false */
    includeLevel?: boolean;
    /** 是否包含父级信息，默认 false */
    includeParent?: boolean;
    /** 是否只包含叶子节点，默认 false */
    leafOnly?: boolean;
    /** 自定义过滤函数 */
    filter?: (node: TreeNode, level: number) => boolean;
}

/**
 * 将树形结构转换为扁平数组（递归方式）
 * @param tree 树形结构数据
 * @param options 配置选项
 * @returns 扁平化后的数组
 */
export function flattenTreeRecursive<T extends TreeNode>(
    tree: T[],
    options: FlattenOptions = {}
): T[] {
    const {
        childrenKey = 'children',
        includeLevel = false,
        includeParent = false,
        leafOnly = false,
        filter
    } = options;

    const result: T[] = [];

    function traverse(
        nodes: T[],
        level: number = 0,
        parentId?: string | number,
        parentKey?: string | number
    ) {
        nodes.forEach((node) => {
            // 创建节点副本，避免修改原数据
            const flatNode = { ...node };

            // 添加层级信息
            if (includeLevel) {
                flatNode.level = level;
            }

            // 添加父级信息
            if (includeParent && (parentId !== undefined || parentKey !== undefined)) {
                if (parentId !== undefined) flatNode.parentId = parentId;
                if (parentKey !== undefined) flatNode.parentKey = parentKey;
            }

            // 检查是否有子节点
            const children = node[childrenKey] as T[];
            const hasChildren = children && children.length > 0;

            // 应用过滤器
            const shouldInclude = filter ? filter(flatNode, level) : true;

            // 根据配置决定是否包含当前节点
            if (shouldInclude && (!leafOnly || !hasChildren)) {
                // 移除 children 字段（可选）
                // delete flatNode[childrenKey];
                result.push(flatNode);
            }

            // 递归处理子节点
            if (hasChildren) {
                traverse(
                    children,
                    level + 1,
                    flatNode.path || flatNode.key,
                    flatNode.key || flatNode.path
                );
            }
        });
    }

    traverse(tree);
    return result;
}