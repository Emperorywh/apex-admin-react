import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { IProps } from "./index.types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { changeInlineCollapsed } from "@/store/menu/menuSlice";

/**
 * 布局组件
 * @param props 
 * @returns 
 */
const LayoutHeader = (props: IProps) => {

    const { } = props;

    const { inlineCollapsed } = useSelector((state: RootState) => state.menu);
    console.log(inlineCollapsed)

    const dispatch = useDispatch();

    return (
        <div className={styles['container']}>
            <div>
                {
                    inlineCollapsed ?
                        <MenuUnfoldOutlined style={{ fontSize: 24 }} onClick={() => dispatch(changeInlineCollapsed(false))} /> :
                        <MenuFoldOutlined style={{ fontSize: 24 }} onClick={() => dispatch(changeInlineCollapsed(true))} />
                }
            </div>
        </div>
    )
}

export default LayoutHeader
