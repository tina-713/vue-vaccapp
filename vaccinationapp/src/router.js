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
    path: "/edit-recipient/:id",
    name: "edit-recipient",
    component: () => import("./views/EditRecipient")
    },
    {
      path: "/office/:personId",
      name: "office",
      component: () => import("./views/Office")
    },
    {
      path: "/office/:personId/:id",
      name: "office-id",
      component: () => import("./views/Appointment")
    },
    {
      path: "/office/:personId/:id/:rapelDate",
      name: "rapel-office-id",
      component: () => import("./views/RapelAppointment")
    },
    {
      path: "/my-appointments",
      name: "my-appointments",
      component: () => import("./views/AppointmentsList")
    },
    {
      path: "/admin-offices",
      name: "/admin-offices",
      component: () => import("./views/AdminOffice")
    },
    {
      path: "/add-office",
      name: "/add-office",
      component: () => import("./views/AddOffice")
    },
    {
      path: "/edit-office/:id",
      name: "edit-office",
      component: () => import("./views/EditOffice")
      },
    {
      path: "/edit-appointment/:id",
      name: "edit-appointment",
      component: () => import("./views/EditAppointment")
    },
    {
      path: "/office-appointments/:id",
      name: "office-appointments",
      component: () => import("./views/AdminOfficeAppointments")
    },
    {
      path: "/confirmation/:token",
      name: "confirmation",
      component: () => import("./views/Confirmation")
    },
  ]

});