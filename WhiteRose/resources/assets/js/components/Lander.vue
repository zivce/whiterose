<template>
  <div id="lander_main" 
  style="display:flex;flex-direction:row;">
    <!-- <h1>
        Follow the white rabbit.
    </h1> -->

    <!-- <main id="inner_buttons"> -->
      <router-link :to="{name:'land_hacker'}">
        <div class="left_half">

          <h1 class="h1s_lander">
            Pentester  
          </h1>

          <p>
            Log in to find jobs and other clients
          </p>

        </div>
      </router-link>
      
      <router-link :to="{name: 'land_client'}">
        <div class="right_half">
          
          <h1 class="h1s_lander">
            User  
          </h1>

          <p>
            Log in to get your site tested and find other pentesters.
          </p>

        </div>
        
      </router-link>

 
    <!-- </main> -->

    
  </div>
</template>


<script>
export default {
  mounted() {
    setTimeout(() => {}, 1000);
  },
  methods: {
    goToHacker() {
      this.$router.push({ name: "land_hacker" });
    }
  },
  data() {
    return {
      isVisibleMatrix: true,

      visible: true
    };
  }
};
</script>


<style scoped>
a {
  text-decoration: none;
}
p {
  color : white;
}
.left_half:hover {
  background-color: rgba(209, 3, 46, 0.609);
  text-decoration: none;
}

.left_half
{
  text-align: center;
  background-color: rgba(209, 3, 46, 0.452);
  width: 50vw;
  height: 100%;
}
.right_half:hover {
  background-color: rgba(6, 26, 64, 0.931);
  text-decoration: none;
}
.right_half
{
  text-align: center;
  background-color: rgba(6, 26, 64, 0.685);
  width: 50vw;
  height: 100%;
}

#hck {
  margin-left: 25%;
}
h1 {
  color: white;
}

#inner_buttons {
  vertical-align: middle;
  height: 7%;
  width: fit-content;
  position: relative;
  margin: auto;
  margin-top: 20px;
}

#lander_main {
  background-image: url("/img/morph.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  position: relative;
  background-color: transparent;
  width: 100vw;
  height: 100vh;
}
</style>
