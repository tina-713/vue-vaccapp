<template>
  <v-app>
    <v-main>
      <v-container>
        <v-tabs>
          <v-tab @click="login = true; register=false; forgotpassword = false">Login</v-tab>
          <v-tab @click="register = true; login = false; forgotpassword = false">Register</v-tab>
          <v-tab @click="forgotpassword = true; login = false; register=false">Forgot Password</v-tab>
        </v-tabs>
        <div>
          <Login v-if="login"/>
          <ForgotPassword  v-if="forgotpassword"/>
          <Register v-if="register"/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Login from './components/Login.vue';
import ForgotPassword from './components/ForgotPassword.vue'
import Register from './components/Register.vue'
export default{
  name: 'App',
  data(){
    return{
      login: true,
      register: false,
      forgotpassword: false
    }
  },
  components:{
    Login,
    ForgotPassword,
    Register
  }
};
</script>

<style>
</style>