import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      alias: "/counties",
      name: "counties",
      component: () => import("./components/CountiesList")
    },
    {
      path: "/counties/:id",
      name: "county-details",
      component: () => import("./components/County")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCounty")
    }
  ]
});