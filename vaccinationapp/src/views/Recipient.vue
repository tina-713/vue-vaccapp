<template>
  <div class="all">
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
        <v-btn class="white--text" to="/add-recipient" color="deep-orange">Adaugă Beneficiar</v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title style="background-color:#F2F3F4">Beneficiari</v-card-title>

          <v-data-table
            :headers="headers"
            :items="person"
            :search="search"
            disable-pagination
            :hide-default-footer="true"
            class="elevation-1">

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on" medium class="mr-2" color="blue" @click="editRecipient(item.id)">mdi-pencil</v-icon>
                  </template>
                    <span>Editează</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" medium  class="mr-2" color="green" @click="appointmentRec(item.id)">mdi-clock-outline</v-icon>
                </template>
                  <span>Programează-te</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" medium  class="mr-2" color="red" @click="deleteRec(item.id)">mdi-delete</v-icon>
                </template>
                  <span>Șterge</span>
              </v-tooltip>
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import RecipientService from "../services/RecipientService";
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "recipient",
  data() {
    return {
      userId:"",
      person: [],
      last_name: "",
      search: '',
      headers: [
        { text: "Nume", value: "last_name", align: "center", sortable: true},
        { text: "Prenume", value: "name", align: "center", sortable: true },
        { text: "CNP", value: "cnp", align: "center", sortable: false },
        { text: "Cod identificare", value: "id", align: "center", sortable: false },
        { text: "Nr. ordine pe lista de așteptare", value: "", align: "center", sortable: false },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false },
      ],
    };
  },
  methods: {
    retrieveRecipients() {
      
      RecipientService.getRecipients("","","","",this.userId).then((response) => {
          this.person = response.data.map(this.getDisplayRecipient);
          // console.log(response.data);
          console.log(this.userId)
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

    appointmentRec(personId,id) {
      this.$router.push({ name: "office", params: { personId: personId ,id: id } });
    },

    deleteRec(id) {
      if(confirm("Sunteți sigur că doriți să ștergeți acest beneficiar?")){
        RecipientService.deleteRecipient(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
        }
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
  async mounted() {
    await AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.userId = response.data.id;
      }).catch((e)=>{
        console.log(e);
      });
    this.retrieveRecipients();
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