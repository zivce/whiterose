<template>
   <div>
        
        <div id="firstPart">
            <p>Start port</p>
            <input type="number" placeholder="1" min="1" :max="minimum" v-model.number="loc_min" @input="updateMin()">
        </div>
        <div id="secondPart" >
            <p>End port</p>
            <input type="number" placeholder="1024" :min="loc_min" :max="maximum" v-model.number="loc_max" @input="updateMax()">
        </div>
    </div>
</template>

<script>
import eventBus from '../../../../../utils/eventBus';

export default {
  props: {
    max: {
      type: Number,
      twoWay: true
    },
    min: {
      type: Number,
      twoWay: true
    }
  },
  computed: {
    maximum() {
      if (this.loc_max >= 65535) this.loc_max= 65535;
    },
    minimum() {
      if (this.loc_min > 65534) this.loc_min = 65534;
    }
  },
  methods:{
    updateMin()
    {
      eventBus.$emit("minPort",this.loc_min);
    },
    updateMax()
    {
      eventBus.$emit("maxPort",this.loc_max);
    }
  },
  data() {
    return {
      loc_min : this.min,
      loc_max : this.max

    };
  }
};
</script>

<style scoped>
</style>
