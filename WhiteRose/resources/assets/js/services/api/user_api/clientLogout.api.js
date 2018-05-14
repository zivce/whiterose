

import successToast from '../../../components/toastr/FormErrorToaster';
import errorToast from '../../../components/toastr/welcometoastr';

/**
 * Used for getting messages in user setup profile
 */

export default {

    handleLogout(vm)
    {
        axios
            .get('/clientlogout')
            .then((res)=>{
            if(res.status === 200)
            {
                vm.notifySuccess("Logged out!", "Success!");

                window.setTimeout ( () => {
                window.location.reload()
                },1500)
            }
            else 
            {
                vm.errorToast("Error happened","Error!")
            }
            })
    }
}