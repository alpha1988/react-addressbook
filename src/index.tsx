import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css';

import { Root } from "./routes/root/root";
import ErrorPage from "./routes/error-page/error-page";
import { UsersList } from "./routes/users-list/users-list";
import { User } from "./routes/user/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: '/',
				element: <UsersList/>
			},
			{
				path: 'users/:userId',
				element: <User/>
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router}/>
		</QueryClientProvider>
	</React.StrictMode>
);
