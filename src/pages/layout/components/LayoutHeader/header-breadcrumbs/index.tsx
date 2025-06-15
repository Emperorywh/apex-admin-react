import { useEffect, useState } from "react";
import styles from "./index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { changeInlineCollapsed } from "@/store/menu/menuSlice";
import { Breadcrumb } from "antd";
import { Link, useLocation, useNavigate } from "react-router";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { createAntdIcon, flattenTreeRecursive, layoutRoutes } from "@/pages/layout/utils";

const homeBreadcurmb = {
    title: (
        <>
            <HomeOutlined />
            <span style={{ marginLeft: 5 }}>首页</span>
        </>
    ),
    path: '/home'
}

/**
 * 面包屑
 * @returns
 */
const HeaderBreadcrumbs = () => {

    const location = useLocation();

    const flattenRoutes = flattenTreeRecursive(layoutRoutes);

    const dispatch = useDispatch();


    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);

    const [breadcrumbItems, setBreadcrumbItems] = useState<ItemType[]>([homeBreadcurmb]);

    const navigate = useNavigate();

    /**
     * 处理路由变化
     */
    const hanldeLocationChange = () => {
        const breadcrumbArray: ItemType[] = [homeBreadcurmb];
        const pathnameArray = location.pathname.split("/").filter(Boolean);
        pathnameArray.forEach(pathItem => {
            const route = flattenRoutes.find(route => route.path === pathItem);
            if (route && route.path !== 'home') {
                const item: any = {
                    title: (
                        <>
                            {route?.handle?.icon && createAntdIcon(route?.handle?.icon)}
                            <span style={{ marginLeft: 5 }}>{route?.handle?.title}</span>
                        </>
                    ),
                    path: route.path,
                }
                if (route?.children) {
                    const menuItems = route.children?.filter(item => item?.path).map(child => ({
                        label: <>
                            {child?.handle?.icon && createAntdIcon(child?.handle?.icon)}
                            <span style={{ marginLeft: 5 }}>{child?.handle?.title}</span>
                        </>,
                        key: child.path,
                        onClick: (event: any) => {
                            const keyPath = event?.key || '';
                        }
                    }));
                    item.menu = {
                        items: menuItems
                    }
                }
                breadcrumbArray.push(item)
            }
        });
        setBreadcrumbItems(breadcrumbArray);
    }

    useEffect(() => {
        hanldeLocationChange();
    }, [location])


    return <div className={styles['container']}>
        <div className={styles['icon-card']}>
            {
                inlineCollapsed ?
                    <MenuUnfoldOutlined style={{ fontSize: 20 }} onClick={() => dispatch(changeInlineCollapsed(false))} /> :
                    <MenuFoldOutlined style={{ fontSize: 20 }} onClick={() => dispatch(changeInlineCollapsed(true))} />
            }
        </div>
        <Breadcrumb
            items={breadcrumbItems}
            itemRender={(route, params, routes, paths) => {
                return <Link to={`/${paths.filter((item, index) => index > 0).join('/')}`}>{route.title}</Link>
            }}
        />
    </div>
}

export default HeaderBreadcrumbs;