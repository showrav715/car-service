<template>
  <div>
    <hero :herodata="heredata" />
    <about-section :about="about"></about-section>
    <service-section
      :title="home_sections.service_title"
      :text="home_sections.service_text"
      :services="featureServices"
    />
    <choose
      :chooses="chooses"
      :title="home_sections.choose_title"
      :text="home_sections.choose_text"
    />
    <team
      :teams="teams"
      :title="home_sections.team_title"
      :text="home_sections.team_text"
    />
    <testimonial
      :testimonials="testimonials"
      :title="home_sections.testimonial_title"
      :text="home_sections.testimonial_text"
    />
    <blog
      :blogs="latestBlogs"
      :title="home_sections.blog_title"
      :text="home_sections.blog_text"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import myaxios from "../myaxios.js";
import Hero from "../components/Hero.vue";
import ServiceSection from "../components/ServiceSection.vue";
import AboutSection from "../components/AboutSection.vue";
import Team from "../components/Team.vue";
import Testimonial from "../components/Testimonial.vue";
import Blog from "../components/Blog.vue";
import Choose from "../components/Choose.vue";

const heredata = ref({});
const about = ref({});
const featureServices = ref({});
const teams = ref({});
const chooses = ref({});
const testimonials = ref({});
const latestBlogs = inject("latest_blogs");
const loading = inject("loading");
const home_sections = ref({});

onMounted(() => {
  loading(true);
  getData();
});

const getData = async () => {
  await myaxios
    .get("/get/home/data")
    .then((res) => {
      heredata.value = res.data.hero_data;
      about.value = res.data.about;
      featureServices.value = res.data.services;
      chooses.value = res.data.chooses;
      testimonials.value = res.data.testimonils;
      teams.value = res.data.teams;
      home_sections.value = res.data.home_sections;
      loading(false);
    })
    .catch((err) => {
      
    });

  components: {
    Hero, AboutSection, Team, Testimonial, Blog, latestBlogs, Choose;
  }
};
</script>
