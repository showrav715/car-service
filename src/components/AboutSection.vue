<template lang="">

  <section class="about-section bgsection pt-120 pb-120">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-xxl-6 col-xl-6 col-lg-6">
          <div class="about__thumb">
            <img :src="about.photo" alt="img" />
            <div class="about__shape">
              <img :src="aboutShape" alt="shape" />
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-6">
          <div class="about__content">
            <div class="section-header">
              <h6>
                <span class="sub"> {{about.header_title}} </span>
              </h6>
              <h2 class="space1">{{about.title}}</h2>
              <p class="mb24">
                <validHtml :html="about.description" />
              </p>
            </div>
            
            <a :href="about.btn_url" class="cmn--btn"> {{about.btn_text}} </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import validHtml from "../components/validHtml.vue";
import aboutShape from '../assets/images/about-shape.png';
const { about } = defineProps(["about"]);
</script>
