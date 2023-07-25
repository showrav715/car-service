<template lang="">
  <div>
    <section
      class="breadcumnd__banner contact__bg"
      :style="{ 'background-image': `url(${breadcumb()})` }"
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6">
            <div class="breadcumnd__content">
              <h1>{{ $t("Blog") }}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }">
                    {{ $t("Home") }}
                  </router-link>
                </li>
                <li>_ {{ $t("Blog") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="main__blogsection pt-120 pb-120">
      <div class="container">
        <div class="main__bloges">
          <div class="row g-4">
            <div class="col-xl-8 col-lg-8">
              <div v-if="blogs.length != 0">
                <div
                  class="blog__item mb-5"
                  v-for="blog in blogs"
                  :key="blog.id"
                >
                  <router-link
                    :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                    class="blog-link"
                    >&nbsp;</router-link
                  >
                  <div class="blog__item-img">
                    <img :src="blog.photo" class="w-100" alt="blog" />
                  </div>
                  <div class="blog__item-conts">
                    <div
                      class="d-flex date__item mb-3 align-items-center flex-wrap"
                    >
                      <div class="blog-date gap-2 d-flex align-items-center">
                        <span><i class="fas fa-clock base3"></i></span>
                        <span>{{ blog.created_at }}</span>
                      </div>
                      <div class="blog-date gap-2 d-flex align-items-center">
                        <span><i class="fas fa-comment base3"></i></span>
                        <span
                          >[{{ blog.comments.length }}]
                          {{ $t("Comments") }}</span
                        >
                      </div>
                    </div>
                    <h2 class="mb-4">{{ blog.title }}</h2>
                    <p class="fz-16 mb-4">
                      {{
                        blog.description
                          .replace(/<[^>]+>/g, "")
                          .substring(0, 200)
                      }}
                    </p>
                    <router-link
                      :to="{ name: 'singleBlog', params: { slug: blog.slug } }"
                      class="cmn--btn"
                    >
                      <span> {{ $t("Read More") }} </span>
                      <span><i class="fas fa-angle-double-right"></i></span>
                    </router-link>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="row g-4">
                  <div
                    class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center border p-5"
                  >
                    <h2>{{ $t("Blog not found") }}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <h3 class="details__title mb-2">{{ $t("Search Here") }}</h3>
                  <form @submit.prevent="handleSearch">
                    <input
                      type="text"
                      v-model="query.search"
                      :placeholder="$t('Search Here')"
                    />
                    <i class="fas fa-search"></i>
                  </form>
                </div>
                <div class="details__sidebox mb-30">
                  <h3 class="details__title mb-2">{{ $t("Categoris") }}</h3>
                  <ul class="cate__list">
                    <li v-for="category in categories" :key="category.id">
                      <router-link
                        :to="{
                          name: 'blog',
                          query: { category: category.slug },
                        }"
                        class="d-flex align-items-center gap-3"
                      >
                        <span class="text"> {{ category.name }} </span>
                        <span class="icon">
                          <i class="fas fa-angle-double-right"></i>
                        </span>
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div class="details__sidebox mb-30">
                  <h3 class="details__title">{{ $t("Recent Post") }}</h3>
                  <ul class="recent__small">
                    <li
                      v-for="recent in recentBlogs"
                      :key="recent.industry"
                      class="d-flex align-items-center"
                    >
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: recent.slug },
                        }"
                        class="recent__thumb"
                      >
                        <img :src="recent.photo" alt="recent" />
                      </router-link>
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: recent.slug },
                        }"
                        class="textes"
                      >
                        {{ recent.title }}
                        <span class="date"> {{ recent.created_at }} </span>
                      </router-link>
                    </li>
                  </ul>
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
import { ref, onMounted, watch, reactive, inject } from "vue";
import myaxios from "../myaxios";
import { useRoute, useRouter } from "vue-router";
const blogs = ref({});
const categories = ref({});
const route = useRoute();
const router = useRouter();
const recentBlogs = ref({});

const loading = inject("loading");
const breadcumb = inject("breadcumb");
const totalPages = ref(1);
const query = reactive({
  category: "",
  search: "",
  currentPage: 1,
});

const handleSearch = () => {
  if (query.search) {
    router.push({
      name: "blog",
      query: { ...route.query, search: query.search },
    });
  } else {
    router.push({
      name: "blog",
      query: { ...route.query, search: "" },
    });
  }
};

watch(
  () => [route.query.category, route.query.search],
  () => {
    loading(true);
    getBlog();
  }
);

// Go to the previous page
const previousPage = () => {
  if (query.currentPage > 1) {
    query.currentPage--;
    loading(true);
    getBlog();
    window.scrollTo(0, 0);
  }
};

// Go to the next page
const nextPage = () => {
  if (query.currentPage < totalPages.value) {
    query.currentPage++;
    loading(true);
    getBlog();
    window.scrollTo(0, 0);
  }
};

if (route.query.category) {
  query.category = route.query.category;
}
onMounted(() => {
  loading(true);
  getRecentBlog();
  getBlog();
  getBlogCategory();
});

// when we use query string in url then we use call getBlog() function in watch
watch(
  () => route.query.category,
  () => {
    query.category = route.query.category;
    loading(true);
    getBlog();
  }
);

const getBlog = () => {
  const routeParams = query.category ? `?category=${query.category}` : "?";
  const searchParams = route.query.search
    ? `&search=${route.query.search}`
    : "";
  myaxios
    .get(`/get/blogs${routeParams}&page=${query.currentPage}` + searchParams)
    .then((response) => {
      blogs.value = response.data.data;
      totalPages.value = response.data.meta.last_page;
      loading(false);
    });
};
const getBlogCategory = () => {
  myaxios.get("/get/blog/categories").then((response) => {
    categories.value = response.data;
  });
};

const getRecentBlog = () => {
  myaxios.get("/get/recent/blogs").then((response) => {
    recentBlogs.value = response.data.data;
  });
};

{
  totalPages,
    previousPage,
    nextPage,
    query,
    getBlog,
    getBlogCategory,
    getRecentBlog;
  breadcumb,
    loading,
    route,
    router,
    categories,
    recentBlogs,
    handleSearch,
    blogs;
}
</script>
