import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting messages in user setup profile
 */

export default {

    getMessages()
    {
        //sendingArr sadrzi niz propertija forme
        //moze da se mapira.. 
        let arr;
        axios
            .get("/msesgg", {
            })
            .then(function(response) {
                //
            })
            .catch(function(error) {
                vm.errorToast("An error happened.", "Error.");
                window.location.reload();
            });
           
        return arr;

    }
}