import successToast from '../../components/toastr/FormErrorToaster';
import errorToast from '../../components/toastr/welcometoastr';

/**
 * Used for posting desc in user setup profile
 */

export default {

    sendTokenAndAmount(token,amount)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 


                    axios
                      .post("/postdescription", {
                        token,amount
                      })
                      .then(function(response) {
                        vm.successToast("Description added.", "Success.");
                      })
                      .catch(function(error) {
                        vm.errorToast("An error happened.", "Error.");
                      });
                  

    }
}