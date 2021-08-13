<template>
  <div class="bullet_f_container" @click.self="handleBack()">
    <div class="bullet_f_select">
      <div class="info" v-if="isClose">
        <h2>提示</h2>
        <i class="el-icon-warning"></i>
        是否确认关闭系统编号为：<strong>{{
          closeOrOpenId
        }}</strong
        >的记录
      </div>
      <div class="info" v-if="isOpen">
        <h2>开启</h2>
        <p style="margin-top:10px;">
          <label for="">请填写未关闭原因：</label>
          <avue-select
            v-model="off"
            placeholder="请选择内容"
            type="tree"
            :dic="reasonDatas"
            :props="closeProps"
          ></avue-select>
        </p>
      </div>
      <div class="info" v-if="isSuccess">
        <h2>请确认完成</h2>
      </div>
      <footer class="roster_footer">
        <el-button size="medium" @click="handleCancle()">取消</el-button>
        <el-button size="medium" type="primary" @click="handleSubmit()"
          >确认</el-button
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isClose", "closeOrOpenId", "isOpen", "isSuccess","reasonDatas"],
  data() {
    return {
      off: "",
      closeProps:{
          label:'label',
          value:"value"
        },
    };
  },
  methods: {
    handleSubmit() {
        // console.log("this.cloneData",this.closeOrOpenId)
      this.$emit("handleSubmit", {
        open: {
          id: this.closeOrOpenId,
          offText: this.off
        },
        close: {
          id: this.closeOrOpenId
        }
      });
      this.off = "";
    },
    handleCancle() {
      this.$emit("handleCancle");
      this.off = "";
    },
    handleBack() {
      this.$emit("isSelf");
      this.off = "";
    }
  }
};
</script>

<style scoped>
.bullet_f_container {
  position: fixed;
  left: 0;
  /* right: -100%; */
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transition: bottom 0.3s;
  z-index: 999;
}
.bullet_f_select {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  height: 50%;
  background: #fff;
  height: 245px;
  width: 600px;
  color: #606266;
  font-size: 14px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.el-icon-warning {
  color: #e6a23c;
  font-size: 18px;
  padding: 5px 10px 0;
}
.info {
  vertical-align: middle;
  text-align: left;
}
.el-input {
  margin: 20px 15px;
}
.roster_footer {
  padding: 0 0 30px;
}
/* .details form{
    padding:20px 0;
} */
.details label {
  display: inline-block;
  width: 120px;
}
.myInput {
  height: 32px;
  width: 215px;
  line-height: 32px;
  padding-right: 30px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/* chrome */

input[type="number"] {
  -moz-appearance: textfield; /* firefox */
}
input {
  border: 1px solid rgb(0 0 0 / 10%);
}
</style>
