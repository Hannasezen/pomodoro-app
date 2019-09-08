import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase';

Vue.use(Vuex);

function generateId() {
  return 'task' + parseInt(Math.random() * 100000);
}

export default new Vuex.Store({
  state: {
    tasks: [],
    modalShow: false,
    modalTitle: 'Add task',
    activeTask: null,
    activeTaskIndex: 0,
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    editTask(state, task) {
      state.tasks.splice(state.activeTaskIndex, 1, task);
    },
    deleteTask(state, id) {
      const task = state.tasks.find(task => task.taskId === id);
      const index = state.tasks.indexOf(task);
      index > -1 ? state.tasks.splice(index, 1) : false;
      state.activeTask = null;
      state.modalShow = !state.modalShow;
    },
    showModal(state, id) {
      if(typeof id == 'string') {
        state.modalTitle = 'Edit task';
        state.activeTask = state.tasks.find(task => task.taskId == id);
        state.activeTaskIndex = state.tasks.indexOf(state.activeTask);
      } else {
        state.modalTitle = 'Add task';
        state.activeTask = null;
      }
      state.modalShow = !state.modalShow;
    },
    closeModal(state) {
      state.activeTask = null;
      state.modalShow = !state.modalShow;
    }
  },
  actions: {
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
                commit('updateTasks', tasks);
              })
              .catch(e => console.log(e.message));
    },
    addTask({ commit }, task) {
      if(!task.taskId) {
        task.taskId = generateId();
        firebase
          .firestore()
          .collection('task-list')
          .doc(task.taskId)
          .set(task)
          .then(commit('addTask', task))
          .catch(e => console.log(e))
      } else {
        firebase
          .firestore()
          .collection('task-list')
          .doc(task.taskId)
          .update(task)
          .then(commit('editTask', task))
          .catch(e => console.log(e))
      }      
    },
    deleteTask({ commit }, id) {
      firebase
        .firestore()
        .collection('task-list')
        .doc(id)
        .delete()
        .then(commit('deleteTask', id))
        .catch(e => console.log(e))
    },
    showModal({commit}, id) {
      commit('showModal', id);
    },
    closeModal({ commit }) {
      commit('closeModal');
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks;
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
  }
});
