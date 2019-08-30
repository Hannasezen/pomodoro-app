import Vue from "vue";
import Router from "vue-router";
import TaskList from "./views/TaskList.vue";
import Settings from "./views/Settings.vue";
import Timer from "./views/Timer.vue";
import Reports from "./views/Reports.vue";
import FirstTime from "./views/FirstTime.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "task-list",
      component: TaskList
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
