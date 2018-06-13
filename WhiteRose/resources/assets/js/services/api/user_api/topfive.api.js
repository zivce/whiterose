


/**
 * Used for getting spendings in a week time in user setup profile
 */

export default {
    
    getTopFive()
    {
        let arrData = [];

        axios
            .get("/spendings")
            .then(function(response) {
                arrData = response.data
            })
            .catch(function(error) {
                vm.errorToast("An error happened.", "Error.");
            });
        return arrData;
    }            
}