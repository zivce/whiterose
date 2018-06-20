import successToast from '../../components/toastr/FormErrorToaster';
import errorToast from '../../components/toastr/welcometoastr';

/**
 * Used for posting desc in user setup profile
 */

export default {
    withdrawTokens (tokens) {
      axios.post('withdrawTokens',{tokens})
      .then(res => console.log(res))

    },
    sendTokenAndAmount(token,amount)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 
        axios
          .post("/purchasetokens", {
            token,amount
          })
          .then(function(response) {
            vm.successToast("Tokens added.", "Success.");
          })
          .catch(function(error) {
            vm.errorToast("An error happened.", "Error.");
          });

    }
}