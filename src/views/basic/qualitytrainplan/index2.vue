<template>
  <div class="app-container pull-auto trainplan">
    <basic-container >
      <div style="display:flex;">
          <Select/>
          <el-container>
        <el-aside width="200px">
            <avue-form v-model="form" :option="option" @submit="submit"></avue-form>
          <avue-tree
          ref="tree"
            :option="treeOption"
            :data="treeData"
            @change="selectionChange"
            @node-click="nodeClick"
            @change.native="handleTree($event)"
            v-model="treeList"

            
          ></avue-tree>

        </el-aside>
        <el-main>
          <avue-crud
            ref="crud"
            :page="page"
            v-model="obj"
            :data="loadData"
            :table-loading="tableLoading"
            :option="loadOption"
            @current-change="currentChange"
            @refresh-change="refreshChange"
            @size-change="sizeChange"
            @row-update="handleUpdate"
            @row-save="handleSave"
            @row-del="rowDel"
            :row-style="rowStyle"
          >
            <template slot="menuLeft">
              <el-button type="primary" @click="handleAdd" size="small"
                >新 增</el-button
              >
              <br /><br />
            </template>
            <template slot-scope="scope" slot="menu">
              <el-button
                type="primary"
                icon="el-icon-success"
                size="mini"
                plain
                @click="handleOpen(scope.row, scope.index)"
                >完成</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                plain
                @click="handleEdit(scope.row, scope.index)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                plain
                @click="handleDel(scope.row, scope.index)"
                >删除</el-button
              >
            </template>
          </avue-crud>
        </el-main>
      </el-container>
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
import {
  fetchList as trainplanFetchList,
  getObj,
  addObj,
  putObj,
  delObj,
  getFinish
} from "@/api/basic/qualitytrainplan";
import { tableOption as loadOption } from "@/const/crud/basic/qualitytrainplan";
import { getListObj } from "@/api/basic/qualitydept";
import { mapGetters } from "vuex";
import BulletFrame from "@/components/bulletFrame";
import Select from './select.vue'
export default {
  components: {
    BulletFrame,
    Select
  },
  data() {
    return {
      treeList: {},
      tree:[],
      // 弹窗相关
      timeBottom: "100%",
      isClose: false,
      isOpen: false,
      isSuccess: false,
      cloneData: {},
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

      obj: {},
      treeData: [],
      treeOption: {
        multiple: true,
        formOption: {
          labelWidth: 100,
          column: [
            {
              label: "自定义项",
              prop: "test"
            }
          ]
        },
        props: {
          labelText: "标题",
          label: "deptName",
          value: "deptId",
          children: "children"
        }
      },
      loadData: [],
      loadOption
    };
  },
  created() {
    this.getList();
    getListObj().then(res => {
      let data = res;
// 其实你并不需要看 传递给后端的数据
// 
    this.tree = data.data.data; 
      this.treeData = data.data.data.map(item => {
        return {
          ...item,
          children: [
            {
              ...item
            },
            {
              ...item
            }
          ]
        };
      });
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
    },
    "form.deptId": {
      handler() {
        // console.log(1234567);
      }
    },
    'treeList': {
      handler() {
        console.log(1234567);
      },
      deep:true,
      immediate: true
    }
  },
  methods: {
    handleTree(event) {
        console.log(this.$refs.tree)
      console.log(event);
      console.log(this.tree);
    },
    selectionChange(list) {
      this.$message.success("选中的数据" + JSON.stringify(list));
    },
    // 这个方法是 avue框架o
    nodeClick(data) {
      // this.treeList.push(data)
      this.$message.success(JSON.stringify(data));
      trainplanFetchList(data.deptId).then(response => {
        this.loadData = response.data.data.records;
      });
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
      //   console.log("row", row.status);
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
      trainplanFetchList(req).then(response => {
        this.loadData = response.data.data.records;
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
          _this.loadData.splice(index, 1);
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
        this.loadData.splice(index, 1, Object.assign({}, row));
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
        this.loadData.push(Object.assign({}, row));
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
