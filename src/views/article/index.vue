<template>
  <div class="app-container">
    <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="文章发布时间:">
            <span>{{ props.row.date | fromDate }}</span>
          </el-form-item>
          <el-form-item label="文章类容:">
            <pre class="language-markup">
              <code v-html="props.row.content"></code>
            </pre>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="文章作者"
      prop="author">
    </el-table-column>
    <el-table-column
      label="文章描述"
      prop="describe">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { getArticleList } from '@/api/table'
import { formatDate } from '@/utils'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'
const highlightCode = () => {
  const block = document.querySelectorAll('pre code')
  console.log('block', block);
  block.forEach((el) => {
    console.log(el);
    hljs.highlightBlock(el)
  })
}
export default {
  data() {
    return {
      list: null,
      listLoading: true,
      params: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  mounted() {
    this.fetchData()
    setTimeout(()=>{
    highlightCode() 

    },1000)
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      let { data } = await getArticleList(this.params)
      this.list = data.list
      this.listLoading = false
      // getArticleList(this.params).then(response => {
      //   console.log('文章列表', response.data)
      //   this.list = response.data.list
      //   this.listLoading = false
      //   highlightCode()
      // })
    }
  },
  updated () {
    highlightCode()
  },
  filters: {
    fromDate: function(val) {
      console.log(val);
      return formatDate(new Date(val).getTime())
    }
  }
}
</script>

<style lang='scss' scoped>
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 100%;
    }
</style>