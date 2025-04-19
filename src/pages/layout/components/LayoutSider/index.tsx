import { Menu, MenuProps } from "antd";
import styles from "./index.module.less";
import { IProps, LevelKeysProps } from "./index.types";
import ReactLogo from "@/assets/react.svg";
import { useEffect, useState } from "react";
import { routes } from "@/routers";
import * as AntdIcons from "@ant-design/icons";
import { RouteObject, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// 深拷贝路由配置
const clonedRoutes: RouteObject[] = JSON.parse(JSON.stringify(routes));

type MenuItem = Required<MenuProps>['items'][number];

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutSider = (props: IProps) => {

    const { } = props;

    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);

    const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);

    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

    const navigate = useNavigate();

    const location = useLocation();

    const [menus, setMenus] = useState<MenuItem[]>([]);

    const onClick: MenuProps['onClick'] = (event) => {
        const { keyPath = [], key } = event;
        setSelectedKeys([key]);
        if (Array.isArray(keyPath) && keyPath.length > 0) {
            const path = keyPath.reverse().join('/');
            navigate(path);
        }

    };

    /**
     * 动态创建图标组件
     * @param iconName 图标名称
     * @returns 图标组件
     */
    const createIcon = (iconName: string): React.ReactNode => {
        if (!iconName) return null;
        // @ts-ignore
        const AntdIcon = AntdIcons?.[iconName];
        return AntdIcon ? <AntdIcon /> : null;
    };
    /**
     * 将路由配置转换为菜单项
     * @param routes 路由配置
     * @returns 菜单项数组
     */
    const formatRouteToMenu = (routes: RouteObject[]): MenuItem[] => {
        // 递归处理路由
        const processRoutes = (routeList: RouteObject[]): MenuItem[] => {
            return routeList
                .filter(route => {
                    // 过滤掉没有handle或type不是menu的路由
                    const handle = route.handle as any;
                    return handle && handle.type === 'menu';
                })
                .map(route => {
                    const handle = route.handle as any;
                    const key = route.path || '';
                    const label = handle?.title || '';
                    const icon = handle?.icon ? createIcon(handle.icon) : null;
                    // 处理子路由
                    const children = route.children ? processRoutes(route.children) : undefined;
                    return {
                        key,
                        label,
                        icon,
                        children: children && children.length > 0 ? children : undefined
                    } as MenuItem;
                });
        };
        return processRoutes(routes);
    };

    const getLevelKeys = (items1: LevelKeysProps[]) => {
        const key: Record<string, number> = {};
        const func = (items2: LevelKeysProps[], level = 1) => {
            items2.forEach((item) => {
                if (item.key) {
                    key[item.key] = level;
                }
                if (item.children) {
                    func(item.children, level + 1);
                }
            });
        };
        func(items1);
        return key;
    };

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
        const levelKeys = getLevelKeys(menus as LevelKeysProps[]);
        console.log("levelKeys", levelKeys)
        const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
        if (currentOpenKey !== undefined) {
            const repeatIndex = openKeys
                .filter((key) => key !== currentOpenKey)
                .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

            setStateOpenKeys(
                openKeys
                    .filter((_, index) => index !== repeatIndex)
                    .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
            );
        } else {
            setStateOpenKeys(openKeys);
        }
    };


    useEffect(() => {
        const menus = formatRouteToMenu(clonedRoutes[0]?.children?.[0]?.children || []);
        setMenus(menus);
    }, []);

    useEffect(() => {
        // 获取当前路径（去除开头的斜杠）
        const pathname = location.pathname.replace(/^\/+/, '');
        const pathSegments = pathname.split('/').filter(Boolean);

        // 处理菜单选中状态
        if (pathSegments.length > 0) {
            // 设置当前活动菜单项
            const currentKey = pathSegments[pathSegments.length - 1];
            setSelectedKeys([currentKey]);

            // 处理菜单展开状态
            if (pathSegments.length > 1) {
                // 对于多级路径，设置父级菜单为展开状态
                const parentKeys = pathSegments.slice(0, -1);
                setStateOpenKeys(parentKeys);
            } else {
                // 对于一级路径，关闭所有展开的菜单
                setStateOpenKeys([]);
            }
        } else {
            // 默认首页
            setSelectedKeys(['home']);
            setStateOpenKeys([]);
        }
    }, [location])

    return (
        <div className={styles['container']}>
            <div className={styles['header']} onClick={() => {
                navigate("/home");
                setSelectedKeys(['home']);
            }}>
                <img className={styles['logo']} src={ReactLogo} alt="react" />
                {
                    !inlineCollapsed && <div className={styles['text']}>Apex Admin React</div>
                }
            </div>
            <Menu
                onClick={onClick}
                mode="inline"
                items={menus}
                selectedKeys={selectedKeys}
                openKeys={stateOpenKeys}
                onOpenChange={onOpenChange}
                inlineCollapsed={inlineCollapsed}
            />
        </div>
    )
}

export default LayoutSider
