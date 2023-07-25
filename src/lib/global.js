import { ref } from "vue";
const languages = ref(null);
const getLanguage = (lang) => {
  languages.value = lang;
};
const translate = (key) => {
  if(!languages.value) return key;
  return languages.value[key] ? languages.value[key] : key;
};

export { getLanguage, translate };
