<template>
  <vue-element-loading
    :active="isLoading"
    class="loading"
    spinner="bar-fade-scale"
    :is-full-screen="true"
  />
  <div>
    <!-- Header -->
    <div class="navbar-bottom" v-if="!isLoading">
      <div class="container">
        <div class="navbar-wrapper">
          <div class="logo">
            <router-link :to="{ name: 'home' }">
              <img :src="setting.header_logo" alt="logo" />
            </router-link>
          </div>
          <div class="d-flex align-items-center">
            <ul class="larg__menu d-flex align-items-center">
              <li>
                <router-link :to="{ name: 'home' }">
                  {{ $t("Home") }}</router-link
                >
              </li>
              <li>
                <router-link :to="{ name: 'service' }">
                  {{ $t("Service") }}
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'blog' }">
                  {{ $t("Blog") }}
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'contact' }">
                  {{ $t("Contact") }}
                </router-link>
              </li>
            </ul>
            <div class="menu__right__side d-flex align-items-center">
              <div class="search-button" role="tablist">
                <button
                  class="nav-link"
                  id="search"
                  aria-selected="false"
                  tabindex="-1"
                  role="tab"
                  @click="toggleSearch"
                >
                  <img src="../assets/images/search.png" alt="" />
                </button>

                <div class="search-popup" v-if="toggle">
                  <div class="search-bg" @click="toggleSearch"></div>
                  <div class="search-form" style="right: 0px">
                    <form @submit.prevent="handleServiceSearch">
                      <div class="form">
                        <input
                          type="text"
                          v-model="search"
                          id="searchs"
                          placeholder="Search Service"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div
                class="nav-toggle"
                @click="toggleNav"
                :class="isNavOpen ? 'active' : ''"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="nav-menu-area" :class="isNavOpen ? 'active' : ''">
                <ul class="nav-menu">
                  <li>
                    <router-link :to="{ name: 'home' }" @click="toggleNav">
                      {{ $t("Home") }}</router-link
                    >
                  </li>
                  <li>
                    <router-link :to="{ name: 'service' }" @click="toggleNav">
                      {{ $t("Service") }}
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'blog' }" @click="toggleNav">
                      {{ $t("Blog") }}
                    </router-link>
                  </li>

                  <li>
                    <router-link :to="{ name: 'contact' }" @click="toggleNav">
                      {{ $t("Contact") }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header -->

    <RouterView v-show="!isLoading" v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <!-- Footer section -->
    <footer v-if="!isLoading" class="footer__section">
      <div class="container">
        <div class="footer-top">
          <div class="row g-4">
            <div class="col-xxl-3 col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div class="footer-widget">
                <router-link :to="{ name: 'home' }" class="footer-title">
                  <img v-lazy="setting.footer_logo" alt="logo" />
                </router-link>
                <span class="spantext1">
                  {{ setting.footer_text }}
                </span>
                <p class="spantext1 spantext2">
                  {{ setting.address }}
                </p>
                <div class="footer-info">
                  <div class="info-items">
                    <a href="#0">
                      {{ setting.phone }}
                    </a>
                  </div>
                  <div class="info-items">
                    <a href="#0">
                      {{ setting.email }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xxl-3 col-xl-3 col-lg-2 col-md-6 col-sm-6">
              <div class="footer-widget">
                <h5 class="footer-title">{{ $t("Quick Links") }}</h5>
                <ul class="widget__link">
                  <li>
                    <router-link :to="{ name: 'home' }">
                      {{ $t("Home") }}</router-link
                    >
                  </li>
                  <li>
                    <router-link :to="{ name: 'service' }">
                      {{ $t("Service") }}
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'blog' }">
                      {{ $t("Blog") }}
                    </router-link>
                  </li>

                  <li>
                    <router-link :to="{ name: 'contact' }">
                      {{ $t("Contact") }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xxl-2 col-xl-3 col-lg-3 col-md-6 col-sm-6">
              <div class="footer-widget">
                <h5 class="footer-title">{{ $t("Pages") }}</h5>
                <ul class="widget__link">
                  <li v-for="page in pages" :key="page.id">
                    <router-link
                      :to="{ name: 'page', params: { slug: page.slug } }"
                      >{{ page.title }}</router-link
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-xxl-4 col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div class="footer-widget">
                <h5 class="footer-title">{{ $t("Recent Post") }}</h5>
                <div class="recent-post">
                  <div
                    v-for="blog in letest_blog"
                    :key="blog.id"
                    class="recent-items"
                  >
                    <router-link
                      :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                      class="thumb"
                    >
                      <img v-lazy="blog.photo" alt="thumb-img" width="49" />
                    </router-link>
                    <router-link
                      :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                      class="content"
                    >
                      <span class="title d-block">
                        {{ blog.title }}
                      </span>
                      <span>{{ blog.created_at }}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <p>
            {{ setting.copyright_text }}
          </p>
        </div>
      </div>
    </footer>
    <!-- Footer section -->
  </div>
</template>
<script setup>
import { ref, provide, onMounted, inject } from "vue";
import myaxios from "../myaxios";
import VueElementLoading from "vue-element-loading";
import { useRouter } from "vue-router";

const router = useRouter();
const setting = inject("setting");
const recentblogs = ref({});
const letest_blog = ref({});
const pages = ref({});
const isNavOpen = ref(false);
const isLoading = ref(true);

const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

const getBlogs = async () => {
  await myaxios.get("/get/recent/blogs").then((res) => {
    letest_blog.value = res.data.data.slice(0, 2);
    recentblogs.value = res.data.data;
  });
};

const toggle = ref(false);
const search = ref("");
const toggleSearch = () => {
  toggle.value = !toggle.value;
};

const handleServiceSearch = () => {
  toggleSearch();
  router.push({ name: "service", query: { search: search.value } });
  search.value = "";
};

const handleLoading = (data) => {
  isLoading.value = data;
};

const getPages = () => {
  myaxios.get("/get/pages").then((res) => {
    pages.value = res.data;
  });
};

onMounted(async () => {
  getBlogs();
  getPages();
});

// when scroll down 40 px from top then add class active in navbar
window.addEventListener("scroll", function () {
  var header = document.querySelector(".navbar-bottom");
  if (!header) return;
  header.classList.toggle("active", window.scrollY > 40);
});

provide("loading", handleLoading);
provide("latest_blogs", recentblogs);
</script>
<style>
.loading {
  margin-top: 75px !important;
}
</style>
