<template>
  <div class="">
    <FirstTime v-if="!isLoggedIn"/>
    <TaskList v-else />
  </div> 
</template>

<script>
import FirstTime from './FirstTime';
import TaskList from './TaskList';

export default {
  name: 'home',
  components: {
    FirstTime,
    TaskList,
  },
  data() {
    return {
      title: 'Task List',
      isLoggedIn: false,
    };
  },
  created() {
    this.isLoggedIn = window.localStorage.getItem('isLoggedIn');
    window.localStorage.setItem('isLoggedIn', true);
  }
};
</script>
