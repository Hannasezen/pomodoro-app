import Vue from "vue";

import App from "./App.vue";

import router from "./router";
import store from "./store/index.js";

import firebase from 'firebase';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyD3jneOi5s-WDERTb5NVC-WhjsNt9-C7MU",
      authDomain: "pomodoro-project-a6a56.firebaseapp.com",
      databaseURL: "https://pomodoro-project-a6a56.firebaseio.com",
      projectId: "pomodoro-project-a6a56",
      storageBucket: "pomodoro-project-a6a56.appspot.com",
      messagingSenderId: "930553893874",
      appId: "1:930553893874:web:a344dc9a406e0b44"
    });
    this.$store.dispatch('Todo/getTasks');
  }
}).$mount("#app");
