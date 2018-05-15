import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for verifying site in user setup profile
 */

export default {

    verifySite(validator,vm,site)
    {


        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    axios
                      .post("/verifysite", {
                        site
                      })
                      .then(function(response) {
                        vm.successToast("Description added.", "Success.");
                      })
                      .catch(function(error) {
                        vm.errorToast("An error happened.", "Error.");
                      });
                  } else {
                    //reset
                    vm.errorToast("Please fill out form correctly.", "Error.");
                    vm.all_fields_ok = true;
            }            


        })

    }
}