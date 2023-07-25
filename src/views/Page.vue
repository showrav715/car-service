<template lang="">
  <div>
    <!-- Breadcumnd Banner -->
    <section
      class="breadcumnd__banner contact__bg"
      :style="{ 'background-image': `url(${breadcumb()})` }"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6">
            <div class="breadcumnd__content">
              <h1>{{ page.title }}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }"> {{$t('Home')}} </router-link>
                </li>
                <li>_ {{ page.title }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->
    <section class="about__section pt-120 pb-120">
      <div class="container">
        <div class="row align-items-center g-4">
          <div class="col-xl-12 col-lg-12">
            <h2>
              {{ page.title }}
            </h2>
            <div class="about__content">
              <div class="section__two">
                <p class="mt-4 fz-18">
                  <validHtml :html="page.details && page.details" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script setup>
import { ref, onMounted, inject, watch } from "vue";
import validHtml from "../components/ValidHtml.vue";
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const slug = ref("");
import { useRoute } from "vue-router";
import myaxios from "../myaxios";
const route = useRoute();
const page = ref({});
onMounted(() => {
  loading(true);
  getPage();
});

watch(
  () => route.params.slug,
  () => {
    loading(true);
    slug.value = route.params.slug;
    getPage();
    window.scrollTo(0, 0);
  }
);

slug.value = route.params.slug;
const getPage = async () => {
  const { data } = await myaxios.get(`get/page/${slug.value}`);
  page.value = data;
  loading(false);
};
</script>

