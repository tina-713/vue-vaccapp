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
    <p class ="benef" align="center">Editează Beneficiar</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="currentRecipient.last_name"
            :rules="lastRules"
            v-on:keypress="isLetter($event)"
            label="Nume"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="currentRecipient.name"
              :rules="nameRules"
              v-on:keypress="isLetter($event)"
              label="Prenume"
              required
              dense>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-select
          v-model="currentRecipient.gender"
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
          :rules="ageRules"
          v-on:keypress="isNumber($event)"
          label="Vârstă"
          required
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="currentRecipient.cnp"
          :rules="cnpRules"
          v-on:keypress="isNumber($event)"
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
          :rules="phoneRules"
          v-on:keypress="isNumber($event)"
          label="Telefon"
          required
          dense>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="currentRecipient.email"
          :rules="emailRules"
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
          label="Județ"
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
          v-model="currentRecipient.category"
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
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange"
        v-on:click.stop.prevent="updateRecipient">Salvează</v-btn>
       </v-layout>

       <v-snackbar 
          :timeout="3000"
          bottom
          outlined
          :color="snackbar.color" 
          v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>

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
      isFormValid: false,
      counties:[],
      cities:[],
      categories:[],
      currentRecipient: null,
      selectedCounty: null,
      selectedCity: null,
      selectedCategory: null,
      gen:['M','F'],
      submitted: false,
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
      emailRules: [
          value => !!value || 'Câmp obligatoriu!',
          v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Introduceți un email valid!',
        ],
        phoneRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v.length == 10  || 'Introduceți un număr de telefon valid!',
        ],
        cnpRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v.length == 13  || 'Introduceți un CNP valid!',
        ],
        ageRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v >= 18 && v<= 100 || 'Vârsta minimă este 18 ani!',
        ],
        lastRules: [
          value => !!value || 'Câmp obligatoriu!',
          v => v.length <= 60 || "Numele este prea lung!",
        ],
        nameRules: [
          value => !!value || 'Câmp obligatoriu!',
          v => v.length <= 60 || "Prenumele este prea lung!",
        ],
    };
},

 async mounted()
  {
  await this.getRecip(this.$route.params.id);
  DataService.getCitiesByCounty(this.currentRecipient.county).then((response)=>{  
      this.cities = response.data;
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
  isNumber: function(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if(/^[A-Za-z]+$/.test(char)) return true;
      else e.preventDefault();
      },

  getRecip(id) {
    return RecipientService.getRecipient(id)
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
  //     county : parseInt(this.currentRecipient.selectedCounty),
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

    updateRecipient() {
      RecipientService.putRecipient(this.currentRecipient.id, this.currentRecipient)
        .then((response) => {
          this.snackbar = {
                      message: 'Succes.',
                      color: 'success',
                      show: true
                  }
          this.$router.push('/recipient');
          console.log(response.data);
        })
        .catch((e) => {
          this.snackbar = {
                      message: 'Eroare.',
                      color: 'error',
                      show: true
                    }
          console.log(e);
        });
    },

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