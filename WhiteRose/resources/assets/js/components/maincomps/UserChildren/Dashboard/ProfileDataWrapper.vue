<template>
    <div class="profile_data_wrapper" >
        
        <div 
        @click="navigate()"
        
        class="data_icon">
            <slot
            
            name="data_icon">
            </slot>
        </div>

        <div class="flexed_column">
            <slot
            name="header_desc"
            >
            </slot>

            <div                
            class="quant_style">
                <slot
                name="quantity"
                >
                </slot>  
            </div>
        
        </div>
    

    </div>
</template>

<script>
export default {
  props: {
    goToRoute: {
      type: String,
      required: true
    }
  },
  methods: {
    navigate() {
      this.$router.push({ name: this.goToRoute });
    }
  },
  data() {
    return {};
  }
};
</script>


<style scoped>
.flexed_row {
  display: flex;
  flex-direction: row;
}

.flexed_column p {
  margin-bottom: 0 !important;
}

.flexed_column {
  margin-left: 5%;
  display: flex;
  flex-direction: column;
}
.quant_style {
  font-weight: bold;
}
.data_icon >>> svg {
  display: block;
  margin: 0 auto;
}
.data_icon {
  cursor: pointer;
  cursor: hand;
  text-align: center;
  display: flex;
  align-items: center;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background-color: rgb(44, 51, 64);
  color: white;
}

.profile_data_wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
}
</style>
