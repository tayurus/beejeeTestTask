import { cardsConstants } from "../constants";

export function cardsReducer(state = {}, action) {
  switch (action.type) {
    case cardsConstants.GET_CARDS_REQUEST:
      return {
        ...state,
        alert: "Запрос карточек для страницы " + action.pageNumber
      };
    case cardsConstants.GET_CARDS_SUCCESS:
      console.log("action = ", action);
      return {
        ...state,
        cards: action.cards.message.tasks,
        pageNumber: action.pageNumber,
        alert:
          "Запрос карточек для страницы " +
          action.pageNumber +
          " выполнился успешно"
      };
    case cardsConstants.GETALL_FAILURE:
      return {
        ...state,
        error: action.error,
        alert: "Не удалось запросить карточки для страницы " + action.pageNumber
      };
    default:
      return state;
  }
}
