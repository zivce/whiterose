var fixNumberInputs = {
  methods: {
    disableEsAndMinus(event) {
      if (event.key === "e" || event.key === "-") event.preventDefault();
    }
  }
};

export default fixNumberInputs;
