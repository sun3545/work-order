<template>
  <div class="app-container">
    <div class="role-cont clearfix">
      <!-- 全选框 -->
      <el-checkbox class="check-page-all" v-model="checkPageAll" @change="checkPageAllEv($event)"></el-checkbox>
      <el-table
        :data="selectData"
        style="width: 100%;margin-bottom: 20px;"
        ref="multipleTable"
        row-key="deptId"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <!-- 每一行选择框 -->
        <el-table-column type="selection" width="55">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.checked" @change="pageCheckEv(scope)"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column prop="deptName" label="日期" sortable width="180"></el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
export default {
    props:["selectData"],
  data() {
    return {
      checkPageAll: false,
      multipleSelection: []
    };
  },
  methods: {
    // 全选事件
    checkPageAllEv(item) {
      // console.log(this.multipleSelection)
      let checkAll = (data, checked) => {
        for (let x of data) {
          x.checked = checked;
          if (x.children) {
            checkAll(x.children, checked);
          }
        }
      };
      if (item === true) {
        checkAll(this.tableData, true);
      } else {
        checkAll(this.tableData, false);
      }
    },
    // 遍历json数据
    isCheckAllEv(data) {
      let isCheckAll = true;
      let fn = data => {
        for (let x of data) {
          if (x.checked === false) {
            isCheckAll = false;
            return isCheckAll;
          }
          if (x.children) {
            fn(x.children);
          }
        }
      };
      fn(data);
      console.log(isCheckAll);
      return isCheckAll;
    },
    // 查找父级函数
    getParent(data2, nodeId2) {
        console.log("data2",data2)
      var arrRes = [];
      if (data2.length === 0) {
        if (nodeId2) {
          arrRes.push(data2);
        }
        return arrRes;
      }
      let rev = (data, nodeId) => {
        for (var i = 0, length = data.length; i < length; i++) {
          let node = data[i];
          if (nodeId === data[i].id) {
            arrRes.push(node);
            rev(data2, node.p_id);
            break;
          } else {
            if (node.children) {
              rev(node.children, nodeId);
            }
          }
        }
        return arrRes;
      };
      arrRes = rev(data2, nodeId2);
      return arrRes;
    },
    // 子选框事件
    pageCheckEv(scope) {
      console.log(scope.row);
      // 如果有子项，则子项的选框选择跟当前一致
      if (scope.row.children) {
        this.handleCheckAll(scope.row, scope.row.checked);
      }
      // 查找父级选框
      this.getParent(this.tableData, scope.row.id).forEach((item, i) => {
        // 判断父级是否有子元素
         console.log(item);
        if (!item.children) {
          item.checked = scope.row.checked;
        } else {
          var num = 0;
          item.children.forEach((item, i) => {
            // 判断子元素的checked是否为true, 并记录选中的数量
            if (item.checked === true) {
              num += 1;
            }
          });
          // 判断子元素的checked 是否全部 为true(true是选中) 如果是全部选中，那么将父元素的checked状态改成true，否则为false
          if (num === item.children.length) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        }
      });

      // 是否所有子项都已经勾选
      if (this.isCheckAllEv(this.tableData) === true) {
        this.checkPageAll = true;
      } else {
        this.checkPageAll = false;
      }
    },
    // 将子元素的状态 改成和父元素的状态一样
    handleCheckAll(row, checked) {
      row.checked = checked;
      if (row.children) {
        let that = this;
        row.children.forEach((element, i) => {
          that.handleCheckAll(row.children[i], checked);
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.role-cont {
  position: relative;
  font-size: 16px;
  color: #333333;
  line-height: 40px;
}
.check-page-all {
  position: absolute;
  top: 14px;
  left: 11px;
  z-index: 99;
}
</style>