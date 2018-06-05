import { SnotifyPosition } from "vue-snotify";

var welcomeToastr = {
    methods: {
      
      notifyInfo(info,succ)
      {
        
        this.$snotify.info(info, succ, {
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
        
      }
    }
  }
  
  export default welcomeToastr;