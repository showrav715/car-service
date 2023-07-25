<template>
  <div>
    <div v-dompurify-html="html"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
name: "validHtml";
defineProps(["html"]);
</script>
