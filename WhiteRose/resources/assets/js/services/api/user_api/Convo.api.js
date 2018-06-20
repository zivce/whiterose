


/**
 * Used for getting convo in pentester convo component
 * 
 *  
 */

export default {
    markAsCompleted(send,vm)
    {
      //TODO: Promeni sad se salje ceo objekat
      
      return new Promise((resolve) => {
        axios.post("/acceptJob",{send})
        .then(()=> {
          // vm.notifySuccess("Marked as completed!","Success!");
          resolve();
        })
        .catch( (err) => {
          console.error(err);
        })
      })
    },
    declineJobCompletion(job_id,vm)
    {
      return new Promise((resolve) => {
        axios.post("/declineJob",{job_id})
        .then(()=> {
          // vm.notifySuccess("You have declined a posted job!","Success!");
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
                  // (response.data);
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