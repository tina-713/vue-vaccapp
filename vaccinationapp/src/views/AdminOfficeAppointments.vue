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

      <v-col cols="12" sm="5">
        <v-text-field
          v-model="search"
          label="Căutare..."
          single-line
          hide-details
          clearable
          filled
          rounded
          dense
          append-icon="mdi-magnify">
        </v-text-field>
      </v-col>

       <v-col cols="12" sm="2">
      <v-layout >
        <v-checkbox
         v-model="checkbox1"
        label="Programările de astăzi"
        class="white--text"
        width="220" 
        elevation="5" 
        color="deep-orange darken-1"
        @change="TodaysAppointments"
        ></v-checkbox>
       </v-layout>
     </v-col>

      <v-col cols="12" sm="2">
      <v-layout >
        <v-checkbox
         v-model="checkbox2"
        label="Toate programările"
        class="white--text"
        width="220" 
        elevation="5" 
        color="deep-orange darken-1"
        @change="retrieveAppointment"
        ></v-checkbox>
       </v-layout>
    </v-col>
    
      <v-col cols="12" sm="3">
      <v-layout >
        <v-btn
        class="white--text"
        width="220" 
        elevation="5" 
        color="deep-orange darken-1"
        @click="downloadPdfTodaysAppointments()">Generează Liste</v-btn>
       </v-layout>
    </v-col> 

      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--light">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded blue-grey darken-1" style="max-width: 100%; width: 100%;">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> Programări </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="appointment"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1">

            <template slot="no-data">
              <div></div>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'anulata'" v-on="on" medium class="mr-2" color="blue darken-2" @click="download(item.id)">mdi-download</v-icon>
                </template>
                    <span>Descarcă recipisa</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="isAdmin" v-on="on" medium class="mr-2" color="green darken-2" @click="editAppointment(item.id)">mdi-pencil</v-icon>
                </template>
                  <span>Editează programarea</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
      <v-snackbar 
        :timeout="3000"
        bottom
        outlined
        :color="snackbar.color" 
        v-model="snackbar.show">
          {{ snackbar.message }}
      </v-snackbar>
  </div>
</template>

<script>
import AppointmentService from "../services/AppointmentService"
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "my-appointments",
  data() {
    return {
      checkbox1: false,
      checkbox2: false,
      dialog:false,
      dialogItem:null,
      userId:"",
      appointment: [],
      search: '',
      isAdmin:false,
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
      headers: [
        { text: "Beneficiar", value: "person", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Tip programare", value: "kind", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Status programare", value: "status", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Centru de vaccinare", value: "office", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Locație centru de vaccinare", value: "location", align: "center",sortable: false, class: 'my-header-style'},
        { text: "Data programării", value: "date", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Ora programării", value: "time", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Acțiuni", value: "actions", align: "center",sortable: false, class: 'my-header-style'},
      ],
    };
  },
  methods:{

    retrieveAppointment() {

        AppointmentService.getAllAppointmentsForOffice(this.$route.params.id).then((response) => {
          this.appointment = response.data.map(this.getDisplayAppointment);
          this.checkbox1=false;
        })
        .catch((e) => {
          console.log(e);
        });
      
    },

    refreshList() {
      this.retrieveAppointment();
    },

    getDisplayAppointment(appointment) {
      return {
        id: appointment.id,
        person: appointment.person.last_name + ' '+ appointment.person.name,
        kind: appointment.kind,
        status: appointment.status,
        office: appointment.office.name,
        location: appointment.office.county.name +', '+ appointment.office.city.name,
        date: appointment.date,
        time: appointment.time,
      };
    },
    TodaysAppointments(){
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
        AppointmentService.getTodaysAppointmentsForOffice(this.$route.params.id,date).then((response) => {
          this.appointment = response.data.map(this.getDisplayAppointment);
          this.checkbox2=false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // Cancel(item){
    //   this.dialogItem = item;
    //   this.dialog = true
    // },
    // cancellAppointment(item){
    //   this.dialog=false;
    //   var appointment = {
    //     id: item.id,
    //     status: "anulata",
    //     kind: item.kind,
    //     office: item.office.id,
    //     time: item.time,
    //   };
  

    //   AppointmentService.putStatus(appointment).then((response) => {
    //     console.log(response.data);
    //     this.snackbar = {
    //                   message: 'Programare anulată cu succes.',
    //                   color: 'success',
    //                   show: true
    //               };
    //     this.refreshList();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    //     this.$router.go();
    //   },

      downloadPdfTodaysAppointments(){
        const current = new Date();
        const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;  
        AppointmentService.getPdfAppointmentsToday(this.$route.params.id,date).then((response) => {
        console.log(response.data);
        this.snackbar = {
                      message: 'Programare descarcata cu succes.',
                      color: 'success',
                      show: true
                  };
        })
        .catch((e) => {
          console.log(e);
        });
      },

      download(id){
        AppointmentService.getPdfAppointment(id).then((response) => {
        console.log(response.data);
        this.snackbar = {
                      message: 'Programare descarcata cu succes.',
                      color: 'success',
                      show: true
                  };
        })
        .catch((e) => {
          console.log(e);
        });
      
      },
      editAppointment(id) {
        this.$router.push({ name: "edit-appointment", params: { id: id } });
    },
  },
  async mounted() {
    await AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.userId = response.data.id;
      this.isAdmin = response.data.is_superuser;
      }).catch((e)=>{
        console.log(e);
      });
    this.retrieveAppointment();
  },
};

</script>

<style>
.list {
  max-width: 1300px;
}
.all {
  margin-top: 50px;
}
.text-xs-right{
  white-space: nowrap;
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
.my-header-style {
color: #BDBDBD !important;
  font-size: 15px !important;
}
</style>
