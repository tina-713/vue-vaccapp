<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="county.name"
          name="name"
        />
      </div>

      <button @click="saveCounty" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCounty">Add</button>
    </div>
  </div>
</template>

<script>
import CountyDataService from "../services/CountyDataService";

export default {
  name: "add-county",
  data() {
    return {
      county: {
        id: null,
        name: ""
      },
      submitted: false
    };
  },
  methods: {
    saveCounty() {
      var data = {
        name: this.county.name
      };

      CountyDataService.create(data)
        .then(response => {
          this.county.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCounty() {
      this.submitted = false;
      this.county = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>