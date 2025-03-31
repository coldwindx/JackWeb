<template>
  <div class="chat-container">
    <!-- 聊天记录区域 -->
    <VaCardContent class="chat-box">
      <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
        <!-- 图标 -->
        <img v-if="message.sender === 'ai'" :src="'../../../public/trace-icon.svg'" alt="AI Icon" class="icon" />
        <!-- 消息内容 -->
        <img v-if="message.image" :src="message.image" alt="AI Image" class="message-image" />
        {{ message.text }}
      </div>
    </VaCardContent>

    <!-- 输入框和发送按钮 -->
    <div class="input-container">
      <VaInput v-model="newMessage" placeholder="输入消息..." class="input-field" @keypress.enter="sendMessage" />
      <VaButton color="primary" @click="sendMessage">发送</VaButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义响应式数据
const newMessage = ref('') // 用户输入的消息
const messages = ref([
  { sender: 'ai', image: '../../../public/round-table.gv.svg' },
  { sender: 'ai', text: '流程图清晰地展示了WannaCry勒索病毒的攻击链。攻击从勒索软件的初始发送者`wannacry.exe`开始。然后，`wannacry.exe`调用`cmd.exe`来执行各种恶意命令。`cmd.exe`还会启动`cscript.exe`，该脚本可用于运行其他恶意脚本，可能涉及勒索软件提示或进一步的系统破坏。总体而言，该流程图是典型的WannaCry攻击模式，涉及初始入侵、防御逃避、横向移动、数据加密和敲诈暗示等多个阶段。安全团队应立即采取措施隔离受感染的系统，打补丁，并准备从备份中恢复数据。' },
  { sender: 'ai', text: '你好！我是AI助手，有什么可以帮你的吗？' },
]) // 聊天记录

// 发送消息方法
function sendMessage() {
  if (newMessage.value.trim() === '') return

  // 添加用户消息
  messages.value.push({ sender: 'user', text: newMessage.value })

  // 模拟 AI 回复
  setTimeout(() => {
    const aiResponse = `WannaCry是一种在2017年5月爆发的全球性勒索病毒，它利用了Windows操作系统中一个名为EternalBlue（永恒之蓝）的漏洞进行传播。这个漏洞是由美国国家安全局（NSA）开发并被黑客组织Shadow Brokers泄露的。WannaCry迅速蔓延至超过150个国家，影响了数十万台计算机，对医疗、教育、交通等多个行业造成了严重影响。
一旦感染，WannaCry会对用户文件进行加密，并要求以比特币形式支付赎金以换取解密密钥。该病毒不仅能够加密本地文件，还能通过网络进一步感染其他未打补丁的机器。面对这一威胁，微软罕见地为已停止官方支持的Windows XP等旧版本操作系统发布了紧急安全补丁。
WannaCry事件突显了及时更新软件和操作系统的重要性，以及在全球化数字环境中网络安全的脆弱性。此次攻击也促使各国政府和企业加强了对网络安全的重视和投资。尽管最终并没有确凿证据表明有多少受害者支付了赎金，但WannaCry无疑给全世界敲响了一记警钟，强调了维护网络安全和个人数据保护的紧迫性和必要性。`
    messages.value.push({ sender: 'ai', text: aiResponse })
  }, 500)

  // 清空输入框
  newMessage.value = ''
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
  max-width: 250%; /* 图片宽度不超过容器 */
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
