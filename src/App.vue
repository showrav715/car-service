<template>
  <div>
    <layout v-if="!isMaintance"></layout>
    <div v-else>
      <maintance
        :image="setting.maintenance_photo"
        :description="setting.maintenance"
      ></maintance>
    </div>
  </div>
</template>
<script setup>
import { onMounted, provide, ref } from "vue";
import Layout from "./components/Layout.vue";
import Maintance from "./components/Maintance.vue";
import myaxios from "./myaxios";
import { getLanguage } from "./lib/global.js";
const language = ref({});
const setting = ref({});
const isMaintance = ref(false);
onMounted(async () => {
  await myaxios.get("/get/settings").then((res) => {
    setting.value = res.data;
  });
  await myaxios.get("/language").then((res) => {
    language.value = res.data;
    getLanguage(language.value);
  });
  if (setting.value.is_maintenance == 1) {
    isMaintance.value = true;
    router.push({ name: "home" });
  }
});

const breadcumb = () => {
  return setting.value.breadcumb;
};

provide("setting", setting);
provide("breadcumb", breadcumb);
components: {
  Layout;
}
</script>
