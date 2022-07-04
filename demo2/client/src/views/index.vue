<template>
  <div class="container">
    <header class="header">
      <div class="left">
        <div class="title">Tasks</div>
        <div class="user" @click="openLoginDialog">
          <i class="el-icon-user-solid"></i>
          <div class="user-info">
            <span class="username">{{userInfo.Name}}</span>
            <span class="email">{{userInfo.Email}}</span>
          </div>
          <el-divider direction="vertical"></el-divider>
          <i class="el-icon-s-operation"></i>
        </div>
      </div>
      <div class="operation">
        <el-select
          v-model="userEmailfilter"
          placeholder="Filter By assignee"
          clearable
          :disabled="userInfo.Name !== 'Admin'"
          size="small"
          @change="fetchTaskList">
          <i slot="prefix" class="el-input__icon el-icon-s-operation"></i>
          <el-option
            v-for="item in userOptions"
            :key="item.Email"
            :label="item.Name + ' | ' + item.Email"
            :value="item.Email"
          ></el-option>
        </el-select>
      </div>
    </header>
    <PhaseItem
      ref="phaseItem"
      v-for="(item, index) in phaseList"
      :key="item.title"
      :phaseItem="item"
      :phaseList="taskList[index]"
      :dropFlag="dropFlag" />
    <Login
      ref="login"
      :userInfo="userInfo"
      :userOptions="userOptions"
      @submit="changeUserHandler" />
  </div>
</template>

<script>
import PhaseItem from './../components/PhaseItem.vue'
import Login from './../components/Login.vue'
export default {
  components: {
    PhaseItem,
    Login
  },
  data () {
    return {
      userOptions: [],
      userEmailfilter: '',
      userInfo: {
        Name: 'Admin',
        Email: 'Admin@waterloo.com'
      },
      taskList: [],
      phaseList: [
        {
          title: 'phase1',
          phaseBackgroundColor: '#000000',
          titleColor: '#ffffff'
        },
        {
          title: 'phase2',
          phaseBackgroundColor: '#757575',
          titleColor: '#ffffff'
        },
        {
          title: 'phase3',
          phaseBackgroundColor: '#ececec',
          titleColor: '#000000'
        }
      ],
      dropFlag: true
    }
  },
  watch: {},
  computed: {},
  beforeMount () {
    this.fetchUserList()
    this.fetchTaskList()
  },
  methods: {
    fetchUserList () {
      fetch('/api/userList', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
      })
        .then(res => res.json())
        .then(({ data }) => {
          this.userOptions = data
        })
    },
    fetchTaskList (value) {
      const query = {
        Email: value || '',
        type: 'Email'
      }
      this.checkDropFlag()
      fetch('/api/taskList', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(query)
      })
        .then(res => res.json())
        .then(({ data }) => {
          this.taskList = data
        })
    },
    // 打开登录弹窗
    openLoginDialog () {
      this.$refs.login.open()
    },
    // 更改登录用户
    changeUserHandler (data) {
      this.userInfo.Email = data.Email
      this.userInfo.Name = this.userOptions.filter(item => item.Email === data.Email)[0].Name
      // 调取列表接口
      if (this.userInfo.Name === 'Admin') {
        this.userEmailfilter = ''
        this.fetchTaskList()
      } else {
        this.userEmailfilter = `${this.userInfo.Name} | ${this.userInfo.Email}`
        this.fetchTaskList(data.Email)
      }
      this.checkDropFlag()
    },
    // 判断是否可拖拽状态
    checkDropFlag () {
      if (this.userInfo.Name === 'Admin' && (this.userEmailfilter === '' || this.userEmailfilter.indexOf('Admin') > -1)) {
        this.dropFlag = true
      } else {
        this.dropFlag = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  .left {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    margin-right: 2rem;
  }
  .operation {
    display: flex;
    align-items: center;
  }
  .user {
    color: #555;
    cursor: pointer;
    display: flex;
    align-items: center;
    .user-info {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      margin-left: 10px;
      color: #555;
    }
    .email {
      color: #bbb;
    }
    .el-icon-user-solid, .el-icon-s-operation {
      font-size: 1.2rem;
    }
    .el-icon-s-operation {
      color:#409EFF;
    }
  }
}
::v-deep .login-dialog {
  max-width: 600px;
  width: 90%;
}
::v-deep .el-divider--horizontal {
  margin: .1rem 0;
}

@media (max-width: 45rem) {
  .container {
    ::v-deep .phase {
      &-item {
        flex-direction: column;
      }
      &-aside {
        width: 100%;
        padding: 1rem;
      }
    }
  }
}
@media (max-width: 36rem) {
  .container {
    header {
      flex-direction: column;
      .left {
        flex-direction: column;
        .user {
          margin: 1rem 0;
        }
      }
      .title {
        margin-right: 0;
      }
      .operation {
        width: 100%;
        flex-direction: column;
        ::v-deep .el-select {
          width: 100%;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.v-modal {
  background-color: rgba(#000,0.5);
  opacity: unset;
}
</style>
