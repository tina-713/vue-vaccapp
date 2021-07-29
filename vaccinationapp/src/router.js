import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: () => import("./views/Home")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./views/Register")
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: () => import("./views/ForgotPassword")
    }
  ]
});