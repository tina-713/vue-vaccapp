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
    <p class ="benef" align="center">Adaugă Centru de Vaccinare</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="name"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Nume"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="address"
              :rules="[(v) => !!v || 'Câmp obligatoriu']"
              label="Adresă"
              required
              dense>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-text-field
          v-model="phone"
          :rules="phoneRules"
          v-on:keypress="isNumber($event)"
          label="Telefon"
          required
          dense>
        </v-text-field>
          </div>

          <div class="col">
        <v-text-field
          v-model="spots"
          :rules="spotsRules"
          v-on:keypress="isNumber($event)"
          label="Locuri libere"
          required
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-text-field
          v-model="hourlyLimit"
          :rules="limitRules"
          v-on:keypress="isNumber($event)"
          label="Limită pe ora"
          required
          dense>
          </v-text-field>
          </div>

          <div class="col">
        <v-select
          :items="vaccine"
          v-model="selectedVaccine"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Vaccin"
          item-value= "id"
          item-text="name"
          required
          dense>
          </v-select>
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

      </v-form>

       <v-layout align-center justify-center>
        <v-btn
        :disabled="!isFormValid"
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange"
        v-on:click.stop.prevent="saveOffice">Salvează</v-btn>
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

import DataService from "../services/DataService";

export default{
  name: "edit-office",
  data() {
    return {
      isFormValid: false,
      name: "",
      address: "",
      phone: "",
      county: "",
      hourlyLimit: null,
      spots: null,
      counties:[],
      city:[],
      vaccine:[],
      selectedCounty: null,
      selectedCity: null,
      selectedVaccine: null,
      submitted: false,
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
      phoneRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v.length == 10  || 'Introduceți un număr de telefon valid!',
        ],
      limitRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v <= 12 || 'Limită depășită!',
        ],
      spotsRules:[
          value => !!value || 'Câmp obligatoriu!',
          v => v <= 1000 || 'Limită depășită!',
        ]
    };
},

 async mounted()
  {
  DataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getVaccine().then((response)=>{
    this.vaccine = response.data;
    
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

    getCitiesByCounty(){
      DataService.getCitiesByCounty(this.selectedCounty).then((response)=>{  
      this.city = response.data;
      }).catch((e)=>{
        console.log(e);
      });
    },

    saveOffice() {
      
      var office = {
      name: this.name,
      address: this.address,
      phone: this.phone,
      spots: parseInt(this.spots),
      hourlyLimit: parseInt(this.hourlyLimit),
      vaccine: parseInt(this.selectedVaccine),
      county : parseInt(this.selectedCounty),
      city: parseInt(this.selectedCity),
      };
     
      DataService.postOffice(office)
        .then((response) => {
          this.snackbar = {
                      message: 'Succes.',
                      color: 'success',
                      show: true
                  }
          this.$router.push('/admin-offices');
          this.office.id = response.data.id;
          // console.log(response.data);
          this.submitted = true;
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


   capitalizeFirstLetter: (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1);
        },
  },

  watch: {
        name: function(newValue) {
          this.name = this.capitalizeFirstLetter(newValue);
        },
        address: function(newValue) {
          this.address = this.capitalizeFirstLetter(newValue);
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