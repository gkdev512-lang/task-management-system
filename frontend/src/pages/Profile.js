import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  Snackbar,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { ClipboardList, LayoutDashboard, LogOut, ShieldCheck, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const themeColors = {
  primary: "#4F46E5",
  primaryHover: "#4338CA",
  primarySoft: "#EEF2FF",
  background: "#F9FAFB",
  card: "#FFFFFF",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  text: "#111827",
  mutedText: "#6B7280"
};

const monochromeFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: themeColors.card,
    "& fieldset": {
      borderColor: themeColors.borderStrong
    },
    "&:hover fieldset": {
      borderColor: themeColors.primary
    },
    "&.Mui-focused fieldset": {
      borderColor: themeColors.primary,
      borderWidth: 2
    }
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: themeColors.primary
  }
};

const modernButtonBaseSx = {
  borderRadius: "10px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  textTransform: "none",
  transition: "transform 0.24s ease, box-shadow 0.24s ease, background-color 0.24s ease, border-color 0.24s ease, color 0.24s ease",
  "&:hover": {
    transform: "translateY(-2px)"
  },
  "&.Mui-disabled": {
    transform: "none",
    boxShadow: "none"
  }
};

const primaryButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 42,
  px: 2.25,
  backgroundColor: themeColors.primary,
  color: "#fff",
  boxShadow: "0 10px 24px rgba(79, 70, 229, 0.16)",
  "&:hover": {
    backgroundColor: themeColors.primaryHover,
    boxShadow: "0 16px 32px rgba(79, 70, 229, 0.22)"
  },
  "&.Mui-disabled": {
    backgroundColor: "#C7D2FE",
    color: "#fff"
  }
};

const secondaryButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 42,
  px: 2.25,
  borderColor: "transparent",
  color: themeColors.text,
  backgroundColor: themeColors.card,
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.06)",
  "&:hover": {
    borderColor: "transparent",
    backgroundColor: themeColors.background,
    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.10)"
  }
};

const sidebarItemSx = {
  borderRadius: 2,
  border: "none",
  color: themeColors.text,
  backgroundColor: themeColors.card,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.05)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease",
  "&.Mui-selected": {
    backgroundColor: themeColors.primary,
    color: "#fff",
    boxShadow: "0 10px 24px rgba(79, 70, 229, 0.22)"
  },
  "&.Mui-selected:hover": {
    backgroundColor: themeColors.primaryHover
  },
  "&:hover": {
    transform: "translateY(-1px)",
    backgroundColor: themeColors.background,
    boxShadow: "0 6px 18px rgba(15, 23, 42, 0.08)"
  }
};

const sidebarBrandIconSx = {
  width: 52,
  height: 52,
  display: "grid",
  placeItems: "center",
  borderRadius: 3,
  backgroundColor: themeColors.primarySoft,
  color: themeColors.primary,
  boxShadow: "0 8px 20px rgba(79, 70, 229, 0.14)"
};

const surfaceCardSx = {
  borderRadius: 5,
  border: `1px solid rgba(229, 231, 235, 0.9)`,
  boxShadow: "0 12px 32px rgba(15, 23, 42, 0.06)",
  backgroundColor: themeColors.card,
  transition: "transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease"
};

const sectionCardContentSx = {
  p: { xs: 2.75, md: 3.25 }
};

const pageTitleSx = {
  fontWeight: 700,
  color: themeColors.text,
  letterSpacing: "-0.02em"
};

const sectionTitleSx = {
  fontWeight: 700,
  color: themeColors.text,
  letterSpacing: "-0.02em"
};

