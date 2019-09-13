export default {
  getTasks: state => state.tasks,
  getDailyTasks(state) {
    return state.dailyTasks;
  },
  getGlobalTasks(state) {
    return state.globalTasks;
  },
  modalShow(state) {
    return state.modalShow;
  },
  getActiveTask(state) {
    return state.activeTask;
  },
  modalTitle(state) {
    return state.modalTitle;
  }
};
