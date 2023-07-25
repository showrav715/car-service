import { createApp } from "vue";
 
import router from "./routes.js";
import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "./style.css";
import VueLazyload from 'vue-lazyload'
import VueDOMPurifyHTML from "vue-dompurify-html";
import { translate } from "./lib/global.js";
const app = createApp(App);
app.config.globalProperties.$t = translate;

  app.use(VueDOMPurifyHTML)
  .use(router)
  .use(VueLazyload)
  .mount("#app");
