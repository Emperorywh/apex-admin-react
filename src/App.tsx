import styles from "./index.module.less";
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './store/counter/counterSlice'
import { RootState } from "./store/store";

function App() {

	const count = useSelector((state: RootState) => state.counter.value)

	const dispatch = useDispatch()

	return (
		<div className={styles['container']}>
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

export default App
