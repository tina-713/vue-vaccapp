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
              <p align="center" style="font-size:20px; font-weight:bold;"><br>Număr Cumulativ de Cazuri în România</p>
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
            >
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
            <v-card
    class="mx-auto">
    <v-toolbar color="blue-grey darken-1" dark>
      <v-toolbar-title>Întrebări frecvente</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
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
      items: [
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'O adresă de email poate fi asociată unui singur cont. Nu pot exista mai multe conturi cu aceeași adresă de email.' }],
          title: 'De ce primesc eroarea "Există un cont validat pentru această adresă de email."?',
        },
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'Adresa de email introdusă este asociată profilului unei alte persoane. Nu pot exista mai mulți utilizatori cu aceeași adresă de email.' }],
          title: 'De ce primesc eroarea "Există o persoană cu aceeași adresă de email."?',
        },
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'De ce primesc eroarea "Există o persoană adăugată."?' }],
          title: 'Există deja un cont creat pentru persoana actuală. Se poate crea un singur cont asociat unui CNP valid și unei adrese de email valide.',
        },
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'De ce primesc eroarea "Persoană inexistentă."?' }],
          title: 'Contul curent nu are o persoană asociată. Completați corect datele din Profilul meu.',
        },
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'De ce primesc eroarea "Adresă email invalidă."?' }],
          title: 'Nu a fost completat câmpul E-mail sau nu are un format corect.',
        },
        {
          action: 'mdi-help-circle-outline',
          items: [{ title: 'Formatul adresei de email nu este corect. Acesta trebuie să fie de tipul text@text.text .' }],
          title: 'De ce primesc eroarea "Formatul adresei de email este invalid."?',
        },
      ],
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
</style>
