<template>
<div class="submit-form mt-3 mx-auto">
    <p class="headline">Adauga Beneficiar</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>

        <v-text-field
          v-model="user"
          :rules="[(v) => !!v || 'Current user is required']"
          label="Current user"
          required
        ></v-text-field>

        <v-text-field
          v-model="name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="last_name"
          :rules="[(v) => !!v || 'Last name is required']"
          label="Last Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="cnp"
          :rules="[(v) => !!v || 'CNP name is required']"
          label="CNP"
          required
        ></v-text-field>

        <v-text-field
          v-model="gender"
          :rules="[(v) => !!v || 'Gender is required']"
          label="Gender"
          required
        ></v-text-field>

        <v-text-field
          v-model="age"
          :rules="[(v) => !!v || 'Age is required']"
          label="Age"
          required
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :rules="[(v) => !!v || 'Phone is required']"
          label="Phone"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="[(v) => !!v || 'Email is required']"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="city"
          :rules="[(v) => !!v || 'City is required']"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          v-model="category"
          :rules="[(v) => !!v || 'Category is required']"
          label="Category"
          required
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="savePerson">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Recipient.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newPerson">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RecipientService from "../services/RecipientService";

export default {
  name: "AddRecipient",
  data() {
    return {
      // person: {
        id: null,
        user: null,
        name: "",
        last_name: "",
        cnp: "",
        gender: "",
        age: null,
        phone: "",
        email: "",
        city: null,
        category: null,
      // },
      submitted: false,
    };
  },
  methods: {
    savePerson() {
      var person = {
        user: parseInt(this.user),
        name: this.name,
        // last_name: this.person.last_name,
        // cnp: this.person.cnp,
        // gender: this.person.gender,
        // age: this.person.age,
        // phone: this.person.phone,
        // email: this.person.email,
        // city: this.person.city,
        // category: this.person.category,
      };

      console.log(person);

      RecipientService.postRecipient(person)
        .then((response) => {
          this.person.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPerson() {
      this.submitted = false;
      this.person = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>