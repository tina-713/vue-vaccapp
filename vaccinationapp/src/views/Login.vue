<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <h1 class="mb-2">Login</h1>
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field label="Enter your email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined v-model="email" value="email"></v-text-field>
                  <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined
                  v-model="password" value="password"></v-text-field>
                   <v-card-actions class="text--secondary">
                    <router-link to="/forgot-password">Forgot your password?</router-link>
                  </v-card-actions>
                  <v-btn class="rounded-0" color="#000000" x-large block dark v-on:click="login">Login</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-checkbox color="#000000" label="Remember me"></v-checkbox>
                    <v-spacer></v-spacer>
                    No account? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/register">Sign Up</router-link>
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
import DataService from '../services/DataService';
export default {
  name: 'Login',
  data(){
  return{
    email : "",
    password : "",
  }
},
methods:{
login(){
    DataService.postLogin(this.email,this.password)
    .then(response =>{
       localStorage.setItem('user', JSON.stringify(response));
       console.log(response.data.access);
    })
   .catch(e => {
    console.log(e);
   })
  }
 }}

</script>

<style lang="css" scoped>
</style>