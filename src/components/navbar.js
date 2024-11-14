import logo from '../logo.svg';
import * as React from 'react';
import { useNavigate, Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// Theme color mode
import { useTheme, styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// Theme switch control
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// Menu lists
import CustomMenuItem from "../components//customMenuItem";
import { ActionItemsList } from "../components/menuNavActionItemsList";
import { menuUserItemsList } from "../components/menuUserItemsList";


// Theme color mode
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "whitesmoke",
//   color: theme.palette.text.secondary,
//   width: "100%",
//   height: 0,
// }));

// Theme switch control
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 60,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 5,
    padding: 0,
    transform: "translateX(1px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(27px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns = "http://www.w3.org/2000/svg" height = "20" width = "20" viewBox = "0 0 20 20"><path fill = "${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#0275d8" : "#001e3c",
    width: 25,
    height: 25,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns = "http://www.w3.org/2000/svg" height = "20" width = "20" viewBox = "0 0 20 20"><path fill = "${encodeURIComponent(
        "#fff"
      )}" d = "M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

// Navbar
const ResponsiveAppBar = ({ change }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position = "sticky" elevation = {7} sx = {{displayPrint: 'none'}}>
      <Container maxWidth = "xl">
        <Toolbar disableGutters>

          {/*<AdbIcon sx = {{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />*/}
          <img src = {logo} className = "App-logo" alt = "logo" />
          <Link to = "/" style = {{ color: 'inherit', textDecoration: 'inherit'}}>
            <Typography
              variant = "h6"
              noWrap
              // component = "a"
              sx = {{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              New Diet Calculator
            </Typography>
          </Link>

          <Box sx = {{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size = "large"
              aria-label = "account of current user"
              aria-controls = "menu-appbar"
              aria-haspopup = "true"
              onClick = {handleOpenNavMenu}
              color = "inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id = "menu-appbar"
              anchorEl = {anchorElNav}
              anchorOrigin = {{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin = {{
                vertical: 'top',
                horizontal: 'left',
              }}
              open = {Boolean(anchorElNav)}
              onClose = {handleCloseNavMenu}
              sx = {{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {ActionItemsList.map((page) => (
                <CustomMenuItem 
                  key = {page.id} 
                  closeMenu = {handleCloseNavMenu}
                  path = {page.path}
                  text = {page.text}
                  icon = {page.icon}
                />
              ))}
            </Menu>
          </Box>
      
          <Link to = "/" style = {{ color: 'inherit', textDecoration: 'inherit' }}>
            <Typography
              variant = "h6"
              noWrap
              // component = "a"
              href = "/"
              sx = {{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none', 
              }}
            >
              New Diet Calculator
            </Typography>
          </Link>

          <Box sx = {{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {ActionItemsList.map((page) => (
              <Button
                key = {page.id}
                onClick = {() => {
                  handleCloseNavMenu();
                  return navigate(page.path);
                }}
                sx = {{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx = {{ flexGrow: 0 }}>
            <Tooltip title = "Open settings">
              <IconButton onClick = {handleOpenUserMenu} sx = {{ p: 0 }}>
                <Avatar alt = "Remy Sharp" src = "/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx = {{ mt: '45px' }}
              id = "menu-appbar"
              anchorEl = {anchorElUser}
              anchorOrigin = {{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin = {{
                vertical: 'top',
                horizontal: 'right',
              }}
              open = {Boolean(anchorElUser)}
              onClose = {handleCloseUserMenu}
            >
              {menuUserItemsList.map((setting) => (
                <CustomMenuItem 
                  key = {setting.id} 
                  closeMenu={handleCloseUserMenu}
                  path = {setting.path}
                  text = {setting.text}
                  icon = {setting.icon}
                  disabled = {setting.disabled}
                />
              ))}

              <Divider />
          
              <MenuItem>
                <FormControlLabel control = {
                  <MaterialUISwitch 
                    sx = {{ ml: 1 }} 
                    defaultChecked 
                    color = "inherit"
                    onClick = {change}
                  />
                }>
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                    ) : (
                    <Brightness4Icon />
                  )}
                </FormControlLabel>
              </MenuItem>
            </Menu>
              
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
