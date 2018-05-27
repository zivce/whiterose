<template>
  <div id="lander_main" class="row">
    <main id="inner_buttons">
      <h1>
        Follow the white rabbit.
      </h1>
      
      <router-link :to="{name:'land_hacker'}">
      
        <b-button size="lg"  variant="outline-danger" id="hck">
          Hacker?
        </b-button>
      
      </router-link>
 
      <router-link :to="{name: 'land_client'}">

        <b-button size="lg" variant="outline-primary" id="usr">
          User?
        </b-button>

      </router-link>
    </main>

    
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
