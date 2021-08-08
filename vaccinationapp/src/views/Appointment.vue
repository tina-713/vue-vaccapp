<template>
  <v-row>
    <v-col
      class="my-2 px-1"
      cols="12"
      sm="6"
    >
    <div>
    <date-pick 
    v-model="date"
    :format="'YYYY.MM.DD'"
    :isDateDisabled="DisabledDates"
    ></date-pick>
</div>

    <v-dialog
    v-model="modal2"
    scrollable
 
    max-width="300px"

    >
        <v-card>    
             <v-card-title>Select Time</v-card-title>
            <vue-timepicker hide-disabled-items 
            :hour-range= "[8,9,10,11,12,13,14,15,16,17,18]" 
            format="HH" 
            close-on-complete
            hour-label="Ora"
            ></vue-timepicker>   
            <v-card-text style="height: 200px; width:200px;"/>

                
        </v-card>
    </v-dialog>

    </v-col>

  </v-row>
</template>



<script>

import DatePick from 'vue-date-pick/src/vueDatePick.vue';

import VueTimepicker from 'vue2-timepicker/src/vue-timepicker.vue'
import AppointmentService from '../services/AppointmentService';

  export default {
      components:{
          DatePick,
          VueTimepicker
      },
    data: () => ({
      date: '2021-01-01',
      format: "yyyy-MM-dd",
      modal2: false,
    }),

    methods: {
      allowedStep: m => m % 30 === 0,

      contextMenu (year, event) {
        this.$set(this.done, 2, true)

        event.preventDefault()

        alert(`You have activated context menu for year ${year}`)
      },
      dblClick (date) {
        console.log(date)
        AppointmentService.getAppointmentDate(this.$route.params.id,date).then((response) => {
          this.person = response.data.map(this.getDisplayRecipient);
          // console.log(response.data);
          console.log(this.userId)
        })
        .catch((e) => {
          console.log(e);
        });
        
        this.$set(this.done, 0, true)
        this.modal2 = true
      },
      mouseEnter (month) {
        this.$set(this.done, 1, true)
        this.mouseMonth = month
      },
      DisabledDates(){
       // const currentDate = new Date();
        const x = new Date("2021-20-08");
        return x;
        // return currentDate;
      },

      mouseLeave () {
        this.mouseMonth = null
      },
    },
  }
</script>
<style>

</style>