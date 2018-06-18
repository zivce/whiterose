<template>
  

    <div  id="info">
    
      <h2 class="h2s">
        
        {{title}}

      </h2>
      
      <p>
        {{textinside}}
      </p>
    
    </div>
    

</template>

<script>
export default {
  props: {
    textinside: {
      type: String
    },
    title: {
      type: String
    }
  },
  data() {
    return {
      hello: "hello"
    };
  }
};
</script>

<style scoped>
@media (max-width: 600px) {
  #info {
    width: 60% !important;
  }
}

#info {
  z-index: 2000;
  color: white;
  position: absolute;
  width: 30%;
  left: 5%;
  background: rgb(44, 51, 64);
  margin: 8px;
  padding: 3%;
  box-shadow: rgba(0, 6, 16, 0.31) 3px 3px 7px 2px;
}
</style>
