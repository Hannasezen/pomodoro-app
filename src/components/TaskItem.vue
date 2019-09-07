<template>
  <li class="task-item">
    <div class="task-item__left-info">
      <div class="task-item__color-line" :class="{['task-item__color-line--category-' + categoryId]: true}">
      <button type="button" class="icon-close task-item__left-btn task-item__left-btn--checked hidden"></button>
      <button type="button" class="icon-trash task-item__left-btn task-item__left-btn--delete hidden"></button>
      </div>
      <div class="task-item__date" v-if="isToday">TODAY</div>
      <div class="task-item__date task-item__date--full" v-else>
        <span class="task-item__day">{{ taskDate }}</span>
        <span class="task-item__month">{{ taskMonth }}</span>
      </div>
    </div>
    <div class="task-item__main-info">
      <div class="task-item__text">
      <h4 class="task-item__title" :class="{['task-item__title--priority-' + priority]: true}">{{ title }}</h4>
      <div class="task-item__description">{{ description }}</div>
      </div>
      <div class="task-item__edit-buttons">
      
      <button type="button" class="task-item__btn task-item__btn-up" data-title="Move to Daily list">
        <span class="icon-arrows-up"></span>
      </button>
      <button
				type="button"
				class="task-item__btn task-item__btn-edit"
				data-title="Edit task"
				@click.prevent="showModal(taskId)"
			>
        <span class="icon-edit"></span>
      </button>
      </div>          
    </div>
    <div class="task-item__right-info" :class="{['task-item__right-info--priority-' + priority]: true}">
      <button type="button" class="icon-tomato task-item__tomato">
      <span class="task-item__iteration">
        <span class="task-item__iteration">{{ estimation }}</span>
      </span>
      </button>
    </div>
  </li>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: "task-item",
	props: {
    title: String,
    description: String,
    categoryId: String,
		estimation: Number,
		priority: String,
		deadlineDate: String,
		taskId: String,
	},
	data() {
		return {
			todayDate: new Date().toLocaleDateString()
		}
	},
	computed: {
		isToday() {
			return this.deadlineDate === this.todayDate;
		},
		taskDate() {
			return new Date(this.deadlineDate).getDate();
		},
		taskMonth() {
			return new Date(this.deadlineDate).toLocaleDateString('en-US', {month: 'long'});
		},
	},
	methods: {
		...mapActions(['showModal'])
	}
}
</script>

<style lang="less">
@priorities: urgent, high, middle, low;
@categories: work, education, hobby, sport, other;

.task-item {
    width: 100%;
    min-height: 87 / @rem;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-bottom: 9 / @rem;
    background-color: @task-bg-color;
    box-shadow: 0px 5px 8.3px 1.7px rgba(34, 56, 73, 0.3);
    &__left-info {
			display: flex;
			align-items: center;
			width: 87 / @rem;
			height: 87 / @rem;
		}
		&__left-btn {
			background-color: transparent;
			border: none;
			width: 100%;
			height: 100%;
			color: @white;
			font-size: 40 / @rem;
		}
    &__main-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-grow: 1;
			padding-right: 30 / @rem;
    }
    &__right-info {
			width: 87 / @rem;
			color: @white;

			each(@priorities, {
				&--priority-@{value} {
					.priority-bg-color(@value);
				}
			})
    }
    &__color-line {
			width: 10px;
			height: 100%;

			each(@categories, {
				&--category-@{value} {
					.category-bg-color(@value);
				}
			})			
    }
    &__date {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-weight: bold;
			font-size: 11 / @rem;
			text-transform: uppercase;
		}
		&__day {
			font-size: @task-day-font-size;
		}
		&__month {			
		}
    &__text {
			padding-left: 17px;
			display: flex;
			flex-direction: column;
    }
    &__title {
			margin: 0;
			margin-bottom: 9px;
			font-size: @task-list-title-size-l;

			each(@priorities, {
				&--priority-@{value} {
					.priority-color(@value);
				}
			})	
    }
    &__edit-buttons {
			display: flex;
			flex-direction: column;
		}
		&__tomato {
			display: block;
			width: 100%;
			height: 100%;
			border: none;
			font-size: 46 / @rem;
			position: relative;
			background-color: transparent;
		}
		&__iteration {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 24 / @rem;
		}
	&__btn {
		border: none;
		padding: 0;
		background-color: transparent;
		color: @task-btn-color;
		.transition(color);
		&:hover {
			color: @link-color-hover;
		}
		&-edit {
			font-size: 19 / @rem;
		}
		&-up {
			font-size: 18 / @rem;
			margin-bottom: 12 / @rem;
		}
	}
	&.last {
		margin-bottom: 0;
	}
}

.checked .task-item,
.delete .task-item {
	&__color-line {
		width: 100%;
	}
	&__date {
		display: none;	
	}
}

.checked .task-item__left-btn--checked {
	display: block !important;
}

.delete .task-item__left-btn--delete {
	display: block !important;
}
</style>
