import ErrorPage from "../../components/errorPage";

const Page401403 = () => {
  const text = "you are not authorized to view the page";

  return <ErrorPage code="401" message={text} />;
};

export default Page401403;
