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
      component: () => import("./views/Home"),
      meta: { requiresAuth: true }
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
    },


    {
      path: "/recipient",
      name: "recipient",
      component: () => import("./views/Recipient")
    },
    {
    path: "/add-recipient",
    name: "add-recipient",
    component: () => import("./views/AddRecipient")
    },
    {
    path: "/recipient/:id",
    name: "edit-recipient",
    component: () => import("./views/EditRecipient")
    }
  ]

});