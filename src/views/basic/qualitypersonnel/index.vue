<template>
  <div class="app-container pull-auto">
    <basic-container>
      <avue-crud
        ref="crud"
        :page="tablePage"
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
            v-if="permissions.generator_qualitypersonnel_add"
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
            v-if="permissions.generator_qualitypersonnel_down"
            icon="el-icon-check"
            size="mini"
            plain
            @click.stop="handleDownload(scope.row, scope.index)"
            >下载</el-button
          >
          <el-button
            type="primary"
            v-if="permissions.generator_qualitypersonnel_edit"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.generator_qualitypersonnel_del"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/basic/qualitypersonnel";
import { tableOption } from "@/const/crud/basic/qualitypersonnel";
import { mapGetters } from "vuex";
import fileDownload from "@/mixins/download";
export default {
  name: "qualitypersonnel",
  mixins: [fileDownload],
  data() {
    return {
      tableData: [],
      tablePage: {
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
    searchChange(params, done) {
      this.tablePage.currentPage = 1;
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
              console.log("运行为空")

        this.tableData = response.data.data.records;
        this.tablePage.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    currentChange(val) {
      this.tablePage.current = val;
      this.listQuery.current = val;
      this.getList();
    },
    sizeChange(val) {
      this.tablePage.size = val;
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
         this.getList(this.tablePage);
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
