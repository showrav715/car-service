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
              <h1>{{ $t("Blog Details") }}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }">
                    {{ $t("Home") }}
                  </router-link>
                </li>
                <li>_ {{ blog.title }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcumnd Banner -->

    <!-- main blog -->
    <section class="main__blogsection pt-120 pb-120">
      <div class="container">
        <div class="main__blogwrap">
          <div class="row g-4">
            <div class="col-xl-8 col-lg-8">
              <div class="blog__item mb-5">
                <a href="#0" class="blog-link">&nbsp;</a>
                <div class="blog__item-img mb-4">
                  <img :src="blog.photo" class="w-100" alt="blog" />
                </div>
                <div class="blog__item-conts">
                  <div class="d-flex mb-3 align-items-center gap-3 flex-wrap">
                    <div class="blog-date d-flex align-items-center gap-2">
                      <span><i class="fas fa-clock base3"></i></span>
                      <span>{{ blog.created_at }}</span>
                    </div>
                    <div class="blog-date d-flex align-items-center gap-2">
                      <span><i class="fas fa-comment base3"></i></span>
                      <span>{{ blog.comment_count }} {{ $t("Comments") }}</span>
                    </div>
                  </div>
                  <validHtml :html="blog.description && blog.description" />
                  <p class="fz-16 mb-4"></p>
                </div>
              </div>
              <div class="comment__wrapper">
                <h3 class="mb-4">
                  [{{ blog.comments && blog.comments.length }}]
                  {{ $t("Commets") }}
                </h3>
                <ul class="comments__list">
                  <li v-for="comment in blog.comments" class="mb-3">
                    <div class="content">
                      <span
                        class="d-flex fz-22 title mb-2 align-items-center justify-content-between"
                      >
                        <strong>{{ comment.name }}</strong>
                      </span>
                      <p class="fz-14">
                        {{ comment.comment }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <form @submit.prevent="handleComment" class="leave__comment mt-4">
                <div
                  v-if="success"
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{{ $t("Submit Successfull.") }}</strong>
                  {{
                    $t(
                      "Thank you for commenting. We will get back to you soon."
                    )
                  }}
                  <button
                    type="button"
                    class="close"
                    data-dismiss="alert"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <h4 class="comment__title">{{ $t("Write A Comment") }}</h4>
                <div class="row g-3">
                  <div class="col-lg-6">
                    <input
                      type="text"
                      v-model="comment.name"
                      :placeholder="$t('Your Name')"
                    />
                    <span class="text-danger" v-if="errors">{{
                      errors.name[0]
                    }}</span>
                  </div>
                  <div class="col-lg-6">
                    <input
                      type="text"
                      v-model="comment.email"
                      :placeholder="$t('Your Email')"
                    />
                    <span class="text-danger" v-if="errors">{{
                      errors.email[0]
                    }}</span>
                  </div>
                  <div class="col-lg-12">
                    <textarea
                      cols="45"
                      rows="5"
                      aria-required="true"
                      :placeholder="$t('Your comment')"
                      v-model="comment.comment"
                      name="comment"
                      id="comment"
                    ></textarea>
                    <span class="text-danger" v-if="errors">{{
                      errors.comment[0]
                    }}</span>
                  </div>
                  <div class="col-lg-12">
                    <loader-button :loading="isLoading">
                      <span> {{ $t("Post Comment") }} </span>
                    </loader-button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-xl-4 col-lg-4">
              <div class="details__sidebar">
                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ $t("Search Here") }}</h5>
                  <form @submit.prevent="handleSearch">
                    <input
                      type="text"
                      v-model="search"
                      :placeholder="$t('Search Here')"
                    />
                    <i class="fas fa-search"></i>
                  </form>
                </div>

                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ $t("Categoris") }}</h5>
                  <ul class="cate__list">
                    <li v-for="category in categories" :key="category.id">
                      <a
                        href="javascript:;"
                        @click="handleCategory(category.slug)"
                        class="d-flex align-items-center justify-content-between"
                      >
                        <span class="text">
                          {{ category.name }}
                        </span>
                        <span class="icon">
                          <i class="fas fa-chevron-right"></i>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div class="details__sidebox mb-30">
                  <h5 class="details__title">{{ $t("Recent Post") }}</h5>
                  <ul class="recent__small">
                    <li
                      v-for="blog in recentBlogs"
                      :key="blog.id"
                      class="d-flex align-items-center"
                    >
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: blog.slug },
                        }"
                        class="recent__thumb"
                      >
                        <img :src="blog.photo" alt="recent" />
                      </router-link>
                      <router-link
                        :to="{
                          name: 'singleBlog',
                          params: { slug: blog.slug },
                        }"
                        class="textes"
                      >
                        {{ blog.title }}
                        <span class="date"> {{ blog.created_at }} </span>
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
    <!-- main blog -->
  </div>
</template>
<script setup>
import { ref, onMounted, watch, inject, reactive } from "vue";
import ValidHtml from "../components/ValidHtml.vue";
import LoaderButton from "../components/LoaderButton.vue";
import myaxios from "../myaxios";
import { useRoute, useRouter } from "vue-router";
const breadcumb = inject("breadcumb");
const blog = ref({});
const categories = ref({});
const route = useRoute();
const router = useRouter();
const recentBlogs = ref({});
const loading = inject("loading");
const isLoading = ref(false);
const errors = ref(null);
const success = ref(false);

const query = reactive({
  category: "",
  search: "",
});

const search = ref("");
const handleSearch = () => {
  query.search = search.value;
};

const handleCategory = (slug) => {
  query.category = slug;
};

watch(
  () => [{ ...query }],
  () => {
    router.push({ name: "blog", query: query });
  }
);

watch(
  () => route.params.slug,
  () => {
    loading(true);
    getBlog();
  }
);

const comment = reactive({
  name: "",
  email: "",
  comment: "",
  blog_id: null,
});

const handleComment = () => {
  isLoading.value = true;
  myaxios
    .post("/blog/comment/submit", comment)
    .then((res) => {
      success.value = true;
      isLoading.value = false;
      comment.name = "";
      comment.email = "";
      comment.comment = "";
      getBlog();
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      isLoading.value = false;
    });
};

onMounted(() => {
  loading(true);
  getBlog();
  getBlogCategory();
  getRecentBlog();
});

const getBlog = async () => {
  await myaxios.get("/single/blog/" + route.params.slug).then((response) => {
    blog.value = response.data.data;
    comment.blog_id = blog.value.id;
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
</script>
