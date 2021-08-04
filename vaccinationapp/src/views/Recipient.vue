<template>
  <v-row align="center" class="list mx-auto">

    <v-col cols="12" md="8">
      <v-text-field v-model="last_name" label="Căutare după Nume"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchName">
        Caută
      </v-btn>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn class="white--text" to="/add-recipient" color="deep-orange">Adaugă Beneficiar</v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Beneficiari</v-card-title>

        <v-data-table
          :headers="headers"
          :items="person"
          disable-pagination
          :hide-default-footer="true"
        >

          <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" color="blue" @click="editRecipient(item.id)">mdi-pencil</v-icon>
              <v-icon small  color="red" @click="deleteRec(item.id)">mdi-delete</v-icon>
          </template>

        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RecipientService from "../services/RecipientService";
export default {
  name: "recipient",
  data() {
    return {
      person: [],
      last_name: "",
      headers: [
        { text: "Nume", value: "last_name", align: "center", sortable: false},
        { text: "Prenume", value: "name", align: "center", sortable: false },
        { text: "CNP", value: "cnp", align: "center", sortable: false },
        { text: "Cod identificare", value: "id", align: "center", sortable: false },
        { text: "Nr. ordine pe lista de așteptare", value: "", align: "center", sortable: false },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false },
      ],
    };
  },
  methods: {
    retrieveRecipients() {
      RecipientService.getRecipients().then((response) => {
          this.person = response.data.map(this.getDisplayRecipient);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

     refreshList() {
      this.retrieveRecipients();
    },

    editRecipient(id) {
      this.$router.push({ name: "edit-recipient", params: { id: id } });
    },

    deleteRec(id) {
      RecipientService.deleteRecipient(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

     getDisplayRecipient(person) {
      return {
        last_name: person.last_name.length > 30 ? person.last_name.substr(0, 30) + "..." : person.last_name,
        name: person.name.length > 30 ? person.name.substr(0, 30) + "..." : person.name,
        cnp: person.cnp,
        id: person.id,

      };
    },
  },
  mounted() {
    this.retrieveRecipients();
  },
};
</script>

<style>
.list {
  max-width: 1000px;
}
</style>