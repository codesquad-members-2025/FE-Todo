export const cardNumber = {
  renderCardNumber(dataType, number) {
    const calumn = document.querySelector(
      `.columnlist__col[data-type="${dataType}"]`
    );

    const numberSector = calumn.querySelector(".columnlist__count");
    numberSector.textContent = `${number}`;
  },
};
