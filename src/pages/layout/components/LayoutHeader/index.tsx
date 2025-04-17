import styles from "./index.module.less";
import { IProps } from "./index.types";

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutHeader = (props: IProps) => {

    const { } = props;

    return (
        <div className={styles['container']}>
            <div>LayoutHeader</div>
        </div>
    )
}

export default LayoutHeader
