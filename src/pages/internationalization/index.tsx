import { useEffect } from "react";
import { IProps } from "./index.types";

const Index = (props: IProps) => {

    const { } = props;

    useEffect(() => {
        console.log("国际化 挂载");
        return () => {
            console.log("国际化 卸载");
        }
    }, [])

    return (
        <div>
            <div>国际化</div>
        </div>
    )
}

export default Index;
