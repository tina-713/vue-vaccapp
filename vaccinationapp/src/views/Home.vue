<template>
  <v-app id="inspire">

    <v-main class="grey lighten-4">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="73vh"
            >
            <v-card class="grey" dark min-height="73vh">
              <div>
                &nbsp;
                <h4 class="text-center">Despre COVID-19</h4>
                <v-card-title class="justify-center"><v-icon x-large>mdi-information-outline</v-icon></v-card-title>
                <div class="send">
                <p>Apariția infecției cu noul Coronavirus sau Coronavirusul Sindromului Acut Respirator Sever 2 (SARS-CoV-2) a condus la o răspândire rapidă a COVID-19 în întreaga lume. Pe 30 ianuarie 2020, Organizația Mondială a Sănătății (World Health Organization) a declarat COVID-19 o urgență de sănătate publică de interes internațional, iar pe 11 martie 2020, a fost declarată pandemia. Până în noiembrie 2020, au fost raportate peste 56 milioane de cazuri confirmate și peste 1 milion de decese la nivel mondial.</p>
                <br><p>Vrem să facem vaccinarea COVID-19 ușoară și accesibilă tuturor. Vaccinurile anti-COVID-19 sunt gratuite și disponibile pentru oricine dorește. Colaborăm cu parteneri precum departamente de sănătate pentru a furniza informații exacte și actualizate despre serviciile de vaccinare.</p>
                </div>
              </div>
            </v-card>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              color="blue-grey darken-1"
              dark
            >
              <p align="center" style="font-size:20px;"><br>Număr Cumulativ de Cazuri în România</p>
              <iframe scrolling="no" src="https://datelazi.ro/embed/doze-pe-zi" width="100%" height="600"></iframe>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-sheet
              rounded="lg"
              min-height="73vh"
              color="blue-grey darken-1"
              dark
            >
            <iframe scrolling="no" src="https://datelazi.ro/embed/confirmed_cases" width="100%" height="220"></iframe>
            <iframe scrolling="no" src="https://datelazi.ro/embed/dead_cases" width="100%" height="220"></iframe>
            <iframe scrolling="no" src="https://datelazi.ro/embed/vaccine_immunization" width="100%" height="220"></iframe>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            <v-card class="mx-auto">
              <v-toolbar color="blue-grey darken-1" dark><v-icon small>mdi-help-circle-outline</v-icon>&nbsp;
                <v-toolbar-title>Întrebări frecvente</v-toolbar-title>
              </v-toolbar>

                <v-expansion-panels
                v-model="panel"
                 multiple>
                  <v-expansion-panel v-for="item in items" :key="item.title">
                    <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-card flat>
                        <v-card-text class="px-4 py-0 grey--text">
                          <div>{{ item.content }}</div>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>        
                </v-expansion-panels>
            </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default{
  data(){
    return {
      user :"",
      panel: [],
      items: [
        { title: 'Dacă am avut deja COVID-19 și mi-am revenit, mai trebuie să mă vaccinez?', 
          content: 'Da, ar trebui să fiți vaccinat indiferent dacă ați avut deja COVID-19. Cercetările nu au determinat cât timp veți fi imun după recuperare. Se evidențiază faptul că oamenii beneficiază de o protecție mai bună prin vaccinarea completă. Dacă ați fost tratat pentru COVID-19 cu anticorpi monoclonali sau plasmă convalescentă, ar trebui să așteptați 90 de zile înainte de vaccin. Discutați cu medicul dumneavoastră dacă nu sunteți sigur ce tratamente ați primit sau dacă aveți mai multe întrebări despre administrarea vaccinului.'},
        { title: 'Care sunt ingredientele din vaccinurile COVID-19?', 
          content: 'Ingredientele vaccinului variază în funcție de producător. Niciunul dintre vaccinuri nu conține ouă, gelatină, latex sau conservanți. Toate vaccinurile COVID-19 nu conțin metale precum fier, nichel, cobalt, litiu sau aliaje rare. De asemenea, nu conțin produse fabricate, cum ar fi electrozi, nanotuburi de carbon sau semiconductori nanofirici.'},
        { title: 'Trebuie să port mască și să evit contactul cu alții dacă sunt complet vaccinat?', 
          content: 'După ce sunteți complet vaccinat, vă puteți relua activitățile fără a purta mască sau a rămâne la o distanță de 1.5m, cu excepția cazurilor în care: sunteți în interior, într-un spațiu public sau acolo unde este cerut de legile, regulile și reglementările naționale, locale sau teritoriale, inclusiv îndrumarea locală privind afacerile și locul de muncă.'},
        { title: 'Pot alege ce vaccin COVID-19 primesc?', 
          content: 'Da. Toate vaccinurile COVID-19 autorizate și recomandate în prezent sunt sigure și eficiente. Cel mai important pas este de a obține o programare  cât mai curând posibil. '},
        { title: 'Pot să îmi aleg centrul în care mă vaccinez?', 
          content: 'Conform strategiei pentru vaccinarea împotriva COVID-19 în țară noastră, odată cu realizarea programării în platforma de vaccinare, se alege și centrul de vaccinare dorit. Persoanele pot opta, indiferent de adresa din cartea de identitate, pentru centrul de vaccinare cel mai apropiat de domiciliu sau de locul de muncă.'},
        { title: 'Vaccinul este gratuit pentru toți?', 
          content: 'Da. Vaccinurile anti-COVID-19 sunt oferite gratuit populației care dorește să se vaccineze, conform strategiei pentru vaccinarea împotriva COVID-19 din țară noastră.'},
        { title: 'Care e protecția oferită de vaccin și cât va dura imunitatea dobândită prin vaccinare?', 
          content: 'Atât Pfizer, cât și Modernă raportează că vaccinurile lor oferă o eficacitate de aproximativ 95% în prevenirea simptomelor ușoare și severe ale infecției COVID-19. Acest nivel de eficacitate pare să se aplice la toate grupele de vârstă și ambele sexe, după cum s-a raportat în studiul clinic desfășurat de Pfizer, care include 43.548 de paticipanti. Datele studiului arată că vaccinarea oferă protecție timpurie începând cu 12 zile de la prima doză, la 7 zile după a doua doză observandu-se o eficacitate de 95%. '},
      ]

  }
  },
  mounted: function(){
    this.setUser(this.user)
    
  },
  methods:{
    setUser: function(user){
     user = JSON.parse(localStorage.getItem('user'));
     console.log(user);
     return user;
     }
  },
  name: 'home'

}

</script>

<style scoped>
.container-fluid{
  margin-top: 20px;
}
.send{
  padding: 5%;
}
.grey{
  background-color: #546E7A !important;
}
</style>
