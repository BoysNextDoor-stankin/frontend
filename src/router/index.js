import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Image from "../components/Image.vue";
import AddImage from "../components/AddImage.vue";
import Feedback from "../components/Feedback.vue";

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
    },
    {
      path: '/image/:id/feedback',
      name: "feedback",
      component: Feedback,
    }
  ]
});
