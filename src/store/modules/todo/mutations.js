import { 
  UPDATE_TASKS,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  MOVE_TASK_TO_DAILY,
  FILTER_TASKS,
  SHOW_MODAL,
  CLOSE_MODAL
} from './mutation-types';

function isToday(date) {
  const today = new Date();
  const checkDate = new Date(date);
  return (today.getDate() === checkDate.getDate()
    && today.getMonth() === checkDate.getMonth()
    && today.getFullYear() === checkDate.getFullYear());
};

export default {
  [UPDATE_TASKS](state, tasks) {
    state.tasks = tasks;
  },
  [ADD_TASK](state, task) {
    state.tasks.push(task);
  },
  [EDIT_TASK](state, task) {
    state.tasks.splice(state.activeTaskIndex, 1, task);
  },
  [DELETE_TASK](state, id) {
    const task = state.tasks.find(task => task.taskId === id);
    const index = state.tasks.indexOf(task);
    if (index > -1) state.tasks.splice(index, 1);
    state.activeTask = null;
    state.modalShow = !state.modalShow;
  },
  [MOVE_TASK_TO_DAILY](state, id) {
    const task = state.tasks.find(task => task.taskId === id);
    task.deadlineDate = new Date().toLocaleDateString();
  },
  [FILTER_TASKS](state) {
    state.dailyTasks = [];
    state.globalTasks = [];
    state.tasks.forEach(task => {
      if (isToday(task.deadlineDate)) {
        state.dailyTasks.push(task);
      } else {
        state.globalTasks.push(task);
      };
    });
  },
  [SHOW_MODAL](state, id) {
    if (typeof id == 'string') {
      state.modalTitle = 'Edit task';
      state.activeTask = state.tasks.find(task => task.taskId == id);
      state.activeTaskIndex = state.tasks.indexOf(state.activeTask);
    } else {
      state.modalTitle = 'Add task';
      state.activeTask = null;
    }
    state.modalShow = !state.modalShow;
  },
  [CLOSE_MODAL](state) {
    state.activeTask = null;
    state.modalShow = !state.modalShow;
  },
};
