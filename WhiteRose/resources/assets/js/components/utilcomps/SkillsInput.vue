
<template>
    <div  class="fform_input">
    
    <label :for="skill.id">{{skill.label}}</label>

    <input  
    :placeholder="skill.label"
    :class="{'has-error':errSkills}"
    :type="skill.type" 
    :id="skill.id" 
    v-model="skill.value" 
    :required="skill.validation.required"
    v-validate="{
        rules:{
        required:true
        }}"
    :name="skill.id"/>
    
    <span v-if="errors.has(skill.id)" class="incorrect_input">
        Skills required!
    </span>
    
    </div>

</template>

<script>
export default {
  props: {
    skill: {
      type: Object,
      twoWay: true
    }
  },
  computed: {
    errSkills() {
      return this.errors.has("skills");
    }
  },
  data() {
    return {};
  }
};
</script>


<style scoped>
.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}

.incorrect_input {
  float: left;
  width: 100%;
  color: red;
  font-size: 10px;
  font-weight: 700;
}
</style>
