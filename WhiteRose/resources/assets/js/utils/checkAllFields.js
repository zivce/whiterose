var checkFields = {
    methods: {
      checkAllFields(){
        for (let entry in this.inputs) {
          let object_entry = this.inputs[entry];
            if (!object_entry.ok) {
              console.log("object entry",object_entry)
              this.all_fields_ok = false;
              break;
            }
            else
            {
              this.all_fields_ok = true;
            }
          }
      }
    }
  }
  
  export default checkFields;