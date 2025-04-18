import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import { Suspense } from 'react'
import { store } from '@/store/store'

// 加载中组件
const Loading = () => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>加载中...</div>

const App = () => {

	return <Provider store={store}>
		<Suspense fallback={<Loading />}>
			<Outlet />
		</Suspense>
	</Provider>
}

export default App
