  
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="20">
              <div class="text-center">
                &nbsp;
                <h1 class="mb-2">Recuperează Parola</h1>
                <div class="send">
                <p>Vom trimite un link de resetare a parolei la adresa de e-mail a contului conectat.</p>
                </div>
              </div>
              <v-card-text>
              <v-form v-model="isFormValid">
                <v-text-field
                  label="Introduceți adresa de email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  class="rounded-0"
                  outlined
                  ></v-text-field>
                  <v-btn :disabled="!isFormValid" class="white--text" color="deep-orange darken-1" x-large block>Resetează Parola</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Înapoi la <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/login">Pagina de Autentificare</router-link>
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
export default {
  name: 'forgot-password',
  data(){
    return{
    isFormValid: false,
    }
  },
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
  padding: 1%;
}
</style>