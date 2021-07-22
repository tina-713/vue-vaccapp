<template>
  <div v-if="currentCounty" class="edit-form">
    <h4>County</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentCounty.name"
        />
      </div>
    </form>

    <button @click="deleteCounty">
      Delete
    </button>

    <button type="submit" @click="updateCounty">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a county...</p>
  </div>
</template>

<script>
import CountyDataService from "../services/CountyDataService";

export default {
  name: "county",
  data() {
    return {
      currentCounty: null,
      message: ''
    };
  },
  methods: {
    getCounty(id) {
      CountyDataService.get(id)
        .then(response => {
          this.currentCounty = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCounty() {
      CountyDataService.update(this.currentCounty.id, this.currentCounty)
        .then(response => {
          console.log(response.data);
          this.message = 'The county was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCounty() {
      CountyDataService.delete(this.currentCounty.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "couties" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCounty(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>