<template>
  <div class="container-fluid">
      <div class ="row">
      <div class="col-sm">
        <p align="center" style="font-size:20px; font-weight:bold">Cazuri Zilnice în România</p>
        <iframe src="https://ourworldindata.org/explorers/coronavirus-data-explorer?zoomToSelection=true&time=2020-03-01..latest&facet=none&pickerSort=desc&pickerMetric=total_cases&hideControls=true&Metric=Confirmed+cases&Interval=7-day+rolling+average&Relative+to+Population=false&Align+outbreaks=false&country=~ROU" loading="lazy" style="width: 100%; height: 600px; border: 20px none;"></iframe>
      </div>
      <div class="col-sm">
        <p align="center" style="font-size:20px; font-weight:bold">Numar Cumulativ de Cazuri în România</p>
       <iframe scrolling="no" src="https://datelazi.ro/embed/doze-pe-zi" width="100%" height="600"></iframe>
      </div>
     </div> 
  </div>
</template>

<script>

export default{
  data(){
    return {
      user :""
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
  margin-top: 70px;
}
</style>
