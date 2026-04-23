import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItemButton,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { CheckCheck, ClipboardList, Hourglass, LayoutDashboard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import taskService from "../services/taskService";

const themeColors = {
  primary: "#4F46E5",
  primaryHover: "#4338CA",
  primarySoft: "#EEF2FF",
  primaryBorder: "#C7D2FE",
  success: "#22C55E",
  successHover: "#16A34A",
  successSoft: "#DCFCE7",
  successBorder: "#86EFAC",
  danger: "#EF4444",
  dangerHover: "#DC2626",
  dangerSoft: "#FEE2E2",
  dangerBorder: "#FECACA",
  background: "#F9FAFB",
  card: "#FFFFFF",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  text: "#111827",
  mutedText: "#6B7280",
  warningSoft: "#FEF3C7",
  warningText: "#B45309",
  warningBorder: "#FCD34D"
};

const monochromeFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    backgroundColor: themeColors.card,
    "& fieldset": {
      borderColor: themeColors.borderStrong
    },
    "&:hover fieldset": {
      borderColor: themeColors.primaryBorder
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
  borderRadius: "8px",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  textTransform: "none",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)"
  },
  "&.Mui-disabled": {
    transform: "none",
    boxShadow: "none"
  }
};

const primaryButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 44,
  backgroundColor: themeColors.primary,
  color: "#fff",
  boxShadow: "0 8px 20px rgba(79, 70, 229, 0.18)",
  "&:hover": {
    backgroundColor: themeColors.primaryHover,
    boxShadow: "0 12px 24px rgba(79, 70, 229, 0.24)"
  },
  "&.Mui-disabled": {
    backgroundColor: themeColors.primaryBorder,
    color: "#fff",
    boxShadow: "none"
  }
};

const secondaryButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 44,
  borderColor: "transparent",
  color: themeColors.text,
  backgroundColor: themeColors.card,
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  "&:hover": {
    borderColor: "transparent",
    backgroundColor: themeColors.background,
    boxShadow: "0 10px 20px rgba(15, 23, 42, 0.12)"
  }
};

const successButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 44,
  backgroundColor: themeColors.success,
  color: "#fff",
  boxShadow: "0 8px 20px rgba(34, 197, 94, 0.2)",
  "&:hover": {
    backgroundColor: themeColors.successHover,
    boxShadow: "0 12px 24px rgba(34, 197, 94, 0.24)"
  },
  "&.Mui-disabled": {
    backgroundColor: themeColors.successBorder,
    color: "#fff",
    boxShadow: "none"
  }
};

const dangerButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 44,
  backgroundColor: themeColors.danger,
  color: "#fff",
  boxShadow: "0 8px 20px rgba(239, 68, 68, 0.18)",
  "&:hover": {
    backgroundColor: themeColors.dangerHover,
    boxShadow: "0 12px 24px rgba(239, 68, 68, 0.22)"
  },
  "&.Mui-disabled": {
    backgroundColor: themeColors.dangerBorder,
    color: "#fff",
    boxShadow: "none"
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

const tableHeaderCellSx = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: 0.8,
  textTransform: "uppercase",
  color: themeColors.mutedText,
  borderBottom: `1px solid ${themeColors.border}`,
  backgroundColor: "transparent"
};

const tableBodyCellSx = {
  borderBottom: `1px solid ${themeColors.border}`,
  verticalAlign: "top"
};

const statusChipSx = {
  height: 26,
  fontWeight: 700,
  fontSize: "0.75rem",
  borderRadius: 999,
  border: "none",
  transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
  "& .MuiChip-label": {
    px: 1.25
  }
};

const actionTextButtonSx = {
  ...modernButtonBaseSx,
  minWidth: 88,
  px: 1.5,
  py: 0.5,
  minHeight: 36,
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)"
};

const surfaceCardSx = {
  borderRadius: 4,
  border: "none",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  backgroundColor: themeColors.card,
  transition: "transform 0.2s ease, box-shadow 0.2s ease"
};

