export default {
  getTasks: state => state.tasks,
  getDailyTasks: state => state.tasks.filter(task => task.status === 'DAILY'),
  getGlobalTasks: state => state.tasks.filter(task => task.status === 'GLOBAL').sort((a, b) => new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime()),
  getDeleteTasks: state => state.tasks.filter(task => task.deleted === true),
  modalShow: state => state.modalShow,
  getActiveTask: state => state.activeTask,
  modalTitle: state => state.modalTitle,
  taskMessage: state => state.taskMessage,
  categories: state => state.categories,
  deleteMode: state => state.deleteMode,
};
