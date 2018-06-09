<template>
    <div class="review_job_completed">
        <h2 class="h2s">
            Review completed job.
        </h2>
        
        <div 
        style="
        display:flex;
        flex-direction: row;
        margin: auto;
        ">
            <b-button 
            @click="markAsCompletede()"
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


    </div>
</template>

<script>
import ConvoAPI from '../../../../services/api/user_api/Convo.api';

export default {
    mounted() {
        this.params = this.$store.getters.returnParams; 
    },
    methods: {
        declineCompletion() {
            ConvoAPI.declineJobCompletion(this.params.job_id,this);
        },
        markAsCompleted() {
            ConvoAPI.markAsCompleted(this.params.job_id,this);
        }
    },
    data() {
        return {
            params : null,
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


</style>