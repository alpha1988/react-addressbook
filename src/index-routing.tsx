import { createBrowserRouter } from "react-router-dom";
import { Root } from "./routes/root/root";
import { ErrorPage } from "./routes/error-page/error-page";
import { UsersList } from "./routes/users-list/users-list";
import { User } from "./routes/user/user";
import React from "react";
import { APP_ROUTES } from "./index-routing.constants";

export const router = createBrowserRouter([
	{
		path: APP_ROUTES.BASE,
		element: <Root/>,
		errorElement: <ErrorPage/>,
		children: [
			{
				path: APP_ROUTES.BASE,
				element: <UsersList/>
			},
			{
				path: APP_ROUTES.USER_DETAILS,
				element: <User/>
			}
		]
	}
]);