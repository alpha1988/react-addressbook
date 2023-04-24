import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, } from "react-router-dom";
import { router } from "./index-routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router}/>
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);
