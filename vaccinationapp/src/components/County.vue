<template>
  <div v-if="currentCounty" class="edit-form">
    <h4>county</h4>
    <form>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentCounty.name"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCounty.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentCounty.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteCounty"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCounty"
    >
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

    updatePublished(status) {
      var data = {
        id: this.currentCounty.id,
        name: this.currentCounty.name,
        description: this.currentCounty.description,
        published: status
      };

      CountyDataService.update(this.currentCounty.id, data)
        .then(response => {
          this.currentCounty.published = status;
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
          this.$router.push({ name: "counties" });
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