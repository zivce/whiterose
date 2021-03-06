import { SnotifyPosition } from "vue-snotify";

var errorToaster = {
    methods: {
      errorNotify(){
        this.$snotify.error("Please fill out form.", "Error!", {
            position: SnotifyPosition.centerTop,
            backdrop: 0.5
          });
          
      },
      errorToast(info,err)
      {
        this.$snotify.error(info, err, {
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
        
      }
    }
  }
  
  export default errorToaster;