import { useEffect } from 'react'
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
  Grid } from "@mui/material";


export default function CalcDietFinalForm2(props) {
  const rows = props.value;
  const totalSum = rows.length === 1 ? (Number(rows[0].valuePLN)) : (Number(rows[0].valuePLN) + Number(rows[1].valuePLN));

  useEffect(() => {
    props.readyState(true);
  }, []);
  
  // rows.length > 0 && console.log('Final Calc data - rows - calcDietFinalForm');
  // rows.length > 0 && console.log(rows);

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
            <TableContainer component = {Paper}>
              {/* <Table sx = {{ minWidth: 650 }} size = "small" aria-label = "simple table"> */}
              <Table size = "small" aria-label = "simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style = {{ fontWeight: 'bold' }}>Date</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Curr</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Diets.</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Rate PLN</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Value PLN</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Date Settl.</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key = {row.id}
                      sx = {{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component = "th" scope = "row">
                        {row.date}
                      </TableCell>
                      <TableCell align = "right">{row.curr}</TableCell>
                      <TableCell align = "right">{row.diets}</TableCell>
                      <TableCell align = "right">{row.ratePLN}</TableCell>
                      <TableCell align = "right">{row.valuePLN}</TableCell>
                      <TableCell align = "right">{row.dateSettl}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan = {3} />
                    <TableCell align = "right" colSpan = {3} style = {{ fontWeight: 'bold' }}>Total</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>{totalSum.toFixed(2)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

        </Grid>
    </Box>
  );
}
