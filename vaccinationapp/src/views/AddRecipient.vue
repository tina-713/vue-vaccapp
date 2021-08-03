<template>
<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center">Adauga Beneficiar</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="last_name"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Nume"
            required>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="name"
              :rules="[(v) => !!v || 'Câmp obligatoriu']"
              label="Prenume"
              required>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-text-field
          v-model="gender"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Sex"
          required>
          </v-text-field>
          </div>

          <div class="col">
        <v-text-field
          v-model="age"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Varsta"
          required>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="cnp"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="CNP"
          required>
          </v-text-field>
          </div>
        </div>

        <div class="row">
         <div class="col">
        <v-text-field
          v-model="phone"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Telefon"
          required>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="email"
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
          v-model='selectedCounty'
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
          v-model="selectedCity"
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
          v-model="selectedCategory"
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
        <v-btn width="120" elevation="5" @click="savePerson">Salvează</v-btn>
       </v-layout>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Adăugat cu succes!
        </v-card-title>

        <v-card-subtitle>
          Apasați pe buton pentru a adăuga un nou beneficiar.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn @click="newPerson">Adaugă</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RecipientService from "../services/RecipientService";
import AuthenticationService from "../services/AuthenticationService";
import DataService from "../services/DataService";

export default {
  name: "AddRecipient",
  data() {
    return {
      // person: {
        id: null,
        user: null,
        name: "",
        last_name: "",
        cnp: "",
        gender: "",
        age: null,
        phone: "",
        email: "",
        city: {},
        category: null,
        counties: {},
        selectedCounty: null,
        selectedCity: null,
        categories: {},
        selectedCategory: null,
      // },
      submitted: false,
    };
  },

  mounted()
  {  
  AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.user = response.data.id;
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getAllCategories().then((response)=>{
    this.categories = response.data;
    
      }).catch((e)=>{
        console.log(e);
      });
  },

  methods: 
  {
    getCitiesByCounty(){
      DataService.getCitiesByCounty(this.selectedCounty).then((response)=>{  
      this.city = response.data;
      }).catch((e)=>{
        console.log(e);
      });
  },
    savePerson() {
     
      var person = {
        name: this.name,
        last_name: this.last_name,
        cnp: this.cnp,
        gender: this.gender,
        age: parseInt(this.age),
        phone: this.phone,
        email: this.email,
        city: parseInt(this.selectedCity),
        category: parseInt(this.selectedCategory),
        user : this.user,
      };
     
      RecipientService.postRecipient(person)
        .then((response) => {
          this.person.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPerson() {
      this.submitted = true;
      this.person = {};
    },
  },

};

</script>

<style>
.submit-form {
  max-width: 800px;
}
.benef{
  margin-top:10px;
  font-weight:800;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>