<template>
  <div class="app-container pull-auto business">
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
        :row-style="rowStyle"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            @click="handleAdd"
            size="mini"
            v-if="permissions.generator_orderbusiness_add"
            >新 增</el-button
          >
          <br /><br />
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button
            v-if="permissions.generator_orderbusiness_open"
            type="success"
            size="mini"
            icon="el-icon-open"
            plain
            @click.stop="handleOpen(scope.row, scope.index)"
            >开启</el-button
          >
          <el-button
            v-if="permissions.generator_orderbusiness_close"
            type="warning"
            size="mini"
            icon="el-icon-turn-off"
            plain
            @click.stop="handleOff(scope.row, scope.index)"
            >关闭</el-button
          >
          <el-button
            type="info"
            icon="el-icon-view"
            size="mini"
            plain
            @click.stop="$refs.crud.rowView(scope.row, scope.index)"
            >详情</el-button
          >
          <el-button
            v-if="permissions.generator_orderbusiness_down"
            icon="el-icon-check"
            size="mini"
            plain
            @click.stop="handleDownload(scope.row, scope.index)"
            >下载</el-button
          >
          <el-button
            type="primary"
            v-if="permissions.generator_orderbusiness_edit"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.row, scope.index)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            v-if="permissions.generator_orderbusiness_del"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="handleDel(scope.row, scope.index)"
            >删除</el-button
          >
        </template>
        <template slot-scope="scope" slot="status">
          <el-tag :type="scope.row.status == '已关闭' ? 'info' : 'danger'">{{
            scope.row.status
          }}</el-tag>
        </template>
        <template slot-scope="scope" slot="reason">
          <span>{{ getReason(scope.row.reason) }}</span>
        </template>
      </avue-crud>
    </basic-container>
    <!-- isSelf: 点击的不是弹窗本身消失，handleCancle： 点击取消弹窗消失，handleSubmit：点击提交的处理-->
    <BulletFrame
      :style="{ bottom: timeBottom }"
      :isClose="isClose"
      :isOpen="isOpen"
      :closeOrOpenId="closeOrOpenId"
      :reasonDatas="reasonDatas"
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
  closeOrder,
  openOrder
} from "@/api/basic/orderbusiness";
import { remote } from "@/api/admin/dict";
import { tableOption } from "@/const/crud/basic/orderbusiness";
import { mapGetters } from "vuex";
import fileDownload from "@/mixins/download";
export default {
  name: "orderbusiness",
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
      closeOrOpenId: '',
      reasonDatas: [],

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
    remote("order_onclosed_reason").then(res => {
      this.reasonDatas = res.data.data;
    });
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  methods: {
    getReason(data) {
      if (data == "-999" || (!data && data != 0)) return;
      for (let i = 0; i < this.reasonDatas.length; i++) {
        if (this.reasonDatas[i].value == data) {
          return this.reasonDatas[i].label;
        }
      }
    },
    rowStyle({ row, column, rowIndex }) {
      if (!row.status || row.status == "未关闭") {
        return {
          backgroundColor: "#7ED9CA",
          color: "#000"
        };
      }
    },
    isSelf() {
      this.timeBottom = "100%";
      this.isClose = false;
      this.isOpen = false;
    },
    async handleSubmit(event) {
      this.timeBottom = "100%";
      this.isClose = false;
      this.isOpen = false;
      console.log(event);
      if (event.open.offText) {
        await openOrder({ orderId: event.open.id, reason: event.open.offText });
      } else {
        await closeOrder(event.close.id);
      }
      this.getList(this.page);
    },
    handleOpen(row, index) {
        console.log(row.data)
      this.closeOrOpenId = row.orderId;
      this.timeBottom = "18px";
      this.isClose = false;
      this.isOpen = true;
    },
    handleOff(row, index) {
      console.log(row);
      this.closeOrOpenId = row.orderId;

      this.timeBottom = "18px";
      this.isClose = true;
      this.isOpen = false;
    },
    searchChange(params, done) {
      console.log(params);
      if (params.confirmTime) {
        params.searchDate = params.confirmTime;
        params.confirmTime = undefined;
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
      this.getList(this.page);
    }
  }
};
</script>

<style lang="scss" scoped></style>
