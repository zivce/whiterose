<template>
<v-bar id="message_wrapper" wrapper="message_wrapper">
  <div class="d-flex flex-column justify-content-center">
    <div class="message_container col-8" 
    @click="openConversation(msg.job_id)" 
    style="cursor:pointer;"
    v-for="(msg,index) in messages" 
    :key="index">
    
        <h3 class="message_h3">{{msg.pentester}}</h3>
        <transition name="message-pop">
            <div v-if="!longMsg(index)">
                <p class="message_p">{{pretty_print(msg.message)}}</p>
                <!-- <p class="expand message_p"  @click="expand(index)"><strong>...</strong></p> -->
            </div>
        </transition>

        <transition name="message-pop">

        <div v-if="longMsg(index)">
            
            <p  class="message_p">{{msg.message}}</p>
            <div >
                <b-button   
                class="btn btn-success btn-secondary"  
                 @click="openConversation(msg.job_id)" >
                Reply <icon name="envelope"></icon>
                </b-button>
            
                <b-button class="btn btn-danger btn-secondary" @click="not_expand(index)">
                    Close <icon name="window-close"></icon>
                </b-button>
            </div>
            
        </div>

        </transition>
    
    </div>

  </div>
</v-bar>

</template>

<script>
//TODO: da se napune poruke

import MessagesApi from "../../../../services/api/user_api/messagesClient.api";
import messages from "./messages.hardcode";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/window-close";

import "vue-awesome/icons/envelope";

export default {
  created() {
    // this.messages = MessagesApi.getMessages();
    this.user_id = this.$store.getters.returnId;

    this.conv_url = `/user/${this.user_id}/dashboard/convo/`;

    this.messages = this.messages.map(elem => {
      return {
        ...elem,
        visible_long_msg: false
      };
    });
  },
  components: {
    Icon
  },
  methods: {
    openConversation(job_id)
    {
      this.$router.push({name:'convo_client',params: { job_id: job_id }})

    },
    longMsg(index) {
      let obj = this.messages[index];
      return obj.visible_long_msg;
    },
    pretty_print(msg) {
      return msg.slice(0, 100);
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
      user_id : '',
      conv_url : '',
      messages: messages
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
