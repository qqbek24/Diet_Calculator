import useDocumentTitle from "../components/useDocumentTitle";
import TableCountries from '../components/tableCountries';
import TableRules from '../components/tableRules';
import { Fragment } from "react";
// import {
//   useMsal,
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import LoginPage from "./login";
import { Box, Typography, Divider, Paper, useTheme } from "@mui/material";


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
            variant="h4"
            marginTop={10}
            fontStyle="italic"
            fontWeight="bold"
            color={theme.palette.text.secondary}
          >
            Countries & Rules
          </Typography>
        </Box>

        <Box 
          display = "flex" 
          justifyContent = "center" 
          alignItems = "center" 
          paddingTop = {3}
          sx = {{ "& > *": { m: 1, width: "90%" } }}
        >

          <Paper square = {false} elevation = {4} width = "xl">
            
            <Fragment>
              <Box display="flex" justifyContent="center" alignItems="center" paddingTop = {2}>
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  color={theme.palette.text.secondary}
                >
                  Rules
                </Typography>
              </Box>

              <Divider variant = "middle" />
              
              {/* <Box 
                display = "flex" 
                justifyContent = "center" 
                alignItems = "center" 
                paddingTop = {3}
                // paddingBottom = {2}
                paddingLeft = {1}
                paddingRight = {1}
              > */}

                <TableRules />

              {/* </Box> */}
            </Fragment>

            <Box 
              display = "flex" 
              justifyContent = "center" 
              alignItems = "center" 
              // paddingTop = {3}
              paddingBottom = {5}
              paddingLeft = {1}
              paddingRight = {1}
            >
              <Typography
                variant="subtitle2"
                fontStyle="italic"
                color={theme.palette.text.secondary}
              >
                * for other countries than Poland, there is no distinction between short and long trips (second position in table)
              </Typography>
            </Box>

            <Fragment>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  variant="h5"
                  fontStyle="italic"
                  color={theme.palette.text.secondary}
                >
                  Countries
                </Typography>
              </Box>

              <Divider variant = "middle" />

              {/* <Box 
                display = "flex" 
                justifyContent = "center" 
                alignItems = "center" 
                paddingTop = {3}
                paddingBottom = {2}
                paddingLeft = {1}
                paddingRight = {1}
              > */}

                <TableCountries />

              {/* </Box> */}
            </Fragment>

          </Paper>
        </Box>

        {/* FOOTER */}
        <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ left:0, bottom:0, right:0 }} >
          <Typography
            variant = "h8"
            marginTop = {2}
            marginBottom = {1}
            color = {theme.palette.text.secondary}
            sx = {{ fontSize: '12px',  color:'#6f6f6f',  fontWeight: 500 }}
          >
            © 2024 ArcelorMittal
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
