import useDocumentTitle from "../components/useDocumentTitle";
import { Fragment } from "react";
// import {
//   useMsal,
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import LoginPage from "./login";
import { Box, Typography, useTheme } from "@mui/material";

const UserAccountPage = () => {
  useDocumentTitle({ title: "Diet Calculator" });
  const theme = useTheme();

  // const WelcomeUser = () => {
  //   const { accounts } = useMsal();
  //   const account = accounts[0];
  //   if (account) {
  //     return (
  //       <Typography
  //         textAlign="center"
  //         fontStyle={"italic"}
  //         marginTop={3}
  //         fontWeight={"bold"}
  //         color={theme.palette.text.secondary}
  //       >
  //         Hello, {account.name.replace(",", "")}! Welcome to the app.
  //       </Typography>
  //     );
  //   }
  //   return;
  // };

  return (
    <Fragment>
      {/*<AuthenticatedTemplate>*/}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h2"
            marginTop={15}
            fontStyle="italic"
            fontWeight="bold"
            color={theme.palette.text.secondary}
          >
            User Account
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h5"
            fontStyle="italic"
            color={theme.palette.text.secondary}
          >
            information
          </Typography>
        </Box>
        {/* <WelcomeUser /> */}
      {/*</AuthenticatedTemplate>*/}
      {/*<AuthenticatedTemplate>
        <LoginPage />
      </AuthenticatedTemplate>*/}
    </Fragment>
  );
};

export default UserAccountPage;
