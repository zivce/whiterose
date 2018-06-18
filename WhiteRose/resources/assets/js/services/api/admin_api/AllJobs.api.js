
/**
 * Used for getting messages in user setup profile
 */

export default {

  getAllJobs()
  {
    return new Promise((resolve) => {
          let jobs = [];
            axios
              .get("getAllJobs")
              .then(response => {

                for ( let key in response.data)
                {
                    const job_info = response.data[key];

                    jobs.push({
                      id: job_info.id,
                      title: job_info.title,
                      maximum_price: job_info.maximum_price,
                      domain:job_info.domain,
                      description: job_info.description,
                      client:job_info.client.name,
                      completed:job_info.completed,
                      inprogress:job_info.inprogress
                    });

                }
                
                resolve(
                  jobs
                );
              })
              .catch(function(error) {
                console.error(error);
                // vm.errorToast("Error happened.", "Error!");
              });
        });    
  }
}