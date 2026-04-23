import React from "react";
import { Alert, Box, Paper, Stack, TextField, Typography, Button } from "@mui/material";

const monochromeFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#000"
    },
    "&:hover fieldset": {
      borderColor: "#000"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: 2
    }
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#000"
  }
};

const primaryButtonSx = {
  minHeight: 48,
  borderRadius: 2,
  backgroundColor: "#000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#111"
  }
};

function Register() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        p: 3,
        backgroundColor: "#fff"
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: 4,
          borderRadius: 4,
          border: "1px solid #000",
          boxShadow: "none",
          backgroundColor: "#fff"
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" component="h1" fontWeight={700}>
              Create account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Register to start organizing your work.
            </Typography>
          </Box>

          <Alert severity="info">
            Account registration UI is ready for API wiring next.
          </Alert>

          <TextField fullWidth label="Full Name" variant="outlined" sx={monochromeFieldSx} />
          <TextField fullWidth label="Email" type="email" variant="outlined" sx={monochromeFieldSx} />
          <TextField fullWidth label="Password" type="password" variant="outlined" sx={monochromeFieldSx} />

          <Button fullWidth variant="contained" size="large" sx={primaryButtonSx}>
            Register
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Register;
