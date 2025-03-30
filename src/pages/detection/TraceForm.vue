<template>
  <div class="chat-container">
    <!-- 聊天记录区域 -->
    <VaCardContent class="chat-box">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
        <!-- 图标 -->
        <img
          v-if="message.sender === 'ai'"
          :src="'../../../public/trace-icon.svg'"
          alt="AI Icon"
          class="icon"
        />
        <!-- 消息内容 -->
        <img v-if="message.image" :src="message.image" alt="AI Image" class="message-image"/>
        {{ message.text }}
      </div>
    </VaCardContent>

    <!-- 输入框和发送按钮 -->
    <div class="input-container">
      <VaInput
        v-model="newMessage"
        placeholder="输入消息..."
        class="input-field"
        @keypress.enter="sendMessage"
      />
      <VaButton color="primary" @click="sendMessage">发送</VaButton>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

// 定义响应式数据
const newMessage = ref(""); // 用户输入的消息
const messages = ref([
  { sender: "ai", image: "https://picsum.photos/400" },
  { sender: "ai", text: "你好！我是AI助手，有什么可以帮你的吗？"},
]); // 聊天记录

// 发送消息方法
function sendMessage() {
  if (newMessage.value.trim() === "") return;

  // 添加用户消息
  messages.value.push({ sender: "user", text: newMessage.value });

  // 模拟 AI 回复
  setTimeout(() => {
    const aiResponse = `你刚刚说：${newMessage.value}`;
    messages.value.push({ sender: "ai", text: aiResponse });
  }, 500);

  // 清空输入框
  newMessage.value = "";
}
</script>

<style scoped>

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.chat-box {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column; /* 确保聊天记录是垂直排列 */
}

.message {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 4px;
  max-width: 80%;
  display: flex; /* 让图标和文本在同一行 */
  align-items: center; /* 垂直居中对齐 */
}
/* 图片消息样式 */
.message-image {
  max-width: 100%; /* 图片宽度不超过容器 */
  height: auto; /* 高度自适应 */
  border-radius: 4px; /* 圆角效果 */
  margin-top: 8px; /* 和文本保持一定间距 */
}
/* 用户消息样式（居右） */
.message.user {
  align-self: flex-end; /* 靠右对齐 */
  background-color: #007bff; /* 蓝色背景 */
  color: white; /* 白色文字 */
}

/* AI 消息样式（居左） */
.message.ai {
  align-self: flex-start; /* 靠左对齐 */
  background-color: #e9ecef; /* 浅灰色背景 */
  color: black; /* 黑色文字 */
}

/* 图标样式 */
.icon {
  margin-right: 8px; /* 图标和文本之间的间距 */
  width: 16px; /* 图标宽度 */
  height: 16px; /* 图标高度 */
}

.input-container {
  display: flex;
  align-items: center;
  padding: 16px;
  border-top: 1px solid #ccc;
}
.input-field {
  flex: 1;
  margin-right: 8px;
}
</style>