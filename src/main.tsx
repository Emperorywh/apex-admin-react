import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>,
)
