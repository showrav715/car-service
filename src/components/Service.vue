<template>
  <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6">
    <div class="service__item">
      <div class="thumb">
        <img v-lazy="service.photo" alt="img" />
      </div>
      <div class="content">
        <div class="icon">
          <img v-lazy="service.icon" alt="img" />
        </div>
        <h3>
          <router-link
            :to="{
              name: 'singleService',
              params: { slug: service.slug },
            }"
          >
            {{ service.title }}
          </router-link>
        </h3>
        <p>
          {{ service.sort_text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["service"]);
</script>
