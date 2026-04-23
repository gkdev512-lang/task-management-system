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
  minHeight: 48,
  borderRadius: 2,
  backgroundColor: "#000",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#111"
  },
  "&.Mui-disabled": {
    backgroundColor: "#666",
    color: "#fff"
  }
};

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const { data } = await authService.login({
        username: username.trim(),
        password
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username.trim());
      navigate("/dashboard");
    } catch (loginError) {
      setError(loginError.response?.data || "Login failed. Please try again.");
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
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sign in to manage your tasks.
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

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            disabled={isSubmitting}
            sx={primaryButtonSx}
          >
            {isSubmitting ? <CircularProgress size={22} color="inherit" /> : "Login"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
