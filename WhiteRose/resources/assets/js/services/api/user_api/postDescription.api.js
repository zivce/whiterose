


/**
 * Used for posting desc in user setup profile
 */

export default {

    postDescription(validator,vm,send)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 


        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    axios
                      .post("/postDesc", {
                        send
                      })
                      .then(function(response) {
                        vm.successToast("Description added.", "Successs.");
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