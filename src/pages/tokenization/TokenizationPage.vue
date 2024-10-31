<template>
  <ElSteps style="max-width: 600px" :active="1">
    <ElStep title="Step 1" :icon="Edit" />
    <ElStep title="Step 2" :icon="Upload" />
    <ElStep title="Step 3" :icon="Picture" />
  </ElSteps>
</template>

<script lang="ts" setup>
import { Edit, Picture, Upload } from '@element-plus/icons-vue'
</script>
