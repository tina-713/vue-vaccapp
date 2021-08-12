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

    <v-row align="center" class="list mx-auto">
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title style="background-color:#F2F3F4">Detalii
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="offices"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1">
            
            <!-- <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.county.name }}</td>
            <td>{{ props.item.city.name }}</td>
            <td>{{ props.item.address }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.spots }}</td>
            <td>{{ props.item.vaccine.name }}</td>
            </template> -->
          </v-data-table>
        </v-card>
      </v-col>

    <v-container>
      <v-row>
        <v-col
          class="my-2 px-1"
          cols="12"
          sm="12"
        >
        <div class="row">
          <div class="col">
            <v-text-field
              readonly
              v-model="date"
              label="Dată Doza Initiala"
              required
              dense>
              </v-text-field>
          </div>
            
          <div class="col"> 
            <v-text-field
              readonly
              v-model="hour"
              label="Oră Doza Initiala"
              required
              dense>
            </v-text-field>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <v-text-field
              readonly
              v-model="dateRapel"
              label="Dată Doza Rapel"
              required
              dense>
              </v-text-field>
          </div>
            
          <div class="col"> 
            <v-text-field
              readonly
              v-model="hourRapel"
              label="Oră Doza Rapel"
              required
              dense>
            </v-text-field>
          </div>
        </div>
        <v-date-picker
          v-model="date"
          @contextmenu:year="contextMenu"
          @dblclick:date="dblClick"
          :allowedDates="getAllowedDates"
          scrollable 
          color="black"
          year-icon="mdi-calendar-blank"
          prev-icon="mdi-skip-previous"
          next-icon="mdi-skip-next"
          :first-day-of-week="1"
          locale="ro"
          elevation="10"
          full-width
          class="startDate"
        ></v-date-picker>
        </v-col>

      <v-col
        class="my-2 px-1"
        cols="12"
        sm="6"
      >
        <v-dialog
          v-model="modal1"
          scrollable
          max-width="300px"
        >
        <v-card>    
          <v-card-title>Alegeti Ora Doza Initiala</v-card-title>
          <vue-timepicker 
            hide-disabled-items 
            v-model = "hour"
            :hour-range= "hourrange" 
            format="HH" 
            close-on-complete
            hour-label="Ora"
          ></vue-timepicker>
          <v-btn  v-on:click="disModal">Submit</v-btn>   
          <v-card-text style="height: 200px; width:200px;"/>      
        </v-card>
        </v-dialog>
        <v-dialog
          v-model="modal2"
          scrollable
          max-width="300px"
        >
        <v-card>    
          <v-card-title>Alegeti Ora Rapel</v-card-title>
          <vue-timepicker 
            hide-disabled-items 
            v-model = "hourRapel"
            :hour-range= "hourrangerapel" 
            format="HH" 
            close-on-complete
            hour-label="Ora"
          ></vue-timepicker>
          <v-btn  v-on:click="disModal2">Submit</v-btn>   
          <v-card-text style="height: 200px; width:200px;"/>      
        </v-card>
        </v-dialog>
      </v-col>
      </v-row>
      <div align="center">
      <v-btn
        class="white--text"
        width="120" 
        elevation="5" 
        color="deep-orange"
        
        v-on:click.stop.prevent="makeAppointments">Salvează</v-btn>
        </div>
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
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        dateRapel: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        done: [false, false, false],
        modal1: false,
        modal2:false,
        mouseMonth: null,
        dates:null,
        hourrange:null,
        hourrangerapel:null,
        hour:"8",
        hourRapel:"8",
        office: null,  
        offices:[],
        headers: [
        { text: "Nume", value: "name", align: "center"},
        { text: "Județ", value: "county", align: "center"},
        { text: "Localitate", value: "city", align: "center"},
        { text: "Adresă", value: "address", align: "center"},
        { text: "Telefon", value: "phone", align: "center"},
        { text: "Locuri libere", value: "spots", align: "center"},
        { text: "Tip Vaccin", value: "vaccine", align: "center"},
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
      this.modal1 = true
    },

    disModal(){
      this.modal1 = false
      this.modal2 = true
    },
    disModal2(){
  
      this.modal2 = false
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
      var firstAppointment={
        kind : "prima doza",
        date: this.date,
        time: parseInt(this.hour),
        office : parseInt(this.$route.params.id),
        person : parseInt(this.$route.params.personId)

      };
      var secondAppointment={
        kind : "rapel",
        date: this.dateRapel,
        time: parseInt(this.hourRapel),
        office : parseInt(this.$route.params.id),
        person : parseInt(this.$route.params.personId)  
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
          this.$router.push('/recipient');
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayOffice(office) {
      return {
        id: office.id,
        name: office.name,
        county: office.county.name,
        city: office.city.name,
        address: office.address,
        phone: office.phone,
        spots: office.spots,
        vaccine: office.vaccine.name
      };
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
    console.log(this.office.id)
  }
}
</script>

<style>
.startDate {
   margin-top: 30px;
     }
.list {
  max-width: 1200px;
}
.all {
  margin-top: 70px;
}
</style>