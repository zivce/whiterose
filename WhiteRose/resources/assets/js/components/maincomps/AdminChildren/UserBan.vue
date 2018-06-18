<template>
  <div class="comp_container">    
    <!-- <transition-group name="flip" mode="out-in"> -->
      <v-client-table
      v-if="!isVisibleModal"
      :data='all_users[0]'
      :columns='columns'
      :options='options'
      >
    
    <a  slot="ban" 
        slot-scope="props"
        class="cursorable"
        @click="showModal(props)"
        >
        <icon class="ban_ico" name="ban"></icon>
      </a>

      
      </v-client-table >
      
      
      <v-client-table
      v-if="!isVisibleModal"
      :data='all_users[1]'
      :columns='columns'
      :options='options'     
      >
    
    <a  slot="ban" 
        slot-scope="props"
        class="cursorable"
        @click="showModal(props)"
        >
        <icon class="ban_ico" name="ban"></icon>
      </a>

      
      </v-client-table >

    
      <div
      class="center_it"
      v-if="isVisibleModal">
        
        <h3 class="h3s">Ban user?</h3>

        <div class="btns">
          <b-button class="btn btn-danger btn-secondary" @click="banUser()">Yes</b-button>
          <b-button class="btn btn-success btn-secondary" @click="closeModal()">No</b-button>
        </div>

      </div>

    <!-- </transition-group> -->

  </div>
</template>

<script>
import BanUserAPI from "../../../services/api/admin_api/UserBan.api";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/ban";
import usersHardcode from "./users.hardcode";

export default {
  created() {

    BanUserAPI.getAllUsers().then(users => {
      // console.log(users.data[0]);
      // console.log(users.data[1]);
      this.all_users = users.data;
    });
  },
  components: {
    Icon
  },
  mixins: [],
  mounted() {},
  methods: {
    closeModal() {
      this.isVisibleModal = false;
    },
    banUser() {
      //TODO : napravi ban
      BanUserAPI.banUser(this.for_ban_details.id,this.for_ban_details.role);

      this.isVisibleModal = false;
      this.notifySuccess("User banned.", "Success!");
    },
    showModal(props) {
      this.for_ban_details = props.row;
      this.isVisibleModal = true;
    }
  },
  data() {
    return {
      for_ban_details: null,

      columns: ["username", "role", "ban"],
      isVisibleModal: false,
      // all_users: usersHardcode,
      all_users: [[],[]],
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
      }
    };
  }
};
</script>

<style scoped>
.ban_ico {
  color: rgb(234, 0, 0);
}

.center_it {
  width: fit-content;
  margin: 0 auto;
}
</style>
