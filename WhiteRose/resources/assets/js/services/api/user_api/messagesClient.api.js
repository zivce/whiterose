


/**
 * Used for getting messages in user setup profile
 */

export default {

    getMessages()
    {

            return new Promise((resolve) => {
                let jobs = [];
                  axios
                    .get("getAllFirstMessages")
                    .then(response => {
                      resolve(
                        response.data
                      );
                    })
                    .catch(function(error) {
                    //   vm.errorToast("Error happened.", "Error!");
                    });
              });    
           
        // return arr;

    }
}