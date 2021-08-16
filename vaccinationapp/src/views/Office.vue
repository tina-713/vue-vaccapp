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
          <v-card-title style="background-color:#F2F3F4">Centre</v-card-title>

          <v-data-table
            :headers="headers"
            :items="office"
            :search="search"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1">

            <template v-slot:[`item.actions`]="{ item }">
              <div v-if="item.spots>0" align="center">
              <v-btn class="white--text" small color="blue" @click="makeAppointment(item.id)">Prorgramare</v-btn>
              </div>
              <div v-else>
                <v-btn class="white--text" small color="red" @click="makeWaitingList(item.id)">Lista de Asteptare</v-btn>
              </div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
    
      <v-card>
        <v-card-title class="text-h5">
          Sunteți sigur că vreți să va înscrieți pe lista de așteptare?
        </v-card-title>
        <v-card-text>Momentan centrul ales nu dispune de locuri libere. Aveți posibilitatea de a vă înscrie pe lista de așteptare a acestuia sau de a vă programa la un alt centru unde acțiunea "PROGRAMARE" este vizibilă.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-orange"
            text
            @click="dialog = false"
          >
            anulează
          </v-btn>
          <v-btn
            color="deep-orange"
            text
            @click="postWList((item.id))"
          >
            înscrie
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import DataService from "../services/DataService";
import AppointmentService from "../services/AppointmentService";
export default {
  name: "offices",
  data() {
    return {
      office: [],
      search: '',
      county: "",
      dialog:false,
      headers: [
        { text: "Nume", value: "name", align: "center", sortable: false},
        { text: "Județ", value: "county", align: "center", sortable: true },
        { text: "Localitate", value: "city", align: "center", sortable: false },
        // { text: "Adresă", value: "address", align: "center", sortable: false },
        // { text: "Telefon", value: "phone", align: "center", sortable: false },
        { text: "Locuri libere", value: "spots", align: "center", sortable: true },
        // { text: "Listă de așteptare", value: "", align: "center", sortable: true },
        { text: "Tip Vaccin", value: "vaccine", align: "center", sortable: true },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false },
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
    makeAppointment(id) {
      this.$router.push({ name: "office-id", params: {id: id } });
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

<style scoped>
.list {
  max-width: 1200px;
}
.all {
  margin-top: 70px;
}
</style>
