
/**
 * Used for posting desc in user setup profile
 */

export default {

    deleteJobWithId(id)
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 
       
        axios
          .post("/deleteJob", {
            id
          })
          .then(function(response) {
            // vm.successToast("Description added.", "Success.");
            window.location.reload();
          })
          .catch(function(error) {
            // vm.errorToast("An error happened.", "Error.");
          });

    }
}