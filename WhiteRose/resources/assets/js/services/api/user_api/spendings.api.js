import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting spendings in a week time in user setup profile
 */

export default {
    
    getSpendings()
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