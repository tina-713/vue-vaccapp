<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <h1 class="mb-2">Creează Cont</h1>
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field 
                    label="Introduceți adresa de email" 
                    name="email" 
                    prepend-inner-icon="mdi-email" 
                    type="email" 
                    class="rounded-0" 
                    outlined 
                    v-model="email" 
                    value="email"
                    :rules="emailRules">
                  </v-text-field>
                  <v-text-field 
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show2 ? 'text' : 'password'"
                    hint="Cel puțin 6 caractere"
                    @click:append="show2 = !show2"
                    @keyup.enter.native="onEnter" 
                    label="Introduceți parola." 
                    name="password" 
                    prepend-inner-icon="mdi-lock" 
                    class="rounded-0" 
                    outlined 
                    v-model="password" 
                    value="password">
                   </v-text-field>
                  <v-btn class="rounded-0" color="#000000" x-large block dark v-on:click="register">Înscrie-te</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Ai deja cont? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/login">Conectează-te</router-link>
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
  name: 'register',
  data(){
  return{
    show2: false,
    email : "",
    password : "",
    rules: {
      required: value => !!value || 'Câmp obligatoriu!',
      min: v => v.length >= 6 || 'Minim 6 caractere.',
    },
    emailRules: [
      value => !!value || 'Câmp obligatoriu!',
      v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Introduceți un email valid!',
    ],
  }
},
methods:{
register(){
    AuthenticationService.postRegister(this.email,this.password)
    .then(response =>{
       this.$router.push('/login');
       console.log(response);
    })
   .catch(e => {
    console.log(e);
   })
  },

  onEnter: function() {
    this.register()
    },
 }}
 </script>