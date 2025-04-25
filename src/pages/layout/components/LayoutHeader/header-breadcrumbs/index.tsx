import React from "react";
import styles from "./index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { changeInlineCollapsed } from "@/store/menu/menuSlice";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { getLevelKeys, layoutRoutes } from "@/pages/layout/utils";

const layoutRoutesLevelKeys = getLevelKeys(layoutRoutes);


/**
 * 面包屑
 * @returns
 */
const HeaderBreadcrumbs = () => {

    // console.log(layoutRoutesLevelKeys)

    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);

    const [breadcrumbItems, setBreadcrumbItems] = React.useState<ItemType[]>([
        {
            title: (
                <>
                    <HomeOutlined />
                    <span>首页</span>
                </>
            ),
            path: '/home',
            onClick: (event) => {
                console.log(event);
            }
        }
    ]);


    const location = useLocation();

    const dispatch = useDispatch();

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
                return <Link to={`/${paths.join('/')}`}>{route.title}</Link>
            }}
        />
    </div>
}

export default HeaderBreadcrumbs;