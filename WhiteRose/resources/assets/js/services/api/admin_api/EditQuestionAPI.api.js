
/**
 * Used for getting messages in user setup profile
 */

export default {

    editQuestion(data)
    {
          axios
          .post("/editQuestion", {
            question:data
          })
          .then(function(response) {
            // vm.successToast("Description added.", "Success.");
          })
          .catch(function(error) {
            // vm.errorToast("An error happened.", "Error.");
          });
    }
}