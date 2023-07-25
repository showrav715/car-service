<template lang="">
  <!-- Banner -->
  <section
    class="banner-section"
    :style="{ 'background-image': `url(${herodata.hero_photo})` }"
    :background-image="`url(${herodata.hero_photo})`"
  >
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xxl-8 col-xl-9 col-lg-12 col-md-12">
          <div class="banner__wrapper__content">
            <h4 class="subtitle">{{ herodata.hero_subtitle }}</h4>
            <h1 class="title">
              {{ herodata.hero_title }}
            </h1>
            <p>
              {{ herodata.hero_text }}
            </p>
            <div class="btn__grp d-flex align-items-center">
              <router-link :to="{ name: 'service' }" class="cmn--btn">
                <span> {{ $t("Check our services") }} </span>
              </router-link>
              <router-link
                :to="{ name: 'contact' }"
                class="cmn--btn btn-outline"
              >
                <span> {{ $t("Contact us") }} </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Banner -->
</template>
<script setup>
const { herodata } = defineProps(["herodata"]);
</script>
<style lang=""></style>
