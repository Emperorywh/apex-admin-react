import React from "react";
import styles from "./index.module.less";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Tabs } from "antd";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";


/**
 * Tab页标签
 * @returns
 */
const HeaderTabs = () => {

    const { } = useSelector((state: RootState) => state.menu);

    const dispatch = useDispatch();

    return <div className={styles['container']}>
        <Tabs
            defaultActiveKey="2"
            items={[AppleOutlined, AndroidOutlined].map((Icon, i) => {
                const id = String(i + 1);
                return {
                    key: id,
                    label: `Tab ${id}`,
                    children: null,
                    icon: <Icon />,
                };
            })}
        />
    </div>
}

export default HeaderTabs;