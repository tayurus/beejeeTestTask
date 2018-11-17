import { cardsConstants } from "../constants";

export function cardsReducer(state = {}, action) {
  switch (action.type) {
    case cardsConstants.GET_CARDS_REQUEST:
      return state;
    case cardsConstants.GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards.message.tasks,
        pageNumber: action.pageNumber
      };
    case cardsConstants.GET_CARDS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case cardsConstants.SORT_CARDS_REQUEST:
      return state;

    case cardsConstants.SORT_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards.message.tasks,
        sortField: action.sortField,
        sortDirection: action.sortDirection
      };

    case cardsConstants.SORT_CARDS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case cardsConstants.CREATE_CARD_REQUEST:
      return state;

    case cardsConstants.CREATE_CARD_SUCCESS:
      return {
        ...state,
        currentCard: action.newCard
      };

    case cardsConstants.CREATE_CARD_FAILURE:
      return state;

    default:
      return state;
  }
}
