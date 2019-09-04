<template>
  <h1>Reports</h1>
</template>

<script>
export default {
  
}

</script>

<style lang="less">
.page-reports {
	text-align: center;
	padding-bottom: 106 / @rem;
}

.reports {
  
	&-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
  }
  
	&-title {
		margin-bottom: @title-margin-l;
  }
  
	&-tab-menu {
		justify-content: center;
  }
  
	&-app-holder {
		flex-grow: 1;
    display: flex;
	}
}

.highcharts-container {
  background: transparent;
}
</style>
