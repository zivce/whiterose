<template>
<div id="profile_container_pentester" class="comp_container">
    
    <h2 class="h2_profile">Profile</h2>
    
    <div style="margin: 27px auto;">
        <a href="https://placeholder.com">
        <img src="http://i.pravatar.cc/200?img=3">
    </a>
    
    </div>
    
    <span class="span_container">
        
        <h3 class="h3s"> Name </h3> 
        <p>{{info.name}}</p>
        
    </span>

    <span class="span_container">
        <h3 class="h3s">Username</h3>
        <p>{{info.username}}</p>
    </span>
    
    <span class="span_container">
        <h3 class="h3s">Rating </h3>
        <p>{{info.rating}}</p>
    </span>

    <h3 class="h3s">Sites</h3>

    <v-bar id="proje_wrapper" wrapper="proje_wrapper">
    <div 
    v-for="site in info.sites" 
    class="proj_container" 
    :key="site.id">
        
        <h3 class="proje_h3">{{site.title}}</h3>
        <p>{{pretty_print(site.added_on)}}</p>

    </div>
    </v-bar>
</div>

</template>

<script>
import AllInfo from "../../../../services/api/pentester_api/AllInfo.api";
import InfoHardcode from "./user.hardcode";

//TODO: napuni info
export default {
  created() {
    // this.info =  AllInfo.getAllInfo();
  },
  methods: {
    pretty_print(date) {
      return moment(date).format("DD.MM.YYYY");
    }
  },
  data() {
    return {
      info: InfoHardcode
    };
  }
};
</script>

<style lang="scss" scoped>
$bg-project-color: #568ea3;
$h2-size: 1.5rem;
$h2-weight: bold;

.h2_profile {
  font-weight: $h2-weight;
  font-size: $h2-size;
}
.dates {
  color: white;
  display: flex;
  flex-direction: row;
  width: 50%;
  margin: 0 auto;
}
.dates p {
  flex: 0.7;
}
#profile_container_pentester {
  color: white;
  background: #49496b;
  margin-top: 2%;
  width: 100%;
  text-align: center;
}
.span_container {
  width: 47.5%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  vertical-align: top;
  margin-bottom: 2%;
}
.span_container > h3 {
  margin: 0;
  flex: 1.1;
  padding: 1%;
}
.span_container > p {
  margin: 0;
  flex: 1.2;
  vertical-align: middle;
}
.proje_t {
  font-size: large;
  color: azure;
}
.proje_h3 {
  color: white;
}
.proje_wrapper {
  height: 30vh;
  width: 100%;
  margin: 0 auto;
}
.proj_container {
  margin-top: 2%;
  background-color: $bg-project-color;
  margin-bottom: 20px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  box-shadow: rgba(0, 6, 16, 0.31) 3px 3px 7px 2px;
  padding: 5%;
}
</style>
