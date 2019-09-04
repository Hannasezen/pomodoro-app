import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase';

Vue.use(Vuex);

function generateId() {
  return parseInt(Math.random() * 100000);
}

export default new Vuex.Store({
  state: {
    tasks: [],
    modalShow: false,
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    showModal(state) {
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
    addTask({ commit }, task = {}) {
      task.taskId = generateId();
      commit('addTask', task);
    },
    showModal({commit}) {
      commit('showModal');
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    modalShow(state) {
      return state.modalShow;
    }
  }
});
