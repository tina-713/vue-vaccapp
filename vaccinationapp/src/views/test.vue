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
          <v-card-title style="background-color:#F2F3F4">{{office.name}}
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="office"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1">
            
            <template slot="items" slot-scope="props">
            <td>{{ props.item.county.name }}</td>
            <td>{{ props.item.city.name }}</td>
            <td>{{ props.item.address }}</td>
            <td>{{ props.item.phone }}</td>
            <td>{{ props.item.spots }}</td>
            <td>{{ props.item.vaccine.name }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-container>
      <v-dialog
        ref="dialogTest"
        v-model="modalTest"
        :return-value.sync="dateTest"
        persistent
      >
        <template v-slot:activator="{ on }">
          <v-btn color="success" dark v-on="on">alege data</v-btn>
        </template>
    
        
        <div style="margin-top:40px; margin-bottom:20px" class="text-center title">Selecteaza Data si Ora</div>
        <v-row justify="center">

        <v-date-picker
        class="startDate"
        v-model="dateTest" 
        :allowed-dates="allowedDates"
        scrollable 
        color="black"
        year-icon="mdi-calendar-blank"
        prev-icon="mdi-skip-previous"
        next-icon="mdi-skip-next"
        :first-day-of-week="1"
        elevation="10"
        locale="ro"
        :min="new Date().toISOString().substr(0, 10)"
        >

          <div class="flex-grow-1"></div>
          <v-btn text color="deep-orange" @click="saveData">OK</v-btn>
          <v-btn text color="black" @click="modalTest=false">Cancel</v-btn>
        
        </v-date-picker>

        <v-slide-y-transition>
            <v-col cols=2 v-show="dateTest !== null">
              <template v-for="allowedTime in allowedTimes">
                <v-btn
                  :key="allowedTime"
                  @click="setTime(allowedTime)"
                  class="my-2 white--text"
                  :outlined="allowedTime !== time"
                  block
                  large
                  color="black"
                >{{ allowedTime }}</v-btn>
              </template>
            </v-col>
          </v-slide-y-transition>
          </v-row>
      </v-dialog>
      {{dateTest}}
    </v-container>
  </div>
</template>

<script>
import DataService from "../services/DataService";
// import AppointmentService from "../services/AppointmentService";
// const today = new Date();
// const dateTest = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

 export default {
   name: "appointment",
   data(){
      return{
        office: [],
        modalTest: false,
        dateTest: null,
        time: null,
        allowedTimes: ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00', '19:00', '20:00'],
        
        headers: [
        { text: "Județ", value: "county", align: "center"},
        { text: "Localitate", value: "city", align: "center"},
        { text: "Adresă", value: "address", align: "center"},
        { text: "Telefon", value: "phone", align: "center"},
        { text: "Locuri libere", value: "spots", align: "center"},
        { text: "Tip Vaccin", value: "vaccine", align: "center"},
      ],
      };
    },
  
  async mounted() {
    
    await this.getOffice(this.$route.params.id);   
  },

methods: { 

    getOffice(id) {
    return DataService.getOffice(id)
      .then((response) => {
        this.office = response.data;
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },

    saveData() {
        this.$refs.dialogTest.save(this.dateTest)
    },

    // allowedDates(){
    //     AppointmentService.getAppointmentDate(this.$route.params.id, dateTest)
    //     .then((response) => {
    //       this.dates = response.data;
    //       console.log(this.dateTest)
    //       console.log(response.data)
    //     }).catch((e)=>{
    //       console.log(e);
    //     });
    //   },

    allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
    setTime(time) {
        this.time = time
    }
  },
};
</script>

<style>
 .startDate {
   margin-top: 20px;
   width: 350px;
   height: 450px;
     };
</style>