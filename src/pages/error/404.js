import ErrorPage from "../../components/errorPage";

const Page404 = () => {
  const text = "The page you are trying to reach either does not exist!!!";

  return <ErrorPage code="404" message={text} />;
};

export default Page404;
