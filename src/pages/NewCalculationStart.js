import useDocumentTitle from "../components/useDocumentTitle";
import DropDownCountry from "../components/dropDownCountry";
// import { useData } from '../components/DataContext';
import { useCountry } from '../components/DataContextCountry';

import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Fragment } from "react";
// import {
//   useMsal,
//   AuthenticatedTemplate,
//   UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import LoginPage from "./login";
import { Box, Typography, useTheme, Paper, Button, Modal, Stack } from "@mui/material";
// import { TextField } from "@mui/material";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "xl",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};


const NewCalculationStart = () => {
  useDocumentTitle({ title: "Diet Calculator" });
  const theme = useTheme();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {if (sharedCountry) { setOpen(true); }};
  const handleClose = () => setOpen(false);
  
  const { sharedCountry } = useCountry('');
  // eslint-disable-next-line
  // const { sharedVariable, setSharedVariable } = useData('');

  // ---> 'Expense number hidden after customer request, not needed this time'
  // const [ExpNr, setExpenseNr] = React.useState('');
  // const handleChange = (event) => {
  //   setExpenseNr(event.currentTarget.value);
  //   setSharedVariable(event.currentTarget.value);
  // }

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
            variant="h5"
            marginTop={15}
            marginBottom={3}
            fontStyle="italic"
            fontWeight="bold"
            color={theme.palette.text.secondary}
          >
            New diets calculation
          </Typography>
        </Box>

        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          sx={{ "& > *": { m: 1, width: "70%" } }}
        >
          <Paper square={false} elevation={4} width="xl">

            {/* 'Expense number hidden after customer request, not needed this time' */}
            {/* <Box
              paddingTop={3}
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1 },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                size="small" 
                label="ex. 444444"
                variant="outlined"
                name="expenseNr"
                value={ExpNr}
                onChange={handleChange}
              />
            </Box> */}
            
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                variant="h8"
                marginTop={3}
                marginBottom={2}
                color={theme.palette.text.secondary}
              >
                Destination country (choose Poland -on the list below- for domestic travels):
              </Typography>
            </Box>

            <Box 
              display="flex" 
              justifyContent="center" 
              alignItems="center" 
              paddingBottom={2}
              paddingLeft={1}
              paddingRight={1}
            >

              <DropDownCountry />
                
            </Box>
            
            <Button 
              variant="contained" 
              sx={{ my: 2 }} 
              onClick={handleOpen}
            >
              Create new diet calculation...
            </Button>
          </Paper>
        </Box>
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography 
              id="modal-modal-description" 
              sx={{ mt: 2 }}
              variant="h8"
              color={theme.palette.text.secondary}
            >
              {/* Create new diets calculation for expense nr: {ExpNr} and country: {sharedCountry}. */}
              Create new diets calculation for country: {sharedCountry}.
            </Typography>
            
            <Stack 
              paddingTop={2}
              direction="row" 
              spacing={2} 
              margin={1} 
              alignItems="center" 
              justifyContent="center" 
              display="flex" 
            >
              <Button 
                variant="contained" 
                onClick={() => {
                  handleClose();
                  return navigate("/newcalculation");
                }}
              >
                OK
              </Button>

              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* FOOTER */}
        <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ left:0, bottom:0, right:0, position:"fixed" }} >
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

export default NewCalculationStart;
