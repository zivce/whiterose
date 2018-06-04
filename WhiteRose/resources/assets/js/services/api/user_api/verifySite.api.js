import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for verifying site in user setup profile
 */

export default {
    getKey(site){
      return new Promise(resolve => {
        axios.post("/getkey",{site})
        .then(() => resolve())
      }) 

    },
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
       return new Promise(resolve => {
          axios
          .post("/confirmed", {
            site
          })
       })
    }
}