

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for sending message array .. 
 * 
 *  
 */

export default {
    
  
    sendMsg(msg)
    {
            let jobs = [];
              axios
                .post("postMesaages",msg)
                .then(response => {
                
                })
                .catch(function(error) {
                  // vm.errorToast("Error happened.", "Error!");
                });

    }
}