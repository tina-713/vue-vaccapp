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
        mdi-arrow-up-bold-box-outline mdi-rotate-270
        </v-icon>
      </v-btn>
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
            required
            dense>
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
          v-model="currentRecipient.age"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Varsta"
          required
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="currentRecipient.cnp"
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
          v-model="currentRecipient.phone"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Telefon"
          required
          dense>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="currentRecipient.email"
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
          v-model='currentRecipient.county'
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          v-on:change='getCitiesByCounty()'
          label="Judet"
          item-value= "id"
          item-text="name"
          required
          dense>
          </v-select>
             </div>

          <div class="col">
        <v-select
          :items="cities"
          v-model="currentRecipient.city"
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
          v-model="currentRecipient.selectedCategory"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Categorie de risc"
          :item-text="item => item.name + ' - '+ item.description"
          item-value= "id"
          required
          dense
          v-on:keyup.enter="updateRecipient">
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
        v-on:click.stop.prevent="updateRecipient">Salvează</v-btn>
       </v-layout>
    </div>

  </div>
</div>
</template>

<script>
import RecipientService from "../services/RecipientService";
import DataService from "../services/DataService";

export default{
  name: "edit-recipient",
  data() {
    return {
      counties:[],
      cities:[],
      currentRecipient: null,
      selectedCounty: null,
      selectedCity: null,
      // selectedCategory: null,
      // gen:['M','F'],
      // submitted: false,
    };
},

  async created()
  {
   await this.getRecip(this.$route.params.id);

   await DataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
 await DataService.getAllCategories().then((response)=>{
    this.categories = response.data;
    
      }).catch((e)=>{
        console.log(e);
      });  
  
  },
methods: 
{
  getRecip(id) {
    RecipientService.getRecipient(id)
      .then((response) => {
        this.currentRecipient = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  // updatePerson(id) {
  //   var person = {
  //     id: id,
  //     name: this.currentRecipient.name,
  //     last_name: this.currentRecipient.last_name,
  //     cnp: this.currentRecipient.cnp,
  //     gender: this.currentRecipient.gender,
  //     age: parseInt(this.currentRecipient.age),
  //     phone: this.currentRecipient.phone,
  //     email: this.currentRecipient.email,
  //     city: parseInt(this.currentRecipient.selectedCity),
  //     category: parseInt(this.currentRecipient.selectedCategory),
  //     user: this.currentRecipient.user,
  //   };

  //   RecipientService.putRecipient(this.currentRecipient.id, person)
  //       .then((response) => {
  //         this.currentRecipient.id = id;
  //         console.log(response.person);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   },

  //   updateRecipient() {
  //     RecipientService.putRecipient(this.currentRecipient.id, this.currentRecipient)
  //       .then((response) => {
  //         console.log(response.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //       // this.$router.push("/recipient");
  //   },

    getCitiesByCounty(){
      DataService.getCitiesByCounty(this.currentRecipient.county).then((response)=>{  
      this.cities = response.data;
      }).catch((e)=>{
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