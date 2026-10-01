import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="text-center mt-5">
            <h1>Oops!</h1>

            <h2>Something went wrong.</h2>

            <p>
                {error?.status || "Error"}{" "}
                {error?.statusText || error?.message}
            </p>

            <Link to="/" className="btn btn-primary">
                Go Home
            </Link>
        </div>
    );
};

export default ErrorPage;