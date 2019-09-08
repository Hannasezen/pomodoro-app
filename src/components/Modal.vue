<template>
  <div class="modal">
    <div class="modal-header">
      <!--modal buttons-->
      <button type="button" v-if="modalTitle == 'Edit task'"
        class="modal-btn modal-delete-btn"
        @click.prevent="deleteTask(getActiveTask.taskId)"
        >
        <span class="icon-trash"></span>
      </button>
      <div class="modal__controlls">
        <button type="button"
          class="modal-btn modal-close-btn"
          @click="closeModal"
        >
          <span class="icon-close"></span>
        </button>
        <button type="submit"
          form="add-task"
          class="modal-btn modal-save-btn"
          @click.prevent="showModal(); addNewTask()"
        >
          <span class="icon-check"></span>
        </button>
      </div>
      <!--modal title-->
      <h1 class="modal__title">{{ modalTitle }}
      </h1>
      <!--modal form start-->
    </div>
    <form
      class="modal__form task-form"
      name="task"
    >
      <!--task title-->
      <fieldset class="task-form__box fieldset">
        <legend class="fieldset__title">Title</legend>
        <label>
          <input
          class="fieldset__input"
          type="text"
          name="title"
          placeholder="Add title here"
          v-model="task.title"
          />
        </label>
      </fieldset>

      <!--task description-->
      <fieldset class="task-form__box fieldset">
        <legend class="fieldset__title">Description</legend>
        <label>
          <input
          class="fieldset__input"
          type="text"
          name="description"
          placeholder="Add description here"
          v-model="task.description"
          />
        </label>
      </fieldset>

      <!--task category block-->
      <fieldset class="task-form__box fieldset">
        <legend class="fieldset__title">Category</legend>
          <label class="fieldset__circle"
            :class="{['fieldset__circle--' + category]: true}"
            v-for="(category, index) in categories"
            :key="index"
            aria-label=" task category">
            <input class="fieldset__input--radio"
              type="radio"
              name="category"
              :value="[category]"
              v-model="checkedCategory"
              >
            <span class="fieldset__circle-image"
              :class="{['fieldset__circle-image--' + category]: true}"></span>
            <span class="fieldset__circle-text">{{ category }}</span>             
          </label>        
      </fieldset>

      <!--task Deadline block-->
      <fieldset class="task-form__box fieldset">
        <legend class="fieldset__title">Deadline</legend>
        <label>
          <input
          type="date"
          class="fieldset__input"
          id="task-date"
          name="deadline"
          v-model="checkedDate"
          >
        </label>
      </fieldset>

      <!--task estimetion block-->
      <fieldset class="task-form__box fieldset fieldset__estimations-block">
        <legend class="fieldset__title">ESTIMATION</legend>

        <label
          class="fieldset__tomato"
          aria-label="one pomodoro"
          v-for="index in 5"
          :key="index"
        >
          <input
            class="fieldset__tomato-input"
            type="radio"
            name="estimation"
            :value="[index]"
            v-model="checkedEstimation"
          >
          <span class="fieldset__tomato-image fieldset__tomato-image"></span>
        </label>

      </fieldset>
      <!--task Priority block-->
      <fieldset class="task-form__box fieldset last" id="task-priority">
        <legend class="fieldset__title">Priority</legend>
          <label class="fieldset__circle"
            v-for="(priority, index) in priorities"
            :key="index"
            :class="{['fieldset__circle--' + priority]: true}"
            aria-label=" task priopity">
            <input
              class="fieldset__input--radio"
              type="radio"
              :value="[priority]"
              v-model="checkedPriority"
              name="priority"
            >
            <span
              class="fieldset__circle-image"
              :class="{['fieldset__circle-image--' + priority]: true}"
            ></span>
            <span class="fieldset__circle-text">{{ priority }}</span>
          </label>
      </fieldset>
    </form>
    <!--modal form end-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "modal",
  data() {
    return {
      categories: [
        'work',
        'education',
        'hobby',
        'sport',
        'other',
      ],
      priorities: [
        'low',
        'middle',
        'high',
        'urgent',
      ]
    }
  },
  computed: {
    ...mapGetters(['getActiveTask', 'modalTitle']),
    checkedCategory: {
      get() {
        return [this.task.categoryId];
      },
      set(newCategory) {
        return this.task.categoryId = newCategory[0];
      }
    },
    checkedPriority: {
      get() {
        return [this.task.priority];
      },
      set(newPriority) {
        return this.task.priority = newPriority[0];
      }
    },
    checkedEstimation: {
      get() {
        return [this.task.estimation];
      },
      set(newEstimation) {
        return this.task.estimation = newEstimation[0];
      }
    },
    checkedDate: {
      get() {
        return this.task.deadlineDate.replace(/(^\d{1,2})\/(\d{2})\/(\d{4})/, function(match, p1, p2, p3) {
          return `${p3}-${p1.length < 2 ? '0' + p1 : p1}-${p2}`;
        });        
      },
      set(newDate) {
        return this.task.deadlineDate = newDate.replace(/(^\d{4})\-(\d{2})\-(\d{2})/, function(match, p1, p2, p3) {
          return `${p2}/${p3}/${p1}`;
        }); 
      }
    }
  },
  methods: {
    ...mapActions([
      'showModal',
      'closeModal',
      'addTask',
      'deleteTask'
    ]),
    addNewTask() {
      if (this.isValidForm()) {
        this.addTask({
          title: this.task.title,
          description: this.task.description,
          categoryId: this.task.categoryId,
          priority: this.task.priority,
          deadlineDate: new Date(this.task.deadlineDate).toLocaleDateString(),
          estimation: +this.task.estimation,
          taskId: this.task.taskId,
        })
      } else {
        console.log('not valid')
      }
      
    },
    isValidForm() {
      return (this.task.estimation
          && this.task.categoryId
          && this.task.priority
          && this.task.title
          && this.task.description
          && this.task.deadlineDate)
    },
  },
  created() {
    this.task = this.getActiveTask || {
                title: '',
                description: '',
                priority: '',
                categoryId: '',
                estimation: 1,
                deadlineDate: new Date().toLocaleDateString(),
              }
  }
}
</script>

