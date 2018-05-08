var logg = {
    methods: {
      logger(g,...messages){
        
        console.group(`emitted from ${g}`);
        
        messages.forEach((msg)=>{
            console.log(`${msg}`);
        })        
    
        console.groupEnd();
        }
    }
  }
  
export default logg;