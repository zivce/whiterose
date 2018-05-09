import { SnotifyPosition } from "vue-snotify";

var welcomeToastr = {
    methods: {
      welcomeNotify(role){
        this.$snotify.info(`Welcome ${role}`, "Hello", {
            position: SnotifyPosition.leftBottom,
            backdrop: 0.5
          });    
      },
      notifySuccess(info,succ)
      {
        
        this.$snotify.success(info, succ, {
          position: SnotifyPosition.centerTop,
          backdrop: 0.5
        });
        
      }
    }
  }
  
  export default welcomeToastr;