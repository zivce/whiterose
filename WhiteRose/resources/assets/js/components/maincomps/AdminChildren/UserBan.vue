<template>
  <div class="comp_container">    
    <!-- <transition-group name="flip" mode="out-in"> -->
      <v-client-table
      v-if="!isVisibleModal || !isVisibleModal"
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
      v-if="!isVisibleModal || !isVisibleModal"
      :data='all_users[1]'
      :columns='columns'
      :options='options'     
      >
    
    <a  slot="ban" 
        slot-scope="props"
        class="cursorable"
        @click="showModal(props)"
        >
        <icon 
        
        class="ban_ico" name="ban"></icon>
      </a>

      
      </v-client-table >
      
      <v-client-table
      v-if="!isVisibleModal || !isVisibleModal"
      :data='banned_users'
      :columns='columns1'
      :options='options'     
      >
    
    <a  slot="unban" 
        slot-scope="props"
        class="cursorable"
        @click="showModalUnban(props)"
        >
        <icon 
        
        class="ban_ico" name="ban"></icon>
      </a>

      
      </v-client-table >
      <!-- ban -->
    
      <div
      class="center_it"
      v-if="isVisibleModal">
        
        <h3 class="h3s">Are you sure you want to ban user 
          <strong> 
            {{ for_ban_details.username }} 
          </strong> ? </h3>

        <div class="btns_ban_user">
          <b-button class="btn btn-success actionbtn" @click="banUser()">
            Yes<icon 
            style="
            vertical-align:middle;
            margin-left: 5px;"
            name="ban"></icon>

          </b-button>
          <b-button class="btn btn-danger removebtn" @click="closeModal()">No 
            <icon 
            style="vertical-align:middle;"
            name="window-close">
            </icon></b-button>
        </div>

      </div>

      <!-- unban -->

      <div
      class="center_it"
      v-if="isVisibleModalUnban">
        
        <h3 class="h3s">Are you sure you want to unban user 
          <strong> 
            {{ for_ban_details.username }} 
          </strong> ? </h3>

        <div class="btns_ban_user">
          <b-button class="btn btn-success" @click="unbanUser()">
            Yes<icon 
            style="
            vertical-align:middle;
            margin-left: 5px;"
            name="ban"></icon>

          </b-button>
          <b-button class="btn btn-danger" @click="closeModal()">No 
            <icon 
            style="vertical-align:middle;"
            name="window-close">
            </icon></b-button>
        </div>

      </div>


    <!-- </transition-group> -->

  </div>
</template>

<script>
import BanUserAPI from "../../../services/api/admin_api/UserBan.api";
import Icon from "vue-awesome/components/Icon";

import "vue-awesome/icons/ban";
import "vue-awesome/icons/window-close";



export default {
  created() {

    BanUserAPI.getAllUsers().then(users => {
      // (users.data[0]);
      // (users.data[1]);
      this.all_users = users.data;

      this.banned_clients = this.all_users[0].filter(elem => elem.confirmed===0);
      this.banned_pentesters = this.all_users[1].filter(elem => elem.confirmed===0);
      this.banned_users = this.banned_clients.concat(this.banned_pentesters);

      this.all_users[0] = this.all_users[0].filter(elem => elem.confirmed===1);
      this.all_users[1] = this.all_users[1].filter(elem => elem.confirmed===1);
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
      this.isVisibleModalUnban = false;
    },
    banUser() {
      //TODO : napravi ban
      BanUserAPI.banUser(this.for_ban_details.id,this.for_ban_details.role);

      this.isVisibleModal = false;
      this.notifySuccess("User banned.", "Success!");
    },
    unbanUser() {
      BanUserAPI.unbanUser(this.for_ban_details.id,this.for_ban_details.role);

      this.isVisibleModalUnban = false;
      this.notifySuccess("User unbanned.", "Success!");
    },
    showModal(props) {
      this.for_ban_details = props.row;
      this.isVisibleModal = true;
      this.isVisibleModalUnban = false;      
    },
    showModalUnban(props) {
      this.for_ban_details = props.row;
      this.isVisibleModalUnban = true;
      this.isVisibleModal = false;      
    },
  },
  data() {
    return {
      for_ban_details: null,

      columns: ["username", "role", "ban"],
      columns1: ["username", "role", "unban"],
      isVisibleModal: false,
      isVisibleModalUnban: false,
      // all_users: usersHardcode,
      all_users: [[],[]],
      banned_users:[],
      banned_clients:[],
      banned_pentesters:[],
      options: {
        columnsClasses: {
          role: "cursorable"
        },
        filterable: ['username'],
        filterByColumn: true,
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
.btns_ban_user
{
  margin : auto;
  width: fit-content;
}

.ban_ico {
  color: rgb(234, 0, 0);
}

.center_it {
  width: fit-content;
  margin: 0 auto;
}
</style>
