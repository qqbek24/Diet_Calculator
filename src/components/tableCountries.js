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
import countriesListJson from '../data/Countries_List.json'


export default function TableCountries() {
  const rows = countriesListJson;


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
            <TableContainer component = {Paper} sx={{ maxHeight: 400 }}>
              {/* <Table sx = {{ minWidth: 650 }} size = "small" aria-label = "simple table"> */}
              <Table stickyHeader size = "small" aria-label = "sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style = {{ fontWeight: 'bold' }}>Kraj</TableCell>
                    <TableCell align = "left" style = {{ fontWeight: 'bold' }}>Country EN</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Waluta.</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Kwota diety</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>Kwota limitu na nocleg</TableCell>
                    <TableCell align = "right" style = {{ fontWeight: 'bold' }}>kod ISO</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key = {row.id}
                      sx = {{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component = "th" scope = "row">
                        {row.Kraj}
                      </TableCell>
                      <TableCell align = "left">{row.Country_EN}</TableCell>
                      <TableCell align = "right">{row.Waluta}</TableCell>
                      <TableCell align = "right">{row.Kwota_diety}</TableCell>
                      <TableCell align = "right">{row.Kwota_limitu_na_nocleg}</TableCell>
                      <TableCell align = "right">{row.Code_ISO}</TableCell>
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
