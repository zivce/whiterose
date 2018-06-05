

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting convo in pentester convo component
 * 
 *  
 */

export default {

    getConversation()
    {
      return new Promise((resolve) => {
            let jobs = [];
              axios
                .get("getMessages")
                .then(response => {
                  console.log(response.data);
                  resolve(
                    response.data
                  );
                })
                .catch(function(error) {
                  // vm.errorToast("Error happened.", "Error!");
                });
          });    
    }
}