<template>
  <div class="task-item">
    <p class="task-name">{{taskItem.Task}}</p>
    <p class="task-info" v-html="taskItem.Description">
    </p>
    <div class="task-footer">
      <div class="task-author">
        <el-avatar size="small" class="task-avatar"></el-avatar>
        {{ taskItem.By_who }}
      </div>
      <div class="task-priority" :style="`background-color: ${priorityColor}; color: ${taskItem.Priority < 3 ? '#fff' : '#000'}`">Priority {{ taskItem.Priority }}</div>
    </div>
  </div>
</template>

<script>
import colorRange from 'color-range'
export default {
  name: 'TaskItem',
  props: {
    taskItem: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  computed: {
    priorityColor () {
      if (this.taskItem.Priority > 5) {
        return 'rgb(224, 220, 248)'
      }
      return colorRange(
        this.taskItem.Priority * 18 || 0,
        'HEX',
        '#4B33ED',
        '#F1EFF9'
      )
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.task {
  &-item {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: .7rem;
    height: 100%;
  }
  &-name {
    word-break: break-all;
    font-size: .9rem;
    font-weight: 600;
  }
  &-info {
    flex: 1;
    font-size: 0.6rem;
    color: #979797;
    margin-top: .5rem;
    margin-bottom: .7rem;
    word-break: break-all;
    ::v-deep p {
      margin: 0;
      word-break: break-all;
    }
  }
  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-author {
    display: flex;
    align-items: center;
    font-size: .6rem;
    color: rgb(95, 95, 95);
  }
  &-avatar {
    margin-right: .5rem;
  }
  &-priority {
    padding: .3rem .5rem;
    border-radius: 3px;
    font-size: .6rem;
    flex: none;
  }
}

</style>
