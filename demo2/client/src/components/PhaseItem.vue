<template>
  <div class="phase-item">
    <div class="phase-aside" :style="`background-color: ${phaseItem.phaseBackgroundColor}`">
      <h1 class="phase-title" :style="`color: ${phaseItem.titleColor}`">{{phaseItem.title}}</h1>
    </div>
    <div class="phase-content">
      <el-row :gutter="20" v-if="taskData.length">
        <component :is="dropFlag? 'v-draggable' : 'div'" v-model="taskData" :animation="300" @end="onEnd">
          <transition-group class="phase-stretch">
            <el-col :md="8" :sm="12" v-for="task of taskData" :key="task._id">
              <TaskItem :taskItem="task" />
            </el-col>
          </transition-group>
        </component>
      </el-row>
      <div v-else class="no-task">
        <p>No Task</p>
      </div>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'
export default {
  name: 'PhaseItem',
  components: { TaskItem },
  props: {
    phaseItem: {
      type: Object,
      default: () => {}
    },
    phaseList: {
      type: Array,
      default: () => []
    },
    dropFlag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      taskData: []
    }
  },
  watch: {
    phaseList: {
      immediate: true,
      handler (val) {
        this.taskData = JSON.parse(JSON.stringify(val))
      }
    }
  },
  methods: {
    onEnd () {
      const sorts = this.taskData.map(({ _id }, index) => ({
        _id,
        Priority: index + 1
      }))
      fetch('/api/setTaskSort', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(sorts)
      })
        .then((res) => res.json())
        .then(() => {
          this.taskData = this.taskData.map((item, index) => ({
            ...item,
            Priority: index + 1
          }))
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.phase {
  &-item {
    display: flex;
    margin-bottom: .8rem;
  }
  &-aside {
    background-color: #000;
    width: 10rem;
    padding: 1rem .8rem;
  }
  &-title {
    font-size: .8rem;
    margin: 0;
  }
  &-content {
    background-color: rgb(249, 249, 249);
    flex: 1;
    padding: .6rem;
  }
  &-stretch {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }
}
.no-task {
  height: 10rem;
  font-size: .8rem;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
}
::v-deep .el-col {
  margin: 0.5rem 0;
}

</style>
