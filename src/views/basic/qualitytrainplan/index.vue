<template>
  <div class="app-container pull-auto trainplan">
    <basic-container>
      <div style="display:flex;">
        <div style="flex:0 0 140px;padding-top: 63px;">
          <el-tree
            :data="tree_table"
            show-checkbox
            node-key="deptId"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
            @check-change="change"
          >
          </el-tree>
        </div>
        <div style="flex:1;">
          <avue-crud
            ref="crud"
            :page="page"
            v-model="form"
            :data="tableData"
            :table-loading="tableLoading"
            :option="tableOption"
            @current-change="currentChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @row-update="handleUpdate"
            @row-save="handleSave"
            @row-del="rowDel"
            @search-change="searchChange"
            :row-style="rowStyle"
          >
            <template slot="menuLeft">
              <el-button
                type="primary"
                @click="handleAdd"
                size="small"
                v-if="permissions.generator_qualitytrainplan_add"
                >新 增</el-button
              >
              <br /><br />
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="success"
                v-if="permissions.generator_qualitytrainplan_finish"
                icon="el-icon-success"
                size="mini"
                plain
                @click="handleOpen(scope.row, scope.index)"
                >完成</el-button
              >
              <el-button
                type="primary"
                v-if="permissions.generator_qualitytrainplan_edit"
                icon="el-icon-edit"
                size="mini"
                plain
                @click="handleEdit(scope.row, scope.index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                v-if="permissions.generator_qualitytrainplan_del"
                icon="el-icon-delete"
                size="mini"
                plain
                @click="handleDel(scope.row, scope.index)"
                >删除</el-button
              >
            </template>
            <template slot-scope="scope" slot="participantsForm">
              <avue-select
                multiple
                v-model="listForm"
                placeholder="请选择内容"
                type="tree"
                :dic="dic"
                :props="listProps"
              ></avue-select>
            </template>
            <template slot="depts" slot-scope="scope">
              <el-tag>{{ scope.row.deptName }}</el-tag>
            </template>
            <template slot="participants" slot-scope="scope">
              <span>{{ scope.row.participantName }}</span>
            </template>
            <!-- <template slot="codesType" slot-scope="{ item, value, label }">
              <span>{{ item }}</span>
            </template> -->
          </avue-crud>
        </div>
      </div>
    </basic-container>
    <!-- isSelf: 点击的不是弹窗本身消失，handleCancle： 点击取消弹窗消失，handleSubmit：点击提交的处理-->
    <BulletFrame
      :style="{ bottom: timeBottom }"
      :isClose="isClose"
      :isOpen="isOpen"
      :isSuccess="isSuccess"
      :cloneData="cloneData"
      @isSelf="isSelf()"
      @handleCancle="isSelf()"
      @handleSubmit="handleSubmit($event)"
    />
  </div>
</template>

<script>
import BulletFrame from "@/components/bulletFrame";

import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj,
  getFinish,
  tableTree
} from "@/api/basic/qualitytrainplan";

