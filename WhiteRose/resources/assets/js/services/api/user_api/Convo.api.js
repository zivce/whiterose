

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting convo in pentester convo component
 * 
 *  
 */

export default {
    markAsCompleted(job_id,vm)
    {
      return new Promise((resolve) => {
        axios.post("/markCompleted",{job_id})
        .then(()=> {
          vm.notifySuccess("Marked as completed","Success!");
          resolve();
        })
        .catch( (err) => {
          console.error(err);
        })
      })
    },
    getConversation(j_id)
    {
      return new Promise((resolve) => {
          let job_id = j_id.job_id;
              axios
                .get("getMessages/"+job_id)
                .then(response => {
                  // console.log(response.data);
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