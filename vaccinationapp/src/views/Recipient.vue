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
        <v-btn v-if="!isAdmin" class="white--text" to="/add-recipient" color="deep-orange darken-1">Adaugă Beneficiar</v-btn>
      </v-col>

      <v-col cols="12" sm="12">
        <div class="v-card--material mt-4 v-card v-sheet theme--light">
          <div class="v-card__title align-start">
            <div class="overflow-hidden mt-n9 transition-swing v-card--material__sheet v-sheet theme--light elevation-6 rounded blue-grey darken-1" style="max-width: 100%; width: 100%;">
              <div class="pa-8 white--text">
                <div class="text-h4 font-weight-light"> Beneficiari </div>
                </div></div></div>

          <v-data-table
            :headers="headers"
            :items="person"
            :search="search"
            :hide-default-footer="false"
            :items-per-page="5"
            class="elevation-1">

            <template slot="no-data">
              <div></div>
            </template>

            <template v-slot:[`item.waiting`]="{ item }">
              <v-chip v-if="!isAdmin" :color="getColor(item.waiting)" dark>{{ item.waiting }}</v-chip>
            </template>

            <template v-slot:[`item.actions`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-icon v-if="!isAdmin" v-on="on" medium class="mr-2" color="blue darken-2" @click="editRecipient(item.id)">mdi-pencil</v-icon>
                  </template>
                    <span>Editează</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-if="!isAdmin" v-on="on" medium  class="mr-2" color="green darken-2" @click="appointmentRec(item.id)">mdi-clock-outline</v-icon>
                </template>                  
                <span>Programează-te</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" medium  class="mr-2" color="red darken-2" @click="Delete(item.id)">mdi-delete</v-icon>
                </template>
                  <span>Șterge</span>
              </v-tooltip>

      
          
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-dialog
      v-model="dialog"
      persistent
      max-width="320"
      :retain-focus="false"
    >
      <v-card>
        <v-card-title class="text-h5">
          Sunteți sigur că doriți să ștergeți acest beneficiar?
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
            @click="deleteRec(dialogItem); snackbar.show = false"
          >
            Șterge
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-snackbar 
          :timeout="3000"
          bottom
          outlined
          :color="snackbar.color" 
          v-model="snackbar.show">
            {{ snackbar.message }}
        </v-snackbar>
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
      dialogItem:null,
      dialog:false,
      isAdmin:false,
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
      headers: [
        { text: "Nume", value: "last_name", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Prenume", value: "name", align: "center", sortable: true, class: 'my-header-style' },
        { text: "CNP", value: "cnp", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Cod identificare", value: "id", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Nr. ordine pe lista de așteptare", value: "waiting", align: "center", sortable: false, class: 'my-header-style' },
        { text: "Acțiuni", value: "actions", align: "center",sortable: false, class: 'my-header-style' },
      ],
    };
  },
  methods: {

    getColor (waiting) {
      if (waiting == 0) return 'transparent'
    },

    retrieveRecipients() {
      if(this.isAdmin){
        RecipientService.adminGetRecipients().then((response) => {
          this.person = response.data.map(this.getDisplayRecipient);
          // console.log(response.data);
          console.log(this.userId)
        })
        .catch((e) => {
          console.log(e);
        });
      }else{
      RecipientService.getRecipients("","","","",this.userId).then((response) => {
          this.person = response.data.map(this.getDisplayRecipient);
          // console.log(response.data);
          console.log(this.userId)
        })
        .catch((e) => {
          console.log(e);
        });
        }
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
    Delete(id){
      this.dialogItem=id;
      this.dialog = true
    },
    deleteRec(dialogItem) {
      this.dialog=false;

        RecipientService.deleteRecipient(dialogItem)
          .then(() => {
            this.snackbar = {
                    message: 'Beneficiar șters.',
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

     getDisplayRecipient(person) {
      return {
        last_name: person.last_name.length > 30 ? person.last_name.substr(0, 30) + "..." : person.last_name,
        name: person.name.length > 30 ? person.name.substr(0, 30) + "..." : person.name,
        cnp: person.cnp,
        id: person.id,
        waiting : person.waitingList,
      };
    },
  },
  async mounted() {
    await AuthenticationService.getCurrentlyLoggedUser().then((response)=>{  
      this.userId = response.data.id;
      this.isAdmin = response.data.is_superuser;
      }).catch((e)=>{
        console.log(e);
      });
    this.retrieveRecipients();
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
.my-header-style {
color: #BDBDBD !important;
  font-size: 15px !important;
}
</style>