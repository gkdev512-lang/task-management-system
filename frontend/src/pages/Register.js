import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

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
  minHeight: 42,
  px: 2.25,
  borderRadius: "10px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  textTransform: "none",
  backgroundColor: "#000",
  color: "#fff",
  transition: "transform 0.24s ease, box-shadow 0.24s ease, background-color 0.24s ease",
  boxShadow: "0 10px 24px rgba(17, 24, 39, 0.14)",
  "&:hover": {
    backgroundColor: "#111",
    transform: "translateY(-2px)",
    boxShadow: "0 16px 32px rgba(17, 24, 39, 0.20)"
  },
  "&.Mui-disabled": {
    backgroundColor: "#666",
    color: "#fff",
    transform: "none",
    boxShadow: "none"
  }
};

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Username, password, and confirm password are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await authService.register({
        username: username.trim(),
        password
      });

      navigate("/login");
    } catch (registerError) {
      setError(registerError.response?.data || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          maxWidth: 420,
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

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            sx={monochromeFieldSx}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            sx={monochromeFieldSx}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            sx={monochromeFieldSx}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleRegister}
            disabled={isSubmitting}
            sx={primaryButtonSx}
          >
            {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Register"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Register;
