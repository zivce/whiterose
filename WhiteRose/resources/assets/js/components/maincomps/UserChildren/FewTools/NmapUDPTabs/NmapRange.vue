  
<template>
   <div id="contList">

        <p>List of ports:</p>
        <input type="text" 
        ref="listOfPorts" 
        @keyup="checkIfPortOk()" 
        placeholder="20,80,443" 
        :value="value"
        v-on:input="updateVal($event.target.value)"
        :class="{'has-error':errPort}"
        name="list"
        v-validate="{rules:{
            required:true
        }}">

        <span v-if="errPort" class="incorrect_input">
            Insert numbers between 0 and 65535!
        </span>

    </div>
</template>

<script>
import eventBus from '../../../../../utils/eventBus';
export default {
    props:{
        value:{
            type:String
        },
        portOk : {
            type:Boolean,
            twoWay:true
        }
    },
  computed: {
    errHandler(){
        return this.errors.has("list");
    },
    errPort() {
      return !this.port_ok_local;
    }},
  methods:{
      updateVal(val)
      {
        this.$emit('input',val);
      },
      checkIfPortOk($event) {
      
      let helperBool = true;
      let arrSplit = this.value.split(",");

      if (arrSplit.length === 0) {
        this.port_ok_local = false;
        return;
      }

      arrSplit.forEach((port, index) => {
        let num = new Number(port);

        if (isNaN(num)) {
          helperBool = false;
          return;
        }

        //last elem is ""
        if (index === arrSplit.length - 1) return;

        if (num >= 65535 || num <= 0) helperBool = false;
      });

      this.port_ok_local = helperBool;
      
      eventBus.$emit("portOk",this.port_ok_local);

    },
  },
  data() {
    return {
        port_ok_local: this.portOk
    };
  }
};
</script>

<style scoped>


.has-error {
  box-shadow: 0 0 5px rgb(255, 0, 0);
  border: 1px solid rgba(255, 0, 0, 1);
}

</style>
