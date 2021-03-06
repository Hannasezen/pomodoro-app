<template>
  <div class="header">
    <div class="header-container">
        <div class="page-logo">
          <a href="#" class="page-logo__link">
            <img class="page-logo__image" src="../assets/logo.svg" alt="page`s logo">
          </a>
        </div>
        <nav class="page-navigation" @click.prevent="setActiveTab1">
          <ul class="nav-list">
            <li class="nav-item" v-show="activeRoute === 'task-list'">
              <a
                class="nav-item__link"
                id="add-task"
                href="#"
                data-title="Add New Task"
                @click.prevent="showModal(); closeDeleteMode()"
              >
                <span class="icon-add nav-item__icon"></span>
              </a>
            </li>
            <li class="nav-item header-delete-button" v-show="activeRoute === 'task-list'">
              <a
                class="nav-item__link nav-item__link-delete"
                href="#"
                id="delete-task"
                data-title="Delete Tasks"
                data-delete-mode="false"
                @click.prevent="deleteTasks"
              >
                <span class="icon-trash nav-item__icon"></span>
              </a>
              <span class="delete-task-count" v-show="deletedTasks.length">{{ deletedTasks.length }}</span>
            </li>
            <li class="nav-item">
              <router-link to="/" id="task-list" class="nav-item__link nav-item__link-task-list" data-title="Go to Task List">
                <span class="icon-list nav-item__icon"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/reports" id="reports" class="nav-item__link" data-title="Go to Reports" @click="closeDeleteMode">
                <span class="icon-statistics nav-item__icon"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/settings" id="settings" class="nav-item__link" data-title="Go to Settings" @click="closeDeleteMode">
                <span class="icon-settings nav-item__icon"></span>
              </router-link>
            </li> 
          </ul>
        </nav>
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      deletedTasks: 'Todo/getDeleteTasks',
      deleteMode: 'Todo/deleteMode',
      activeRoute: 'getActiveRoute',
    })
  },
  methods: {
    ...mapActions({
      showModal: 'Todo/showModal',
      switchDeleteMode: 'Todo/switchDeleteMode',
      deleteSelectedTasks: 'Todo/deleteSelectedTasks',
      closeDeleteMode: 'Todo/closeDeleteMode',
      setActiveTab: 'setActiveTab',
    }),
    deleteTasks() {
      !this.deleteMode
        ? this.switchDeleteMode()
        : this.deletedTasks.length
          ? this.deleteSelectedTasks(this.deletedTasks.map(task => task.taskId))
          : this.switchDeleteMode();      
    },
    setActiveTab1(e) {
      const id = e.target.id;
      switch(id) {
        case 'task-list':
        case 'settings':
        case 'reports':
          this.setActiveTab(id);
      }
    },
  },
}
</script>

<style lang="less">

.header {
  width: 100%;
	min-height: 98 / @rem;
	background-color: @global-background;	
	padding-bottom: 1.3rem;
	padding-top: 3.5rem;
	transition: background-color ease 0.5s;
	&.scroll {
		height: 8.5rem;
		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 0px 5px 8.3px 1.7px rgba(34, 56, 73, 0.3);
		padding-bottom: 0;
		padding-top: 0;
		z-index: 100;
  }
  .mobile({
    min-height: 120 / @rem;
  })
}

.header-container {
  width: 86.6%;
  height: 100%;
  max-width: 1280 / @rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  .mobile({
    width: 94%;
  })
}

.scroll .page-logo {
	display: block;
}

.page-logo {
	display: none;
  height: 4.6rem;
  width: 15.1rem;
  &__link {
    display: block;
  }
}

.page-navigation {
	flex-grow: 1;
}

.nav-list {
  margin: 0;
  padding-left: 0;
  text-align: right;
  list-style-position: inside;
}

.nav-item {
  display: inline;
  margin-left: 2rem;
  &__link {
    .transition(color);
    &:hover {
      color: @link-color-hover;
    }
    &.active {
      color: @white;
    }
  }
  &__icon {
    .mobile({
      font-size: 23 / @rem;
    })
  }
}

.header-delete-button {
	position: relative;
	& .delete-task-count {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 22 / @rem;
		height: 22 / @rem;
		background-color: @tomato;
		border-radius: 50%;
		line-height: 22 / @rem;
    	text-align: center;
		font-family: @notification-font-family;
		font-size: @caption-font-size-l;
		color: @white;
		&.show {
			display: block;
		}
	}
}


[data-title]:hover:before {
	visibility: visible;
	opacity: 0.9;
}

[data-title]:before {
	content: attr(data-title);
	position: absolute;
	bottom: -55px;
	left: 0;
	padding: 10 / @rem 15 / @rem;
	background-color: @title-bg-color;
	visibility: hidden;
	opacity: 0;
	font-size: 12 / @rem;
	white-space: nowrap;
	border-radius: 2px;
	font-size: @title-font-size;
	font-family: @title-font-family;
	color: @title-color;
	.transition(opacity);
	z-index: 20;
}

[data-title] {
	position: relative;
}

</style>
