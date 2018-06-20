var checkFields = {
    methods: {
      checkAllFields(){
        for (let entry in this.inputs) {
          let object_entry = this.inputs[entry];
          
          (object_entry);
          
          if(entry === "skills")
          {
            continue;
          }
          
          if (!object_entry.ok) {
            this.all_fields_ok = false;
            break;
          }
          else
          {
            this.all_fields_ok = true;
          }
        
          }
        // ("from tester function check all fields" + this.all_fields_ok);
      }
    }
  }
  
  export default checkFields;