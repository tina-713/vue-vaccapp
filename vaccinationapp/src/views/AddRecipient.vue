<template>
<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center">Adauga Beneficiar</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <div class="row">
          <div class="col">
            <v-text-field
              v-model="name"
              :rules="[(v) => !!v || 'Name is required']"
              label="Nume"
              required
            ></v-text-field>
          </div>
        <div class="col">
          <v-text-field
            v-model="last_name"
            :rules="[(v) => !!v || 'Last name is required']"
            label="Prenume"
            required
          ></v-text-field>
          </div>
        </div>
         <div class="row">
          <div class="col">
        <v-text-field
          v-model="cnp"
          :rules="[(v) => !!v || 'CNP name is required']"
          label="CNP"
          required
        ></v-text-field>
          </div>
        <div class="col col-lg-2">
        <v-text-field
          v-model="gender"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Sex"
          required
        ></v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col col-lg-3">
        <v-text-field
          v-model="Age"
          :rules="[(v) => !!v || 'Age is required']"
          label="Varsta"
          required
        ></v-text-field>
          </div>
          <div class="col">
        <v-text-field
          v-model="phone"
          :rules="[(v) => !!v || 'Phone is required']"
          label="Telefon"
          required
        ></v-text-field>
          </div>
        </div>

        <v-text-field
          v-model="email"
          :rules="[(v) => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>
          <div class="row">
           <div class="col">
          <v-select
          :items="counties"
          v-model='selectedCounty'
          v-on:change='getCitiesByCounty()'
          label="Judet"
          item-value= "id"
          item-text="name">
       
          </v-select>
             </div>
          <div class="col">
        <v-select
          :items="city"
          v-model="selectedCity"
          name="city"
          item-text="name"
          item-value= "id"
          label="Localitate"
        ></v-select>
        </div>
        </div>
        <v-text-field
          v-model="category"
          :rules="[(v) => !!v || 'Category is required']"
          label="Categorie de risc"
          required
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="savePerson">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Recipient.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newPerson">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RecipientService from "../services/RecipientService";
import AuthenticationService from "../services/AuthenticationService";
import CountyDataService from "../services/CountyDataService";

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
        counties:{},
        selectedCounty:null,
        selectedCity:null,
      // },
      submitted: false,
    };
  },

  mounted(){
  AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.user = response.data.id;
      }).catch((e)=>{
        console.log(e);
      });
  CountyDataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
  },

  methods: {
    getCitiesByCounty(){
      CountyDataService.getCitiesByCounty(this.selectedCounty).then((response)=>{  
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
        category: parseInt(this.category),
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
      this.submitted = false;
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
  margin-top:30px;
  font-weight:800;
  font-size: x-large;
  padding-bottom: 10px;
}
</style>