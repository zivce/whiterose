<template>
  <div id="jobs_more_info" class="comp_container">
      
    <b-button  class="btn btn-danger btn-secondary" id="close_btn" @click="disableMoreInfo()">
      <icon
      name ="window-close">
      </icon>  
    </b-button>
    
    <h2 class="h2s">Started at:</h2>
    <p>{{date_start}}</p>
    
    <h2 class="h2s">Message:</h2>
    <p>{{det.description}}</p>

  </div>

</template>

<script>
import eventBus from "../../../../utils/eventBus";

import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/window-close";
import "vue-awesome/icons/check";

export default {
  components: {
    Icon
  },
  props: {
    det: {
      type: Object,
      twoWay: true
    }
  },
  computed: {},
  methods: {
    disableMoreInfo() {
      eventBus.$emit("isVisibleStartedInfo", false);
    }
  },
  mounted() {
    (this.date_start);
  },
  data() {
    return {
      date_start: moment(this.det.date).format("DD.MM.YYYY")
    };
  }
};
</script>

<style scoped>
#ico {
  vertical-align: middle;
}
#close_btn >>> svg {
  vertical-align: middle;
}

#close_btn {
  float: right;
}
#pentester_bid {
}
</style>
