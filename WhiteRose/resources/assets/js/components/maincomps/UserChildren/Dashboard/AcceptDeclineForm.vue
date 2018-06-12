<template>
    <div class="review_job_completed">
        <h2 class="h2s">
            Review completed job.
        </h2>
        
        <div 
        v-if="!isVisibleModalAcceptCompletion"
        style="
        display:flex;
        flex-direction: row;
        margin: auto;
        ">
            <b-button 
            @click="openModal()"
            class="btn btn-success"
            >
            Accept
            </b-button>

            <b-button 
            @click="declineCompletion()"
            class="btn btn-danger"
            >
            Decline
            </b-button>
        </div>        
    <div
    v-if="isVisibleModalAcceptCompletion"
    >
        
        <div style="display:flex;flex-direction:column;">
        
            <p> Write review </p>

            <textarea  class="textarea_accept_decline"
            :placeholder="descinput.label"
            :class="{'has-error':errDesc}"
            :type="descinput.type"
            :id="descinput.id" 
            v-model="descinput.value" 
            required:true
                v-validate="{
                rules:{
                    required:true
                }}"
            :name="descinput.id">
            
            </textarea>
        
        </div>
        
        <div style="display:flex;flex-direction:column;">
            <p> Rate pentester </p>

            <star-rating 
            style="
            margin:auto;"
            v-model="rating"
            :show-rating = "false"
            :increment="0.5"
            :star-size="20"
            >
            </star-rating>
        
        </div>

        <b-button 
            @click="markAsCompleted()"
            class="btn btn-success"
            >
            Submit
        </b-button>

    </div>

    </div>
</template>

<script>
import ConvoAPI from '../../../../services/api/user_api/Convo.api';


import StarRating from "vue-star-rating";

import eventBus from '../../../../utils/eventBus';


export default {
    computed : {
        errDesc (){
            return this.errors.has(this.descinput.id);
        }
    },
    components: {
        StarRating
    },
    mounted() {
        this.params = this.$store.getters.returnParams; 
    },
    methods: {
        declineCompletion() {
            
            eventBus.$emit("jobFinished",false);

            ConvoAPI.declineJobCompletion(this.params.job_id,this);
        },
        openModal()
        {
            this.isVisibleModalAcceptCompletion = true
        },
        markAsCompleted() {
            let send = {
                "review" :  this.descinput.value,
                "rating" :  this.rating,
                "job_id":   this.params.job_id
            }
            this.$validator.validateAll().then((form_ok) => {
                if(form_ok)
                    ConvoAPI.markAsCompleted(send,this).then(()=> {
                        eventBus.$emit("acceptedJob",true);
                    });
                else 
                    this.errorToast("Fill out the form","Error");
            })
           
        }
    },
    data() {
        return {
            params : null,

            //Description input 
            descinput: 
            {
                id: "desc",
                label: "description",
                type: "text",
                value: "",
                id_upper: "Description"
            },
            rating:2,

            //Visibility variables
            isVisibleModalAcceptCompletion : false
        }
    }
}
</script>

<style lang="scss" scoped>

.review_job_completed{
    width: fit-content;
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 8%;
    text-align: center;
}

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}
</style>