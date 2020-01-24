import { SET_ACTIVE_TAB } from "./mutation-types";

export default {
  setActiveTab({ commit }, activeTab) {
    commit(SET_ACTIVE_TAB, activeTab);
  }
};
