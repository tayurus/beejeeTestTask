import { cardsConstants } from "../constants";

import { sortConstants } from "./../constants";

let initialState = {
  sortDirection: "asc",
  sortField: sortConstants[0]
};

export function cardsReducer(state = initialState, action) {
  switch (action.type) {
    case cardsConstants.GET_CARDS_REQUEST:
      return state;
    case cardsConstants.GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.cards.message.tasks,
        pageNumber: action.pageNumber,
        totalCardsCount: action.cards.message.total_task_count,
        sortField: action.sortField,
        sortDirection: action.sortDirection
      };
    case cardsConstants.GET_CARDS_FAILURE:
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
