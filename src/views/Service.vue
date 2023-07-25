<template lang="">
  <div>
    <!-- Banner -->
    <section
      class="breadcumnd__banner contact__bg"
      :style="{ 'background-image': `url(${breadcumb()})` }"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6">
            <div class="breadcumnd__content">
              <h1>{{$t('Service')}}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }"> {{$t('Home')}} </router-link>
                </li>
                <li>_ {{$t('Service')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->

    <!-- Services Section -->
    <section class="services__section pb-120">
      <div class="container">
        <div class="row justify-content-center pt-60 pb-60">
          <div class="col-lg-6">
            <div class="section-header section-center">
              <h2 class="space1">{{$t('Our Service')}}</h2>
            </div>
          </div>
        </div>
        <div class="service__wrapper">
          <div v-if="services.length != 0">
            <div class="row g-4">
              <service
                v-for="service in services"
                :key="service.id"
                :service="service"
              />
            </div>

            <div
              v-if="isPaginate"
              class="pagination__list justify-content-center"
            >
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="abox__big"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="abox__big"
              >
                Next
              </button>
            </div>
          </div>
          <div v-else>
            <div class="row g-4">
              <div
                class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center border p-5"
              >
                <h2>{{$t('Service not found')}}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Services Section -->
  </div>
</template>
<script setup>
import { ref, onMounted, inject, watch } from "vue";
import myaxios from "../myaxios";
import Service from "../components/Service.vue";
import { useRoute } from "vue-router";
const services = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const loading = inject("loading");
const breadcumb = inject("breadcumb");
const route = useRoute();
const isPaginate = ref(true);
onMounted(() => {
  search.value = route.query.search ? "&search=" + route.query.search : "";
  loading(true);
  getServices();
});

// Get all services

// get url search query

const search = ref("");
// route.query change then getServices
watch(
  () => [route.query.search, search.value],
  () => {
    if (route.query.search == undefined) {
      search.value = "";
    } else {
      search.value = "&search=" + route.query.search;
    }
    loading(true);
    getServices();
  }
);

const getServices = async () => {
  const res = await myaxios.get(
    "/services?page=" + currentPage.value + search.value
  );
  services.value = res.data.data;
  totalPages.value = res.data.meta.last_page;
  if (res.data.meta.total > res.data.meta.per_page) {
    isPaginate.value = true;
  } else {
    isPaginate.value = false;
  }
  loading(false);
};

// Go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loading(true);
    getServices();
  }
};

// Go to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    loading(true);
    getServices();
  }
};

{
  previousPage,
    nextPage,
    getServices,
    currentPage,
    totalPages,
    services,
    breadcumb,
    Service;
}
</script>

<style lang=""></style>
