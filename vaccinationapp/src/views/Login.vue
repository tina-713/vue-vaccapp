<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="20">
              <div class="text-center">
                &nbsp;
                <h1 class="mb-2">Autentificare</h1>
              </div>
              <v-card-text>
                <v-form v-model="isFormValid">
                  <v-text-field 
                    label="Introduceți adresa de email" 
                    name="email" 
                    prepend-inner-icon="mdi-email" 
                    type="email" 
                    class="rounded-0" 
                    outlined v-model="email" 
                    value="email"
                    :rules="emailRules">
                  </v-text-field>
                  <v-text-field
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    @click:append="show2 = !show2"
                    @keyup.enter.native="onEnter" 
                    label="Introduceți parola" 
                    name="password" 
                    prepend-inner-icon="mdi-lock" 
                    class="rounded-0" 
                    outlined
                    v-model="password" 
                    value="password">
                  </v-text-field>
                  <router-link to="/forgot-password">Ți-ai uitat parola?</router-link>
                  <v-btn 
                    :disabled="!isFormValid"
                    class="white--text" 
                    color="deep-orange darken-1" 
                    x-large 
                    block 
                    v-on:click="login">
                  Conectează-te</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Nu ai cont? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/register">Înscrie-te</router-link>
                  </v-card-actions>
                </v-form>
              </v-card-text>
              <v-snackbar 
                :timeout="3000"
                bottom
                outlined
                :color="snackbar.color" 
                v-model="snackbar.show">
                  {{ snackbar.message }}
              </v-snackbar>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default {
  name: 'login',
  data(){
  return{
    show2: false,
    email : "",
    password : "",
    isFormValid: false,
    snackbar: {
                show: false,
                message: null,
                color: null,
            },
    rules: {
      required: value => !!value || 'Câmp obligatoriu!',
      min: v => v.length >= 6,
    },
  emailRules: [
      value => !!value || 'Câmp obligatoriu!',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Introdu un email valid!',
    ],
  }
},
methods:{   
login(){
    AuthenticationService.postLogin(this.email,this.password)
    .then(response =>{
      this.snackbar = {
                        message: 'Succes.',
                        color: 'success',
                        show: true
                    }
      localStorage.setItem('user', JSON.stringify(response));
      this.$router.push('/home');
      //  console.log(response.data.access);
    })
   .catch(e => {
     this.snackbar = {
                      message: 'Ați introdus credențialele greșite!',
                      color: 'error',
                      show: true
                    }
    console.log(e);

   })
  },

  onEnter: function() {
    this.login()
    },
 }}

</script>

<style scoped>
.container{
  justify-content: flex-start;
  max-width: 1300px;
  width: 100%;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>