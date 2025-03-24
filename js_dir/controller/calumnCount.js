import { store } from "../store/store.js";
import { cardNumber } from "../component/cardNumber.js";
export const calumnCount = {
  countCards(calumn) {
    const targetCalumn = store.getState()[calumn];
    this.cardNumbers = Object.keys(targetCalumn).length;
    return this.cardNumbers;
  },
  updateCardNumbers(calumn) {
    const number = this.countCards(calumn);
    cardNumber.renderCardNumber(calumn, number);
    //컴포넌트 호출
  },
};
