import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for verifying site in user setup profile
 */

export default {
    addNewSite(vm,site) {
      return new Promise(resolve => {
        axios.post("/newsite",{site})
        .then((resp) => {
          if(resp.data === "Website already exists!")
          {
            vm.notifyInfo("Website already exists", "Info.");
            resolve(false);            
          }
          else
            resolve(resp)
        })
        .catch(function(error) {
          vm.errorToast("An error happened.", "Error.");
        });
      })
      
    

    },


    verifySite(validator,vm,site)
    {
        console.log(validator);
        

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