


/**
 * Used for getting messages in user setup profile
 */

export default {

    getAllUsers()
    {
        return new Promise((resolve) => {
          // (response.data);
          axios
              .get("getAllUsers")
              .then((res)=>{
                (res.data[0]);
                res.data[0].forEach( data => {
                  data.role='client'
                });
                res.data[1].forEach( data => {
                  data.role='pentester'
                });
                  resolve(res);
              })
              .catch(function(error) {
              vm.errorToast("Error happened.", "Error!");
              });
      });  
    },

    banUser(id,role)
    {
          axios
          .post("/banUser", {
            id,role
          })
          .then(function(response) {
            // vm.successToast("Description added.", "Success.");
          })
          .catch(function(error) {
            // vm.errorToast("An error happened.", "Error.");
          });
    }

}