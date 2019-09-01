import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    updateTasks(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    async getTasks({ commit }) {
      let tasks = [];
      await firebase
                  .firestore()
                  .collection('task-list')
                  .get()
                  .then((querySnapshot) => {
                    querySnapshot.docs.forEach((doc, index) => {
                      let obj = doc.data();
                      tasks.push(obj);
                    });
                    commit('updateTasks', tasks);
                  });
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks
    }
  }
});
