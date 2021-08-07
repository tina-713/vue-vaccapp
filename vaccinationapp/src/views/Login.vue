<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <h1 class="mb-2">Autentificare</h1>
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field label="Introduceți adresa de email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined v-model="email" value="email"></v-text-field>
                  <v-text-field label="Introduceți parola" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined
                  v-model="password" value="password"></v-text-field>
                  <router-link to="/forgot-password">Ți-ai uitat parola?</router-link>
                  <v-btn class="rounded-0" color="#000000" x-large block dark v-on:click="login">Conectează-te</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Nu ai cont? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/register">Înscrie-te</router-link>
                  </v-card-actions>
                </v-form>
              </v-card-text>
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
    email : "",
    password : "",
  }
},
methods:{
login(){
    AuthenticationService.postLogin(this.email,this.password)
    .then(response =>{
       localStorage.setItem('user', JSON.stringify(response));
       this.$router.push('/home');
       console.log(response.data.access);
    })
   .catch(e => {
    console.log(e);
   })
  }
 }}

</script>