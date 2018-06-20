
/**
 * Used for getting messages in user setup profile
 */

export default {

    getAllQuestions()
    {
      return new Promise((resolve) => {
              axios
                .get("getAllQuestions")
                .then(response => {
                  (response.data);
                  resolve(
                    response.data
                  );
                })
                .catch(function(error) {
                  console.error(error);
                  // vm.errorToast("Error happened.", "Error!");
                });
          });    
    }
  }