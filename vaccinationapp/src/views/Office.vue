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

            <template v-slot:[`item.spots`]="{ item }">
              <v-chip :color="getColorSpots(item.spots)" dark>{{ item.spots }}</v-chip>
            </template>

            <template v-slot:[`item.vaccine`]="{ item }">
              <div class="font-weight-bold">{{ item.vaccine }}</div>
            </template>

            <template v-slot:[`item.waiting`]="{ item }">
              <v-chip :color="getColorWaiting(item.waiting)" dark>{{ item.waiting }}</v-chip>
            </template>

            <template  v-slot:[`item.actions`]="{ item }">
             
              <div v-if="!isAppointed && !isWaitingList">
                <div v-if="item.spots>0" align="center">
                <v-btn class="white--text" small color="blue darken-2" @click="makeAppointment(item)">Programare</v-btn>
                </div>
                <div v-else>
                  <v-btn class="white--text" small color="red darken-2" @click="makeWaitingList(item)">Lista de Asteptare</v-btn>
                </div>
               </div>

               <div v-else>
                 <v-btn class="white--text" small color="red darken-2" v-if="item.isWaitingList" @click="Delete(item)">Părăsește lista</v-btn>
               </div>
                <div v-if="!rapel && isAppointed">
                 <div v-if="item.spots>0 && item.rapelEligible" align="center">
                 <v-btn class="white--text" small color="green darken-2" @click="makeRapelAppointment(item)">Programare Rapel</v-btn>
                 </div>
              </div>
            </template>
            
          </v-data-table>
              <v-dialog
      v-model="dialogWList"
      persistent
      max-width="430"
    >
      <v-card>
        <v-card-title class="text-h5 white--text deep-orange darken-1 darken-4">
          Sunteți sigur că vreți să va înscrieți pe lista de așteptare?
        </v-card-title>
        <v-card-text
        style="font-size:17px"
        ><br/>Momentan centrul ales nu dispune de locuri libere. Aveți posibilitatea de a vă înscrie pe lista de așteptare a acestuia sau de a vă programa la un alt centru unde acțiunea "PROGRAMARE" este vizibilă.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialogWList = false"
          >
            anulează
          </v-btn>
          <v-btn
            color="deep-orange darken-1"
            text
            @click="postWList((dialogItem)); snackbar.show = false"
          >
            înscrie
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogDeleteWList"
      persistent
      max-width="390"
    >
    
      <v-card>
        <v-card-title class="text-h5">
          Sunteți sigur că vreți să părăsiți lista de așteptare?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey darken-1"
            text
            @click="dialogDeleteWList = false"
          >
            nu
          </v-btn>
          <v-btn
            color="deep-orange darken-1"
            text
            @click="deleteWList((dialogItem)); snackbar.show = false"
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

import DataService from "../services/DataService";
import AppointmentService from "../services/AppointmentService";
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "offices",
  data() {
    return {
      office: [],
      search: '',
      county: "",
      isAdmin:false,
      dialogItem:null,
      dialogWList:false,
      dialogDeleteWList: false,
      dialogCancelApp:false,
      isAppointed:false,
      isWaitingList:false,
      rapelFromDate:null,
      rapel : null,
      snackbar: {
                show: false,
                message: null,
                color: null,
            },
      headers: [
        { text: "Nume", value: "name", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Județ", value: "county", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Localitate", value: "city", align: "center", sortable: false, class: 'my-header-style'},
        { text: "Vaccin", value: "vaccine", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Locuri libere", value: "spots", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Listă asteptare", value: "waiting", align: "center", sortable: true, class: 'my-header-style'},
        { text: "Acțiuni", value: "actions", align: "center",sortable: false, class: 'my-header-style'},
      ],
    };
  },

  methods: {

    getColorSpots(spots){
      if (spots > 500) return 'green darken-2'
      else if (spots > 200) return 'orange darken-2'
      else if (spots == 0) return 'transparent'
      else return 'red darken-2'
    },

    getColorWaiting(waiting){
      if (waiting > 250) return 'red darken-2'
      else if (waiting > 0) return 'orange darken-2'
      else return 'transparent'
    },

    retrieveOffices() {
      if (this.isAdmin){
      DataService.getAllOffices().then((response) => {
          this.office = response.data.map(this.getDisplayOffice)

        })
        .catch((e) => {
          console.log(e);
        });
        }
        else{
          DataService.getAllOfficesforUser(this.$route.params.personId).then((response) => {
          this.office = response.data.map(this.getDisplayOffice)
           for (const x of response.data){
             if(x['isAppointed']){
               this.isAppointed= true;
             }
             if(x['isWaitingList']){
               this.isWaitingList= true;
             }
             if(x['rapel']){
               this.rapel = true;
             }
             if(x['rapelFromDate']){
               this.rapelFromDate = x['rapelFromDate'];
             }
             
           }
        })
        .catch((e) => {
          console.log(e);
        });
        }
    },

     refreshList() {
      this.retrieveOffices();
    },
    makeRapelAppointment(item){
      this.$router.push({ name: "rapel-office-id", params: {id: item.id,rapelDate:this.rapelFromDate } });
    },
    makeAppointment(item) {
      this.dialogItem= item;
      this.$router.push({ name: "office-id", params: {id: item.id } });
    },
    makeWaitingList(item) {
      this.dialogItem = item;
      this.dialogWList = true;
    },
    postWList(item){
      console.log()
      this.dialogWList=false;
      let wlist = {
        person :this.$route.params.personId,
        office : item.id
      };
      AppointmentService.postWaitingList(wlist).then(() => {
          this.snackbar = {
                      message: 'V-ați înscris cu succes pe lista de așteptare.',
                      color: 'success',
                      show: true
                  };
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    Cancel(){
      this.dialogCancelApp = true
    },
    cancellAppointment(item){
      this.dialogCancelApp = false;
      var appointment = {
        id: item.id,
        status: "anulata",
        kind: item.kind,
        office: item.office.id,
        time: item.time,
      };

      AppointmentService.putStatus(appointment).then((response) => {
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

      Delete(item){
      this.dialogItem= item;
      this.dialogDeleteWList = true;
      },

      deleteWList(item) {
        this.dialogDeleteWList = false;
        AppointmentService.deleteWaitingList(item.id,this.$route.params.personId).then(() => {
            this.snackbar = {
                    message: 'Ați părăsit lista de așteptare.',
                    color: 'success',
                    show: true
                  }
           
            this.refreshList();
            
          })
          .catch((e) => {
            this.snackbar = {
                      message: e,
                      color: 'error',
                      show: true
                    }
          });
          this.$router.go();
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
        vaccine: office.vaccine.name,
        waiting:office.waitingList,
        isWaitingList:office.isWaitingList,
        isAppointed: office.isAppointed,
        rapelEligible:office.rapelEligible
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
