import useDocumentTitle from "../components/useDocumentTitle";
// import { useData } from '../components/DataContext';
import { useCountry } from '../components/DataContextCountry';
import CalcTimeForm1 from '../components/calcTimeForm1';
import CalcTimeForm2 from '../components/calcTimeForm2';
import CalcFoodForm from '../components/calcFoodForm';
import CalcDietFinalForm2 from '../components/calcDietFinalForm';
import { dietFinalCalculation } from '../components/myFunctions';

import { useState, Fragment } from "react";
// import {
// 	useMsal,
// 	AuthenticatedTemplate,
// 	UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import LoginPage from "./login";
import { 
  Box, 
  Typography, 
  useTheme, 
  Paper, 
  Button, 
  Modal, 
  Stack, 
  Divider, 
} from "@mui/material";
import PdfCard from "../pdf_report_files/pdfCard";


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


const NewCalculation = () => {
  useDocumentTitle({ title: "Diet Calculator" });
  const theme = useTheme();
  
  const [pdfCreate, setPdfCreate] = useState(false);
  const handleCreatePDF = () => setPdfCreate(true)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const { sharedVariable } = useData();
  const { sharedCountry } = useCountry();
  const domCountry = (sharedCountry !== 'Poland') ? 'Poland' : '';

  const [jsonTimeResult, setJsonTimeResult] = useState(null);
  const [jsonDaysList, setJsonDaysList] = useState([]);
  const [jsonFinalCalcList, setJsonFinalCalcList] = useState([]);
  const [jsonFinalCalc, setJsonFinalCalc] = useState([]);
  
  const [foodCalcReadyState, setFoodCalc] = useState(false);
  const [finalCalcReadyState, setFinalCalc] = useState(false);
  const [pdfCardReadyState, setPdfCard] = useState(false); 

  
  function foodCalcReady (data) {
    setFoodCalc(data);
  }

  function finalCalcReady (data) {
    setFinalCalc(data);
  }

  function pdfCardReady (data) {
    setPdfCard(data);
  }

  // const scrollToElement = (elementID) => {
  //   var element = document.getElementById(elementID)
  //   window.scrollTo({
  //     top: element.scrollIntoView(true) ,
  //     behavior: 'smooth',
  //   });
  // };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight ,
      behavior: 'smooth',
    });
  };

  function getTimeCalc (data) {
    setPdfCreate(false);
    setFinalCalc(false);
    setFoodCalc(true);
    // result of set time range by user
    setJsonTimeResult (data);
    // data for Food calculation table - complete days list per country
    setJsonDaysList (data.daysList);
  }

  function getJsonFinalCalcList() {
    setFinalCalc(true);
    let finalCalcList_1 = (jsonTimeResult !== null) && dietFinalCalculation(jsonTimeResult);
    setJsonFinalCalc(finalCalcList_1);
    (jsonTimeResult !== null && domCountry !== '') ? setJsonFinalCalcList (finalCalcList_1) : setJsonFinalCalcList ([finalCalcList_1[1]]);
  }

  // const WelcomeUser = () => {
  // 	const { accounts } = useMsal();
  // 	const account = accounts[0];
  // 	if (account) {
  // 	return (
  // 		<Typography
  //       textAlign = "center"
  //       fontStyle = {"italic"}
  //       marginTop = {3}
  //       fontWeight = {"bold"}
  //       color = {theme.palette.text.secondary}
  // 		>
  // 		  Hello, {account.name.replace(",", "")}! Welcome to the app.
  // 		</Typography>
  // 	);
  // 	}
  // 	return;
  // };


    return (
      <Fragment>
        {/*<AuthenticatedTemplate>*/}
          <Box display = "flex" justifyContent = "center" alignItems = "center">
            <Typography
              variant = "h5"
              marginTop = {15}
              marginBottom = {2}
              fontStyle = "italic"
              fontWeight = "bold"
              color = {theme.palette.text.secondary}
            >
              New diets calculation
            </Typography>
          </Box>

          <Box display = "flex" justifyContent = "center" alignItems = "center">
            <Typography
              variant = "h6"
              fontStyle = "italic"
              color = {theme.palette.text.secondary}
            >
              {/* Expense number hidden after customer request, not needed this time */}
              for country: {sharedCountry}.
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
              
              <Box display = "flex" justifyContent = "center" alignItems = "center">
                <Typography
                  variant = "h8"
                  marginTop = {3}
                  marginBottom = {1}
                  color = {theme.palette.text.secondary}
                >
                  Real time calculation
                </Typography>
              </Box>

              <Divider variant = "middle" />
              
              <Box 
                display = "flex" 
                justifyContent = "center" 
                alignItems = "center" 
                paddingTop = {3}
                paddingBottom = {2}
                paddingLeft = {1}
                paddingRight = {1}
              >

                { (sharedCountry) === 'Poland' && <CalcTimeForm1 onChange = {getTimeCalc} value = {jsonFinalCalc}/> }
                { (sharedCountry) !== 'Poland' && <CalcTimeForm2 onChange = {getTimeCalc} secondCountry = {domCountry} value = {jsonFinalCalc}/> }
                  
              </Box>              
              

              { jsonDaysList.length !== 0 && foodCalcReadyState === true &&
                <Fragment>
                  <Box display = "flex" justifyContent = "center" alignItems = "center">
                    <Typography
                      id = "topFoodCalc"
                      variant  =  "h8"
                      marginTop  =  {6}
                      marginBottom  =  {1}
                      color = {theme.palette.text.secondary}
                    >
                      Food calculation
                    </Typography>
                  </Box>

                  <Divider variant = "middle" />
                  
                  <CalcFoodForm value = {jsonDaysList} onChange = {getJsonFinalCalcList} readyState = {foodCalcReady}/>
                  {/* { foodCalcReadyState === true && scrollToElement("btnSaveTimeCalc") } */}
                  {/* { foodCalcReadyState === true && scrollToBottom() } */}

                </Fragment> 
              }


              { jsonFinalCalcList.length !== 0 && finalCalcReadyState === true &&
                <Fragment>
                  <Box display = "flex" justifyContent = "center" alignItems = "center">
                    <Typography
                      variant = "h8"
                      marginTop = {6}
                      marginBottom = {1}
                      color = {theme.palette.text.secondary}
                    >
                      Diets calculation
                    </Typography>
                  </Box>

                  <Divider variant = "middle" />

                  <CalcDietFinalForm2 value = {jsonFinalCalcList} readyState = {finalCalcReady}/>
                  {/* { finalCalcReadyState === true && scrollToBottom() } */}

                  <Button variant = "contained" sx = {{ my: 2, displayPrint: 'none' }} onClick = {handleOpen} color = "secondary">
                    Create PDF report
                  </Button>

                </Fragment> 
              }


              { pdfCreate === true && 
                <Box display = "flex" justifyContent = "center" alignItems = "center" paddingTop = {3} paddingBottom = {3}>
                  <PdfCard title = "Your pdf report" finalCalcList = {jsonFinalCalcList} timeCalc = {jsonTimeResult} readyState = {pdfCardReady}/>
                  { pdfCardReadyState === true && scrollToBottom() }
                </Box> 
              }


            </Paper>            
          </Box>
          
          {/* FOOTER */}
          {/* <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ left:0, bottom:0, right:0, position:"fixed" }} > */}
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

          <Modal
            open = {open}
            onClose = {handleClose}
            aria-labelledby = "modal-modal-title"
            aria-describedby = "modal-modal-description"
          >
            <Box sx = {style}>
              <Typography 
                id = "modal-modal-description" 
                sx = {{ mt: 2 }}
                variant = "h8"
                color = {theme.palette.text.secondary}
              >
                Ready ?

                Your diet calculation will be read-only and you can't change them !
              </Typography>
              
              <Stack 
                paddingTop = {2}
                direction = "row" 
                spacing = {2} 
                margin = {1} 
                alignItems = "center" 
                justifyContent = "center" 
                display = "flex" 
              >
                <Button 
                  variant = "contained" 
                  onClick = {() => {
                    handleClose();
                    handleCreatePDF();
                  }}
                >
                  OK
                </Button>

                <Button variant = "contained" onClick = {handleClose}>
                  Cancel
                </Button>
              </Stack>
            </Box>

          </Modal>

          {/* <WelcomeUser /> */}
        {/*</AuthenticatedTemplate>*/}
        {/*<AuthenticatedTemplate>
          <LoginPage />
        </AuthenticatedTemplate>*/}
      </Fragment>
    );
};

export default NewCalculation;
