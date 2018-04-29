<template>
    <div id="main">
        <h1>
            Welcome to the white side.
        </h1>
        
        <router-view></router-view>
    </div>
</template>


<script>

export default {
 
  mounted() {

  },
  destroyed() {
  },
  data() {
    return {
    };
  }
};
</script>


<style scoped>

/* da se pomeri na dole kad predje na sledecu komponentu  */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
