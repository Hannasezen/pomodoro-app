<template>
  <section class="page page-task-list" id="task-list">
    <div class="page-wrapper">
      <!--DAILY TASK LIST SECTION START-->
      <section class="daily-task-section">
        <!----------add task title--->
        <div class="page-title-holder task-list-title-holder">
          <h1 class="page-title">
            <span class="page-title__text">Daily Task List</span>
            <button class="page-title__button add-task-button" data-title="Add New Task"><span class="icon-add"></span></button>
          </h1>
        </div>
        <nav class="page-tab-menu-holder task-list__tab-menu">
          <ul class="page-tab-menu page-tab-menu--left hidden" id="dailyDeleteMenu">
            <li class="page-tab-item">
              <a href="" class="page-tab-item__link">Selected All</a>
            </li>
            <li class="page-tab-item">
              <a href="" class="page-tab-item__link last">Deselected All</a>
            </li>
          </ul>
          <ul class="page-tab-menu page-tab-menu--right hidden" id="dailyFilterMenu">
            <li class="page-tab-item">
              <a href="" class="page-tab-item__link active">To Do</a>
            </li>
            <li class="page-tab-item">
              <a href="" class="page-tab-item__link last">Done</a>
            </li>
          </ul>
        </nav>  
        <!--daily task list tab menu END-->

        <!--------- no-tasks messages --------->
        
        <!--add first task message-->
        <div class="add-task hidden">
          <div class="add-task__image pomodora-image">
            <img src="../assets/images/svg/tomato-add.svg" alt="pomodoro image add new task">
          </div>
          <div class="add-task__text task-list-message">
            Add your first task
          </div>
        </div>
        <!--add first task message END-->
        <!--add new task message-->
        <div class="no-tasks hidden">
          <div class="add-task__image pomodora-image">
            <img src="../assets/images/svg/tomato-addv02.svg" alt="pomodoro image no any tasks">
          </div>
          <div class="add-task__text task-list-message">
            You don`t have any tasks left. Add new tasks to stay productive.
          </div>
        </div>
        <!--add new task message END-->
        <!--------- no-tasks messages END ------->

        <!----------Daily task list-------------->
        <ul class="task-list task-list--daily" id="daily-task-list-wrapper">       
         <!-- <TaskItem /> -->
        </ul>
        <!------Daily task list END---------->

        <!--task-list page`s message-->
        <div class="task-list-messages">
          <div class="task-list-message task-list-message-done hidden">
            <p class="task-list-message__text">Excellent, all daily tasks done! :)</p>
            <div class="task-list-message__icon"></div>
          </div>
          <div class="task-list-message task-list-message-added hidden">
            <p class="task-list-message__text">Task added,<br>drag it to the top 5 in daily task list</p>
            <div class="task-list-message__icon icon-arrow_circle"></div>
          </div>
        </div>
        <!--task-list page`s message END-->      
      </section>
      <!--DAILY TASK LIST SECTION END-->

      <!--GLOBAL tasks list page -->
      <section class="global-task-section">
        <!--global task list header-->
        <header class="global-list-header">
          <h3 class="global-list-title">
            <a class="global-list-title__link" href="" data-title="Go to Global List">
              <span class="global-list-title__text">Global list</span>
              <span class="icon-global-list-arrow-down global-list-title__icon"></span>
            </a>
          </h3>
          <!--global task list left tab-menu-->
          <nav class="page-tab-menu-holder page-tab-menu-holder--global-left hidden" id="globalDeleteMenu">
            <ul class="page-tab-menu page-tab-menu--left">
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link">Selected All</a>
              </li>
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link last">Deselected All</a>
              </li>
            </ul>
          </nav>
          <!--global task list left tab-menu END-->
          <!--global task list right tab-menu-->
          <nav class="page-tab-menu-holder hidden" id="globalFilterMenu">
            <ul class="page-tab-menu page-tab-menu--right">
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link active" data-value="all">All</a>
              </li>
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link" data-value="urgent">Urgent</a>
              </li>
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link" data-value="high">High</a>
              </li>
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link" data-value="middle">Middle</a>
              </li>
              <li class="page-tab-item">
                <a href="" class="page-tab-item__link last" data-value="low">Low</a>
              </li>
            </ul>
          </nav>
          <!--global task list right tab-menu END-->
        </header>
        <!--global task list header END-->
        <!--global tasks list-->
        <ul v-for="task in getTasks" :key="task.taskId" class="task-list task-list--global" id="global-task-list-wrapper">
          <TaskItem 
            :title="task.title"
            :categoryId="task.categoryId"
            :description="task.description"
            :estimation="task.estimation"
            :priority="task.priority"
            :deadlineDate="task.deadlineDate"
          />
        </ul>
        <!--global tasks list END-->
      </section>
      <!--GLOBAL tasks list page END-->
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import TaskItem from '../components/TaskItem';

export default {
	name: "task-list",
	components: {
		TaskItem,
  },
  computed: mapGetters(['getTasks'])
}
</script>

<style lang="less">
.task-list {
	padding: 0;
	margin: 0;
	&__tab-menu {
		margin-bottom: 19 / @rem;
	}
	&--daily {
		margin-bottom: 39 / @rem;
	}
	&--global {
		margin-top: 34 / @rem;
	}
	&-category {
		text-transform: uppercase;
		margin: 0;
		font-size: @task-list-category-size;
		font-family: @task-list-category-font;
		margin-bottom: 19 / @rem;
		margin-left: 21 / @rem;
	}
	&-category-group {
		margin-bottom: 23 / @rem;
		&.last {
			margin-bottom: 0;
		}
	}
}

.global-list {
	&-header {
		display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
	}
	&-title {
		margin: 0;
		cursor: pointer;
		&__link {
			.transition(color);
			&:hover {
				color: @link-color-hover;
			}
		}
		&__text {
			font-family: @task-list-title-font;
			margin-right: 10 / @rem;
		}
		&__icon {
			font-size: 10 / @rem;
			vertical-align: middle;
		}
	}
}

.global-task-section {
	padding-bottom: 50 / @rem;
}

.task-list-message {
	font-family: @message-font-family;
	font-size: @mesasge-font-size-l;
	text-align: center;
  margin: 0 auto;
  margin-top: 92 / @rem;
  margin-bottom: 24 / @rem;
	&__icon {
		font-size: 60 / @rem;
  }
  &__text {
    margin: 0;
    margin-bottom: 29 / @rem;
  }
  .mobile-landscape({
    margin-top: 45 / @rem;
    margin-bottom: 85 / @rem;
  });
  .mobile-portrait({
    margin-top: 120 / @rem;
    margin-bottom: 175 / @rem;
  });  
}

/* first task styles */

.first-task {
	&__text {
		width: 64vw;
		margin: 0 auto;
		margin-bottom: 10vh;
	}
}

/* no tasks in task list message */ 

.add-task__text {
	width: 42vw;
}

.task-sublist {
	position: relative;
	@categories: work, education, hobby, sport, other;
	each(@categories, {
		&--@{value} {
			& .task-list-category {
				.category-color(@value);
      }
      
			&:before {
				.category-bg-color(@value);
				.category-shadow-color(@value)
      }
      
			&:after {
				.category-bg-color(@value);
			}		
		}
  })
  
	&:before {
		content: '';
		position: absolute;
		top: 4px;
		left: 0;
		width: 5px;
		height: 5px;
		border-radius: 50%;
    border: 3px solid transparent;
		background-clip: content-box;
  }
  
	&:after {
		content: '';
		position: absolute;
		top: 15px;
		left: 0;
		bottom: 0;
		width: 9px;
	}
}
</style>
