<template>
  <div id="lander_main" class="row">
    <main id="inner_buttons">
      <h1>
        Follow the white rabbit.
      </h1>
      <b-button size="lg" href="/hacker" variant="outline-danger" id="hck">
        Hacker?
      </b-button>


      <b-button size="lg" variant="outline-primary" href="/user" id="usr">
        User?
      </b-button>

    </main>

    
  </div>
</template>


<script>
import logger from "../utils/groupLogger";

export default {
  mounted() {
    logger(["Component Lander mounted", "Happy Hacking"], "Lander.vue");
  },
  data() {
    return {
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