const sectionCardContentSx = {
  p: { xs: 2.5, md: 3 }
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

const sectionLabelSx = {
  fontSize: "0.78rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: themeColors.mutedText
};

const metricValueSx = {
  fontSize: { xs: "2.35rem", md: "2.75rem" },
  lineHeight: 1,
  fontWeight: 800,
  letterSpacing: "-0.04em",
  color: themeColors.text
};

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { data } = await taskService.fetchMyTasks();
      setTasks(data);
    } catch (loadError) {
      setError(loadError.response?.data || "Unable to load tasks.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const summaryCards = useMemo(() => {
    const completedCount = tasks.filter((task) => task.isCompleted).length;

    return [
      {
        label: "Total Tasks",
        value: tasks.length,
        icon: ClipboardList,
        accent: themeColors.primary,
        backgroundColor: themeColors.primarySoft
      },
      {
        label: "In Progress",
        value: tasks.length - completedCount,
        icon: Hourglass,
        accent: themeColors.warningText,
        backgroundColor: themeColors.warningSoft
      },
      {
        label: "Completed",
        value: completedCount,
        icon: CheckCheck,
        accent: themeColors.success,
        backgroundColor: themeColors.successSoft
      }
    ];
  }, [tasks]);

  const openEditDialog = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const openAddDialog = () => {
    setError("");
    setIsAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    if (isCreating) {
      return;
    }

    setIsAddDialogOpen(false);
    setTitle("");
    setDescription("");
  };

  const handleAddTask = async () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setError("");
      setIsCreating(true);
      await taskService.addTask({
        title: title.trim(),
        description: description.trim(),
        isCompleted: false
      });
      closeAddDialog();
      setSuccessMessage("Task created successfully.");
      await loadTasks();
    } catch (createError) {
      setError(createError.response?.data || "Unable to create task.");
    } finally {
      setIsCreating(false);
    }
  };

  const closeEditDialog = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = async () => {
    if (!editingTask || !editTitle.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      setError("");
      setIsSavingEdit(true);
      await taskService.updateTask(editingTask.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        isCompleted: editingTask.isCompleted
      });
      closeEditDialog();
      setSuccessMessage("Task updated successfully.");
      await loadTasks();
    } catch (saveError) {
      setError(saveError.response?.data || "Unable to update task.");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      setActiveTaskId(id);
      await taskService.deleteTask(id);
      setSuccessMessage("Task deleted successfully.");
      await loadTasks();
    } catch (deleteError) {
      setError(deleteError.response?.data || "Unable to delete task.");
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleComplete = async (id) => {
    try {
      setError("");
      setActiveTaskId(id);
      await taskService.markComplete(id);
      setSuccessMessage("Task marked as complete.");
      await loadTasks();
    } catch (completeError) {
      setError(completeError.response?.data || "Unable to complete task.");
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
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
                  <ClipboardList size={26} strokeWidth={2.2} />
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
                    Task UI
                  </Typography>
                  <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500, mt: 0.5 }}>
                    Workspace navigation
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ borderColor: themeColors.border }} />

              <List disablePadding sx={{ display: "grid", gap: 1 }}>
                <ListItemButton
                  selected={activeSection === "dashboard"}
                  onClick={() => handleSectionChange("dashboard")}
                  sx={sidebarItemSx}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <LayoutDashboard size={18} strokeWidth={2.2} />
                    <Typography sx={{ fontWeight: 600 }}>Dashboard</Typography>
                  </Stack>
                </ListItemButton>
                <ListItemButton
                  selected={activeSection === "tasks"}
                  onClick={() => handleSectionChange("tasks")}
                  sx={sidebarItemSx}
                >
                  <Stack direction="row" spacing={1.25} alignItems="center">
                    <ClipboardList size={18} strokeWidth={2.2} />
                    <Typography sx={{ fontWeight: 600 }}>Tasks</Typography>
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

        <Stack
          spacing={{ xs: 2.5, sm: 3, md: 3.5, xl: 4 }}
          sx={{
            minWidth: 0,
            minHeight: "100%"
          }}
        >
          <Card
            sx={{
              ...surfaceCardSx,
              width: "100%"
            }}
          >
            <CardContent sx={sectionCardContentSx}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", lg: "row" },
                  alignItems: { xs: "stretch", lg: "center" },
                  justifyContent: "space-between",
                  gap: { xs: 2, sm: 3 },
                  width: "100%"
                }}
              >
                <Box>
                  <Typography variant="h5" component="h2" sx={pageTitleSx}>
                    {activeSection === "dashboard" ? "Dashboard" : "Tasks"}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: themeColors.mutedText, fontWeight: 500 }}>
                    {activeSection === "dashboard"
                      ? "Track progress and get a quick overview of your workspace."
                      : "Manage, edit, and complete your task list."}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "center" },
                    justifyContent: "flex-end",
                    gap: { xs: 1.5, sm: 2.5 },
                    width: { xs: "100%", lg: "auto" },
                    ml: { lg: "auto" }
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={openAddDialog}
                    sx={{ ...primaryButtonSx, minHeight: 40, px: 2.25 }}
                  >
                    Add Task
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: 1.5,
                      ml: { sm: "auto" }
                    }}
                  >
                    <Typography variant="body1" sx={{ whiteSpace: "nowrap", fontWeight: 600, color: themeColors.text }}>
                      {username}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleLogout}
                      sx={{ ...secondaryButtonSx, minHeight: 40, px: 2.25 }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {error && <Alert severity="error">{error}</Alert>}

          {activeSection === "dashboard" ? (
            <Stack spacing={{ xs: 2.5, sm: 3, md: 3.5 }} sx={{ flex: 1 }}>
              <Grid id="dashboard" container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                {summaryCards.map((card) => (
                  <Grid size={{ xs: 12, sm: 6, xl: 4 }} key={card.label}>
                    {(() => {
                      const IconComponent = card.icon;

                      return (
                    <Card
                      sx={{
                        ...surfaceCardSx,
                        backgroundColor: card.backgroundColor,
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: "0 14px 30px rgba(15, 23, 42, 0.10)"
                        }
                      }}
                    >
                      <CardContent sx={sectionCardContentSx}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2.5}>
                          <Stack spacing={1.75}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                display: "grid",
                                placeItems: "center",
                                borderRadius: 3,
                                backgroundColor: themeColors.card,
                                color: card.accent,
                                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)"
                              }}
                            >
                              <IconComponent />
                            </Box>
                            <Typography variant="body2" sx={sectionLabelSx}>
                              {card.label}
                            </Typography>
                          </Stack>

                          <Typography component="span" sx={metricValueSx}>
                            {card.value}
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                      );
                    })()}
                  </Grid>
                ))}
              </Grid>

              <Card sx={{ ...surfaceCardSx, flex: 1 }}>
                <CardContent sx={sectionCardContentSx}>
                  <Stack spacing={1} justifyContent="center" sx={{ minHeight: "100%" }}>
                    <Typography variant="h6" sx={sectionTitleSx}>
                      Workspace Summary
                    </Typography>
                    <Typography sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                      Use the Tasks menu to open the full task management table, edit items, and complete work.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          ) : null}

          <Stack
            id="tasks"
            spacing={2.5}
            sx={{
              display: activeSection === "tasks" ? "flex" : "none",
              flex: 1
            }}
          >
            <Box sx={{ px: { xs: 0.25, md: 0.5 } }}>
              <Typography variant="h5" sx={sectionTitleSx}>
                My Tasks
              </Typography>
            </Box>

            {isLoading ? (
              <Card
                sx={{
                  ...surfaceCardSx
                }}
              >
                <CardContent sx={sectionCardContentSx}>
                  <Stack spacing={1.5} alignItems="center" justifyContent="center" sx={{ py: 3 }}>
                    <CircularProgress size={28} />
                    <Typography sx={{ color: themeColors.mutedText, fontWeight: 500 }}>Loading tasks...</Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : tasks.length === 0 ? (
              <Card
                sx={{
                  ...surfaceCardSx
                }}
              >
                <CardContent sx={sectionCardContentSx}>
                  <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ py: 3, textAlign: "center" }}>
                    <Typography variant="h6" sx={sectionTitleSx}>
                      No tasks found.
                    </Typography>
                    <Typography sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                      Create your first task 🚀
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ width: "100%" }}>
                <TableContainer sx={{ width: "100%", backgroundColor: "transparent" }}>
                  <Table sx={{ minWidth: { xs: 640, md: 720 }, width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Title</TableCell>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Status</TableCell>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tasks.map((task) => (
                        <TableRow
                          key={task.id}
                          hover
                          sx={{
                            transition: "background-color 0.2s ease, transform 0.2s ease",
                            "&:hover": {
                              backgroundColor: "#f3f4f6"
                            }
                          }}
                        >
                          <TableCell sx={{ ...tableBodyCellSx, px: 2, py: 2 }}>
                            <Stack spacing={0.75}>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 700,
                                  color: task.isCompleted ? themeColors.mutedText : themeColors.text,
                                  textDecoration: task.isCompleted ? "line-through" : "none",
                                  letterSpacing: "-0.01em"
                                }}
                              >
                                {task.title}
                              </Typography>
                              {task.description ? (
                                <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                                  {task.description}
                                </Typography>
                              ) : null}
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ ...tableBodyCellSx, px: 2, py: 2 }}>
                            <Stack alignItems="flex-start" spacing={1}>
                              <Chip
                                label={task.isCompleted ? "Completed" : "Open"}
                                sx={{
                                  ...statusChipSx,
                                  backgroundColor: task.isCompleted ? themeColors.success : "#E5E7EB",
                                  color: task.isCompleted ? "#FFFFFF" : "#4B5563",
                                  boxShadow: "none"
                                }}
                              />
                              {!task.isCompleted ? (
                                <Button
                                  variant="contained"
                                  onClick={() => handleComplete(task.id)}
                                  disabled={activeTaskId === task.id}
                                  sx={{
                                    ...successButtonSx,
                                    minHeight: 30,
                                    px: 1.5,
                                    py: 0.5,
                                    fontSize: "0.8125rem"
                                  }}
                                >
                                  {activeTaskId === task.id ? (
                                    <CircularProgress size={16} color="inherit" />
                                  ) : (
                                    "Mark complete"
                                  )}
                                </Button>
                              ) : null}
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ ...tableBodyCellSx, px: 2, py: 2 }}>
                            <Stack direction="row" spacing={1} flexWrap="nowrap" alignItems="center">
                              <Button
                                variant="outlined"
                                onClick={() => openEditDialog(task)}
                                sx={{
                                  ...actionTextButtonSx,
                                  color: themeColors.text,
                                  borderColor: "transparent",
                                  backgroundColor: themeColors.card,
                                  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.06)",
                                  "&:hover": {
                                    borderColor: "transparent",
                                    backgroundColor: themeColors.background,
                                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)"
                                  }
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => handleDelete(task.id)}
                                disabled={activeTaskId === task.id}
                                sx={{
                                  ...dangerButtonSx,
                                  minWidth: 88,
                                  minHeight: 36,
                                  px: 1.5,
                                  py: 0.5,
                                  fontSize: "0.8125rem"
                                }}
                              >
                                {activeTaskId === task.id ? (
                                  <CircularProgress size={16} color="inherit" />
                                ) : (
                                  "Delete"
                                )}
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Stack>
        </Stack>
      </Box>

      <Dialog
        open={isAddDialogOpen}
        onClose={closeAddDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: "none",
            boxShadow: "0 18px 48px rgba(15, 23, 42, 0.12)",
            backgroundColor: themeColors.card
          }
        }}
      >
        <DialogTitle sx={{ pb: 1.25 }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={sectionTitleSx}>
              Add Task
            </Typography>
            <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
              Create a new task without leaving the dashboard.
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: "8px !important", pb: 1.5 }}>
          <Stack spacing={1.5}>
            <TextField
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
              size="small"
              sx={monochromeFieldSx}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={2}
              maxRows={4}
              sx={monochromeFieldSx}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button onClick={closeAddDialog} sx={{ ...secondaryButtonSx, minHeight: 36, px: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            disabled={isCreating}
            sx={{ ...primaryButtonSx, minHeight: 36, px: 2.25 }}
          >
            {isCreating ? <CircularProgress size={16} color="inherit" /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(editingTask)}
        onClose={closeEditDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: "none",
            boxShadow: "0 18px 48px rgba(15, 23, 42, 0.12)",
            backgroundColor: themeColors.card
          }
        }}
      >
        <DialogTitle sx={{ pb: 1.25, ...sectionTitleSx }}>Edit Task</DialogTitle>
        <DialogContent sx={{ pt: "8px !important", pb: 1.5 }}>
          <Stack spacing={1.75}>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(event) => setEditTitle(event.target.value)}
              fullWidth
              size="small"
              sx={monochromeFieldSx}
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(event) => setEditDescription(event.target.value)}
              fullWidth
              size="small"
              multiline
              minRows={2}
              maxRows={4}
              sx={monochromeFieldSx}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button onClick={closeEditDialog} sx={{ ...secondaryButtonSx, minHeight: 36, px: 2 }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            disabled={isSavingEdit}
            sx={{ ...primaryButtonSx, minHeight: 36, px: 2.25 }}
          >
            {isSavingEdit ? <CircularProgress size={16} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

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

export default Dashboard;
