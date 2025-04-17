import LayoutContent from "./components/LayoutContent";
import LayoutHeader from "./components/LayoutHeader";
import LayoutSider from "./components/LayoutSider";
import styles from "./index.module.less";
import { IProps } from "./index.types";

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutPage = (props: IProps) => {

    const { } = props;

    return (
        <div className={styles['container']}>
            <div className={styles['left']}>
                <LayoutSider />
            </div>
            <div className={styles['right']}>
                <div className={styles['header']}>
                    <LayoutHeader />
                </div>
                <div className={styles['content']}>
                    <LayoutContent />
                </div>
            </div>
        </div>
    )
}

export default LayoutPage
