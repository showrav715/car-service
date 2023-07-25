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
              <h1>{{ $t("Contact") }}</h1>
              <ul class="bread__list">
                <li>
                  <router-link :to="{ name: 'home' }">
                    {{ $t("Home") }}
                  </router-link>
                </li>
                <li>_ {{ $t("Contact") }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact section-->
    <section class="contact__section">
      <div class="container">
        <div class="contact__major__wrapper">
          <div class="row g-4 justify-content-between">
            <div class="col-xl-6 col-lg-7">
              <div class="contact__right__form">
                <div
                  v-if="success"
                  class="alert alert-success alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{{ $t("Submit Successfull.") }}</strong>
                  {{
                    $t(
                      "Thank you for contacting us. We will get back to you soon."
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
                <form @submit.prevent="handleSubmit">
                  <div class="row g-3">
                    <div class="col-lg-12">
                      <div class="form__group">
                        <label for="name">{{ $t("Full Name") }}</label>
                        <input
                          type="text"
                          v-model="form.name"
                          id="name"
                          :placeholder="$t('Full Name')"
                        />
                      </div>
                      <span
                        class="font-weight-bold text-danger"
                        v-if="errors.name"
                        >{{ errors.name[0] }}</span
                      >
                    </div>

                    <div class="col-lg-6">
                      <div class="form__group">
                        <label for="name">{{ $t("Phone") }}</label>
                        <input
                          type="number"
                          v-model="form.phone"
                          :placeholder="$t('Phone')"
                        />
                      </div>
                      <span
                        class="font-weight-bold text-danger"
                        v-if="errors.phone"
                        >{{ errors.phone[0] }}</span
                      >
                    </div>
                    <div class="col-lg-6">
                      <div class="form__group">
                        <label for="name">{{ $t("Email") }}</label>
                        <input
                          type="email"
                          v-model="form.email"
                          :placeholder="$t('Email')"
                        />
                      </div>
                      <span
                        class="font-weight-bold text-danger"
                        v-if="errors.email"
                        >{{ errors.email[0] }}</span
                      >
                    </div>
                    <div class="col-lg-12">
                      <div class="form__group">
                        <label for="name">{{ $t("Subject") }}</label>
                        <input
                          type="text"
                          v-model="form.subject"
                          :placeholder="$t('Subject')"
                        />
                      </div>
                      <span
                        class="font-weight-bold text-danger"
                        v-if="errors.subject"
                        >{{ errors.subject[0] }}</span
                      >
                    </div>
                    <div class="col-lg-12">
                      <div class="form__group">
                        <label for="name">{{ $t("Message") }}</label>
                        <textarea
                          class="form-control"
                          v-model="form.message"
                          id="gr"
                          rows="3"
                        ></textarea>
                      </div>
                      <span
                        class="font-weight-bold text-danger"
                        v-if="errors.message"
                        >{{ errors.message[0] }}</span
                      >
                    </div>
                    <div class="col-lg-12">
                      <LoaderButton :btn_ref="btn_ref" :loading="isLoading">
                        {{ $t("Send Message") }}
                      </LoaderButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="contact-content">
                <h3 class="text-white mb-5">{{ $t("Contact Us") }}</h3>
                <div class="contact__item d-flex gap-3">
                  <div class="contact__item-icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="contact__item-cont">
                    <h5 class="contact__item-title">{{ $t("Phone") }}</h5>
                    <a href="Tel:1234567890">{{ data.phone1 }}</a>
                    <br />
                    <a href="Tel:1234567890">{{ data.phone1 }}</a>
                  </div>
                </div>
                <div class="contact__item d-flex gap-3">
                  <div class="contact__item-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="contact__item-cont">
                    <h5 class="contact__item-title">{{ $t("Email") }}</h5>
                    <a href="Mailto:demo@kitkat.com">{{ data.email1 }}</a>
                    <br />
                    <a href="Mailto:demo@kitkat.com">{{ data.email1 }}</a>
                  </div>
                </div>
                <div class="contact__item d-flex gap-3">
                  <div class="contact__item-icon">
                    <i class="fas fa-map-marker"></i>
                  </div>
                  <div class="contact__item-cont">
                    <h5 class="contact__item-title">{{ $t("Address") }}</h5>
                    <span class="text-white">{{ data.address }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact section-->

    <section class="map__section">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-12 map_height">
            <iframe
              :src="data.map_link"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
    <!-- map section-->
  </div>
</template>
<script setup>
import { ref, onMounted, inject, reactive } from "vue";
import myaxios from "../myaxios";
import LoaderButton from "../components/LoaderButton.vue";
const loading = inject("loading");

const breadcumb = inject("breadcumb");

const data = ref([]);
const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref({});
const success = ref(false);

onMounted(() => {
  loading(true);
  getData();
});

const isLoading = ref(false);
const handleSubmit = () => {
  isLoading.value = true;
  myaxios
    .post("/contact/form/submit", form)
    .then((res) => {
      success.value = true;
      // rest form
      form.name = "";
      form.email = "";
      form.phone = "";
      form.subject = "";
      form.message = "";
      isLoading.value = false;
    })
    .catch((err) => {
      errors.value = err.response.data.errors;
      isLoading.value = false;
    });
};

const getData = () => {
  myaxios.get("/get/contact").then((res) => {
    data.value = res.data;
    loading(false);
  });
};

{
  success,
    errors,
    form,
    handleSubmit,
    data,
    breadcumb,
    breadcumb,
    isLoading,
    LoaderButton;
}
</script>
<style lang="css">
.mt-80 {
  margin-top: 100px;
}
.form-group span {
  display: block;
  color: crimson;
  font-weight: bold;
}
</style>
