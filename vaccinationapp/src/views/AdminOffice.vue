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

      <v-col cols="12" md="12" class="text-right">
        <v-btn class="white--text" to="/add-office" color="deep-orange darken-1">Adaugă Centru</v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--light">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded blue-grey darken-1" style="max-width: 100%; width: 100%;">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> Centre </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="office"
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
                  <v-icon  v-on="on" medium class="mr-2" color="blue darken-2" @click="getAppontmentsOffices(item.id)">mdi-eye</v-icon>
                </template>
                    <span>Vezi programările</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" medium class="mr-2" color="green darken-2" @click="editOffice(item.id)">mdi-pencil</v-icon>
                </template>
                  <span>Editează</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon  v-on="on" medium class="mr-2" color="red darken-2" @click="Delete(item.id)">mdi-delete</v-icon>
                </template>
                  <span>Șterge</span>
              </v-tooltip>

              <v-dialog
      v-model="dialog"
      persistent
      max-width="410"
    >
      <v-card>
        <v-card-title class="text-h5">
          Sunteți sigur că doriți să ștergeți acest punct de vaccinare?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialog = false"
          >
            Anulează
          </v-btn>
          <v-btn
            color="deep-orange darken-1"
            text
            @click="deleteOffice((item.id)); snackbar.show = false"
          >
            Șterge
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

              </template>
          </v-data-table>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import DataService from "../services/DataService";
import AppointmentService from "../services/AppointmentService";
export default {
  name: "admin-offices",
  data() {
    return {
      office: [],
      search: '',
      county: "",
      dialog:false,
      headers: [
        { text: "Nume", value: "name", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Județ", value: "county", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Localitate", value: "city", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Vaccin", value: "vaccine", align: "center", sortable: true, class: 'my-header-style'},
        // { text: "Adresă", value: "address", align: "center", sortable: false },
        // { text: "Telefon", value: "phone", align: "center", sortable: false },
        { text: "Locuri libere", value: "spots", align: "center", sortable: true, class: 'my-header-style'},
        // { text: "Listă de așteptare", value: "", align: "center", sortable: true },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false, class: 'my-header-style'},
      ],
    };
  },

  methods: {
    retrieveOffices() {
      DataService.getAllOffices().then((response) => {
          this.office = response.data.map(this.getDisplayOffice)
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

     refreshList() {
      this.retrieveOffices();
    },
    getAppontmentsOffices(id){
      this.$router.push({ name: "office-appointments", params: { id: id } });
    },
    editOffice(id) {
      this.$router.push({ name: "edit-office", params: { id: id } });
    },
    Delete(){
      this.dialog = true
    },
    deleteOffice(id) {
      this.dialog=false;

        DataService.deleteOffice(id)
          .then(() => {
            this.snackbar = {
                    message: 'Centru șters.',
                    color: 'success',
                    show: true
                  }
            this.refreshList();
          })
          .catch((e) => {
            this.snackbar = {
                      message: 'Eroare',
                      color: 'error',
                      show: true
                    }
            console.log(e);
          });
    },
    makeWaitingList() {
      this.dialog = true
    },
    postWList(id){
      this.dialog=false;
      let wlist = {
        person :this.$route.params.personId,
        office : id

      };
      AppointmentService.postWaitingList(wlist).then((response) => {
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
        // address: office.address,
        // phone: office.phone,
        spots: office.spots,
        vaccine: office.vaccine.name
      };
    },
  },
  
  mounted() {
    this.retrieveOffices();
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
.my-header-style {
color: #BDBDBD !important;
  font-size: 15px !important;
}
</style>
