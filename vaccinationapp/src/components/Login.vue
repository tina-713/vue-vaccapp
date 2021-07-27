
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
              <!-- <a href="https://edu-fedorae.netlify.app" name="Fedorae Education" title="Fedorae Education" target="_blank">
                <v-img src="@/assets/logo.png" alt="Fedorae Education Log" contain height="200"></v-img>
              </a> -->
              <v-card-text>
                <v-form>
                  <v-text-field label="Enter your email" name="email" prepend-inner-icon="mdi-email" type="email" class="rounded-0" outlined></v-text-field>
                  <v-text-field label="Enter your password" name="password" prepend-inner-icon="mdi-lock" type="password" class="rounded-0" outlined></v-text-field>
                   <v-card-actions class="text--secondary">
                    Forgot your password? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link :to="{ name: 'ForgotPassword' }">Click Here</router-link>
                  </v-card-actions>
                  <v-btn class="rounded-0" color="#000000" x-large block dark>Login</v-btn>
                  <v-card-actions class="text--secondary">
                    <v-checkbox color="#000000" label="Remember me"></v-checkbox>
                    <v-spacer></v-spacer>
                    No account? <a href="#" class="pl-2" style="color: #000000"></a>
                    <router-link :to="{ name: 'SignUp' }">Sign Up</router-link>
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
  name: 'Login'
}
</script>

<style lang="css" scoped>
</style>