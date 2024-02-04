import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import Button from "react-bootstrap/Button";

const NotFound = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const notFound = useRouteError();
  const history = useNavigate();
  console.error(notFound);

  const handleGoBack = () => {
    history(-1);
  };

  return (
    <div id="error-page" className="text-center mt-5 ">
      <h1 className="text-bg-danger mb-4">Oops!</h1>
      <p>Sorry, Page not found.</p>
      <p>
        <i>{notFound.statusText || notFound.message}</i>
      </p>
      <Button variant="dark" className="rounded-start" onClick={handleGoBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;
