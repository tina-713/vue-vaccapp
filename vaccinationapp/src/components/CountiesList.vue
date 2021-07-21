<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Counties List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(county, index) in counties"
          :key="index"
          @click="setActivecounty(county, index)"
        >
          {{ county.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllCounties">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentCounty">
        <h4>county</h4>
        <div>
          <label><strong>Id:</strong></label> {{ currentCounty.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentCounty.name }}
        </div>

        <a class="badge badge-warning"
          :href="'/counties/' + currentCounty.id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a county...</p>
      </div>
    </div>
  </div>
</template>

<script>
import CountyDataService from "../services/CountyDataService";

export default {
  name: "counties-list",
  data() {
    return {
      counties: [],
      currentCounty: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveCounties() {
      CountyDataService.getAll()
        .then(response => {
          this.counties = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveCounties();
      this.currentCounty = null;
      this.currentIndex = -1;
    },

    setActiveCounty(county, index) {
      this.currentCounty = county;
      this.currentIndex = index;
    },

    removeAllCounties() {
      CountyDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      CountyDataService.findByName(this.name)
        .then(response => {
          this.counties = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveCounties();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>