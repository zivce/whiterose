import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for posting desc in user setup profile
 */

export default {

    postAvatar(validator,vm,send)
    {
      
        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    axios
                      .post("/postAvatar", 
                      send,
                      {
                        headers : {
                          'Content-Type' : 'multipart/form-data'
                        }
                      })
                      .then(function(response) {
                        vm.successToast("Description added.", "Success.");
                        vm.$store.commit("setAvatar",response.data)
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