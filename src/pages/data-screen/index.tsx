import { useEffect } from "react";
import { IProps } from "./index.types";

const Index = (props: IProps) => {

    const { } = props;

    useEffect(() => {
        console.log("数据大屏 挂载");
        return () => {
            console.log("数据大屏 卸载");
        }
    }, [])

    return (
        <div>
            <div>数据大屏</div>
        </div>
    )
}

export default Index;
