<template>
    <div class="comp_container" v-cloak> 
        <div 
        style="
        display:flex;
        flex-direction:row;">

          <h2 class="h2s">Conversation with {{whole_convo.pentester}}</h2>

        </div>

        <!-- <span 
        class="del_msg"
        v-b-tooltip.hover.right="'Delete messages'"
        style="cursor:pointer;"
        @click="deleteConvo()">
          <icon
            name="trash-alt">
          </icon>
        </span>
         -->
         
        <!-- <div 
        class = "msg_cont "
        v-for="(disc) in whole_convo.discusion"
        :key = disc.id
        > -->
          <div
          class = "msg_cont "
          v-for="(msg) in whole_convo.discusion.messages"
          :key = msg.id
          >
            <div
            class="client d-flex"
            v-if="msg.clientToPentester === 1"
            >
                <div class="col-2 convo_avatars">
                    <img 
                    v-b-tooltip.hover.top="'You'"
                    :src="my_avatar" 
                    class="client_avatar"
                    alt="">
                </div>

                <div class="col-8">
                    <div class = "msg_cont_header_client flex_header">
                        <p
                        class="msg_container_time"
                        v-b-tooltip.hover.top="toolTipDate(msg.updated_at)"
                        >

                          <strong>
                            {{timeOfMessage(msg.updated_at)}}
                          </strong>
                          
                        </p>           
                    </div>
                    <p
                    v-for="(message,index) in renderMessages(msg.text)"
                    :key = index
                    >
                    {{message}}
                    </p>
                </div>

            </div>

            <div
            class="pentester d-flex"
              v-else
            >
                <div class="col-2 convo_avatars">

                    <img 
                    @click="previewPentester()"
                    v-b-tooltip.hover.top="'Pentester'"
                    :src="not_my_avatar" 
                    class="pentester_avatar"
                    alt=""> 

                </div>
                <div class="col-8">
                    <div class = "msg_cont_header_pent flex_header">
                        <p
                        class="msg_container_time_pentester"
                        v-b-tooltip.hover.top="toolTipDate(msg.updated_at)"
                        ><strong>{{timeOfMessage(msg.updated_at)}}</strong></p>           
                    </div>
                    
                   <p
                    v-for="(message,index) in renderMessages(msg.text, msg.first)"
                    :key = index
                    >
                    <span style="color:#0ca200bd;" v-if="msg.first">
                      {{message}}  
                    </span>
                    
                    <span  style="color:red;" v-else-if="msg.last"> 
                    
                      {{message}}
                    
                    </span>

                    <span
                    v-else
                    >
                    
                      {{message}}
                    
                    </span>

                    </p>
                </div>
            </div>


          <!-- </div> -->
        </div>

        <accept-decline-form 
        v-if="
        whole_convo.finished===1 && 
        whole_convo.completed !==1">
        </accept-decline-form>
        
        <!-- RENDER NEW MESSAGES -->
        
        <div v-if="msgs_for_send.length"
            class="client msg_cont d-flex"
        >
         
         <div class="col-2 convo_avatars">
            <img 
            v-b-tooltip.hover.top="'You'"
            :src="my_avatar" 
            class="client_avatar"
            alt="">
         </div>
         
         <div class="col-8">
                            

            <div class = "msg_cont_header_client">
                
                <p
                class="msg_container_time flex_header"
                v-b-tooltip.hover.top="toolTipDate(client_msg_time)"
                >

                  <strong>
                    {{timeOfMessage(client_msg_time)}}
                  </strong>
                  
                </p>     

            </div>
            
            <!-- <p>
            {{bundleMessages()}}
            </p> -->

            <p
            v-for="msg4 in msgs_for_send"
            :key = msg4.id                  
            >
              {{msg4.message}}
            </p>


         </div>

        </div>



        <div 
          class="cont_input_msg"
          v-if="whole_convo.completed !== 1"
        >
        
            <input 
            name="msg_client" 
            class="msg_input"
            @keyup.enter="bufferMsgForSending()"
            v-model="one_msg"/>
            
            <b-button 
            @click="bufferMsgForSending()" 
            class="btn btn-info btn_send"
            style="border-radius: 0;">
                <icon name= "paper-plane"> </icon>
            </b-button>
        
        </div>

        <!-- IF COMPLETED JOB -->
        <div 
          class="cont_input_msg"
          v-if="whole_convo.completed == 1"
        >
          <h2 class="h2s">
            This job ended.
          </h2>
        
        </div>

    </div>

</template>

<script>
/**API imports */
import DeleteConvoAPI from "../../../../services/api/user_api/DeleteConvo.api";
import ClientConvoAPI from "../../../../services/api/user_api/Convo.api";
import ConvoSendMessagesAPI from "../../../../services/api/user_api/ConvoSendMessages.api";

import AcceptDeclineForm from "./AcceptDeclineForm.vue";

/**Icons */
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/paper-plane";

/**Utils */
import { mapGetters } from "vuex";
import eventBus from "../../../../utils/eventBus";

