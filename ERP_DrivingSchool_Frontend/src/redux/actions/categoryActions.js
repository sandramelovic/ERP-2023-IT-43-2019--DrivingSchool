const setCategory = (categoryId) => {
    switch (categoryId) {
        case 1:
          return "Motor";
        case 2:
          return "Automobil";
        case 3:
          return "Kamion";
        default:
          return "Nepoznata kategorija";
      }
  };

  const setProgramType = (programTypeId) => {
    switch (programTypeId) {
        case 1:
          return "Teorija";
        case 2:
          return "Praksa";
        default:
          return "Nepoznat tip";
      }
  };
  
  module.exports = { setCategory, setProgramType };