import { cardsConstants } from "../constants";
import { cardsService } from "../services";

export const cardsActions = { getCards };

function getCards(pageNumber) {
  console.log("CARDSACTIONS");
  return dispatch => {
    dispatch(request(pageNumber));

    cardsService
      .getCards(pageNumber)
      .then(
        cards => dispatch(success(cards, pageNumber)),
        error => dispatch(failure(error, pageNumber))
      );
  };

  function request(pageNumber) {
    return { type: cardsConstants.GET_CARDS_REQUEST, pageNumber };
  }
  function success(cards, pageNumber) {
    return { type: cardsConstants.GET_CARDS_SUCCESS, cards, pageNumber };
  }
  function failure(error, pageNumber) {
    return { type: cardsConstants.GET_CARDS_FAILURE, error, pageNumber };
  }
}
