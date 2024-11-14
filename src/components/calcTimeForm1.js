import { useState } from "react";
import { 
  Box, 
  Stack,
  useTheme,
  TextField,
  Button,
  Typography, 
  Grid } from "@mui/material";
import DateTimePicker from '../components/DateTimePicker';
import { useCountry } from '../components/DataContextCountry';
import { daysTotalCount, listOfDays, timeConvert, countryData, dietCalculationDom, dateValidation } from '../components/myFunctions';


const style_1 = {
  paddingLeft: 1,
  paddingRight: 1,
  // paddingTop: 1,
  paddingBottom: 1,
  display: "flex",
  justifyContent: "center"
};

const style_2 = {
  paddingLeft: 1,
  paddingRight: 1,
  paddingBottom: 1,
  display: "flex",
  autoComplete: "off",
  justifyContent: "center"
};

const styleTypography = {
  variant: "h8",
  marginTop: 2,
  marginBottom: 1,
};


export default function CalcTimeForm1(props) {
  const [btnDisable, setBtnDisable ] = useState(true);
  const theme = useTheme();
  const { sharedCountry } = useCountry();
  const countryRecord = countryData(sharedCountry);
  const dietCutDom = props.value.length !== 0 ? props.value[1].dietCutt : '';

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const strStartDate = startDate;
  const strEndDate = endDate;
  const [dietQtyDom, setDietQtyDom] = useState(0);

  function startDateChangeHandler(date) {
    setStartDate(date);
    checkDateTime(1, date);
  }

  function endDateChangeHandler(date) {
    setEndDate(date);
    checkDateTime(2, date);
  }

  // validation of input date values and set disabled of save button state
  function checkDateTime(dateNum, date) {
    let chckNum = 0;
    let chckValue = true;

    if (dateNum !== 1) {
      chckNum += dateValidation(startDate) === false ? 1 : 0;
    };
    if (dateNum !== 2) {
      chckNum += dateValidation(endDate) === false ? 1 : 0;
    };

    chckNum += dateValidation(date) === false ? 1 : 0;

    chckValue = chckNum === 0 ? false : true;
    setBtnDisable(chckValue);
  }

  function prepareRowsJson(dietCalcDom) {
    // Calculate the total days number rounded up
    var daysTotal = daysTotalCount(startDate, endDate);
    var listOfTripDays = listOfDays(startDate, endDate, sharedCountry);

    var resultJSON = {
      country: sharedCountry, 
      countryData: countryRecord,
      dCountryDiet: dietCalcDom,
      dCountry: '',
      dCountryRec: countryRecord,
      countryTimes: {
        domCountry1Start: startDate,
        domCountry1End: endDate,
        extCountry2Start: '',
        extCountry2End: '',
        domCountry3Start: '',
        domCountry3End: '',
      },
      daysTotal: daysTotal,
      startDateOverall: startDate, 
      endDateOverall: endDate,
      daysList: listOfTripDays,
      Currency: 1,
      CurrencyCode: (countryRecord[0].Waluta),
      apiCurrencyDate: '',
      apiCurrencyDocNo: '',
      elapsedTimeDom: '',
    }

    return resultJSON
  }

  function setVarTimePL() {
    if (startDate !== null && endDate !== null && dateValidation(startDate) === true && dateValidation(endDate) === true) {
      let timeDietCalcDom = dietCalculationDom(timeConvert(startDate, endDate, 'dhm'));
      setDietQtyDom(timeDietCalcDom);
      let rows = prepareRowsJson(timeDietCalcDom);

      // console.log('TimeCalculation - rows - calcTimeForm1');
      // console.log(rows);

      props.onChange(rows)
    };
  }

  return (
    <Box 
      display = "flex"
      position = "center" 
      justifyContent = "center" 
      alignItems = "center" 
      paddingLeft = {1}
      paddingRight = {1}
    >
      <Grid item xs = {12} sm >

        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingBottom = {1}
        >
          <Grid item >
            <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
              Country
            </Typography>
            <Box sx = {style_2} >
              <TextField
                id = "outlined-basic"
                size = "small"
                disabled
                value = {sharedCountry}  
                sx = {{ width: '200px'}}
              />
            </Box>
          </Grid>
          
          <Stack direction = "row" useFlexGap flexWrap = "wrap" >
            <Grid item xs>
              <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                Start
              </Typography>
              <Box sx = {style_1} >
                <DateTimePicker  
                  date = {startDate}
                  onChange = {startDateChangeHandler}
                />
              </Box>
            </Grid>

            <Grid item xs>
              <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                End
              </Typography>
              <Box sx = {style_1} >
                <DateTimePicker 
                  date = {endDate}
                  onChange = {endDateChangeHandler}
                />
              </Box>
            </Grid>
          </Stack>

          <Stack direction = "row" useFlexGap flexWrap = "wrap" justifyContent = "center" >
            <Stack direction = "row" useFlexGap flexWrap = "wrap" >
              <Grid item >
                <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                  Time
                </Typography>
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {(endDate && dateValidation(strEndDate) === true && dateValidation(strStartDate) === true) ? timeConvert(strStartDate, strEndDate) : ''} // timeConvert function (time diff conv. to minutes)
                    variant = "outlined"
                    disabled
                    sx = {{ width: '120px' }}
                  />
                </Box>
              </Grid>

              <Grid item >
                <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                  Qty.
                </Typography>
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {dietQtyDom ? dietQtyDom : ''}  
                    variant = "outlined"
                    disabled
                    sx = {{ width: '100px' }}
                  />
                </Box>
              </Grid>
            </Stack>

            <Stack direction = "row" useFlexGap flexWrap = "wrap" >
              <Grid item >
                <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                  Calcul. time
                </Typography>
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {(endDate && dateValidation(strEndDate) === true && dateValidation(strStartDate) === true) ? timeConvert(strStartDate, strEndDate) : ''}
                    variant = "outlined"
                    disabled
                    sx = {{ width: '120px' }}
                  />
                </Box>
              </Grid>

              <Grid item >
                <Typography sx = {styleTypography} color = {theme.palette.text.secondary}>
                  Diet Cutting
                </Typography>
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {dietCutDom}
                    variant = "outlined"
                    disabled
                    sx = {{ width: '100px' }}
                  />
                </Box>
              </Grid>
            </Stack>

          </Stack>
        </Stack>
        
        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingBottom = {1}
        >
          <Button disabled = {btnDisable} variant = "contained" sx={{ my: 2, displayPrint: 'none' }} onClick={setVarTimePL} >
            Save time calculation
          </Button>
        </Stack>

      </Grid>
        
    </Box>
  
  );
}