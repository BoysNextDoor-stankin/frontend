import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Image from "../views/Image.vue";
import AddImage from "../views/AddImage.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/add",
      name: "addImage",
      component: AddImage,
    },
    {
      path: '/image/:id',
      name: "image",
      component: Image,
    }
  ]
});
