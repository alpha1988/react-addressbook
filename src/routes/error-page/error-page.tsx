import { useRouteError } from "react-router-dom";
import './error-page.css';

type ErrorResponse = {
	statusText?: string;
	message?: string;
};

export const ErrorPage = () => {
	const error = useRouteError() as ErrorResponse;

	return (
		<div className="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{error?.statusText || error?.message}</i>
			</p>
		</div>
	);
}