


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
    editJob(obj,vm)
    {
        return new Promise((resolve) => {
            axios
              .post("editJob",obj
              ,{
                
              })
              .then((res)=>{
                  vm.notifySuccess("Job has been edited.","Success!");
                  resolve();
              })
              .catch(function(error) {
                vm.errorToast("Error happened.", "Error!");
              });
        });    
    },

    postForm(obj,vm)
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
                    
                    if(res.data === "You dont have tokens for this job post")
                        resolve();
                    
                    vm.notifySuccess("Job has been posted.","Success!");
                    resolve();
                })
                .catch(function(error) {
                  vm.errorToast("Error happened.", "Error!");
                });
          });    
    },

}