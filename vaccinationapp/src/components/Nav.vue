<template>
  <v-app>
    <v-app-bar color="blue-grey darken-4" app dark dense v-if="loggedIn">
      <div>
        <v-btn class="custom-btn" v-if="loggedIn" to="/home" text>
          VaccinationApp
        </v-btn>
      </div>

      <v-btn class="custom-btn" v-if="loggedIn" to="/recipient" text>
        Beneficiari
      </v-btn>

      <v-btn class="custom-btn" v-if="loggedIn" to="/my-appointments" text>
        Programări
      </v-btn>
      <v-btn class="custom-btn" v-if="isAdmin" to="/admin-offices" text>
        Centre
      </v-btn>
  
      <v-spacer></v-spacer>

      <v-btn class="custom-btn" v-if="!loggedIn" to="/login" text>
        Autentificare
      </v-btn>

      <v-btn class="custom-btn" v-if="!loggedIn" to="/register" text>
        Creează Cont
      </v-btn>

      <v-btn class="custom-btn" v-if="loggedIn" @click="logOut" to="/login" text>
        Deconectare
       <v-icon right>
        mdi-exit-to-app 
      </v-icon>
      </v-btn>
  
    </v-app-bar>
    
   
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
export default{
  name: 'Nav',
  data(){
  return {
    loggedIn: JSON.parse(localStorage.getItem('user') ? true : false),
    isAdmin : false,
    }
  },
   methods:
  {
    logOut()
    {
      localStorage.removeItem('user');
    }
  },
  async mounted(){
    await AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.isAdmin = response.data.is_superuser;
      }).catch((e)=>{
        console.log(e);
      });
  },
}
</script>

<style scoped>
.custom-btn::before {
    color: transparent
}
.custom-btn:hover {
    color: #FF5722;
}
</style>