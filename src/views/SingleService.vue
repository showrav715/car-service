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
              <h1>{{ $t("Service") }}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }">
                    {{ $t("Home") }}
                  </router-link>
                </li>
                <li>_ {{ $t("Service") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->
    <section class="servie__details pt-120 bgsection pb-120">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-4 col-md-5">
            <div class="service__sidebar">
              <h3>{{ $t("Recent Services") }}</h3>
              <ul class="service__detailstag">
                <li v-for="recent in recent_service">
                  <router-link
                    :to="{
                      name: 'singleService',
                      params: { slug: recent.slug },
                    }"
                  >
                    <i class="fas fa-angle-double-right"></i>
                    {{ recent.title }}
                  </router-link>
                </li>
              </ul>
              <div class="service__detailstag mt-5">
                <div class="thum1 mb-4">
                  <img :src="setting.service_banner1" alt="img" />
                </div>
                <div class="thum1">
                  <img :src="setting.service_banner2" alt="img" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-7">
            <div class="srvice__detailswrapper">
              <div class="thumb mb-4">
                <img :src="service.service_photo" alt="img" />
              </div>
              <div class="content">
                <h2 class="title mb-3">
                  {{ service.title }}
                </h2>
                <validHtml :html="service.description && service.description" />
              </div>

              <div v-if="service.modules" class="row g-4 mt-4 mb-5">
                <div
                  v-for="module_item in service.modules"
                  :key="module_item.id"
                  class="col-lg-6"
                >
                  <div class="tecni__item d-flex align-items-center">
                    <div class="thumb">
                      <img :src="module_item.photo" alt="tech" />
                    </div>
                    <h3>
                      <a href="#0"> {{ module_item.title }} </a>
                    </h3>
                  </div>
                </div>
              </div>

              <div v-if="service.is_benifit == 1">
                <div class="content">
                  <h2 class="title mb-3">{{ $t("Our Benifits") }}</h2>
                  <p>
                    {{ service.benifits_details }}
                  </p>
                </div>
                <div class="row g-4 mt-4">
                  <div class="col-lg-6">
                    <div class="checking__thumb">
                      <img :src="service.benifits_photo" alt="img" />
                    </div>
                  </div>

                  <div class="col-lg-6" v-if="service.benifits">
                    <ul class="cheking__details">
                      <li
                        v-for="benifit in service.benifits"
                        class="d-flex align-items-center gap-2"
                      >
                        <i class="fas fa-check"></i>
                        {{ benifit }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="accordion__wrap mt-4">
                <div class="accordion" id="accordionExample">
                  <!--Accordion items-->
                  <div
                    v-for="(faq, index) in faqs"
                    :key="faq.id"
                    class="accordion-item wow fadeInUp"
                    data-wow-duration="1s"
                  >
                    <h2 class="accordion-header" :id="`heading${faq.id}`">
                      <button
                        class="accordion-button"
                        :class="index === 0 ? '' : 'collapsed'"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="`#check${faq.id}`"
                        :aria-expanded="index === 0 ? true : false"
                        :aria-controls="`check${faq.id}`"
                      >
                        {{ faq.title }}
                      </button>
                    </h2>

                    <div
                      :id="`check${faq.id}`"
                      class="accordion-collapse collapse"
                      :class="index == 0 ? 'show' : ''"
                      :aria-labelledby="`heading${faq.id}`"
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                        <p>
                          {{ faq.content }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
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
import validHtml from "../components/validHtml.vue";
import myaxios from "../myaxios";
import { useRoute } from "vue-router";
const service = ref({});
const faqs = ref([]);
const recent_service = ref([]);
const route = useRoute();
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const slug = ref(route.params.slug);
const setting = inject("setting");

onMounted(() => {
  loading(true);
  getData();
});

watch(
  () => route.params.slug,
  () => {
    slug.value = route.params.slug;
    loading(true);
    getData();
  }
);

const getData = async () => {
  const { data } = await myaxios.get(`/single/service/${slug.value}`);
  service.value = data.service;
  faqs.value = data.service.faqs;
  recent_service.value = data.recent;
  loading(false);
};
</script>
<style lang=""></style>
