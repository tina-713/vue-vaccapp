<template>
  <!-- <v-container fixed ma-0 pa-0 fill-height>
    <v-card width="240" height= "90vh">
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon color="deep-orange">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-card>
  </v-container> -->
  
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
              <v-btn small color="blue" @click="makeAppointment(item.id)">Selectează</v-btn>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
//   export default {
//     data () {
//       return {
//         items: [
//           { title: 'Alege beneficiar', icon: 'mdi-account-outline' },
//           { title: 'Centre', icon: 'mdi-office-building-marker-outline' },
//           { title: 'Programare doza initiala', icon: 'mdi-calendar-month' },
//           { title: 'Programare rapel', icon: 'mdi-calendar-month' },
//         ],
//       }
//     },
//   }

import DataService from "../services/DataService";

export default {
  name: "offices",
  data() {
    return {
      office: [],
      search: '',
      county: "",
      city: "",
      headers: [
        { text: "Nume", value: "name", align: "center", sortable: true},
        { text: "Judet", value: "county", align: "center", sortable: true },
        { text: "Localitate", value: "city", align: "center", sortable: true },
        { text: "Adresa", value: "addres", align: "center", sortable: true },
        { text: "Telefon", value: "phone", align: "center", sortable: true },
        { text: "Locuri libere", value: "spots", align: "center", sortable: true },
        { text: "Tip Vaccin", value: "vaccine", align: "center", sortable: true },
        { text: "Acțiuni", value: "actions", align: "center",sortable: true },

      ],
    };
  },

  methods: {
    retrieveOffices() {
      DataService.getAllOffices().then((response) => {
          this.office = response.data.map(this.getDisplayRecipient)
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
      this.$router.push({ name: "appointment", params: { id: id } });
    },

     getDisplayRecipient(office) {
      return {
        id: office.id,
        name: office.name,
        county: office.county.name,
        city: office.city.name,
        addres: office.addres,
        phone: office.phone,
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
