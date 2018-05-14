<template>
  <div>
    
    <transition name="flip" mode="out-in">
      
      <v-client-table
      v-if="!isVisibleModal"
      :data='all_users'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="ban" 
        slot-scope="props"
        class="cursorable"
        @click="showModal(props)"
        >
        <icon id="ban_ico" name="ban"></icon>
      </a>

      
      </v-client-table >
    
    </transition>
    <transition name="flip" mode="out-in">
    
      <div
      v-if="isVisibleModal">
        
        <h1>Ban user?</h1>
        <div class="btns">
          <b-button @click="banUser(props)">Yes</b-button>
          <b-button @click="closeModal()">No</b-button>
        </div>

      </div>

    </transition>

  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/ban";
import usersHardcode from './users.hardcode';

export default {
  components:{
    Icon
  },
  mixins: [],
  mounted() {
  },
  methods : {
    closeModal(){
      this.isVisibleModal = false;
    }
    ,
    banUser(props)
    {
      console.log(props);

    },
    showModal(){
      this.isVisibleModal = true;
    }
  },
  data() {
    return {
      columns: ["user name", "role", "ban"],
      isVisibleModal : false,
      all_users : usersHardcode,
      options: {
        columnsClasses: {
          role: "cursorable"
        },
        filterByColumn: true,
        filterable: ["role"],
        pagination: {
          dropdown: true,
          nav: "scroll"
        }
      },
    };
  }
};
</script>

<style scoped>
</style>
