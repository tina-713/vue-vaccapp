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
    <p class ="Appointment" align="center">Editează Appointment</p>
    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        
        <div class="row">
          <div class="col">
          <v-text-field
            v-model="currentAppointment.date"
            :rules="[(v) => !!v || 'Câmp obligatoriu']"
            label="Data"
            required
            dense>
            </v-text-field>
          </div>

          <div class="col">
            <v-text-field
              v-model="currentAppointment.kind"
              :rules="[(v) => !!v || 'Câmp obligatoriu']"
              label="Tip"
              required>
              </v-text-field>
          </div>
        </div>

         <div class="row">
           <div class="col">
        <v-text-field
          v-model="currentAppointment.office.name"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Birou"
          required
          dense>
        </v-text-field>
          </div>

          <div class="col">
        <v-text-field
          v-model="currentAppointment.person.name"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Person"
          value ="currentAppointment.person.id"
          required
          dense>
          </v-text-field>
          </div>
        </div>
        
        <div class="row">
           <div class="col">
        <v-select
          v-model="currentAppointment.status"
          :items="statuses"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Status"
          required
          dense>
          </v-select>
           </div>
           <div class="col">
           <v-text-field
          v-model="currentAppointment.office.name"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Office"
          value ="currentAppointment.office.id"
          required
          dense>
          </v-text-field>
          </div>
        </div>

          <div class="row">
           <div class="col">
          <v-select
          :items="counties"
          v-model='currentAppointment.office.county'
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
          v-model="currentAppointment.office.city"
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
           <v-text-field
          v-model="currentAppointment.time"
          :rules="[(v) => !!v || 'Câmp obligatoriu']"
          label="Time"
          required
          dense>
          </v-text-field>
        </div>
      </v-form>

       <v-layout align-center justify-center>
        <v-btn
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange"
        v-on:click.stop.prevent="UpdateAppointment">Salvează</v-btn>
       </v-layout>
    </div>

  </div>
</div>
</template>

<script>
import AppointmentService from '../services/AppointmentService';

import DataService from "../services/DataService";

export default{
  name: "edit-Appointment",
  data() {
    return {
      counties:[],
      cities:[],
      categories:[],
      statuses:["finalizata","in curs","anulata"],
      currentAppointment: null,
      selectedCounty: null,
      selectedCity: null,
      selectedCategory: null,
      submitted: false,
    };
},

 async mounted()
  {
  await this.getAppointment(this.$route.params.id);
  DataService.getCitiesByCounty(this.currentAppointment.office.county.id).then((response)=>{  
      this.cities = response.data;
      }).catch((e)=>{
        console.log(e);
      });
  DataService.getAllCounties().then((response)=>{  
      this.counties = response.data;
  
      }).catch((e)=>{
        console.log(e);
      });
  
  },
methods: 
{
  getAppointment(id) {
    return AppointmentService.getAdminAppointment(id)
      .then((response) => {
        this.currentAppointment = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },

  UpdateAppointment() {
    var Appointment = {
      id: this.currentAppointment.id,
      name: this.currentAppointment.date,
      kind: this.currentAppointment.kind,
      status: this.currentAppointment.status,
      time: this.currentAppointment.time,
      office: this.currentAppointment.office.id,
      person: this.currentAppointment.person.id,
    };
  
    AppointmentService.putAppointment(Appointment)
        .then((response) => {
          console.log(response.person);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getCitiesByCounty(){
      DataService.getCitiesByCounty(this.currentAppointment.county).then((response)=>{  
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