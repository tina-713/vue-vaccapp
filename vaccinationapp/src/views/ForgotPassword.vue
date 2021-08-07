  
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0">
              <div class="text-center">
                <h1 class="mb-2">Recuperează Parola</h1>
                <p>Vom trimite un link de resetare a parolei la adresa de e-mail a contului conectat.</p>
              </div>
              <v-form>
                <v-text-field
                  label="Introduceți adresa de email"
                  name="email"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  class="rounded-0"
                  outlined
                  ></v-text-field>
                  <v-btn class="rounded-0" color="black" x-large block dark>Resetează Parola</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-spacer></v-spacer>
                    Înapoi la <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link to="/login">Pagina de Autentificare</router-link>
                  </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'forgot-password'
}
</script>