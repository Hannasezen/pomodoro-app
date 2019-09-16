import { 
  UPDATE_TASKS,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  MOVE_TASK_TO_DAILY,
  SHOW_MODAL,
  CLOSE_MODAL,
  UPDATE_TASK_MESSAGE,
} from './mutation-types';

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
    task.status = 'DAILY';
  },
  [UPDATE_TASK_MESSAGE](state) {
    
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
