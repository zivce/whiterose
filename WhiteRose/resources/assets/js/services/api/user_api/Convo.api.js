

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting convo in pentester convo component
 * 
 *  
 */

export default {

    getConversation(j_id)
    {
      return new Promise((resolve) => {
          let job_id = j_id.job_id;
              axios
                .get("getMessages/"+job_id)
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