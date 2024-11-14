import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomMenuItem = ({ icon, path, text, closeMenu, disabled }) => {
  const navigate = useNavigate();
  return (
    <MenuItem
      disabled = {disabled}
      onClick = {() => {
        closeMenu();
        return navigate(path);
      }}
    >
      {icon}
      <Typography textAlign = "center" paddingLeft = {2}>
        {text}
      </Typography>
    </MenuItem>
  );
};

export default CustomMenuItem;
