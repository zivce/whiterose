

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for for sending document and form data from postjob
 */

export default {
  getAllUserScans(){
    return new Promise((resolve) => {
    axios
        .get("allscans")
        .then((res)=>{
            resolve(res);
        })
        .catch(function(error) {
        vm.errorToast("Error happened.", "Error!");
        });
}); 


},
    postDoc(document)
    {
      return new Promise((resolve) => {
              axios
                .post("postjobdocument",document,{
                    headers : {
                        'Content-Type': 'multipart/form-data'
                      }
                }
                )
                .then(()=>{
                    resolve();
                })
                .catch(function(error) {
                  vm.errorToast("Error happened.", "Error!");
                });
          });    
    },
    

    postForm(obj)
    {
      return new Promise((resolve) => {
              axios
                .post("postjob",obj
                ,{
                    headers : {
                        'Content-Type': 'multipart/form-data'
                      }
                })
                .then((res)=>{

                    resolve();
                })
                .catch(function(error) {
                  vm.errorToast("Error happened.", "Error!");
                });
          });    
    },

}