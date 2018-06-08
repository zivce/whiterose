import successToast from '../../components/toastr/FormErrorToaster';
import errorToast from '../../components/toastr/welcometoastr';

/**
 * Used for posting desc in user setup profile
 */

export default {

    fetchTokens()
    {
        return new Promise((resolve) => {
            axios
            .get("/returntokens")
            .then(
                (response) =>  resolve(response.data) 
            )
            .catch(function(error) {
            //vm.errorToast("An error happened.", "Error.");
            });

        })
        
        

    }
}