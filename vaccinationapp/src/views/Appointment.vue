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

    <v-row align="center" class="list mx-auto">
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title style="background-color:#F2F3F4">Detalii Centru
          </v-card-title>
            <v-data-table
              :headers="headers"
              :items="offices"
              disable-pagination
              :hide-default-footer="true"
              class="elevation-1">
            </v-data-table>
        </v-card>
      </v-col>

    <v-container>
      <v-row>
        <v-col
          class="my-2 px-1"
          cols="12"
          sm="8"
        >
        <v-date-picker
          v-model="date"
          @contextmenu:year="contextMenu"
          @dblclick:date="dblClick"
          :allowedDates="getAllowedDates"
          scrollable 
          color="blue-grey darken-1"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
          :first-day-of-week="1"
          locale="ro"
          elevation="10"
          full-width
        ></v-date-picker>
        </v-col>

        &nbsp; &nbsp; &nbsp; &nbsp; 

        <v-col
          class="my-2 px-1"
          cols="12"
          sm=""
        >
          <v-form ref="form" v-model="isFormValid" v-if="form1" lazy-validation>
            <div class="row" style="margin-top:1px">
              <div class="col">
                <v-text-field
                  readonly
                  v-model="date"
                  label="Dată Doză Inițială"
                  required
                  :rules="[(v) => !!v || 'Câmp obligatoriu']"
                  dense>
                  </v-text-field>
              </div>
                
              <div class="col"> 
                <v-text-field
                  readonly
                  v-model="hour"
                  label="Oră Doză Inițială"
                  required
                  :rules="[(v) => !!v || 'Câmp obligatoriu']"
                  dense>
                </v-text-field>
              </div>
            </div>
            </v-form>
            <v-form ref="form" v-model="isFormValid" v-if="form2" lazy-validation>
            <div class="row">
              <div class="col">
                <v-text-field
                  readonly
                  v-model="dateRapel"
                  label="Dată Doză Rapel"
                  required
                  :rules="[(v) => !!v || 'Câmp obligatoriu']"
                  dense>
                  </v-text-field>
              </div>
                
              <div class="col"> 
                <v-text-field
                  readonly
                  v-model="hourRapel"
                  label="Oră Doză Rapel"
                  required
                  :rules="[(v) => !!v || 'Câmp obligatoriu']"
                  dense>
                </v-text-field>
              </div>
            </div>
         
        </v-form>
        <div align="center" style="margin-top:230px" v-if="form1 || form2">
            <v-btn
              class="white--text"
              width="120" 
              elevation="5" 
              color="deep-orange darken-1"
              :disabled="!isFormValid"
              v-on:click.stop.prevent="makeAppointments">Salvează</v-btn>
              </div>
      </v-col>


      <v-col
        class="my-2 px-1"
        cols="12"
        sm="6"
      >
        <v-dialog
          persistent
          v-model="modal1"
          scrollable
          @keydown.esc="modal1 = false"
          max-width="470px">
        <v-card height="330px">
          <v-toolbar
          dark
          class="white--text deep-orange darken-1 darken-4">
          <v-btn
            icon
            dark
            @click="modal1 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Alegeți ora programării pentru doza inițială</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

          <div div class='wrap'>
          <vue-timepicker
            input-width="15em" 
            hide-disabled-items 
            v-model = "hour"
            :hour-range= "hourrange" 
            format="HH" 
            close-on-complete
            hour-label="Ora"
          ></vue-timepicker>
          </div>
          <div align="right">
            <v-btn 
              class="mx-2"
              fab
              dark
              small
              color="deep-orange darken-1"
              v-on:click="disModal">
                <v-icon dark>
                mdi-arrow-right-bold
                </v-icon>
            </v-btn>
          </div>

          <v-card-text style="height: 150px; width:180px;"/>      
        </v-card>
        </v-dialog>

        <v-dialog
          persistent
          v-model="modal2"
          scrollable
          @keydown.esc="modal2 = false"
          max-width="470px">
        <v-card height="330px">   
          <v-toolbar
          dark
          class="white--text deep-orange darken-1 darken-4">
          <v-btn
            icon
            dark
            @click="modal2 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Alegeți ora programării pentru rapel</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

          <div div class='wrap'> 
          <vue-timepicker 
            input-width="15em"
            hide-disabled-items 
            v-model = "hourRapel"
            :hour-range= "hourrangerapel" 
            
            format="HH" 
            close-on-complete
            hour-label="Ora"
          ></vue-timepicker>
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col" align="left">
                <v-btn 
                  class="mx-2"
                  fab
                  dark
                  small
                  color="deep-orange darken-1"
                  v-on:click="modal1 = true; modal2=false">
                    <v-icon dark>
                    mdi-arrow-left-bold
                    </v-icon>
                </v-btn>
              </div>
              <div class="col" align="right">
                <v-btn 
                  class="mx-2"
                  fab
                  dark
                  small
                  color="deep-orange darken-1"
                  v-on:click="disModal2">
                    <v-icon dark>
                    mdi-arrow-right-bold
                    </v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <v-card-text style="height: 150px; width:180px;"/>     
        </v-card>
        </v-dialog>
      </v-col>
      </v-row>
    </v-container>
    </v-row>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import AppointmentService from '../services/AppointmentService';
 export default {
   name: "appointment",
    components:{
          VueTimepicker
      },
   data(){
      return{
        form1:false,
        form2:false,
        isFormValid: false,
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateRapel: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        done: [false, false, false],
        modal1: false,
        modal2:false,
        mouseMonth: null,
        dates:null,
        hourrange:null,
        hourrangerapel:null,
        hour:"07",
        hourRapel:"07",
        office: null, 
        offices:[],
        headers: [
        { text: "Nume", value: "name", align: "center", sortable: false},
        { text: "Județ", value: "county", align: "center", sortable: false},
        { text: "Localitate", value: "city", align: "center", sortable: false},
        { text: "Adresă", value: "address", align: "center", sortable: false},
        { text: "Telefon", value: "phone", align: "center", sortable: false},
        { text: "Vaccin", value: "vaccine", align: "center", sortable: false},
        { text: "Locuri libere", value: "spots", align: "center", sortable: false},
      ],
      };
    },
  
methods: { 

  allowedStep: m => m % 30 === 0,
    getAllowedDates (val) {
      if (this.dates.indexOf(val) !== -1) {
        return true
      } else {
        return false
      }
    },

    //allowedDates: this.dates,
    contextMenu (year, event) {
      this.$set(this.done, 2, true)
      event.preventDefault()
      alert(`You have activated context menu for year ${year}`)
    },

    dblClick (date) {
      this.$set(this.done, 0, true)
      AppointmentService.getAppointmentHours(this.$route.params.id,date).then((response) => {
      this.dateRapel = response.data.RapelDay;
      this.hourrange=response.data.AvailableHours;
      this.hourrangerapel= response.data.RapelHours;
      })
      .catch((e) => {
        console.log(e);
      });
      this.modal1 = true;
      this.form1 = true;
      this.isFormValid = false;
    },

    disModal(){
      this.modal1 = false;
      if (this.office.vaccine.name != "Johnson&Johnson"){
      this.modal2 = true;
      this.isFormValid = false;
      }
    },
    disModal2(){
  
      this.modal2 = false
      this.form2 = true;
      this.isFormValid = true;
    },
  
    DisabledDates(){
      // const currentDate = new Date();
      const x = new Date("2021-20-08");
      return x;
      // return currentDate;
    },

      mouseEnter (month) {
      this.$set(this.done, 1, true)
      this.mouseMonth = month
    },
    
    mouseLeave () {
      this.mouseMonth = null
    },
    makeAppointments(){
      if (this.office.vaccine.name != "Johnson&Johnson"){
      var firstAppointment={
        kind : "prima doza",
        date: this.date,
        time: parseInt(this.hour),
        office : parseInt(this.$route.params.id),
        person : parseInt(this.$route.params.personId),

      };
      var secondAppointment={
        kind : "rapel",
        date: this.dateRapel,
        time: parseInt(this.hourRapel),
        office : parseInt(this.$route.params.id),
        person : parseInt(this.$route.params.personId),
      };
      AppointmentService.postAppointment(firstAppointment)
        .then((response) => {
   
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
        AppointmentService.postAppointment(secondAppointment)
        .then((response) => {
          this.$router.push('/my-appointments');
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
        var appointment={
        kind : "doza unica",
        date: this.date,
        time: parseInt(this.hour),
        office : parseInt(this.$route.params.id),
        person : parseInt(this.$route.params.personId),

      };
      AppointmentService.postAppointment(appointment)
        .then((response) => {
   
          console.log(response.data);
          this.$router.push('/my-appointments');
        })
        .catch((e) => {
          console.log(e);
        });
      }

    },

    getOffice(id) {
    return DataService.getOffice(id).then((response) => {
       this.office = response.data;
        let off = {
        id: this.office.id,
        name: this.office.name,
        county: this.office.county.name,
        city: this.office.city.name,
        address: this.office.address,
        phone: this.office.phone,
        spots: this.office.spots,
        vaccine: this.office.vaccine.name
        };
        this.offices.push(off);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    },
  },
  
  async mounted() {
    await AppointmentService.getAppointmentDate(this.$route.params.id,this.date).then((response) => {
        this.dates=response.data.AvailableDates;
       
        })
        .catch((e) => {
          console.log(e);
        });
    await this.getOffice(this.$route.params.id); 
  }
}
</script>

<style>
.list {
  max-width: 1400px;
}
.all {
  margin-top: 50px;
}
.wrap {
    margin: 40px auto;
    width: 235px;
}
</style>