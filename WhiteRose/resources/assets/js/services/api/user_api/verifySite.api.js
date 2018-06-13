


/**
 * Used for verifying site in user setup profile
 */

export default {
    getKey(site,vm){
      return new Promise(resolve => {
        axios.get(`/getkey/${site}`)
        .then(() => resolve())
        .catch(function(error) {
          vm.errorToast("An error happened.", "Error.");
        }); 
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