import { tableOption } from "@/const/crud/basic/qualitytrainplan";
import { mapGetters } from "vuex";
import Select from "./select.vue";
export default {
  name: "qualitytrainplan",
  components: {
    BulletFrame,
    Select
  },
  data() {
    return {
      myDatas: [],
      myDepts: "",
      myPersonnel: "",
      tree_table: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 弹窗相关
      timeBottom: "100%",
      isClose: false,
      isOpen: false,
      isSuccess: false,
      cloneData: {},
      listForm: [],
      listProps: {
        label: "deptName",
        desc: "notes",
        value: "deptId"
      },
      form: {},
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      listQuery: {
        current: 1,
        size: 20
      },
      tableLoading: false,
      tableOption: tableOption
    };
  },
  created() {
    this.getList();
    tableTree().then(res => {
      let data = res;
      console.log(data);
      this.tree_table = data.data.data;
    });
  },
  mounted: function() {},
  computed: {
    ...mapGetters(["permissions"])
  },
  watch: {
    listForm: {
      handler: function(val, oldVal) {
        this.form.participants = val.join(",");
      },
      deep: true
    }
  },
  methods: {
    change(val) {
      this.myDatas.push(val);
      const deptId = this.myDatas
        .map(item => {
          return item.id;
        })
        .join(",");
      console.log("deptID", deptId);
      let personnelId = [];
      this.myDatas.forEach(item => {
        item.children.map(ele => {
          console.log("ele", ele);
          personnelId.push(ele.id);
        });
      });
      this.myDepts = deptId;
      this.myPersonnel = personnelId.join(",");
    },
    isSelf() {
      this.timeBottom = "100%";
      this.isClose = false;
      this.isOpen = false;
      this.isSuccess = false;
    },
    handleSubmit(event) {
      console.log(event);
      this.timeBottom = "100%";
      this.isClose = false;
      this.isOpen = false;
      this.isSuccess = false;
      if (event.close.id) {
        getFinish(event.close.id);
      }
      this.getList(this.page);
    },
    handleOpen(row, index) {
      this.cloneData = {
        data: row,
        index: index
      };
      this.timeBottom = "18px";
      this.isClose = false;
      this.isOpen = false;
      this.isSuccess = true;
    },
    rowStyle({ row, column, rowIndex }) {
      if (!row.time) return;
      const date = row.time.split(" ")[0].split("-");
      const dates = new Date();
      const nowYear = dates.getFullYear();
      const nowMonth =
        dates.getMonth() + 1 > 9
          ? dates.getMonth() + 1
          : "0" + (dates.getMonth() + 1);
      const nowDate =
        dates.getDate() > 9 ? dates.getDate() : "0" + dates.getDate();

      if (
        nowYear > date[0] ||
        (nowYear == date[0] && nowMonth > date[1]) ||
        (nowYear == date[0] && nowMonth == date[1] && nowDate > date[2])
      ) {
        if (!row.status || row.status == "未完成") {
          return {
            backgroundColor: "#fbc4c4",
            color: "#000"
          };
        } else {
          console.log("已过期已完成：", row.status);
        }
      } else {
        if (!row.status || row.status == "未完成") {
          return {
            backgroundColor: "#f5dab1",
            color: "#000"
          };
        } else {
          console.log("未过期已完成：", row.status);
        }
      }
    },
    searchChange(params, done) {
        if (params.time) {
        params.searchDate = params.time;
        params.time = undefined;
      }
      this.page.currentPage = 1;
      this.listQuery.current = 1;
      this.getList(params);
      done();
    },
    getList(params) {
      this.tableLoading = true;
      var req = this.listQuery;
      if (
        params !== undefined &&
        params !== null &&
        JSON.stringify(params) != "{}"
      ) {
        // 特别注意：这里params和req的顺序不能颠倒
        req = Object.assign(params, req);
      }
      fetchList(req).then(response => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    currentChange(val) {
      this.page.current = val;
      this.listQuery.current = val;
      this.getList();
    },
    sizeChange(val) {
      this.page.size = val;
      this.listQuery.size = val;
      this.getList();
    },
    /**
     * @title 打开新增窗口
     * @detail 调用crud的handleadd方法即可
     *
     **/
    handleAdd() {
      if (!this.myDatas.length) {
        this.$message.error("请选择部门/人员");
        return;
      }
      this.$refs.crud.rowAdd();
    },
    handleEdit(row, index) {
      this.$refs.crud.rowEdit(row, index);
    },
    handleDel(row, index) {
      this.$refs.crud.rowDel(row, index);
    },
    rowDel: function(row, index) {
      var _this = this;
      this.$confirm("是否确认删除ID为" + row.id + "的记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          _this.tableData.splice(index, 1);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getList(this.page);
        })
        .catch(function(err) {});
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
        this.getList(this.page);
        done();
      });
    },
    /**
     * @title 数据添加
     * @param row 为当前的数据
     * @param done 为表单关闭函数
     *
     **/
    handleSave: function(row, done) {
      row.depts = this.myDepts;
      row.participants = this.myPersonnel;
      addObj(row).then(data => {
        this.tableData.push(Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success"
        });
        this.getList(this.page);
        done();
      });
      this.myDepts = "";
      this.myPersonnel = "";
      this.myDatas = [];
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList();
    }
  }
};
</script>

<style lang="scss" scoped></style>
