<template>
  <div class="login">
    <el-dialog
      title="Change user"
      custom-class="login-dialog"
      destroy-on-close
      :visible.sync="visible">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item label="User" prop="Task">
          <el-select v-model="form.Email" placeholder="Change User" size="small" style="width: 100%">
            <i slot="prefix" class="el-input__icon el-icon-s-el-icon-user"></i>
            <el-option
              v-for="item in userOptions"
              :key="item.Email"
              :label="item.Name + ' | ' + item.Email"
              :value="item.Email"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" size="small">Change</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    userOptions: {
      type: Array,
      default: () => {}
    },
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      form: {},
      visible: false,
      rules: {
        Name: {
          required: true,
          message: 'Please select the user',
          trigger: 'change'
        }
      }
    }
  },
  watch: {
    userInfo: {
      immediate: true,
      handler (val) {
        this.form = JSON.parse(JSON.stringify(val))
      }
    }
  },
  computed: {},
  beforeMount () {
  },
  methods: {
    open () {
      this.form = JSON.parse(JSON.stringify(this.userInfo))
      this.form.Email = this.userInfo.Email
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    submit () {
      this.$emit('submit', this.form)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
