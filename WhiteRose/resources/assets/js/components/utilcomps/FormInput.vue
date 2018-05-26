
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

export default {
  mounted() {
    //console.log(this.$validator)   ;
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
      let emitInfo = {
        id: this.prop.id,
        field_ok: !this.errors.has(this.prop.id)
      };

      // if(this.prop.login_c)
      //   eventBus1.$emit("field_ok",emitInfo);

      // if(this.prop.reg_c)
      //   eventBusRegC.$emit("field_ok", emitInfo);

      // debugger;

      if (this.prop.value === "") this.prop.ok = false;
      else this.prop.ok = emitInfo.field_ok;

      return this.errors.has(this.prop.id);
    }
  },
  created() {
    //adds specific validation
    if (this.prop.id === "email") this.vval["email"] = true;

    //UNCOMMENT AFTER DEV
     if(this.prop.id === "password")
     {
       this.regex_set = true;
       this.vval["regex"] = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/       
     }
  },
  mounted() {},
  data() {
    return {
      regex_set : false,
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
