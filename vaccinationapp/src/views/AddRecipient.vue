<template>
<div>
  <v-container fluid>
      <v-btn 
      class="mx-2"
      fab
      dark
      small
      color="deep-orange"
      @click="$router.go(-1)">
        <v-icon dark>
        mdi-arrow-left-bold
        </v-icon>
      </v-btn>
  </v-container>

<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center">Adaugă Beneficiar</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="last_name"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Nume"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="name"
              :rules="[(v) => !!v || 'Câmp obligatoriu']"
              label="Prenume"
              required
              dense>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-select
          v-model="gender"
          :items="gen"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Sex"
          required
          dense>
        </v-select>
          </div>

          <div class="col">
        <v-text-field
          v-model="age"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Vârstă"
          required
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="cnp"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="CNP"
          required
          dense>
          </v-text-field>
          </div>
        </div>

        <div class="row">
         <div class="col">
        <v-text-field
          v-model="phone"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Telefon"
          required
          dense>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="email"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Email"
          required
          dense>
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
          label="Județ"
          item-value= "id"
          item-text="name"
          required
          dense>
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
          required
          dense>
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
          required
          dense
          v-on:keyup.enter="savePerson">
        </v-select>
          </div>
        </div>

      </v-form>

       <v-layout align-center justify-center>
        <v-btn
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange"
        v-on:click.stop.prevent="savePerson">Salvează</v-btn>
       </v-layout>
    </div>

  </div>
</div>
</template>

<script>
import RecipientService from "../services/RecipientService";
import AuthenticationService from "../services/AuthenticationService";
import DataService from "../services/DataService";

export default {
  name: "add-recipient",
  data() {
    return {
      // person: {
        id: null,
        user: null,
        name: "",
        last_name: "",
        cnp: "",
        gender: [],
        gen:['M','F'],
        age: null,
        phone: "",
        email: "",
        county: "",
        city: "",
        category: null,
        counties: {},
        categories: {},
        selectedCounty: null,
        selectedCity: null,
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
        county: parseInt(this.selectedCounty),
        city: parseInt(this.selectedCity),
        category: parseInt(this.selectedCategory),
        user : this.user,
      };
     
      RecipientService.postRecipient(person)
        .then((response) => {
          this.person.id = response.data.id;
          this.$router.push('/recipient');
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

};

</script>

<style>
.submit-form {
  max-width: 1000px;
}
.benef{
  font-weight:1000;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>