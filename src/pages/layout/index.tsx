import { Provider } from "react-redux";
import LayoutContent from "./components/LayoutContent";
import LayoutHeader from "./components/LayoutHeader";
import LayoutSider from "./components/LayoutSider";
import styles from "./index.module.less";
import { IProps } from "./index.types";
import { store } from "@/store/store";
import { Suspense } from "react";

// 加载中组件
const Loading = () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>加载中...</div>


/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutPage = (props: IProps) => {

    const { } = props;

    return (
        <Provider store={store}>
            <div className={styles['container']}>
                <div className={styles['left']}>
                    <LayoutSider />
                </div>
                <div className={styles['right']}>
                    <div className={styles['header']}>
                        <LayoutHeader />
                    </div>
                    <div className={styles['content']}>
                        <Suspense fallback={<Loading />}>
                            <LayoutContent />
                        </Suspense>
                    </div>
                </div>
            </div>
        </Provider>

    )
}

export default LayoutPage
