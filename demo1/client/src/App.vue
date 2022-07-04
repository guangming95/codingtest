<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html {
  font-size: 20px;
}
body {
  padding: 0 1rem;
  margin: 0;
  background-color: #fff;
  font-size: 16px;
}
* {
  box-sizing: border-box;
}

.el-textarea,
.el-input {
  &__inner {
    border-radius: 0;
  }
}
.el-button,
.el-dialog,
.el-select-dropdown{
    border-radius: 0;
}
p {
  margin: 0;
}

::v-deep .el-dialog__wrapper {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
