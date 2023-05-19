const setCategory = (categoryId) => {
  switch (categoryId) {
    case 1:
      return "Motor";
    case 2:
      return "Automobil";
    case 3:
      return "Kamion";
      case 4:
      return "Skuter";
    case 5:
      return "Kamion sa prikolicom";
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

const setCategoryIdByCategory = (category) => {
  switch (category) {
    case "A":
      return 1;
    case "B":
      return 2;
    case "C":
      return 3;
    case "AM":
      return 4;
    case "CE":
      return 5;
    default:
      return 1;
  }
};

const setProgramTypeIdByProgramType = (programType) => {
  switch (programType) {
    case "Teorija":
      return 1;
    case "Praksa":
      return 2;
    default:
      return 1;
  }
};

module.exports = { setCategory, setProgramType, setCategoryIdByCategory, setProgramTypeIdByProgramType };