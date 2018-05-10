import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for posting desc in user setup profile
 */

export default {

    postAvatar(validator,vm,send)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 


        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    axios
                      .post("/postdescription", {
                        send
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