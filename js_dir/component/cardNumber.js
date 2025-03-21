export const cardNumber = {
  renderCardNumber(calumn, number) {
    const numberSector = calumn.querySelector(".columnlist__count");
    numberSector.textContent = `${number}`;
  },
};
