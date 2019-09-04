<template>
  <h1>Settings</h1>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
.page-settings {
  padding-top: 0.6rem;
}

.page-header-settings {
  position: relative;
}

.page-tab-menu__settings {
  .mobile-landscape({
    margin-bottom: 13 / @rem;
  });
  .mobile-portrait({
    margin-bottom: 54 / @rem;
  });
}

.settings-title-holder {
  margin-bottom: 25 / @rem;
}

.settings-form {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  max-width: 786 / @rem;
  margin: 0 auto;
  .mobile-portrait({
    flex-direction: column;
    align-items: center;
  })
}

.settings-control-box {
  width: 43%;
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
  margin-left: 38 / @rem;
  margin-bottom: 7.5vh;
  &__circle {
    position: absolute;
    top: 0;
    left: -38 / @rem;
    width: 17 / @rem;
    height: 17 / @rem;
    border-radius: 50%;
    &--work-time {
      background-color: @settings-work-time;
    }
    &--work-iteration {
      background-color: @settings-work-iteration;
    }
    &--short-break {
      background-color: @settings-short-break;
    }
    &--long-break {
      background-color: @settings-long-break;
    }
  }
  &__holder {
    display: inline-flex;
    width: 100 / @rem;
    justify-content: space-between;
    border-bottom: 1px solid @global-text-color;
    margin-bottom: 14 / @rem;
    padding-bottom: 3px;
    .transition(border-color);
    &:hover {
      border-color: @spray;
    }
    &:hover .settings-control-box__input {
      color: @white;
    }
  }
  &__title {
    font-family: @caption-font-family;
    text-transform: uppercase;
    font-size: @caption-font-size-l;
    margin-right: 28 / @rem;
    &-holder {
      width: 236 / @rem;
      display: flex;
      justify-content: space-between;
      color: white;
      .mobile({
        width: 258 / @rem;
      })
    }
    .mobile({
      font-size: 16 / @rem;
    })
  }
  &__input {
    background: transparent;
    border: none;
    flex-grow: 1;
    text-align: center;
    font-size: @heading2-font-size-l;
    .transition(color);
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
      margin: 0;
    }
  }
  &__btn {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 10px;
    .transition(color);
    &:hover {
      color: @spray;
    }
    &[disabled] {
      opacity: 0.3;
    }
  }
  &__text {
    float: left;
    font-family: @caption-font-family;
    font-size: @caption-font-size-l;
  }
  &__minutes {
    color: white;
  }
  .mobile-portrait({
    margin-bottom: 54 / @rem;
  })
}

.settings-chart {
  text-align: center;
  &__title {
    margin: 0;
    margin-bottom: 53 / @rem;
  }
  &__image {
    width: 100%;
    margin-bottom: 69 / @rem;
    font-family: @caption-font-family;
    font-size: @caption-font-size-l;
    & img {
      width: 100%;
    }
  }
  &__line-part {
    display: flex;
    flex-flow: row nowrap;
  }
}

.settings-buttons {
  text-align: center;
  margin-bottom: 4.69rem;
  .mobile({
    margin-bottom: 3.125rem;
  })
}

/* categories section */
.categories {
  text-align: center;
}

.category-list {
  display: block;
  margin: 0 auto;
  padding: 0;
  margin-bottom: 97 / @rem;
}

.category-item {
  margin-bottom: 34 / @rem;
  &__circle {
    display: inline-block;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    vertical-align: middle;
    &--yellow {
      background-color: @work;
    }
    &--blue {
      background-color: @education;
    }
    &--purple {
      background-color: @hobby;
    }
    &--red {
      background-color: @sport;
    }
    &--green {
      background-color: @other;
    }
  }
  &__link {
    display: inline-block;
    width: 245 / @rem;
    padding-bottom: 12 / @rem;
    margin-left: 23 / @rem;
    border-bottom: 1px solid @global-text-color;
    text-align-last: left;
    font-family: @subtitle-font-family;
    font-size: @paragraph-font-size-l;
  }
  &--last {
    margin-bottom: 0;
  }
}

.category-buttons {
  margin-bottom: 6.75rem;
}

.work-line {
  
  background-color: @settings-work-time;
}

.short-break-line {
  background-color: @settings-short-break;
}

.long-break-line {
  background-color: @settings-long-break;
}

</style>
