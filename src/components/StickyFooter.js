import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useTheme, Box, Typography, Container } from '@mui/material';
// import Link from '@mui/material/Link';


function Copyright() {
  const theme = useTheme();
  return (
    <Typography
      variant = "h8"
      marginTop = {2}
      marginBottom = {1}
      color = {theme.palette.text.secondary}
      sx = {{ fontSize: '12px',  color:'#6f6f6f',  fontWeight: 500 }}
    >
      {'Copyright © ArcelorMittal 2024'}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '} */}
      {/* {new Date().getFullYear()} */}
      {'.'}
    </Typography>
  );
}


export default function StickyFooter() {
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '63vh',
        }}
      >
        <CssBaseline />

        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">

            <Copyright />

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
