<template lang="">
  <section class="client__section bgsection pt-120 pb-120">
    <div class="container">
      <div class="row justify-content-center pb-70">
        <div class="col-lg-6">
          <div class="section-header section-center">
            <h6>
              <span class="sub"> {{ $t("Testimonials") }} </span>
            </h6>
            <h2 class="space1">{{ title }}</h2>
            <p class="sep">
              {{ text }}
            </p>
          </div>
        </div>
      </div>
      <div class="client__wrapper owl-theme owl-carousel">
        <swiper
          :spaceBetween="-15"
          :slidesPerView="3"
          :centeredSlides="false"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: true,
          }"
          :navigation="false"
          :modules="modules"
          :breakpoints="{
            '320': {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }"
          class="mySwiper"
        >
          <swiper-slide
            v-for="testimonial in testimonials"
            :key="testimonial.id"
            class="client__item"
          >
            <div class="client__user">
              <img v-lazy="testimonial.photo" alt="img" />
              <span class="quote">
                <img v-lazy="quete" alt="img" />
              </span>
            </div>
            <div class="content">
              <p>
                {{ testimonial.message }}
              </p>
              <h3>
                <a href="#0"> {{ testimonial.name }} </a>
                <p class="my-2">{{ testimonial.designation }}</p>
              </h3>
              <div class="ratting d-flex align-items-center gap-1">
                <div v-for="n in 5">
                  <i v-if="n <= testimonial.rating" class="fas fa-star"></i>
                  <i v-else class="far fa-star"></i>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper";
import quete from "./../assets/images/quate.png";
const modules = [Autoplay, Pagination, Navigation];
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { testimonials } = defineProps(["testimonials", "title", "text"]);
{
  Swiper, SwiperSlide, modules, quete;
}
</script>