function Profile() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleChangePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim()) {
      setError("Old password and new password are required.");
      return;
    }

    try {
      setError("");
      setIsSubmitting(true);
      await authService.changePassword({
        currentPassword,
        newPassword
      });
      setCurrentPassword("");
      setNewPassword("");
      setSuccessMessage("Password changed successfully.");
    } catch (changePasswordError) {
      setError(changePasswordError.response?.data || "Unable to change password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeColors.background,
        px: { xs: 1.5, sm: 2.5, md: 3.5, xl: 5 },
        py: { xs: 1.5, sm: 2.5, md: 3.5 }
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "none",
          mx: "auto",
          minHeight: {
            xs: "calc(100vh - 24px)",
            sm: "calc(100vh - 40px)",
            md: "calc(100vh - 56px)"
          },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "260px minmax(0, 1fr)"
          },
          gap: { xs: 2, sm: 3, md: 3.5, xl: 4 },
          alignItems: "stretch"
        }}
      >
        <Card
          sx={{
            ...surfaceCardSx,
            position: { md: "sticky" },
            top: { md: 24 },
            width: "100%",
            height: "fit-content",
            minHeight: { md: "calc(100vh - 80px)" }
          }}
        >
          <CardContent sx={sectionCardContentSx}>
            <Stack spacing={3.5}>
              <Stack direction="row" spacing={1.75} alignItems="center">
                <Box sx={sidebarBrandIconSx}>
                  <UserCircle2 size={26} strokeWidth={2.2} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      ...pageTitleSx,
                      fontSize: "1.65rem",
                      lineHeight: 1.1
                    }}
                  >
                    Profile
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500, mt: 0.5 }}>
                    Account settings
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ borderColor: themeColors.border }} />

              <List disablePadding sx={{ display: "grid", gap: 1 }}>
                <ListItemButton onClick={() => navigate("/dashboard")} sx={sidebarItemSx}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <LayoutDashboard size={18} strokeWidth={2.2} />
                    <Typography sx={{ fontWeight: 600 }}>Dashboard</Typography>
                  </Stack>
                </ListItemButton>
                <ListItemButton selected sx={sidebarItemSx}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <UserCircle2 size={18} strokeWidth={2.2} />
                    <Typography sx={{ fontWeight: 600 }}>Profile</Typography>
                  </Stack>
                </ListItemButton>
                <ListItemButton onClick={handleLogout} sx={sidebarItemSx}>
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <LogOut size={18} strokeWidth={2.2} />
                    <Typography sx={{ fontWeight: 600 }}>Logout</Typography>
                  </Stack>
                </ListItemButton>
              </List>
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={{ xs: 2.5, sm: 3, md: 3.5, xl: 4 }} sx={{ minWidth: 0 }}>
          <Card sx={surfaceCardSx}>
            <CardContent sx={sectionCardContentSx}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  alignItems: { xs: "stretch", lg: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 3 }
                }}
              >
                <Box>
                  <Typography variant="h5" component="h2" sx={pageTitleSx}>
                    Profile
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: themeColors.mutedText, fontWeight: 500 }}>
                    Review your account details and update your password.
                  </Typography>
                </Box>

                <Button variant="outlined" onClick={handleLogout} sx={secondaryButtonSx}>
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>

          {error && <Alert severity="error">{error}</Alert>}

          <Card sx={surfaceCardSx}>
            <CardContent sx={sectionCardContentSx}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 3,
                      backgroundColor: themeColors.primarySoft,
                      color: themeColors.primary
                    }}
                  >
                    <ClipboardList size={22} strokeWidth={2.2} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={sectionTitleSx}>
                      Username
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                      Signed in account
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    borderRadius: 3,
                    border: `1px solid ${themeColors.border}`,
                    backgroundColor: themeColors.background,
                    px: 2,
                    py: 1.75
                  }}
                >
                  <Typography sx={{ color: themeColors.text, fontWeight: 700 }}>{username}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card sx={surfaceCardSx}>
            <CardContent sx={sectionCardContentSx}>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 3,
                      backgroundColor: themeColors.primarySoft,
                      color: themeColors.primary
                    }}
                  >
                    <ShieldCheck size={22} strokeWidth={2.2} />
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={sectionTitleSx}>
                      Change Password
                    </Typography>
                    <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                      Use your current password to set a new one.
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={2}>
                  <TextField
                    label="Old Password"
                    type="password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    fullWidth
                    size="small"
                    sx={monochromeFieldSx}
                  />
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    fullWidth
                    size="small"
                    sx={monochromeFieldSx}
                  />
                </Stack>

                <Box>
                  <Button
                    variant="contained"
                    onClick={handleChangePassword}
                    disabled={isSubmitting}
                    sx={primaryButtonSx}
                  >
                    {isSubmitting ? <CircularProgress size={18} color="inherit" /> : "Update Password"}
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success" variant="filled">
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Profile;
