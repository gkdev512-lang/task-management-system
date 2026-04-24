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
import { CheckCheck, ClipboardList, Hourglass, LayoutDashboard, LogOut, UserCircle2 } from "lucide-react";
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
    backgroundColor: themeColors.primaryBorder,
    color: "#fff",
    boxShadow: "none"
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

const successButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 42,
  px: 2.25,
  backgroundColor: themeColors.success,
  color: "#fff",
  boxShadow: "0 10px 24px rgba(34, 197, 94, 0.18)",
  "&:hover": {
    backgroundColor: themeColors.successHover,
    boxShadow: "0 16px 32px rgba(34, 197, 94, 0.22)"
  },
  "&.Mui-disabled": {
    backgroundColor: themeColors.successBorder,
    color: "#fff",
    boxShadow: "none"
  }
};

const dangerButtonSx = {
  ...modernButtonBaseSx,
  minHeight: 42,
  px: 2.25,
  backgroundColor: themeColors.danger,
  color: "#fff",
  boxShadow: "0 10px 24px rgba(239, 68, 68, 0.16)",
  "&:hover": {
    backgroundColor: themeColors.dangerHover,
    boxShadow: "0 16px 32px rgba(239, 68, 68, 0.20)"
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
  borderBottom: "none",
  verticalAlign: "middle"
};

const statusChipSx = {
  height: 28,
  fontWeight: 700,
  fontSize: "0.72rem",
  borderRadius: 999,
  border: "1px solid transparent",
  transition: "background-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
  "& .MuiChip-label": {
    px: 1.4
  }
};

const actionTextButtonSx = {
  ...modernButtonBaseSx,
  minWidth: 88,
  px: 2.25,
  py: 0.5,
  minHeight: 42,
  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.06)"
};

