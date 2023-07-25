<template>
  <div>
    <section class="certified__section pt-120 pb-120 bgsection">
      <div class="container">
        <div class="row justify-content-center pb-60">
          <div class="col-lg-6">
            <div class="section-header section-center">
              <h2 class="space1">{{title}}</h2>
              <p>{{text}}</p>
            </div>
          </div>
        </div>
        <div class="service__wrapper">
          <div class="row g-4 justify-content-center">
            <div
              v-for="choose in chooses"
              :key="choose"
              class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
            >
              <div class="certified__service">
                <div class="content">
                  <div class="icon">
                    <img v-lazy="choose.photo" alt="icon" />
                  </div>
                  <h3>
                    <a href="javascript:;"> {{ choose.title }} </a>
                  </h3>
                  <p>
                    {{ choose.text }}
                  </p>
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
const { chooses } = defineProps(["chooses","title","text"]);
</script>
