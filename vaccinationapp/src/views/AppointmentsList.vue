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

      <v-col cols="12" md="5">
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

      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--light">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded blue-grey darken-1" style="max-width: 100%; width: 100%;">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> Programările mele </div>
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

            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getColorSpots(item.status)" dark>{{ item.status }}</v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status != 'anulata'" v-on="on" color="blue darken-2" @click="download(item.id)">mdi-download</v-icon>
                </template>
                    <span>Descarcă recipisa</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="isAdmin" v-on="on" color="green darken-2" @click="editAppointment(item.id)">mdi-pencil</v-icon>
                </template>
                  <span>Editează programarea</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="item.status == 'in curs' && !isAdmin" v-on="on" color="red darken-2" @click="Cancel(item)">mdi-close</v-icon>
                </template>
                  <span>Anulează programarea</span>
              </v-tooltip>
            
  
            
            </template>

          </v-data-table>
                    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="text-h5 white--text deep-orange darken-1 darken-4">
          Sunteți sigur că doriți să anulați această programare?</v-card-title>
          <v-card-text
          style="font-size:17px"
          ><br/>Dacă programarea aleasă este cea pentru PRIMA DOZĂ, atât ea, cât și cea pentru rapel vor fi anulate.
          <br/>În cazul în care programarea selectată este RAPEL sau DOZĂ UNICĂ, aveți posibilitatea de a vă reprograma!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialog = false"
          >
            nu
          </v-btn>
          <v-btn
            color="deep-orange darken-1"
            text
            @click="cancellAppointment(dialogItem); snackbar.show = false"
          >
            da
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
        { text: "Tip programare", value: "kind", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Status", value: "status", align: "center", sortable: true, class: 'my-header-style' },
        { text: "Centru de vaccinare", value: "office", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Locație centru de vaccinare", value: "location", align: "center",sortable: false, class: 'my-header-style' },
        { text: "Data", value: "date", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Ora", value: "time", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false, class: 'my-header-style' },
      ],
    };
  },
  methods:{

     getColorSpots(status){
      if (status == 'finalizata') return 'green darken-2'
      else if (status == 'in curs') return 'orange darken-2'
      else if (status == 'anulata') return 'red darken-2'
    },

    retrieveAppointment() {
      if (this.isAdmin){
          AppointmentService.getAllAppointments().then((response) => {
          this.appointment = response.data.map(this.getDisplayAppointment);
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
      AppointmentService.getAppointment(this.userId).then((response) => {
          this.appointment = response.data.map(this.getDisplayAppointment);
        })
        .catch((e) => {
          console.log(e);
        });
        }
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

    Cancel(item){
      this.dialogItem = item;
      this.dialog = true
    },
    cancellAppointment(item){
      this.dialog=false;
      var appointment = {
        id: item.id,
        status: "anulata",
        kind: item.kind,
        time: item.time,
      };
  
      AppointmentService.putStatus(appointment).then((response) => {
        console.log(response.data);
        this.snackbar = {
                      message: 'Programare anulată cu succes.',
                      color: 'success',
                      show: true
                  };
        this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
        this.$router.go();
      },

      download(id){
        AppointmentService.getPdfAppointment(id).then((response) => {
        console.log(response.data);
        this.snackbar = {
                      message: 'Programare anulată cu succes.',
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
  max-width: 1400px;
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
