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
        <v-card class="mx-auto" tile>
          <v-card-title style="background-color:#F2F3F4">Programările mele</v-card-title>

          <v-data-table
            :headers="headers"
            :items="appointment"
            :search="search"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1">

            <template v-slot:[`item.actions`]="{ item }">
             <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="float-left" v-if="item.status != 'anulata'" v-on="on" medium color="blue" @click="download(item.status)">mdi-download</v-icon>
                </template>
                    <span>Descarcă recipisa</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="float-right" v-if="item.status == 'in curs'" v-on="on" medium color="red" @click="cancellAppointment(item)">mdi-close-thick</v-icon>
                </template>
                  <span>Anulează programarea</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="float-right" v-if="isAdmin" v-on="on" medium color="red" @click="editAppointment(item.id)">mdi-pen</v-icon>
                </template>
                  <span>Editeaza programarea</span>
              </v-tooltip>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AppointmentService from "../services/AppointmentService"
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "my-appointments",
  data() {
    return {
      userId:"",
      appointment: [],
      search: '',
      isAdmin:false,
      headers: [
        { text: "Beneficiar", value: "person", align: "center", sortable: true},
        { text: "Tip programare", value: "kind", align: "center", sortable: false },
        { text: "Status programare", value: "status", align: "center", sortable: false },
        { text: "Centru de vaccinare", value: "office", align: "center", sortable: false },
        { text: "Locație centru de vaccinare", value: "location", align: "center",sortable: false },
        { text: "Data programării", value: "date", align: "center", sortable: false },
        { text: "Ora programării", value: "time", align: "center", sortable: false },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false },
      ],
    };
  },
  methods:{

    retrieveAppointment() {
      if (this.isAdmin){
          AppointmentService.getAllAppointments().then((response) => {
          this.appointment = response.data.map(this.getDisplayAppointment);
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
      AppointmentService.getAppointment("","","","","","","",this.userId).then((response) => {
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

    cancellAppointment(item){
      console.log(item)
      var appointment = {
        id: item.id,
        status: "anulata",
        kind: item.kind,
        office: item.office.id,
        time: item.time,
      };


      AppointmentService.putStatus(appointment).then((response) => {
        console.log(response.data);
        this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
      },

      download(id){
        console.log(id);
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

<style scoped>
.list {
  max-width: 1200px;
}
.all {
  margin-top: 70px;
}
.text-xs-right{
  white-space: nowrap;
}
.divider{
    width:5px;
    height:auto;
    display:inline-block;
}
</style>