import React from "react";
import { NavLink, useRouteError } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NotFound = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const notFound = useRouteError();
  console.error(notFound);

  return (
    <div id="error-page" className="text-center mt-5 ">
      <h1 className="text-bg-danger mb-4">Oops!</h1>
      <p>Sorry, Page not found.</p>
      <p>
        <i>{notFound.statusText || notFound.message}</i>
      </p>
      <NavLink to="/">
        <Button variant="dark" className="rounded-start">
          Go Back
        </Button>
      </NavLink>
    </div>
  );
};

export default NotFound;
