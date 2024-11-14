import { useEffect, useState } from 'react'
import { 
  Box, 
  Stack,
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Grid } from "@mui/material";


export default function CalcFoodForm(props) {
  var rows = props.value;
  const rows_ex = rows;

  const [checkedState1, setCheckedState1] = useState(
    new Array(rows.length).fill(false)
  );
  const [checkedState2, setCheckedState2] = useState(
    new Array(rows.length).fill(false)
  );
  const [checkedState3, setCheckedState3] = useState(
    new Array(rows.length).fill(false)
  );


  useEffect(() => {
    props.readyState(true);
    // eslint-disable-next-line
  }, []);

  function onChangeHandlerSave () {
    // rows_ex.length > 0 && console.log('food calculations - rows_ex - calcFoodForm');
    // rows_ex.length > 0 && console.log(rows_ex);

    rows_ex.length > 0 && props.onChange(rows_ex);
  };

  function sumDishes (tfStatus, actualVal) {
    let value = 0
    tfStatus === true ? (value = actualVal + 1) : (value = actualVal - 1);
    return value
  }

  const handleOnChangeBrfst = (position) => {
    let checkStatus = rows_ex[position].brfst;
    rows_ex[position].brfst = !checkStatus;
    rows_ex[position].dish = sumDishes(!checkStatus, rows_ex[position].dish);

    const updatedCheckedState1 = checkedState1.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState1(updatedCheckedState1);
  };

  const handleOnChangeDin = (position) => {
    let checkStatus = rows_ex[position].din;
    rows_ex[position].din = !checkStatus;
    rows_ex[position].dish = sumDishes(!checkStatus, rows_ex[position].dish);

    const updatedCheckedState2 = checkedState2.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState2(updatedCheckedState2);
  };

  const handleOnChangeSup = (position) => {
    let checkStatus = rows_ex[position].sup;
    rows_ex[position].sup = !checkStatus;
    rows_ex[position].dish = sumDishes(!checkStatus, rows_ex[position].dish);

    const updatedCheckedState3 = checkedState3.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState3(updatedCheckedState3);
  };


  return (
    <Box 
      display = "flex"
      position = "center" 
      justifyContent = "center" 
      alignItems = "center" 
      paddingTop = {3}
      paddingLeft = {1}
      paddingRight = {1}
    >
      <Grid item xs = {12} sm zeroMinWidth >

        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingBottom = {1}
        >
          <TableContainer component = {Paper} >
            <Table size = "small" aria-label = "simple table" >
              <TableHead >
                <TableRow>
                  <TableCell style = {{ fontWeight: 'bold' }}>Country</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Hrs</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Min</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Breakfast</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Dinner</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Supper</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Dishes</TableCell>
                  <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Percent Cutting</TableCell>
                </TableRow>
              </TableHead>

              <TableBody >
                {rows.map((row) => (
                  <TableRow
                    key = {row.id}
                    sx = {{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component = "th" scope = "row">
                      {row.country}
                    </TableCell>
                    <TableCell align = "right">{row.date}</TableCell>
                    <TableCell align = "right">{row.h}</TableCell>
                    <TableCell align = "right">{row.m}</TableCell>
                    <TableCell align = "right">
                      <Checkbox
                        id = {`custom-checkbox-bfst-${row.id}`}
                        color = "primary"
                        onChange = {() => handleOnChangeBrfst(row.id)}
                        checked = {row.brfst} // {checkedState1[row.id]} // {row.brfst}
                      />
                    </TableCell>
                    <TableCell align = "right">
                      <Checkbox
                        id = {`custom-checkbox-din-${row.id}`}
                        color = "primary"
                        onChange = {() => handleOnChangeDin(row.id)}
                        checked = {row.din} // {checkedState2[row.id]} // {row.din}
                      />
                    </TableCell>
                    <TableCell align = "right">
                      <Checkbox
                        id = {`custom-checkbox-sup-${row.id}`}
                        color = "primary"
                        onChange = {() => handleOnChangeSup(row.id)}
                        checked = {row.sup} // {checkedState3[row.id]} // {row.sup}
                      />
                    </TableCell>
                    <TableCell align = "right">{row.dish}</TableCell>
                    <TableCell align = "right">{'- ' + (row.prcnt * 100) + ' %'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>

        <Stack
          direction = "row" 
          justifyContent = "center" 
          display = "flex" 
          useFlexGap 
          flexWrap = "wrap"
          paddingBottom = {1}
        >
          <Button id = "btnSaveFoodCalc" variant = "contained" sx = {{ width: '250px', my: 2, displayPrint: 'none' }} onClick = {onChangeHandlerSave}>
            Save food calculation
          </Button>

        </Stack>

      </Grid>
    </Box>
  );
}

