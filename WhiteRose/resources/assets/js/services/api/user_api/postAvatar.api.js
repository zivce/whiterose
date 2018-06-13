


/**
 * Used for posting desc in user setup profile
 */

export default {

    postAvatar(validator,vm,send)
    {
      
        validator.validateAll().then((form_ok)=>{
                if (form_ok) {
                    const vm_scope = vm;
                    axios
                      .post("/postAvatar", 
                      send,
                      {
                        headers : {
                          'Content-Type' : 'multipart/form-data'
                        }
                      })
                      .then(function(response) {
                        //vm.successToast("Description added.", "Success.");
                        let avatar_url =  response.data.replace("public\\","");
                        console.log(avatar_url);  
                        vm_scope.$store.commit("setAvatar",avatar_url);                      
                      })
                      .catch(function(error) {
                        //vm.errorToast("An error happened.", "Error.");
                      });
                  } else {
                    //reset
                    vm.errorToast("Please fill out form correctly.", "Error.");
                    vm.all_fields_ok = true;
            }            


        })

    }
}