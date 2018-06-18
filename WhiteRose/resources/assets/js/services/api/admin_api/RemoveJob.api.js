


/**
 * Used for getting messages in user setup profile
 */

export default {

    removeJob(id)
    {
          axios
          .post("/deleteJob", {
            id
          })
          .then(function(response) {
            // vm.successToast("Description added.", "Success.");
          })
          .catch(function(error) {
            // vm.errorToast("An error happened.", "Error.");
          });
    }
}