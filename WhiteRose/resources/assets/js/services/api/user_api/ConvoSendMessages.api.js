

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for sending message array .. 
 * 
 *  
 */

export default {

    getAllJobs()
    {
      return new Promise((resolve) => {
            let jobs = [];
              axios
                .get("returnalljobs")
                .then(response => {
                  // console.log(response.data[0]);
                  response.data.forEach(job_info => {
                    jobs.push({
                      id: job_info.id,
                      title: job_info.title,
                      maximum_price: job_info.maximum_price,
                      domain:job_info.domain,
                      description: job_info.description,
                      user:"hardcode",
                      //job_info
                    });
                  });
                  resolve(
                    jobs
                  );
                })
                .catch(function(error) {
                  vm.errorToast("Error happened.", "Error!");
                });
          });    
    }
}