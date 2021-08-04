<template>
<div>{{this.data.user.data.access}}</div>
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
