<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  watch: {},
  created() {},
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.menual_main_header .avue-form__group {
  padding-top: 29px;
}
.menual_main_header .avue-form__menu--center {
  width: 22% !important;
  margin-bottom: 0px !important;
  padding-top: 0;
}

.avue-tags {
  z-index: 0;
}

// 更改质量管理过期时间样式
.trainplan .el-table__row td:last-child,
.supervise .el-table__row td:last-child,
.orderexec .el-table__row td:last-child,
.ordersettle .el-table__row td:last-child,
.business .el-table__row td:last-child {
  background: #fafafa !important;
}
.trainplan .el-table__row td:last-child button:nth-child(4),
.supervise .el-table__row td:last-child button:nth-child(4),
.orderexec .el-table__row td:last-child button:nth-child(4),
.ordersettle .el-table__row td:last-child button:nth-child(4),
.business .el-table__row td:last-child button:nth-child(4) {
  margin-left: 0;
}
.orderexec .el-table__row td:last-child button:nth-child(1),
.orderexec .el-table__row td:last-child button:nth-child(2),
.orderexec .el-table__row td:last-child button:nth-child(3),
.ordersettle .el-table__row td:last-child button:nth-child(1),
.ordersettle .el-table__row td:last-child button:nth-child(2),
.ordersettle .el-table__row td:last-child button:nth-child(3),
.business .el-table__row td:last-child button:nth-child(1),
.business .el-table__row td:last-child button:nth-child(2),
.business .el-table__row td:last-child button:nth-child(3) {
  margin-bottom: 8px;
}

// .trainplan .hover-row{
//     color: #f10!important;
// //   background:red!important;

// }
</style>
