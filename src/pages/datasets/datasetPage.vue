<template>
  <h1 class="page-title">数据收集</h1>
  <div class="container">
    <div class="header">
      <button class="add-button" @click="add">新增</button>
      <button class="delete-button" @click="deleteData">删除</button>
      <input v-model="search" type="text" placeholder="Search" class="search-input" />
      <button class="search-button" @click="searchData">搜索</button>
    </div>
  </div>

  <!-- 展示数据页面 -->
  <div class="dataset-table-container" @scroll="handleScroll">
    <table class="dataset-table">
      <thead>
        <tr>
          <th>索引</th>
          <th>用户</th>
          <th>时间</th>
          <th>描述</th>
          <th>状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in records" :key="data.index">
          <td>{{ data.index }}</td>
          <td>{{ data.user }}</td>
          <td>{{ parseTime(data.timestamp) }}</td>
          <td>{{ data.description }}</td>
          <td>{{ data.status }}</td>
        </tr>
      </tbody>
    </table>
    <button v-if="hasMoreData" class="load-more-button" @click="loadMore">查看更多数据</button>
  </div>
  <!-- 上传文件页面 -->
  <div v-if="showAddPage" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeAddPage">&times;</span>
      <h2>添加行为数据</h2>
      <div class="modal-body">
        <input type="file" @change="handleFileUpload" />
        <button class="upload-button" @click="upload">上传行为数据</button>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '../../services/time.js'

import json from '../../data/pages/dataset-db.json'
// 新增按钮

export default {
  data() {
    return {
      showAddPage: false,
      records: json,
    }
  },
  methods: {
    add() {
      this.showAddPage = true
    },
    closeAddPage() {
      this.showAddPage = false
    },
    async upload() {
      console.log('File Upload!')
    },
    parseTime(time) {
      return parseTime(time, '{y}-{m}-{d} {h}:{i}:{s}')
    },
  },
}
</script>

<style lang="scss" scoped>
// 展示页面
.dataset-table-container {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead {
  background-color: #e0e0e0;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.container {
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.add-button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #4caf50;
}

.delete-button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #f44336;
}

.search-input {
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.search-button {
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

// 上传文件页面
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.upload-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
