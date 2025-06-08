import { Menu, MenuProps } from "antd";
import styles from "./index.module.less";
import { IProps } from "./index.types";
import ReactLogo from "@/assets/react.svg";
import { useEffect, useState } from "react";
import { RouteObject, useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { createAntdIcon, getLevelKeys, layoutRoutes, LevelKeysProps, buildFullPath, getOpenKeysFromPath } from "../../utils";

const ROOT_PATH = '/home';

type MenuItem = Required<MenuProps>['items'][number];

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutSider = (props: IProps) => {

    const { } = props;

    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);

    const [selectedKeys, setSelectedKeys] = useState<string[]>([ROOT_PATH]);

    const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

    const navigate = useNavigate();

    const location = useLocation();

    const [menus, setMenus] = useState<MenuItem[]>([]);

    const onClick: MenuProps['onClick'] = (event) => {
        const { key } = event;
        setSelectedKeys([key]);
        navigate(key);
    };

    /**
     * 将路由配置转换为菜单项
     * @param routes 路由配置
     * @returns 菜单项数组
     */
    const formatRouteToMenu = (routes: RouteObject[]): MenuItem[] => {
        // 递归处理路由，构建完整路径
        const processRoutes = (routeList: RouteObject[], parentPath = ''): MenuItem[] => {
            return routeList
                .filter(route => {
                    // 过滤掉没有handle或type不是menu的路由
                    const handle = route.handle as any;
                    return handle && handle.type === 'menu';
                })
                .map(route => {
                    const handle = route.handle as any;
                    const routePath = route.path || '';
                    
                    // 使用工具函数构建完整路径
                    const fullPath = buildFullPath(routePath, parentPath);
                    
                    const label = handle?.title || '';
                    const icon = handle?.icon ? createAntdIcon(handle.icon) : null;
                    
                    // 处理子路由，传递当前完整路径作为父路径
                    const children = route.children ? processRoutes(route.children, fullPath) : undefined;
                    
                    return {
                        key: fullPath, // 使用完整路径作为key
                        path: fullPath, // 保存完整路径
                        label,
                        icon,
                        children: children && children.length > 0 ? children : undefined
                    } as MenuItem;
                });
        };
        return processRoutes(routes);
    };

    const levelKeys = getLevelKeys(menus as LevelKeysProps[]);

    const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
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
        const menus = formatRouteToMenu(layoutRoutes);
        setMenus(menus);
    }, []);

    useEffect(() => {
        const pathname = location.pathname;
        
        // 根据当前路径设置选中的菜单项
        setSelectedKeys([pathname]);
        
        // 使用工具函数自动展开包含当前路径的父级菜单
        const openKeys = getOpenKeysFromPath(pathname);
        setStateOpenKeys(openKeys);
    }, [location]);

    return (
        <div className={styles['container']} style={{ width: inlineCollapsed ? 80 : 210 }}>
            <div className={styles['header']} onClick={() => {
                navigate(ROOT_PATH);
                setSelectedKeys([ROOT_PATH]);
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
