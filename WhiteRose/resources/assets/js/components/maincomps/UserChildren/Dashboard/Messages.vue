<template>
<div v-cloak>
  <h2 class="h2s">Inbox ( {{messages.length}} )</h2>

  <v-bar id="message_wrapper" wrapper="message_wrapper">
    <div class="d-flex flex-column justify-content-center">
      
      <div class="message_container col-8" 
      @click="openConversation(msg.job_id, fixPublic(msg.avatar))" 
      style="cursor:pointer;"
      v-for="(msg,index) in messages" 
      :key="index">
          <div style="
            display:flex;
            flex-direction:row;">

            <img 
            :src="fixPublic(msg.avatar)"
            width="50"
            height="50"
            style="
            border-radius:50%;"/>

            <h3 class="message_h3" 
            style="margin-top: auto;">{{msg.pentester_name}}</h3>    

          </div>
          <transition name="message-pop">
              <div v-if="!longMsg(index)">
                  <p class="message_p">{{pretty_print(msg.message.text,msg.message.first)}}</p>
                  <!-- <p class="expand message_p"  @click="expand(index)"><strong>...</strong></p> -->
              </div>
          </transition>

        
      
      </div>

    </div>
  </v-bar>
</div>
</template>

<script>
//TODO: da se napune poruke

import MessagesApi from "../../../../services/api/user_api/messagesClient.api";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/window-close";

import "vue-awesome/icons/envelope";

export default {
  created() {
    MessagesApi.getMessages().then(resp => (this.messages = resp));

    this.user_id = this.$store.getters.returnId;

    this.conv_url = `/user/${this.user_id}/dashboard/convo/`;

    // this.messages = this.messages.map(elem => {
    //   return {
    //     ...elem,
    //     visible_long_msg: false
    //   };
    // });
  },
  components: {
    Icon
  },
  methods: {
    fixPublic(img_path) {
      if (img_path) return img_path.replace("public\\", "");
      else return "";
    },
    openConversation(job_id, avatar) {
      this.$store.commit("setAvatarConvoPath", avatar);
      this.$router.push({ name: "convo_client", params: { job_id: job_id } });
    },
    longMsg(index) {
      let obj = this.messages[index];
      return obj.visible_long_msg;
    },
    pretty_print(msg, first) {
      var array = JSON.parse("[" + msg + "]");

      if (first === 1) {
        //MRTIVJOSONPARSE
        let str = array[0];
        str = str[0];
        const ind = str.indexOf("job");
        let first_message = str.slice(0, ind + 3);
        return first_message;
      } else return array.slice(0, 100) + "...";
    },
    expand(index) {
      // let index = _.findIndex(this.messages, { id: msg_id });
      // index++;
      this.messages[index].visible_long_msg = true;
    },
    not_expand(index) {
      // let index = _.findIndex(this.messages, { id: msg_id });
      // index++;
      this.messages[index].visible_long_msg = false;
    }
  },
  data() {
    return {
      user_id: "",
      conv_url: "",
      messages: []
    };
  }
};
</script>

<style lang="scss" scoped>
$color: rgb(86, 142, 163);
.fa-icon {
  vertical-align: middle;
}
.message_wrapper {
  height: 73vh;
  margin-top: 3%;
}

// }
// .message_container {
//      margin-top: 2%;
//     background-color: #568ea3;
//     margin-bottom: -1.9%;
//     text-align: center;
//     margin-left: auto;
//     margin-right: auto;
//     height: 1%;
//     padding: 1%;
// }
.message-pop-enter,
.menu-popover-leave-to {
  opacity: 0;
  transform: rotateY(50deg);
}
.message-pop-enter-to {
  opacity: 1;
  transform: rotateY(0deg);
}

.message-pop-enter-active {
  transition: opacity, transform 200ms ease-out;
}
.expand {
  cursor: pointer;
}
</style>
