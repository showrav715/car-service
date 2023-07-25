<template lang="">
  <!-- Service -->
  <section class="services__section pt-120 pb-120">
    <div class="container">
      <div class="row justify-content-center pb-60">
        <div class="col-lg-6">
          <div class="section-header section-center">
            <h2 class="space1">{{title}}</h2>
            <p>
              {{text}}
            </p>
          </div>
        </div>
      </div>
      <div class="service__wrapper">
        <div class="row g-4">
          <service v-for="service in services" :key="service.id" :service="service" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>

import Service from "../components/Service.vue";
const { services } = defineProps(["services",'title','text']);
</script>
