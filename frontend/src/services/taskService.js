import api from "./api";

const taskService = {
  fetchMyTasks: () => api.get("/Tasks/my-tasks"),
  addTask: (taskData) => api.post("/Tasks", taskData),
  updateTask: (id, taskData) => api.put(`/Tasks/${id}`, taskData),
  deleteTask: (id) => api.delete(`/Tasks/${id}`),
  markComplete: (id) => api.patch(`/Tasks/${id}/complete`)
};

export default taskService;
