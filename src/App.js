// import logo from './logo.svg';
import { useState, useMemo, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { DataProvider } from './components/DataContext';
import { CountryProvider } from './components/DataContextCountry';
import ResponsiveAppBar from "./components/navbar";
import { darkTheme, lightTheme } from "./theme";
import './App.css';
// import { MsalProvider, useIsAuthenticated } from "@azure/msal-react";
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Fab } from "@mui/material";
import TextsmsIcon from '@mui/icons-material/Textsms';
import ChatBotComp from "./components/chatBot";
import StickyFooter from "./components/StickyFooter";

// Pages
import HomePage from "./pages/home";
import NewCalculationStartPage from "./pages/NewCalculationStart";
import NewCalculationPage from "./pages/NewCalculation";
import UserAccountPage from "./pages/UserAccount";
import CountryDataPage from "./pages/CountryData";
// error pages
import Page404 from "./pages/error/404";
import Page500 from "./pages/error/500";
import Page401403 from "./pages/error/401_403";


// const PrivateRoute = (props) => {
// 	const { children } = props;
// 	const isAuthenticated = useIsAuthenticated();
// 	return isAuthenticated ? <>{children}</> : <Navigate replace={true} to="/" />;
// };

const Layout = ({ children, change }) => {
  const location = useLocation();
  
  // Determine whether to render the navbar based on the current route
  const shouldRenderNavbar = location.pathname !== "/500";
  
  return (
    <div>
      {shouldRenderNavbar && <ResponsiveAppBar change={change} />}
      {children}
      {<Fab color="primary" aria-label="chat">
        <TextsmsIcon />
      </Fab>}
      {<StickyFooter />}
    </div>
  );
};

function App({ instance }) {
  const mode = JSON.parse(localStorage.getItem("mode"));
  const [darkMode, setDarkMode] = useState(mode ? mode.mode : false);

  useEffect(() => {
    localStorage.setItem(
      "mode",
      JSON.stringify({
        mode: darkMode,
      })
    );
  }, [darkMode]);
  const theme = useMemo(() => {
    if (darkMode) {
      return createTheme(darkTheme);
    } else {
      return createTheme(lightTheme);
    }
  }, [darkMode]);

  return (
    <div className="App">
      <DataProvider>
        {/*<MsalProvider instance={instance}>*/}
          <ThemeProvider theme={theme}>
            <CountryProvider>

              <CssBaseline />
              <Layout change={() => setDarkMode(!darkMode)}>
              {/* <ResponsiveAppBar change={() => setDarkMode(!darkMode)} />  */}
                <Container maxWidth={false} sx={{ justifyContent: "center" }}>
                
                  <Pages />  

                  {/* <ChatBotComp /> */}

                  {/* <Fab color="primary" aria-label="chat">
                    <TextsmsIcon />
                  </Fab> */}

                  {/* FOOTER */}
                  {/* <Box display = "flex" justifyContent = "center" alignItems = "center" sx = {{ left:0, bottom:0, right:0, position:"fixed" }} >
                    <Typography
                      variant = "h8"
                      marginTop = {2}
                      marginBottom = {1}
                      color = {theme.palette.text.secondary}
                      sx = {{ fontSize: '12px',  color:'#6f6f6f',  fontWeight: 500 }}
                    >
                      © 2024 ArcelorMittal
                    </Typography>
                  </Box> */}

                </Container>
              </Layout>
               
            </CountryProvider>
          </ThemeProvider>
        {/*</MsalProvider>*/}
      </DataProvider>
    </div>
  );
}

export default App;

const Pages = () => {
  return (

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/newcalculationstart"  element={<NewCalculationStartPage />}/>
      <Route path="/newcalculation"  element={<NewCalculationPage />}/>
      <Route path="/accountpage"  element={<UserAccountPage />}/>
      <Route path="/countriesdata"  element={<CountryDataPage />}/>
      <Route exact path="/500" element={<Page500 />} />
      <Route exact path="/401" element={<Page401403 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>

  );
};
