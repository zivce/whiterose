


/**
 * Used for getting messages in user setup profile
 */

export default {

    deleteConvo(disc_id)
    {
      return new Promise((resolve) => {
        axios
          .post("deleteDiscusion", {disc_id})
          .then(response => {
            resolve();
          })
          .catch(function(error) {
            // vm.errorToast("Error happened.", "Error!");
          });
    });    
    }
}