import { decrement, increment } from "@/store/counter/counterSlice";
import styles from "./index.module.less";
import { useSelector, useDispatch } from 'react-redux'
import { IProps } from "./index.types";
import { RootState } from "@/store/store";
import { useRouteHandle } from "@/routers/hooks/useRouteHandle";
import { useEffect } from "react";

const Home = (props: IProps) => {

    const { title, icon } = useRouteHandle();

    const { } = props;

    const count = useSelector((state: RootState) => state.counter.value)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("HOME 挂载");
        return () => {
            console.log("HOME 卸载");
        }
    }, [])

    return (
        <div className={styles['container']}>
            {title}
            {icon}
            <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
            >
                Increment
            </button>
            <span>{count}</span>
            <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
            >
                Decrement
            </button>
        </div>
    )
}

export default Home
