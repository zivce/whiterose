
<template>
    <div  class="fform_input">
    
    <label :for="prop.id">{{prop.label}}</label>

    <input  
    :placeholder="prop.label"
    :class="{'has-error':errHandler}"
    :type="prop.type" 
    :id="prop.id" 
    v-model="prop.value" 
    :required="prop.validation.required"
    v-validate="vval"
    :name="prop.id"/>
    
    <span v-if="errors.has(prop.id)" class="incorrect_input">
        {{id_upper}} required!
    </span>
    
    </div>

</template>

<script>
export default {
  props: {
    prop: {
      type: Object,
      twoWay: true
    }
  },
  computed: {
    errHandler() {
        return this.errors.has(this.prop.id)
    }
  },
  created(){
    //adds specific validation
    if(this.prop.id === "email")
      this.vval["email"] = true;
    
    
    //UNCOMMENT AFTER DEV
    // if(this.prop.id === "password")
    //   this.vval["regex"] = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    
    },
  mounted(){
    
  },
  data() {
    return {
      vval:{required:true},
      id_upper : _.capitalize(this.prop.id)
    };
  }
};
</script>


<style scoped>
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}

.incorrect_input {
  float: left;
  width: 100%;
  color: red;
  font-size: 10px;
  font-weight: 700;
}
</style>
