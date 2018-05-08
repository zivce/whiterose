<template>

  <div id="home_vue" >  

    <section id="users" class="row">
      
      <h1 class="col-md-8">Users.</h1>

      <article class="col-md-4 right_col">
        <h2>Benefits</h2>
        <p>Find best pentesters to fix your sites.</p>
        <p>Find out vulnerabilities on your sites.</p>
        <p>Make connections with best pentesters.</p>
      </article>
    </section>

    <section id="pentesters" class="row">
      <h1 class=" col-md-8">Pentesters.</h1>
      <article class="col-md-4  right_col">
        <h2>Benefits</h2>
        <p>Earn money for completing scans.</p>
        <p>Get verified to get more benefits.</p>
        <p>Become moderator of WhiteRose site.</p>
      </article>
    </section>

  </div>

</template>

<script>
export default {
  mounted() {},
  computed: {},
  data() {
    return {
      home: true
    };
  }
};
</script>

<style scoped>
#pentesters {
  height: 50vh;
}

#users {
  height: 50vh;
}

h1{
  text-align: center;
  padding: 10%;
}
.right_col
{
  padding:5%;
  background-color: #060b4e;
  color: white;
}
#footer {
  bottom: 0;
}

#main_vue {
  min-height: 100vh;
}
</style>
