<template>
  <div class="comp_container">
    <h2 
    v-if ="!isWithdrawalMode"
    class="h2s">Token charger
    </h2>

     <h2 
    v-if ="isWithdrawalMode"
    class="h2s">Withdraw tokens
    </h2>

    <div id="explanation" style="
    text-align: left;
    width: fit-content;
" class="d-flex justify-content-center">
   
    <h3 class="h3s">
      <strong> 1  </strong>  &nbsp; 
      <icon style="
          vertical-align: middle;"
          width="20"
          height="20"
          name="bandcamp"></icon> 
          &nbsp; = &nbsp; <span style="color:#0f0;font-weight:bold;">$
          </span> <strong>5</strong>&nbsp; 
   
    </h3>
    </div>


    <div  class="fform_input d-flex flex-column">
      
      <label class="col-12" style="
    margin: 0 auto;
    width: fit-content;
"  :for="prop.id">{{prop.label}}</label>

      <input style="
    margin: 0 auto;
    width: 39%;
    "
      :max="fixMax" 
      min = "0"
      @keydown="disableEsAndMinus"
      :placeholder="prop.label"
      :class="{'has-error':errHandler}"
      class="col-12"
      :type="prop.type" 
      :id="prop.id" 
      v-model="prop.value" 
      required="required"
      v-validate="{required:true}"
      :name="prop.id"/>
      
      <span v-if="errors.has(prop.id)"  style="
    margin: 0 auto;"

        class="incorrect_input">
          {{prop.id_upper}} required!
      </span>
    
    </div>

    <span v-if="isWithdrawalMode" class="d-flex justify-content-center">
      You will get 
      <span style="color:#0f0;font-weight:bold;">
        &nbsp; $
      </span>
      <strong style="
        margin-left: 2%;
        margin-right: 2%;"> 
        {{prop.value * 5 }} 
        </strong>.
    </span>



    <span v-if="!isWithdrawalMode" class="d-flex justify-content-center">
      Your credit card will be charged with  
      <span style="color:#0f0;font-weight:bold;">
        &nbsp; $
      </span>
      <strong style="
        margin-left: 2%;
        margin-right: 2%;"> 
        {{prop.value * 5 }} 
        </strong>.
    </span>

    <div
    v-if="!isWithdrawalMode" 
    class="d-flex flex-column example example4 ">
        <div id="wrap">

            <card 
            id="example4-card"
            class="stripe-card col-12"
            :class='{complete}'
            :options = "options"
            stripe = 'pk_test_dFVBeyPGEdmiqOpIv5lovgeE'
            @change="complete = $event.complete" />

            <b-button
            ref="pay_button"
            class="col-7 pay_btn"
            @click.once="pay"
            :disabled = '!completed'>
            
            Pay with credit card 
            
            </b-button>

        </div>
    </div>

    <div
    v-if="isWithdrawalMode" 
    class="d-flex flex-column example example4">
      
        <div id="wrap">
          <b-button
          class="col-7 pay_btn"
          @click.once="withdraw">
          
          Withdraw 
          
          </b-button>
        </div>
    
    </div>
      

    </div>
</template>

<script>
import { Card, createToken } from "vue-stripe-elements-plus";

import Icon from "vue-awesome/components/Icon";
import "../../Icons/bandcamp";
import TokenChargerAPI from "../../services/api/TokenCharger.api";

//TODO: ubaci tokene u vuex da bi ih pokupio kasnije iz mainvue

