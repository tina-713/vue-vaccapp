  
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" v-if="verified" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="20">
              <div class="text-center">
                &nbsp;
                <h1 class="mb-2">Felicitări!</h1>
                <v-card-title class="justify-center"><v-icon x-large>mdi-email-check-outline</v-icon></v-card-title>
                <div class="send">
                <p>Contul tău a fost activat cu succes. Autentificați-vă pentru a continua.</p>
                </div>
              </div>
              <v-card-text>
              <v-form>
                  <v-card-actions class="justify-center" style="font-size:14px">
                    <router-link to="/login">Întoarce-te la pagina de autentificare</router-link>
                  </v-card-actions>
              </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center" v-if="!verified" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="20">
              <div class="text-center">
                &nbsp;
                <h1 class="mb-2">Ne pare rau!</h1>
                <v-card-title class="justify-center"><v-icon x-large>mdi-email-remove-outline</v-icon></v-card-title>
                <div class="send">
                <p>Contul tău nu a putut fi activat.</p>
                </div>
              </div>
              <v-card-text>
              <v-form>
                  <v-card-actions class="justify-center" style="font-size:14px">
                    <router-link to="/login">Întoarce-te la pagina de autentificare</router-link>
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
  name: 'confirmation',
  data() {
    return {
      verified:false,
    }
  },
  async mounted(){
    await DataService.getToken(this.$route.params.token).then(()=>{  
      this.verified=true;
      }).catch(()=>{
        this.verified=false;
      });
  }
}

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
.send{
  padding: 3%;
}
</style>