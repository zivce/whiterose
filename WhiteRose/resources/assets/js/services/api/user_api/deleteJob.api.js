
/**
 * Used for posting desc in user setup profile
 */

export default {

    deleteJobWithId(id)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 
       
        
        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    axios
                      .post("/postavatar", {
                        send
                      }, {
                        headers : {
                          'Content-Type' : 'multipart/form-data'
                        }
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