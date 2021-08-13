<template>
  <div class="app-container pull-auto">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="page"
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
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="handleAdd"
            size="small"
            v-if="permissions.generator_equipmain_add"
            >新 增</el-button
          >
          <br /><br />
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            type="info"
            icon="el-icon-view"
            size="mini"
            plain
            @click.stop="$refs.crud.rowView(scope.row, scope.index)"
            >详情</el-button
          >
          <el-button
            type="success"
            v-if="permissions.generator_equipmain_finish"
            icon="el-icon-success"
            size="mini"
            plain
            @click="handleOpen(scope.row, scope.index)"
            >完成</el-button
          >
          <el-button
            v-if="permissions.generator_equipmain_down"
            icon="el-icon-check"
            size="mini"
            plain
            @click.stop="handleDownload(scope.row, scope.index)"
            >下载</el-button
          >
          <el-button
            type="primary"
            v-if="permissions.generator_equipmain_edit"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.generator_equipmain_del"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>
        <template slot-scope="scope" slot="status">
          <el-tag>
            {{ scope.row.status }}
          </el-tag>
        </template>
      </avue-crud>
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
  getFinish
} from "@/api/basic/equipmain";
import { tableOption } from "@/const/crud/basic/equipmain";
import { mapGetters } from "vuex";
import fileDownload from "@/mixins/download";
export default {
  name: "equipmain",
  mixins: [fileDownload],
  components: {
    BulletFrame
  },
  data() {
    return {
      // 弹窗相关
      timeBottom: "100%",
      isClose: false,
      isOpen: false,
      isSuccess: false,
      cloneData: {},
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
  },
  mounted: function() {},
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
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
      this.getList(this.page)
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
    searchChange(params, done) {
      if (params.mainTime) {
        params.searchDate = params.mainTime;
        params.mainTime = undefined;
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
    handleAdd: function() {
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
      this.getList(this.page)

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
      this.getList(this.page)

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
