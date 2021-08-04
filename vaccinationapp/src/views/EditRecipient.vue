<template>
<div>
  <v-container fluid>
      <span class="group pa-2">
        <v-icon 
        large 
        color="deep-orange"
        @click="$router.go(-1)">
        mdi-arrow-up-bold-box-outline mdi-rotate-270</v-icon>
      </span>
  </v-container>

<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center">Editează Beneficiar</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="currentRecipient.last_name"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Nume"
            required>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="currentRecipient.name"
              :rules="[(v) => !!v || 'Câmp obligatoriu']"
              label="Prenume"
              required>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-text-field
          v-model="currentRecipient.gender"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Sex"
          required>
          </v-text-field>
          </div>

          <div class="col">
        <v-text-field
          v-model="currentRecipient.age"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Varsta"
          required>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="currentRecipient.cnp"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="CNP"
          required>
          </v-text-field>
          </div>
        </div>

        <div class="row">
         <div class="col">
        <v-text-field
          v-model="currentRecipient.phone"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Telefon"
          required>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="currentRecipient.email"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Email"
          required>
          </v-text-field>
          </div>
        </div>

          <div class="row">
           <div class="col">
          <v-select
          :items="counties"
          v-model='currentRecipient.selectedCounty'
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          v-on:change='getCitiesByCounty()'
          label="Judet"
          item-value= "id"
          item-text="name"
          required>
          </v-select>
             </div>

          <div class="col">
        <v-select
          :items="city"
          v-model="currentRecipient.selectedCity"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          name="city"
          item-text="name"
          item-value= "id"
          label="Localitate"
          required>
          </v-select>
        </div>
        </div>

        <div class="row">
          <div class="col">
        <v-select
          :items="categories"
          v-model="currentRecipient.selectedCategory"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Categorie de risc"
          :item-text="item => item.name + ' - '+ item.description"
          item-value= "id"
          required>
        </v-select>
          </div>
        </div>

      </v-form>

       <v-layout align-center justify-center>
        <v-btn width="120" elevation="5" @click.stop.prevent="savePerson" to="/recipient">Salvează</v-btn>
       </v-layout>
    </div>

  </div>
</div>
</template>

<script>
</script>

<style>
.submit-form {
  max-width: 800px;
}
.benef{
  font-weight:800;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>