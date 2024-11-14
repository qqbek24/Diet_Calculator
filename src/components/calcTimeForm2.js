import { useState } from "react";
import { 
  Box, 
  Stack,
  useTheme,
  Divider,
  TextField,
  Button, 
  Typography,
  Grid } from "@mui/material";
import DateTimePicker from '../components/DateTimePicker';
import { useCountry } from '../components/DataContextCountry';
import { daysTotalCount, listOfDays, timeConvert, countryData, dietCalculation, dietCalculationDom, dateValidation, apiDateValidation } from '../components/myFunctions';
import axios from "axios";
import dayjs from "dayjs";


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


export default function CalcTimeForm2(props) {
  const [btnDisable, setBtnDisable ] = useState(true);
  const theme = useTheme();
  const { sharedCountry } = useCountry();
  const domCountry = props.secondCountry;
  const countryRecord = countryData(sharedCountry);
  const domCountryRecord = countryData(domCountry);
  const dietCut = props.value.length !== 0 ? Number(props.value[0].dietCutt).toFixed(2) : '';
  const dietCutDom = props.value.length !== 0 ? Number(props.value[1].dietCutt).toFixed(2) : '';

  const [startDate, setStartDate] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [endDate3, setEndDate3] = useState(null);
  const strStartDate1 = startDate;
  const [strStartDate2, setStartDate2] = useState(null);
  // eslint-disable-next-line
  const [strStartDate3, setStartDate3] = useState(null);

  const [elapsedTimePL, setElapsedTimePL] = useState(null);
  const [dietQtyDom, setDietQtyDom] = useState(0);
  const [dietQty, setDietQty] = useState(0);

  // ---> API currency call - NBP
  const [apiLoaded, setApiLoaded] = useState(false);
  const [apiCurrencyVal, setApiCurrencyResp] = useState(null);
  const [apiCurrencyDate, setApiCurrencyDate] = useState(null);
  const [apiCurrencyNo, setApiCurrencyNo] = useState(null);

  // eslint-disable-next-line
  const resApiCurr = (startDate !== null && apiLoaded === false && countryRecord[0].Waluta !== 'PLN') && currencyCode(countryRecord[0].Waluta);

  async function currencyCode(currCode) {
    setApiLoaded(true);
    let stringDate = startDate.format('YYYY-MM-DD').toString();
    let StringDateBefore7 = startDate.subtract(7, 'day').format('YYYY-MM-DD').toString();
    
    if (apiDateValidation(startDate) === false) {
      var currentDay = new Date();
      var currentDayJS = dayjs(currentDay);
      stringDate = currentDayJS.format('YYYY-MM-DD').toString();
    }
    // NBP API documentation: 'https://api.nbp.pl/'
    // let apiString = 'https://api.nbp.pl/api/exchangerates/rates/a/' + currCode + '/?format=json';
    if (dateValidation(startDate) === true) {
      let apiString = 'https://api.nbp.pl/api/exchangerates/rates/a/' + currCode + '/' + StringDateBefore7 + '/' + stringDate + '/?format=json';
      
      await axios.get(apiString)
        .then((res) => {
          let resDataLn = res.data.rates.length - 1;
          setApiCurrencyResp(res.data.rates[resDataLn].mid);
          setApiCurrencyDate(res.data.rates[resDataLn].effectiveDate);
          setApiCurrencyNo(res.data.rates[resDataLn].no);
        })
        .catch((err) => {
          console.log("currency api call got error", err);
          setApiCurrencyResp(0);
          setApiCurrencyDate(null);
          setApiCurrencyNo(null);
        })
    };
  }
  // <--- API currency call - NBP

  // Start dates
  function startDateChangeHandler(date) {
    setStartDate(date);
    setApiLoaded(false);
    setApiCurrencyDate(date);
    checkDateTime(1, date);
  }

  // End dates
  function endDateChangeHandler1(date) {
    setEndDate1(date);
    checkStartDates();
    checkDateTime(2, date);
  }

  function endDateChangeHandler2(date) {
    setEndDate2(date);
    checkStartDates();
    checkDateTime(3, date);
  }

  function endDateChangeHandler3(date) {
    setEndDate3(date);
    checkStartDates();
    checkDateTime(4, date);
  }

  function checkStartDates() {
    endDate1 && setStartDate2(endDate1.add(1, 'minute'));
    endDate2 && setStartDate3(endDate2.add(1, 'minute'));
  }

  // validation of input date values and set disabled of save button state
  function checkDateTime(dateNum, date) {
    let chckNum = 0;
    let chckValue = true;

    if (dateNum !== 1) {
      chckNum += dateValidation(startDate) === false ? 1 : 0;
    };
    if (dateNum !== 2) {
      chckNum += dateValidation(endDate1) === false ? 1 : 0;
    };
    if (dateNum !== 3) {
      chckNum += dateValidation(endDate2) === false ? 1 : 0;
    };
    if (dateNum !== 4) {
      chckNum += dateValidation(endDate3) === false ? 1 : 0;
    };
    chckNum += dateValidation(date) === false ? 1 : 0;

    chckValue = chckNum === 0 ? false : true;
    setBtnDisable(chckValue);
  }

  function prepareRowsJson(dietCalc, dietCalcDom, elapsedTimeD) {
    // Calculate the total days number - rounded up
    var daysTotal = daysTotalCount(strStartDate1, endDate3);

    var domStartDays = listOfDays(startDate, endDate1, domCountry);
    var extDays = listOfDays(endDate1.add(1, 'minute'), endDate2, sharedCountry, domStartDays.slice(-1)[0].id + 1);
    var domEndDays = listOfDays(endDate2.add(1, 'minute'), endDate3, domCountry, extDays.slice(-1)[0].id + 1);
    var listOfTripDays = domStartDays.concat(extDays, domEndDays);

    var resultJSON = {
      country: sharedCountry, 
      countryData: countryRecord,
      countryDiet: dietCalc,
      dCountryDiet: dietCalcDom,
      dCountry: domCountry,
      dCountryRec: domCountryRecord,
      countryTimes: {
        domCountry1Start: startDate,
        domCountry1End: endDate1,
        extCountry2Start: endDate1.add(1, 'minute'),
        extCountry2End: endDate2,
        domCountry3Start: endDate2.add(1, 'minute'),
        domCountry3End: endDate3,
      },
      daysTotal: daysTotal,
      startDateOverall: strStartDate1, 
      endDateOverall: endDate3,
      daysList: listOfTripDays,
      Currency: apiCurrencyVal,
      CurrencyCode: (countryRecord[0].Waluta),
      apiCurrencyDate: apiCurrencyDate,
      apiCurrencyDocNo: apiCurrencyNo,
      elapsedTimeDom: elapsedTimeD,
    }

    return resultJSON
  }

  function setVarTimePL() {
    if (endDate1 && strStartDate1) {
      var rowElapsedTime1 = timeConvert(strStartDate1, endDate1);
    }
    if (endDate2 && strStartDate2) {
      var rowElapsedTime2 = timeConvert(endDate2.add(1, 'minute'), endDate3);
    }
    if (rowElapsedTime1 && rowElapsedTime2) {
      var elapsedTimePL = timeConvert(strStartDate1, endDate1, 'value', endDate2.add(1, 'minute'), endDate3);
      setElapsedTimePL(elapsedTimePL);
      let timeDietCalcDom = dietCalculationDom(timeConvert(strStartDate1, endDate1, 'dhm', endDate2.add(1, 'minute'), endDate3));
      let timeDietCalc = dietCalculation(timeConvert(endDate1.add(1, 'minute'), endDate2, 'dhm'));
      setDietQtyDom(timeDietCalcDom);
      timeDietCalc === 0.333333333 ? setDietQty(Number(timeDietCalc.toFixed(4))) : setDietQty(timeDietCalc);

      let rows = prepareRowsJson(timeDietCalc, timeDietCalcDom, elapsedTimePL);

      // console.log('TimeCalculation - rows - calcTimeForm2');
      // console.log(rows);

      props.onChange(rows)
    }
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
                  value = {domCountry} 
                  sx = {{ width: '200px' }}
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
                    DisableState = {false} 
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
                      DisableState = {false} 
                      date = {endDate1}
                      onChange = {endDateChangeHandler1}
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
                      value = {(endDate1 && dateValidation(endDate1) === true && dateValidation(strStartDate1) === true) ? timeConvert(strStartDate1, endDate1) : ''} 
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
                      value = ""
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
                      value = "" 
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
                      value = "" 
                      variant = "outlined"
                      disabled
                      sx = {{ width: '100px' }}
                    />
                  </Box>
                </Grid>
              </Stack>

            </Stack>
        </Stack>
        
        <Divider variant = "middle" />
        
        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingTop = {2}
          paddingBottom = {1}
        >
          <Grid item >
            <Box sx = {style_2} >
              <TextField
                id = "outlined-basic"
                size = "small"
                disabled
                value = {sharedCountry} 
                sx = {{ width: '200px' }}
              />
            </Box>
          </Grid>

          <Stack direction = "row" useFlexGap flexWrap = "wrap" >
            <Grid item xs>
              <Box sx = {style_1} >
                <DateTimePicker 
                  DisableState = {true} 
                  date = {endDate1 && endDate1.add(1, 'minute')}
                  // onChange = {startDateChangeHandler2}
                />
              </Box>
            </Grid>
            
            <Grid item xs>
              <Box sx = {style_1} >
                <DateTimePicker 
                  DisableState = {false} 
                  date = {endDate2}
                  onChange = {endDateChangeHandler2}
                />
              </Box>
            </Grid>
          </Stack>

          <Stack direction = "row" useFlexGap flexWrap = "wrap" justifyContent = "center" >
            <Stack direction = "row" useFlexGap flexWrap = "wrap" >
              <Grid item >
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {(endDate2 && dateValidation(endDate2) === true && dateValidation(endDate1) === true) ? timeConvert(endDate1.add(1, 'minute'), endDate2) : ''} 
                    variant = "outlined"
                    disabled
                    sx = {{ width: '120px' }}
                  />
                </Box>
              </Grid>

              <Grid item >
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {dietQty ? dietQty : ''}   
                    variant = "outlined"
                    disabled
                    sx = {{ width: '100px' }}
                  />
                </Box>
              </Grid>
            </Stack>

            <Stack direction = "row" useFlexGap flexWrap = "wrap" >
              <Grid item >
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = ''
                    variant = "outlined"
                    disabled
                    sx = {{ width: '120px' }}
                  />
                </Box>
              </Grid>

              <Grid item >
                <Box sx = {style_2} >
                  <TextField
                    id = "outlined-basic"
                    size = "small" 
                    value = {dietCut}  
                    variant = "outlined"
                    disabled
                    sx = {{ width: '100px' }}
                  />
                </Box>
              </Grid>
            </Stack>

          </Stack>
        </Stack>
        
        <Divider variant = "middle" />

        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingTop = {2}
          paddingBottom = {1}
        >
            <Grid item >
              <Box sx = {style_2} >
                <TextField
                  id = "outlined-basic"
                  size = "small"
                  disabled
                  value = {domCountry} 
                  sx = {{ width: '200px' }}
                />
              </Box>
            </Grid>

            <Stack direction = "row" useFlexGap flexWrap = "wrap" >
              <Grid item xs>
                <Box sx = {style_1} >
                  <DateTimePicker 
                    DisableState = {true} 
                    date = {endDate2 && endDate2.add(1, 'minute')}
                    //onChange = {startDateChangeHandler3}
                  />
                </Box>
              </Grid>

              <Grid item xs>
                <Box sx = {style_1} >
                  <DateTimePicker 
                    DisableState = {false} 
                    date = {endDate3}
                    onChange = {endDateChangeHandler3}
                  />
                </Box>
              </Grid>
            </Stack>

            <Stack direction = "row" useFlexGap flexWrap = "wrap" justifyContent = "center" >
              <Stack direction = "row" useFlexGap flexWrap = "wrap" >
                <Grid item >
                  <Box sx = {style_2} >
                    <TextField
                      id = "outlined-basic"
                      size = "small" 
                      value = {(endDate3 && dateValidation(endDate3) === true && dateValidation(endDate2) === true) ? timeConvert(endDate2.add(1, 'minute'), endDate3) : ''}
                      variant = "outlined"
                      disabled
                      sx = {{ width: '120px' }}
                    />
                  </Box>
                </Grid>

                <Grid item >
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
                  <Box sx = {style_2} >
                    <TextField
                      id = "outlined-basic"
                      size = "small" 
                      value = {elapsedTimePL ? (elapsedTimePL) : ''}
                      variant = "outlined"
                      disabled
                      sx = {{ width: '120px' }}
                    />
                  </Box>
                </Grid>

                <Grid item >
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
          <Button id = "btnSaveTimeCalc" disabled = {btnDisable} variant = "contained" sx = {{ my: 2, displayPrint: 'none' }} onClick = {setVarTimePL} >
            Save time calculation
          </Button>
        </Stack>

      </Grid>
    </Box>

  );
}