export default {
  destroyed() {},
  created() {
    //TODO: ovde da se puni komponenta
    //TODO : na osnovu job_id i pentester_id da se povuce convo
    //TODO: job_id se cuva u vuex..
    //ConvoHardcode.getConv(job_id,user_id)..
    //TODO: posalji rating ovde
    this.job_id = this.$store.getters.returnParams;
    ClientConvoAPI.getConversation(this.job_id).then(resp => {
      this.whole_convo = resp;
      (this.whole_convo);

    });
  },
  mounted() {
    eventBus.$on("jobFinished", jobFinished => {
      if (!jobFinished) this.whole_convo.finished = 0;
    });

    eventBus.$on("acceptedJob", jobAccepted => {
      if (jobAccepted) {
        this.accepted_job = true;
        this.notifySuccess("Job accepted.", "Success");
      }
    });

    this.user_name = this.$store.getters.returnUser;
    this.user_name = this.user_name.name;
    this.msg_send_id = 0;
  },
  computed: {
    ...mapGetters({
      my_avatar: "returnAvatar",
      not_my_avatar: "returnAvatarPath"
    })
  },
  components: {
    Icon,
    AcceptDeclineForm
  },

  methods: {
    previewPentester () {
      const pentester_id =
      this.whole_convo.discusion.pentester_id;

      this.$router.push({
        name:  'preview_pentester',
        params : {
          pent_id : pentester_id
        }
      })


    },

    timeOfMessage(time) {
      return moment(time).format("hh:mm");
    },
    toolTipDate(date) {
      return moment(date).format("dddd DD-MM");
    },
    markJobAsCompleted() {
      ClientConvoAPI.markAsCompleted(this.job_id, this);
    },
    deleteConvo() {
      DeleteConvoAPI.deleteConvo(this.whole_convo.discusion.id);
    },
    bundleMessages() {
      let msgs_only = this.msgs_for_send.map(msg => msg.message);

      return msgs_only.join("\n ");
    },
    bufferMsgForSending() {
      if (!this.one_msg.length) return;

      let new_msg = {
        // msg_id: this.msgs_for_send.length - 1,
        id: this.msg_send_id,
        client_to_pentester: 1,
        pentester_to_client: 0,
        sender: this.user_name,
        discusionID: this.whole_convo.discusion.id,
        message: this.one_msg,
        date_time: moment().format("YYYY-MM-DD hh:mm:ss")
      };
      this.client_msg_time = new_msg.date_time;

      this.one_msg = "";
      this.msg_send_id++;

      this.msgs_for_send.push(new_msg);
      // (new_msg);
      ConvoSendMessagesAPI.sendMsg(new_msg);
    },
    renderMessages(msg, first) {
      let array = JSON.parse("[" + msg + "]");
      let message_text = array[0];
      // message_text = message_text[0];

      if (first) {
        message_text = message_text[0];

        const ind = message_text.indexOf("job");
        let first_message = message_text.slice(0, ind + 3);
        ("poruka", first_message);
        return [first_message];
      }

      return message_text;
    }

    //find client that sent msg

    // findSender() {
    //   let sender = this.whole_convo.find(elem => {
    //     if (elem.clientToPentester) return elem;
    //   });
    //   return sender.sender;
    // }
  },
  data() {
    return {
      client_msg_time: moment(),
      rating: 0,
      one_msg: "",
      msgs_for_send: [],
      whole_convo: {
        discusion : {}
      },
      msg_send_id: undefined,
      job_finished: undefined,

      accepted_job: false
    };
  }
};
</script>

<style lang="scss" scoped>
$borderica-pentesterica: rgba(170, 4, 60, 0.878);
$borderica-clientica: #233dbb;

.msg_container_time {
  cursor: pointer;
}
.msg_container_time_pentester {
  cursor: pointer;
}

.flex_header {
  display: flex;
  flex-direction: column;
}

.client_avatar {
  border-radius: 50%;
  float: right;
  margin: 2%;
}
.pentester_avatar {
  border-radius: 50%;
  float: left;
  margin: 2%;
}
.btn_send {
  flex: 0.2;
}
.del_msg > svg {
  vertical-align: middle;
  margin-left: 2%;
}
.msg_input {
  flex: 2;
}
.cont_input_msg {
  display: flex;
  flex-direction: row;
}

.msg_cont_header_client {
  margin-left: auto;
  width: -moz-fit-content;
  width: fit-content;
  border-bottom: 1px solid $borderica-clientica;
}
.msg_cont_header_pent > p {
  margin-bottom: 0;
}
.msg_cont_header_client > p {
  margin-bottom: 0;
}

.msg_cont_header_pent {
  text-align: left;
  border-bottom: 1px solid $borderica-pentesterica;
  width: fit-content;
}

.msg_cont_header {
  display: flex;
  flex-direction: row;
}

.msg_cont {
  width: 100%;
}

.client {
  flex-direction: row-reverse;
  text-align: right;
  width: 100%;
  height: fit-content;
  padding: 3%;
  margin: 5% 0 5% 0;
}
.pentester {
  text-align: left;
  width: 100%;
  height: fit-content;
  padding: 3%;
  margin: 5% 0 5% 0;
}

.del_msg:hover {
  color: red;
}
</style>
