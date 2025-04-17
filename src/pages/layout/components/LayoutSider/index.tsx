import styles from "./index.module.less";
import { IProps } from "./index.types";

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutSider = (props: IProps) => {

    const { } = props;

    return (
        <div className={styles['container']}>
            <h1>LayoutSider</h1>
        </div>
    )
}

export default LayoutSider
