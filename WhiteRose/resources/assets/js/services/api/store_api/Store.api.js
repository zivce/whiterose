
export default {
   
    getSites () {
        return new Promise((resolve) => {
                axios
                .get("getAllSites")
                .then((res)=>{
                    resolve(res);
                })
                .catch(function(error) {
                    vm.errorToast("Error happened.", "Error!");
                });
            });    
    }
}