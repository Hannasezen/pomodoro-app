import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";
import TaskList from "./views/TaskList.vue";
import Timer from "./views/Timer.vue";
import Reports from "./views/Reports.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/timer",
      name: "timer",
      component: Timer
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports
    }
  ]
});
