import { SnotifyPosition } from "vue-snotify";

var welcomeToastr = {
    methods: {
      welcomeNotify(role){
        this.$snotify.info(`Welcome ${role}`, "Hello", {
            position: SnotifyPosition.leftBottom,
            backdrop: 0.5
          });
    
          
      }
    }
  }
  
  export default welcomeToastr;