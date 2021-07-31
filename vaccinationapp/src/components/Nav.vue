<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        VaccinationApp
      </div>

      <v-btn to="/recipient" text>
        Beneficiari
      </v-btn>

      <v-btn to="" text>
        Programări
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn to="/login" text>
        Login
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default{
  name: 'Nav'
}
</script>