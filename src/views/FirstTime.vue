<template>
  <div class="first-task">
    <div class="first-task__image pomodora-image">
      <img src="../assets/images/svg/tomato_settings.svg" alt="pomodoro image add first task">
    </div>
    <div class="first-task__text task-list-message">
      As you visited our site for a first time you can check and customize your default application settings
    </div>
    <div class="first-task__buttons btn-holder">
      <router-link to="/task-list" class="btn btn--bg-blue">Skip</router-link>
      <router-link to="/settings" class="btn btn--bg-green">Go to Settings</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'first-time',
};
</script>

<style lang="less">
</style>
