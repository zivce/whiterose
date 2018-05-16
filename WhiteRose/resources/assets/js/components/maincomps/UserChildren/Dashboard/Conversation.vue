<template>
    
    <div>
        <p>Welcome to convo</p>
        <p>{{job_id}}</p>
        

    </div>

</template>

<script>
export default {
    mounted()
    {
        this.job_id = this.$store.getters.returnParams;
        console.log(this.job_id);
    },
    data(){
        job_id : ''
    }
}
</script>

<style scoped>

</style>
