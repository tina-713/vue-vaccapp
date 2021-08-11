<template>
  <v-row>
    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >

 <v-date-picker
        v-model="date"
        @contextmenu:year="contextMenu"
        @dblclick:date="dblClick"
        :allowedDates="getAllowedDates"
      ></v-date-picker>
    </v-col>
      <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
    <v-dialog
    v-model="modal2"
    scrollable
 
    max-width="300px"

    >
        <v-card>    
             <v-card-title>Select Time</v-card-title>
            <vue-timepicker hide-disabled-items 
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
      <div class="row">
         <div class="col">
        <v-text-field
          v-model="date"

          label="date"
          required
          dense>
          </v-text-field>
          </div>
          
          <div class="col"> 
        <v-text-field
          v-model="hour"

          label="hour"
          required
          dense>
          </v-text-field>
          </div>
        </div>
    </v-col>

  </v-row>
</template>



<script>



import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import AppointmentService from '../services/AppointmentService';

  export default {
      components:{
          VueTimepicker
      },
    data(){
      return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      done: [false, false, false],
      modal2: false,
      mouseMonth: null,
      dates:null,
      hourrange:null,
      hour:"8",
    }
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
        console.log(date);
        this.$set(this.done, 0, true)
        AppointmentService.getAppointmentHours(this.$route.params.id,date).then((response) => {
        this.hourrange=response.data.AvailableHours;
        })
        .catch((e) => {
          console.log(e);
        });

        this.modal2 = true
      },
      disModal(){
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

    },
   async mounted()
    { 
     await AppointmentService.getAppointmentDate(this.$route.params.id,this.date).then((response) => {
        this.dates=response.data.AvailableDates;
       
        })
        .catch((e) => {
          console.log(e);
        });

      }
    
  }
</script>
<style>

</style>