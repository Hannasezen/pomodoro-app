import { SET_ACTIVE_TAB } from "./mutation-types";

export default {
  [SET_ACTIVE_TAB](state, activeTab) {
    state.activeRoute = activeTab;
  }
};
