import { Outlet } from "react-router";
import styles from "./index.module.less";
import { IProps } from "./index.types";

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutContent = (props: IProps) => {

    const { } = props;

    return (
        <div className={styles['container']}>
            <Outlet />
        </div>
    )
}

export default LayoutContent
