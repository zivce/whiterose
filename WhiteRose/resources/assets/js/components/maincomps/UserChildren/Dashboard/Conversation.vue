<template>
    <div class="comp_container">
          <h2 class="h2s">Convo with {{whole_convo.pentester}}</h2>

          <span 
          class="del_msg"
          v-b-tooltip.hover.right="'Delete messages'"
          style="cursor:pointer;"
          @click="deleteConvo()">
            <icon
              name="trash-alt">
            </icon>
          </span>

          
  

    
        <star-rating 
  
        style="
          float: left;
          width: fit-content;"
  
        v-model="rating"
        :increment="0.5"
        :show-rating = "false"
        :star-size="20"
        >
        </star-rating>
 
        
        
        <div 
        class = "msg_cont "
        v-for="(disc) in whole_convo.discusion"
        :key = disc.id
        >
          <div
          v-for="(msg) in disc.messages"
          :key = msg.id
          >
            <div
            class="client d-flex"
            v-if="msg.clientToPentester==1"
            >
                <div class="col-2">
                    <img 
                    src="http://i.pravatar.cc/100?img=3" 
                    class="client_avatar"
                    alt="">
                </div>

                <div class="col-8">
                    <div class = "msg_cont_header_client">
                        <p><strong>{{msg.updated_at}}</strong></p>           
                    </div>

                    <p
                    >
                    {{msg.text}}
                    </p>
                </div>

            </div>

            <div
            class="pentester d-flex"
              v-else 
            >
                <div class="col-2">

                    <img 
                    src="http://i.pravatar.cc/100?img=4" 
                    class="pentester_avatar"
                    alt=""> 

                </div>
                <div class="col-8">
                    <div class = "msg_cont_header_pent">
                        <p><strong>{{msg.updated_at}}</strong></p>           
                    </div>
                    
                   <p
                    >
                    {{msg.text}}
                    </p>
                </div>



            </div>

          </div>
        </div>

        <!-- RENDER NEW MESSAGES -->
        
        <div v-if="msgs_for_send.length"
            class="client msg_cont d-flex"
        >
         
         <div class="col-2">
            <img 
            src="http://i.pravatar.cc/100?img=3" 
            class="client_avatar"
            alt="">
         </div>
         
         <div class="col-8">
            <div class = "msg_cont_header_client">
                <p><strong>{{msgs_for_send[0].date_time}}</strong></p>           
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



        <div class="cont_input_msg">
        
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
    </div>

</template>

<script>
import DeleteConvoAPI from "../../../../services/api/user_api/DeleteConvo.api";

import ConvoHardcode from "../convo_client_2_pentester.hardcode";
import ClientConvoAPI from "../../../../services/api/user_api/Convo.api";
import ConvoSendMessagesAPI from "../../../../services/api/user_api/ConvoSendMessages.api";
import StarRating from "vue-star-rating";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons/paper-plane";
import ConvoApi from "../../../../services/api/user_api/Convo.api";

export default {
  destroyed() {},
  created() {
    //TODO: ovde da se puni komponenta
    //TODO : na osnovu job_id i pentester_id da se povuce convo
    //TODO: job_id se cuva u vuex..
    //ConvoHardcode.getConv(job_id,user_id)..
    //TODO: posalji rating ovde
    this.job_id = this.$store.getters.returnParams;
    ClientConvoAPI.getConversation(this.job_id).then(resp => this.whole_convo=resp);
    console.log(this.whole_convo);
  },
  mounted() {

    this.user_name = this.$store.getters.returnUser;
    this.user_name = this.user_name.name;
    this.msg_send_id = 0;
  },
  components: {
    Icon,
    StarRating
  },

  methods: {
    deleteConvo() {
      //TODO: implementacija
      // DeleteConvoAPI.deleteConvo();
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
        discusionID: this.whole_convo.discusion[0].id,
        message: this.one_msg,
        date_time: moment().format('YYYY-MM-DD hh:mm:ss')
      };
      this.one_msg = "";
      this.msg_send_id++;

      this.msgs_for_send.push(new_msg);
      console.log(new_msg);
      ConvoSendMessagesAPI.sendMsg(new_msg);
    },

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
      rating: 0,
      one_msg: "",
      msgs_for_send: [],
      whole_convo: [],
      msg_send_id: undefined,
    };
  }
};
</script>

<style scoped>
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
  text-align: right;
  border-bottom: 1px solid #233dbb;
}
.msg_cont_header_pent > p {
  margin-bottom: 0;
}
.msg_cont_header_client > p {
  margin-bottom: 0;
}

.msg_cont_header_pent {
  text-align: left;
  border-bottom: 1px solid rgba(170, 4, 60, 0.878);
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
