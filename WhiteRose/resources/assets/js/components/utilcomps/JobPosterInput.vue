
<template>
    <div  class="fform_input_job">
    

    <input  
    ref = "input_job_post"
    :placeholder="prop.label"
    :class="{'has-error':errHandler}"
    :type="prop.type" 
    :id="prop.id" 
    v-model="prop.value" 
    required="true"
    v-validate="vval"
    :max="prop.maxlen_input"
    :name="prop.id"/>
    
    <span v-if="errors.has(prop.id)" class="incorrect_input">
        {{id_upper}} required!
    </span>
    
    </div>

</template>

<script>
import eventBus from "../../utils/eventBus";

export default {
  props: {
    prop: {
      type: Object,
      twoWay: true
    }
  },
  computed: {
    errHandler() {
      return this.errors.has(this.prop.id);
    }
  },
  created() {
    if (this.prop.id === "scan") {
      this.vval = {};
    }
  },
  mounted() {
    /**
     * This code adds logic to disable input of
     * `E` and `-` into price input.
     */
    if (this.prop.disableEsAndMinus) {
      this.$refs.input_job_post.addEventListener(
        "keydown",
        this.disableEsAndMinus
      );
    }

    eventBus.$on("validateAllFields", () => {
      this.$validator.validateAll().then(res => {
        eventBus.$emit("field_ok", res);
      });
    });
  },
  data() {
    return {
      vval: { required: true },
      id_upper: _.capitalize(this.prop.id)
    };
  }
};
</script>


<style scoped>
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
</style>
