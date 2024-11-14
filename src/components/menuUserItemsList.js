import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewListIcon from '@mui/icons-material/ViewList';

export const menuUserItemsList = [
  {
    id: 0,
    text: "Countries Data",
    path: "/countriesdata",
    icon: <ViewListIcon />,
    disabled: false,
  },
  {
    id: 1,
    text: "Account",
    path: "/accountpage",
    icon: <AccountCircleIcon />,
    disabled: true,
  },
  {
    id: 2,
    text: "Logout",
    path: "/",
    icon: <LogoutIcon />,
    disabled: true,
  }
];
