
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
import eventBus from "../../utils/eventBus";
import eventBus1 from '../../utils/eventBus1';

export default {
  mounted() {
    // console.log(this.$validator)   ;
    // eventBus.$on("validateAllFields", () => {
    //   console.log(this.$validator);
    //   this.$validator.validateAll().then(res => {
    //     eventBus.$emit("field_ok", res);
    //   });
    // });
  },
  props: {
    prop: {
      type: Object,
      twoWay: true
    }
  },
  computed: {
    errHandler() {
      
      let emitInfo = 
      {        
        id: this.prop.id,
        field_ok: !this.errors.has(this.prop.id)
      }

      console.log(emitInfo);
      console.log(this.prop);
      
      if(this.prop.login_c)
        eventBus1.$emit("field_ok",emitInfo);

      // eventBus.$emit("field_ok", emitInfo);

      return this.errors.has(this.prop.id);
    }
  },
  created() {
    //adds specific validation
    if (this.prop.id === "email") this.vval["email"] = true;

    //UNCOMMENT AFTER DEV
    // if(this.prop.id === "password")
    //   this.vval["regex"] = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
  },
  mounted() {
  },
  data() {
    return {
      vval: { required: true },
      id_upper: _.capitalize(this.prop.label)
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
