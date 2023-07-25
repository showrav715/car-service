<template lang="">
  <section class="blog__section pt-120 pb-145">
    <div class="container">
      <div class="row justify-content-center pb-70">
        <div class="col-lg-6">
          <div class="section-header section-center">
            <h6>
              <span class="sub"> {{$t('Blog')}} </span>
            </h6>
            <h2 class="space1">{{title}}</h2>
            <p>
              {{text}}
            </p>
          </div>
        </div>
      </div>
      <div class="row g-4">
        <div
          v-for="blog in blogs"
          :key="blog.id"
          class="col-xl-6 col-lg-6 col-md-6"
        >
          <div class="blog__itemsmain">
            <div class="content">
              <h4>
                <router-link :to="{name:'singleBlog',params:{slug:blog.slug}}">
                  {{ blog.title }}
                </router-link>
              </h4>
              <h6>
                {{
                  blog.description.replace(/(<([^>]+)>)/gi, "").substring(0, 60)
                }}
              </h6>
              <div class="d-flex align-items-center gap-3">
                <div class="blog-date d-flex align-items-center">
                  <span><i class="fas fa-clock"></i></span>
                  <span>{{ blog.created_at }}</span>
                </div>
                <div class="blog-date d-flex align-items-center">
                  <span><i class="fas fa-comment"></i></span>
                  <span>{{blog.comment_count}}</span>
                </div>
              </div>
            </div>
            <div class="thumb">
              <router-link :to="{name:'singleBlog',params:{slug:blog.slug}}">
                <img v-lazy="blog.photo" alt="img" />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const { blogs } = defineProps(["blogs","title","text"]);
</script>
<style lang=""></style>