const filterButtonSx = (isActive) => ({
  ...modernButtonBaseSx,
  minHeight: 42,
  px: 2.25,
  borderRadius: "999px",
  border: `1px solid ${isActive ? themeColors.primary : themeColors.border}`,
  backgroundColor: isActive ? themeColors.primarySoft : themeColors.card,
  color: isActive ? themeColors.primary : themeColors.text,
  boxShadow: "none",
  "&:hover": {
    backgroundColor: isActive ? themeColors.primarySoft : themeColors.background,
    borderColor: isActive ? themeColors.primary : themeColors.primaryBorder,
    boxShadow: "none"
  }
});

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
  const userInitials = username
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "U";
  const [activeSection, setActiveSection] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });
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
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);
  const [taskFilter, setTaskFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const isTaskActionBusy = isLoading || isCreating || isSavingEdit || activeTaskId !== null;

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const { data } = await taskService.fetchMyTasks();
      setTasks(data);
    } catch (loadError) {
      showToast(loadError.response?.data || "Unable to load tasks.", "error");
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

  const filteredTasks = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter =
        taskFilter === "completed"
          ? task.isCompleted
          : taskFilter === "open"
            ? !task.isCompleted
            : true;

      const matchesSearch = task.title.toLowerCase().includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [searchText, taskFilter, tasks]);

  const openEditDialog = (task) => {
    if (isTaskActionBusy) {
      return;
    }

    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const openAddDialog = () => {
    if (isTaskActionBusy) {
      return;
    }

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
      showToast("Title is required.", "error");
      return;
    }

    try {
      setIsCreating(true);
      await taskService.addTask({
        title: title.trim(),
        description: description.trim(),
        isCompleted: false
      });
      closeAddDialog();
      showToast("Task created successfully.");
      await loadTasks();
    } catch (createError) {
      showToast(createError.response?.data || "Unable to create task.", "error");
    } finally {
      setIsCreating(false);
    }
  };

  const closeEditDialog = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  const openDeleteDialog = (task) => {
    if (isTaskActionBusy) {
      return;
    }

    setTaskPendingDelete(task);
  };

  const closeDeleteDialog = () => {
    if (taskPendingDelete && activeTaskId === taskPendingDelete.id) {
      return;
    }

    setTaskPendingDelete(null);
  };

  const handleSaveEdit = async () => {
    if (!editingTask || !editTitle.trim()) {
      showToast("Title is required.", "error");
      return;
    }

    try {
      setIsSavingEdit(true);
      await taskService.updateTask(editingTask.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        isCompleted: editingTask.isCompleted
      });
      closeEditDialog();
      showToast("Task updated successfully.");
      await loadTasks();
    } catch (saveError) {
      showToast(saveError.response?.data || "Unable to update task.", "error");
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDelete = async () => {
    if (!taskPendingDelete) {
      return;
    }

    const { id } = taskPendingDelete;

    try {
      setActiveTaskId(id);
      await taskService.deleteTask(id);
      setTaskPendingDelete(null);
      showToast("Task deleted successfully.");
      await loadTasks();
    } catch (deleteError) {
      showToast(deleteError.response?.data || "Unable to delete task.", "error");
    } finally {
      setActiveTaskId(null);
    }
  };

  const handleComplete = async (id) => {
    try {
      setActiveTaskId(id);
      await taskService.markComplete(id);
      showToast("Task marked as complete.");
      await loadTasks();
    } catch (completeError) {
      showToast(completeError.response?.data || "Unable to complete task.", "error");
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
                <ListItemButton onClick={() => navigate("/profile")} sx={sidebarItemSx}>
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
                    flexDirection: { xs: "column", lg: "row" },
                    alignItems: { xs: "stretch", lg: "center" },
                    justifyContent: "flex-end",
                    gap: { xs: 1.5, sm: 2, lg: 2.5 },
                    width: { xs: "100%", lg: "auto" },
                    ml: { lg: "auto" }
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={openAddDialog}
                    disabled={isTaskActionBusy}
                    sx={{
                      ...primaryButtonSx,
                      minWidth: { sm: 148 },
                      fontSize: "0.95rem",
                      boxShadow: "0 14px 32px rgba(79, 70, 229, 0.24)"
                    }}
                  >
                    Add Task
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "space-between", sm: "flex-end" },
                      gap: 1.5,
                      px: { xs: 1.5, sm: 1.75 },
                      py: 1,
                      borderRadius: 999,
                      border: `1px solid ${themeColors.border}`,
                      backgroundColor: "#FCFCFD",
                      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.05)",
                      ml: { lg: "auto" }
                    }}
                  >
                    <Stack direction="row" spacing={1.25} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
                          color: "#fff",
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          letterSpacing: "-0.02em",
                          boxShadow: "0 10px 22px rgba(79, 70, 229, 0.22)"
                        }}
                      >
                        {userInitials}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: "nowrap",
                            fontWeight: 700,
                            color: themeColors.text,
                            lineHeight: 1.2
                          }}
                        >
                          {username}
                        </Typography>
                        <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500, lineHeight: 1.2 }}>
                          Workspace member
                        </Typography>
                      </Box>
                    </Stack>
                    <Button
                      variant="outlined"
                      onClick={handleLogout}
                      sx={{ ...secondaryButtonSx, ml: { sm: 0.5 } }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

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

            <Card sx={surfaceCardSx}>
              <CardContent sx={{ ...sectionCardContentSx, pb: "20px !important" }}>
                <Stack spacing={2}>
                  <TextField
                    placeholder="Search tasks by title"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    fullWidth
                    size="small"
                    disabled={isTaskActionBusy}
                    sx={monochromeFieldSx}
                  />
                  <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                    {[
                      { label: "All", value: "all" },
                      { label: "Completed", value: "completed" },
                      { label: "Open", value: "open" }
                    ].map((filterOption) => (
                      <Button
                        key={filterOption.value}
                        variant="outlined"
                        onClick={() => setTaskFilter(filterOption.value)}
                        disabled={isTaskActionBusy}
                        sx={filterButtonSx(taskFilter === filterOption.value)}
                      >
                        {filterOption.label}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {isLoading ? (
              <Card
                sx={{
                  ...surfaceCardSx
                }}
              >
                <CardContent sx={sectionCardContentSx}>
                  <Stack spacing={1.5} alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                    <CircularProgress size={30} thickness={4.2} />
                    <Typography sx={{ color: themeColors.mutedText, fontWeight: 600 }}>Loading tasks...</Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : tasks.length === 0 ? (
              <Card
                sx={{
                  ...surfaceCardSx,
                  backgroundColor: themeColors.background,
                  boxShadow: "none",
                  border: `1px solid ${themeColors.border}`
                }}
              >
                <CardContent sx={sectionCardContentSx}>
                  <Stack alignItems="center" justifyContent="center" sx={{ py: 6, textAlign: "center" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        color: themeColors.mutedText,
                        fontWeight: 500,
                        maxWidth: 360
                      }}
                    >
                      No tasks found. Create your first task.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : filteredTasks.length === 0 ? (
              <Card
                sx={{
                  ...surfaceCardSx
                }}
              >
                <CardContent sx={sectionCardContentSx}>
                  <Stack spacing={1} alignItems="center" justifyContent="center" sx={{ py: 3, textAlign: "center" }}>
                    <Typography variant="h6" sx={sectionTitleSx}>
                      No matching tasks.
                    </Typography>
                    <Typography sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
                      Try a different search or filter.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ width: "100%" }}>
                <TableContainer sx={{ width: "100%", backgroundColor: "transparent" }}>
                  <Table
                    sx={{
                      minWidth: { xs: 640, md: 720 },
                      width: "100%",
                      borderCollapse: "separate",
                      borderSpacing: "0 12px"
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Title</TableCell>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Status</TableCell>
                        <TableCell sx={{ ...tableHeaderCellSx, px: 2, py: 2 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredTasks.map((task) => (
                        <TableRow
                          key={task.id}
                          hover
                          sx={{
                            "& td": {
                              backgroundColor: themeColors.card,
                              borderTop: `1px solid ${themeColors.border}`,
                              borderBottom: `1px solid ${themeColors.border}`
                            },
                            "& td:first-of-type": {
                              borderLeft: `1px solid ${themeColors.border}`,
                              borderTopLeftRadius: 18,
                              borderBottomLeftRadius: 18
                            },
                            "& td:last-of-type": {
                              borderRight: `1px solid ${themeColors.border}`,
                              borderTopRightRadius: 18,
                              borderBottomRightRadius: 18
                            },
                            transition: "transform 0.24s ease",
                            "&:hover": {
                              transform: "translateY(-2px)"
                            },
                            "&:hover td": {
                              backgroundColor: "#FCFCFF",
                              borderColor: themeColors.primaryBorder,
                              boxShadow: "0 14px 30px rgba(15, 23, 42, 0.08)"
                            }
                          }}
                        >
                          <TableCell sx={{ ...tableBodyCellSx, px: 2.5, py: 2.25, width: "48%" }}>
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
                          <TableCell sx={{ ...tableBodyCellSx, px: 2.5, py: 2.25, width: "22%" }}>
                            <Stack alignItems="flex-start" spacing={1} justifyContent="center">
                              <Chip
                                label={task.isCompleted ? "Completed" : "Open"}
                                sx={{
                                  ...statusChipSx,
                                  backgroundColor: task.isCompleted ? themeColors.successSoft : "#FEF3C7",
                                  borderColor: task.isCompleted ? themeColors.successBorder : themeColors.warningBorder,
                                  color: task.isCompleted ? "#166534" : themeColors.warningText,
                                  boxShadow: "none"
                                }}
                              />
                              {!task.isCompleted ? (
                                <Button
                                variant="contained"
                                onClick={() => handleComplete(task.id)}
                                  disabled={isTaskActionBusy}
                                  sx={{
                                    ...successButtonSx,
                                    minHeight: 42,
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
                          <TableCell sx={{ ...tableBodyCellSx, px: 2.5, py: 2.25, width: "30%" }}>
                            <Stack direction="row" spacing={1.25} flexWrap="nowrap" alignItems="center" justifyContent="flex-start">
                              <Button
                                variant="outlined"
                                onClick={() => openEditDialog(task)}
                                disabled={isTaskActionBusy}
                                sx={{
                                  ...actionTextButtonSx,
                                  color: themeColors.text,
                                  borderColor: "transparent",
                                  backgroundColor: themeColors.card,
                                  boxShadow: "0 8px 18px rgba(15, 23, 42, 0.06)",
                                  "&:hover": {
                                    borderColor: "transparent",
                                    backgroundColor: "#F8FAFC",
                                    boxShadow: "0 14px 28px rgba(15, 23, 42, 0.10)"
                                  }
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                onClick={() => openDeleteDialog(task)}
                                disabled={isTaskActionBusy}
                                sx={{
                                  ...dangerButtonSx,
                                  minWidth: 88,
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
          <Button onClick={closeAddDialog} sx={secondaryButtonSx}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            disabled={isCreating}
            sx={primaryButtonSx}
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
        <DialogTitle sx={{ pb: 1.25 }}>
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={sectionTitleSx}>
              Edit Task
            </Typography>
            <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
              Update task details in a focused modal.
            </Typography>
          </Stack>
        </DialogTitle>
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
          <Button onClick={closeEditDialog} sx={secondaryButtonSx}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            disabled={isSavingEdit}
            sx={primaryButtonSx}
          >
            {isSavingEdit ? <CircularProgress size={16} color="inherit" /> : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={Boolean(taskPendingDelete)}
        onClose={closeDeleteDialog}
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
              Delete Task
            </Typography>
            <Typography variant="body2" sx={{ color: themeColors.mutedText, fontWeight: 500 }}>
              This action will permanently remove the selected task.
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: "8px !important", pb: 1.5 }}>
          <Typography sx={{ color: themeColors.text, fontWeight: 500 }}>
            {taskPendingDelete
              ? `Are you sure you want to delete "${taskPendingDelete.title}"?`
              : "Are you sure you want to delete this task?"}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 1 }}>
          <Button onClick={closeDeleteDialog} sx={secondaryButtonSx}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleDelete}
            disabled={taskPendingDelete ? activeTaskId === taskPendingDelete.id : false}
            sx={dangerButtonSx}
          >
            {taskPendingDelete && activeTaskId === taskPendingDelete.id ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((currentToast) => ({ ...currentToast, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setToast((currentToast) => ({ ...currentToast, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{
            borderRadius: 3,
            boxShadow: "0 16px 36px rgba(15, 23, 42, 0.18)",
            minWidth: 260
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;
