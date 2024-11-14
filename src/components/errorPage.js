import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material";

const ErrorPage = ({ code, message }) => {
  const theme = useTheme();

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={200}
          fontWeight={"bold"}
          color={theme.palette.text.secondary}
        >
          {code}
        </Typography>
        <Typography color={theme.palette.text.secondary}>{message}</Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
