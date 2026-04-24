import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
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

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Don&apos;t have an account?{" "}
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/register")}
              underline="hover"
              sx={{ color: "#000", fontWeight: 600 }}
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
