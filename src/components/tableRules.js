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
import countryRulesJson from '../data/CountryRules.json'


export default function TableRules() {
  const rows = countryRulesJson;


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
              <Table size = "small" aria-label = "simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={1} style = {{ fontWeight: 'bold' }}> </TableCell>
                    <TableCell align="center" colSpan={3} style = {{ fontWeight: 'bold' }}>Short trip</TableCell>
                    <TableCell align="center" colSpan={2} style = {{ fontWeight: 'bold' }}>Long trip</TableCell>
                    <TableCell align="center" colSpan={3} style = {{ fontWeight: 'bold' }}>Food</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style = {{ fontWeight: 'bold' }}>country</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>less than 8h</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>8 - 12h</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>1 day</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>less than 8h</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>over than 8h</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>breakfast</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>dinner</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>supper</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key = {row.id}
                      sx = {{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component = "th" scope = "row">
                        {row.country}
                      </TableCell>
                      <TableCell align = "right">{row.shortTrip_less_8 === 0.333333333 ? row.shortTrip_less_8.toFixed(4) : row.shortTrip_less_8}</TableCell>
                      <TableCell align = "right">{row.shortTrip_btween_8and12}</TableCell>
                      <TableCell align = "right">{row.shortTrip_day}</TableCell>
                      <TableCell align = "right">{row.longTrip_less_8}</TableCell>
                      <TableCell align = "right">{row.longTrip_over_8}</TableCell>
                      <TableCell align = "right">{(row.breakfast * 100) + ' %'}</TableCell>
                      <TableCell align = "right">{(row.dinner * 100) + ' %'}</TableCell>
                      <TableCell align = "right">{(row.supper * 100) + ' %'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

        </Grid>
    </Box>
  );
}
