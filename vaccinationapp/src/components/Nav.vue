<template>
  <v-app>
    <v-app-bar app dark>
      <div>
        <v-btn class="custom-btn" to="/home" text>
          VaccinationApp
        </v-btn>
      </div>

      <v-btn class="custom-btn" to="/recipient" text>
        Beneficiari
      </v-btn>

      <v-btn class="custom-btn" to="/planning" text>
        Programări
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn class="custom-btn" to="/login" text>
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

<style scoped>
.custom-btn::before {
    color: transparent
}
.custom-btn:hover {
    color: #FF5722;
}
</style>