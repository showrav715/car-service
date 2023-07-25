<template lang="">
  <section class="engineer__section pt-120 pb-120">
    <div class="container">
      <div class="row justify-content-center pb-50">
        <div class="col-lg-6">
          <div class="section-header section-center">
            <h6>
              <span class="sub"> {{$t('Engineers')}} </span>
            </h6>
            <h2 class="space1">{{title}}</h2>
            <p class="sep">
              {{text}}
            </p>
          </div>
        </div>
      </div>
      <div class="service__wrapper">
        <div class="engineer__wrapper owl-theme owl-carousel">
          <swiper
            :spaceBetween="-15"
            :slidesPerView="4"
            :centeredSlides="false"
            :pagination="{
              clickable: true,
            }"
            :autoplay="{
              delay: 2500,
              disableOnInteraction: true,
            }"
            :navigation="false"
            :modules="modules"
            :breakpoints="{
              '280': {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              '320': {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              '640': {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }"
            class="mySwiper"
          >
            <swiper-slide v-for="team in teams" class="service__item">
              <div class="thumb">
                <img v-lazy="team.photo" alt="img" />
              </div>
              <div class="content">
                <h3>
                  <a href="javascript:;"> {{team.name}} </a>
                </h3>
                <h4>{{team.designation}}</h4>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";
import ValidHtml from "./ValidHtml.vue";
const modules = [Autoplay, Pagination, Navigation];
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

{
  Swiper, SwiperSlide, modules;
}
const { teams } = defineProps(["teams","title","text"]);
</script>
<style lang=""></style>
