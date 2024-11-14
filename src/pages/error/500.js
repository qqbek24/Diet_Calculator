import * as React from "react";
import ErrorPage from "../../components/errorPage";

const Page500 = () => {
  return (
    <ErrorPage code="500" message="Internal Server Error, Contact Admin" />
  );
};

export default Page500;