<style lang="less">
@categories: work, education, hobby, sport, other;
@priorities: low, middle, high, urgent;
@all: work, education, hobby, sport, other, low, middle, high, urgent;

.modal {
  width: 500 / @rem;
  min-height: 630 / @rem;
  padding: 14 / @rem;
  padding-bottom: 52 / @rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: @global-background;
  &-header {
    display: flex;
    flex-wrap: wrap;
    .mobile-landscape({
      flex-wrap: nowrap;
    })
  }
  &-holder {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  &__controlls {
    flex-grow: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    margin-bottom: 11 / @rem;
  }
  &-btn {
    font-size: 20 / @rem;
    border: none;
    padding: 0;
    background-color: transparent;
    .mobile({
      font-size: 28 / @rem;
    })
  }
  &-save-btn {
    margin-left: 14 / @rem;
    .mobile({
      margin-left: 30 / @rem;
    })
  }
  &-delete-btn {
    flex-grow: 1;
    text-align: left;
    .mobile-landscape({
      order: -2;
    })
  }
  &__title {
    text-align: center;
    margin: 0;
    margin-bottom: 23 / @rem;
    flex-basis: 100%;
    .mobile-landscape({
      order: -1;
    })
  }
  &__form {
    width: 88%;
    flex-grow: 1;
    margin: 0 auto;
  }
  &__message {   
    width: 74%; 
    font-family: @message-font-family;
    font-size: @mesasge-font-size-l;
    text-align: center;
    &-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }
    .mobile({
      width: 60%;
    })
  }
  &__buttons {
    text-align: center;
  }
  .mobile({
    width: 100%;
    height: 100%;
    padding: 46 / @rem 30 / @rem;
  })
}

.fieldset {
  border: none;
  padding: 0;
  padding-bottom: 8 / @rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 33 / @rem;
  text-transform: capitalize;
  .mobile-landscape({
    padding-bottom: 19 / @rem;
  });
  &__estimations-block {
    position: relative;
    padding-bottom: 30 / @rem;
  }
  &.last {
    margin-bottom: 0;
  }
  &__title {
    font-family: @subtitle-font-family;
    font-size: @modal-subtitle-size-l;
    text-transform: uppercase;
    color: @modal-subtitle-color;
    margin-bottom: 15 / @rem;
  }
  &__input {
    background-color: transparent;
    border: none;
    &::placeholder {
      color: inherit;
    }
    &--radio {
      .visually-hidden();
      &:checked {
        each(@all, {
          & ~ .fieldset__circle-image--@{value}:before {
            width: 5px;
            height: 5px;
            .category-bg-color(@value);
            .category-shadow-color(@value);
            background-clip: padding-box;
            box-sizing: content-box;
            left: 3px;
          }
        });        
        & ~ .fieldset__circle-text {
          color: @white;
        }
      }
    }
  }
  &__circle {
    position: relative;
    padding-right: 10 / @rem;
    .transition(color);
    &-image {
      position: relative;
      margin-right: 21 / @rem;
      each(@all, {
        &--@{value}:before {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
          box-sizing: border-box;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          border: 3px solid transparent;
          background-color: @input-radio-color;
          .transition(background-color);
        }
      });      
    }
    
    each(@all, {
      &--@{value}:hover > .fieldset__circle-image {
        &:before {
          .category-bg-color(@value);
        }
        
      }
    });
    &:hover {
      color: @link-color-hover;
      cursor: pointer;
    }
    .mobile({
      padding-right: 30 / @rem;
    })
  }
  &__tomato {
    position: absolute;
    left: 0;
    &:nth-child(2) {
      width: 21px;
      z-index: 5;
    }
    &:nth-child(3) {
      width: 40px;
      z-index: 4;
    }
    &:nth-child(4) {
      width: 60px;
      z-index: 3;
    }
    &:nth-child(5) {
      width: 80px;
      z-index: 2;
    }
    &:nth-child(6) {
      width: 100px;
      z-index: 1;
    }
    &-input {
      width: 100%;
      .visually-hidden();
      &:checked + .fieldset__tomato-image {
        background-image: url('../assets/images/svg/fill-tomato.svg');
      }
    }
    &-image {
      display: inline-block;
      width: 100%;
      height: 19px;
      background-image: url('../assets/images/svg/empty-tomato.svg');
      background-repeat: repeat-x;
      background-position: top left;
      background-size: contain;
    }

  }
}
</style>
