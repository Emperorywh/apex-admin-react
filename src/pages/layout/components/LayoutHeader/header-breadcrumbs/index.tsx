import React from "react";
import styles from "./index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { changeInlineCollapsed } from "@/store/menu/menuSlice";

/**
 * 面包屑
 * @returns
 */
const HeaderBreadcrumbs = () => {

    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);

    const dispatch = useDispatch();

    return <div className={styles['container']}>
        {
            inlineCollapsed ?
                <MenuUnfoldOutlined style={{ fontSize: 18 }} onClick={() => dispatch(changeInlineCollapsed(false))} /> :
                <MenuFoldOutlined style={{ fontSize: 18 }} onClick={() => dispatch(changeInlineCollapsed(true))} />
        }
    </div>
}

export default HeaderBreadcrumbs;