export default {
  components: { Card, Icon },
  mounted() {
    this.tokensInStore = this.$store.getters.returnTokens;

    const route = this.$store.getters.returnRoute;
    const contains_withdraw = route.indexOf("withdraw");
    
    console.log("withdraw", contains_withdraw);
    
    if(contains_withdraw !== -1){
      this.isWithdrawalMode = true;
    }

  },
  computed: {
    fixMax() {
      if (this.prop.value > 1000) this.prop.value = 1000;
    },
    completed() {
      return this.complete && this.completeform;
    },

    errHandler() {
      this.completeform = !this.errors.has(this.prop.id);

      return this.errors.has(this.prop.id);
    }
  },
  data() {

    return {
      tokensInStore : undefined,
      isWithdrawalMode : false,
      prop: {
        id: "amount",
        label: "number of tokens",
        type: "number",
        value: "",
        id_upper: "Tokens"
      },
      visible: true,
      options: {
        classes: {},
        style: {
          base: {
            padding: "1%",
            fontWeight: "500",
            fontSize: "1.25rem",
            fontFamily: "'Poppins',Helvetica"
          }
        }
      },

      complete: false,
      completeform: false,
      opts: {
        base: {
          color: "#303238",
          fontSize: "16px",
          color: "#32325d",
          fontSmoothing: "antialiased",
          "::placeholder": {
            color: "#ccc"
          }
        },
        invalid: {
          color: "#e5424d",
          ":focus": {
            color: "#303238"
          }
        }
      }
    };
  },
  methods: {
    withdraw() {
      this.$validator.validateAll().then(isFormOk => {
        if(isFormOk)
        {

          this.$store.commit('withdrawTokens',{
              tokens: this.prop.value,
              vm: this
          });

          if( this.prop.value < this.tokensInStore )
            TokenChargerAPI.withdrawTokens(this.prop.value);

        }
      })
    },
    pay() {
      this.$validator.validateAll().then(isFormOk => {
        if (isFormOk && this.complete && this.completeform) {
          createToken().then(token => {
            let tokens_already = this.$store.returnTokens;
            (tokens_already);

            let tk = this.prop.value;

            this.$store.commit("setTokens", { tokens: tk });

            this.notifySuccess("Tokens added.", "Success");
            TokenChargerAPI.sendTokenAndAmount(token, this.prop.value);
            // .then((amount)=>{

            // });
          });
        } else this.errorToast("Please fill out the form", "Error!");
      });
    }
  }
};
</script>

<style scoped>
.fform_input * {
  margin-bottom: 3vh !important;
}

.has-error {
  border: 1px solid rgba(255, 0, 0, 1);
}

.incorrect_input {
  width: fit-content !important;
}
#token_charger {
  position: absolute;
  top: 20vh;
  left: 40vw;
  width: 30vw;
  height: 20vh;
  background-color: #fefefe;
}
.stripe-card {
  width: 300px;
  border: 1px solid grey;
}
.stripe-card.complete {
  border-color: green;
}
#wrap {
  width: 100%;
  margin: 0 auto;
}
.example {
  /* position: absolute;
    top: 0;
    left: 20vw;
    padding : 1%; */
}

/**
* Stripe design for form examples
**/

.example.example4 {
  background-color: transparent;
}

.example.example4 >>> * {
  font-family: "Poppins" !important;
  font-size: 16px;
  font-weight: 500;
  margin: auto;
}

.example.example4 >>> form {
  max-width: 496px !important;
  padding: 0 15px;
}

.example.example4 form >>> * + * {
  margin-top: 20px;
}

.example.example4 >>> .container {
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  padding: 3px;
}

.example.example4 >>> fieldset {
  border-style: none;
  padding: 5px;
  margin-left: -5px;
  margin-right: -5px;
  background: rgba(18, 91, 152, 0.05);
  border-radius: 8px;
}

.example.example4 >>> fieldset legend {
  float: left;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #8898aa;
  padding: 3px 10px 7px;
}

.example.example4 >>> .card-only {
  display: block;
}
.example.example4 >>> .payment-request-available {
  display: none;
}

.example.example4 >>> fieldset legend + * {
  clear: both;
}

.example.example4 >>> input,
.example.example4 >>> button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  border-style: none;
  color: #fff;
}

.example.example4 >>> input:-webkit-autofill {
  transition: background-color 100000000s;
  -webkit-animation: 1ms void-animation-out;
}

.example.example4 >>> #example4-card {
  padding: 10px;
  margin-bottom: 2px;
}

.example.example4 >>> input {
  -webkit-animation: 1ms void-animation-out;
}

.example.example4 >>> input::-webkit-input-placeholder {
  color: #9bacc8;
}

.example.example4 >>> input::-moz-placeholder {
  color: #9bacc8;
}

.example.example4 >>> input:-ms-input-placeholder {
  color: #9bacc8;
}

.example.example4 >>> button {
  margin-top: 3vh;
  display: block;
  width: 100%;
  height: 37px;
  background-color: #2c3340;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
}

.example.example4 >>> .error svg .base {
  fill: #e25950;
}

.example.example4 >>> .error svg .glyph {
  fill: #f6f9fc;
}

.example.example4 >>> .error .message {
  color: #e25950;
}

.example.example4 >>> .success .icon .border {
  stroke: #ffc7ee;
}

.example.example4 >>> .success .icon .checkmark {
  stroke: #d782d9;
}

.example.example4 >>> .success .title {
  color: #32325d;
}

.example.example4 >>> .success .message {
  color: #8898aa;
}

.example.example4 >>> .success .reset path {
  fill: #d782d9;
}
</style>
