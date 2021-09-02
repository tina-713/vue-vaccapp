<template>
<div>
  <v-container fluid>
      <v-btn 
      class="mx-2"
      fab
      dark
      small
      @click="$router.go(-1)">
        <v-icon dark>
        mdi-arrow-left-bold
        </v-icon>
      </v-btn>
  </v-container>

<div class="submit-form mt-3 mx-auto">
    <p class ="benef" align="center">Editează Centru de Vaccinare</p>
    <div v-if="!submitted">
      <v-form ref="form" v-model="isFormValid" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="currentOffice.name"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Nume"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="currentOffice.address"
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
          v-model="currentOffice.phone"
          :rules="phoneRules"
          v-on:keypress="isNumber($event)"
          label="Telefon"
          required
          dense>
        </v-text-field>
          </div>

          <div class="col">
        <v-text-field
          v-model="currentOffice.spots"
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
          v-model="currentOffice.hourlyLimit"
          :rules="limitRules"
          v-on:keypress="isNumber($event)"
          label="Limită pe ora"
          required
          dense>
          </v-text-field>
          </div>

          <div class="col">
        <v-select
          :items="vaccines"
          v-model="currentOffice.vaccine"
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
          v-model='currentOffice.county'
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
          v-model="currentOffice.city"
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
        color="deep-orange darken-1"
        v-on:click.stop.prevent="updateOffice">Salvează</v-btn>
       </v-layout>
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
      counties:[],
      cities:[],
      categories:[],
      vaccines:[],
      currentOffice: null,
      selectedCounty: null,
      selectedCity: null,
      selectedVaccine: null,
      submitted: false,
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
  await this.getOffice(this.$route.params.id);
  DataService.getCitiesByCounty(this.currentOffice.county.id).then((response)=>{  
      this.cities = response.data;
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getVaccine().then((response)=>{
    this.vaccines = response.data;
    
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

  getOffice(id) {
    return DataService.getOffice(id)
      .then((response) => {
        this.currentOffice = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  UpdateOffice(id) {
    var office = {
      id: id,
      name: this.currentOffice.name,
      address: this.currentOffice.address,
      phone: this.currentOffice.phone,
      spots: this.currentOffice.spots,
      hourlyLimit: this.currentOffice.hourlyLimit,
      vaccine: parseInt(this.currentOffice.selectedVaccine),
      county : parseInt(this.currentOffice.selectedCounty),
      city: parseInt(this.currentOffice.selectedCity),
    };
  
    DataService.putOffice(this.currentOffice.id, office)
        .then((response) => {
          this.currentOffice.id = id;
          console.log(response.person);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateOffice() {
      DataService.putOffice(this.currentOffice.id, this.currentOffice)
        .then((response) => {
          this.$router.push('/admin-offices');
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getCitiesByCounty(){
      DataService.getCitiesByCounty(this.currentOffice.county).then((response)=>{  
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