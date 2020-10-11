<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="name" prop="name"  width="260">
        <!-- <template slot-scope="scope">
          {{ scope.row.name }}
        </template> -->
      </el-table-column>
      <el-table-column label="avatar" prop="avatar"  width="180" align="center">
        <template slot-scope="scope">
          <div class="user-avatar">
            <img :src="scope.row.avatar" alt="">
          </div>
          <!-- <span>{{ scope.row.avatar }}</span> -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date"  width="290" label="Display_time">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date | userParseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date"  width="290" label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delUser(scope.row._id,scope.$index)">删除</el-button>
          <el-button type="warning" @click="editUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList, delUser } from '@/api/table'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserList().then(response => {
        console.log('用户列表', response.data.data)
        this.list = response.data.data
        this.listLoading = false
      })
    },
    // 删除用户
    delUser(id,index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
       let { data } = await delUser(id)
        if(data.code === 200) {
          this.list.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: data.msg
          });
        }
 
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  filters: {
    userParseTime(val) {
      return parseTime(val)
    }
  }
}
</script>
<style lang='scss' scoped>
  .user-avatar {
    margin: 0 auto;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>