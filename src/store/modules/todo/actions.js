import * as firebase from 'firebase';
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

function generateId() {
  return 'task' + parseInt(Math.random() * 100000);
};

export default {
  getTasks({ commit }) {
    let tasks = [];
    firebase
      .firestore()
      .collection('task-list')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          let obj = doc.data();
          tasks.push(obj);
        });
        commit(UPDATE_TASKS, tasks);
        commit(FILTER_TASKS);
      })
      .catch(e => console.log(e.message));
  },
  addTask({ commit }, task) {
    if (!task.taskId) {
      task.taskId = generateId();
      firebase
        .firestore()
        .collection('task-list')
        .doc(task.taskId)
        .set(task)
        .then(commit(ADD_TASK, task))
        .then(commit(FILTER_TASKS))
        .catch(e => console.log(e))
    } else {
      firebase
        .firestore()
        .collection('task-list')
        .doc(task.taskId)
        .update(task)
        .then(commit(EDIT_TASK, task))
        .then(commit(FILTER_TASKS))
        .catch(e => console.log(e))
    }
  },
  deleteTask({ commit }, id) {
    firebase
      .firestore()
      .collection('task-list')
      .doc(id)
      .delete()
      .then(commit(DELETE_TASK, id))
      .catch(e => console.log(e))
  },
  moveToDaily({ commit }, id) {
    firebase
      .firestore()
      .collection('task-list')
      .doc(id)
      .update({
        deadlineDate: new Date().toLocaleDateString()
      })
      .then(commit(MOVE_TASK_TO_DAILY, id))
      .then(commit(FILTER_TASKS))
      .catch(e => console.log(e))
  },
  showModal({ commit }, id) {
    commit(SHOW_MODAL, id);
  },
  closeModal({ commit }) {
    commit(CLOSE_MODAL);
  }
};
