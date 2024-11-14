import useDocumentTitle from "../components/useDocumentTitle";
import { Fragment } from "react";
// import ChatBotComp from "../components/chatBot";
import AMlogo_bckgrnd from "../Assets/arcelormittal-logo-light.png";
// import {
//     useMsal,
//     AuthenticatedTemplate,
//     UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import LoginPage from "./login";
import { Box, Typography, useTheme, Paper } from "@mui/material";

const HomePage = () => {
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
            variant="h4"
            marginTop={15}
            fontStyle="italic"
            fontWeight="bold"
            color={theme.palette.text.secondary}
          >
            Welcome to New Diet Calculator
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="h6"
            marginTop={3}
            fontStyle="italic"
            color={theme.palette.text.secondary}
          >
            to create new Diets calculation click <Box component="span" fontWeight='bold'>"New Calculation"</Box> above
          </Typography>
        </Box>

        {/* <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{ "& > *": { m: 1, width: "70%" } }}
        >
          <ChatBotComp />
        </Box> */}

        {/* <Box display="flex" justifyContent="center" alignIteczyli ms="center" paddingTop={25}>
          <img style={{ width: "50%", height: "50%", opacity: 0.18 }} src={AMlogo_bckgrnd}></img>
        </Box> */}

        {/* FOOTER */}
        {/* <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ left:0, bottom:0, right:0, position:"fixed" }} >
          <Typography
            variant = "h8"
            marginTop = {2}
            marginBottom = {1}
            color = {theme.palette.text.secondary}
            sx = {{ fontSize: '12px',  color:'#6f6f6f',  fontWeight: 500 }}
          >
            © 2024 ArcelorMittal
          </Typography>
        </Box> */}

        {/* <WelcomeUser /> */}
      {/*</AuthenticatedTemplate>*/}
      {/*<AuthenticatedTemplate>
          <LoginPage />
      </AuthenticatedTemplate>*/}
    </Fragment>
  );
};

export default HomePage;
