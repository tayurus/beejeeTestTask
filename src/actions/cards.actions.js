import { cardsConstants } from "./../constants";
import { cardsService } from "./../services";
import { alertActions } from "./";
import { responseToText } from "./../helpers";
export const cardsActions = { getCards, createCard };

function getCards(pageNumber, sortField, sortDirection) {
  return dispatch => {
    dispatch(request(pageNumber));
    dispatch(alertActions.success("Запрос карточек для страницы " + pageNumber));

    cardsService.getCards(pageNumber, sortField, sortDirection).then(
      cards => {
        dispatch(success(cards, pageNumber, sortField, sortDirection));
        dispatch(
          alertActions.success("Запрос карточек для страницы " + pageNumber + " выполнился успешно")
        );
      },
      error => {
        dispatch(failure(error, pageNumber));
        dispatch(alertActions.error("Не удалось запросить карточки для страницы " + pageNumber));
      }
    );
  };

  function request(pageNumber) {
    return { type: cardsConstants.GET_CARDS_REQUEST, pageNumber };
  }
  function success(cards, pageNumber, sortField, sortDirection) {
    return { type: cardsConstants.GET_CARDS_SUCCESS, cards, pageNumber, sortField, sortDirection };
  }
  function failure(error, pageNumber) {
    return { type: cardsConstants.GET_CARDS_FAILURE, error, pageNumber };
  }
}

function createCard(newCardData) {
  return dispatch => {
    dispatch(request());
    dispatch(alertActions.success("Попытка создать новую карточку..."));

    cardsService.createCard(newCardData).then(
      res => {
        const { id } = res.message;
        dispatch(success(res.message));
        dispatch(alertActions.success("Карточка создана, ее id = " + id));
      },
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error(
            "Не получилось создать карточку. Ответ сервера: " + responseToText(error)
          )
        );
      }
    );
  };

  function request() {
    return {
      type: cardsConstants.CREATE_CARD_REQUEST
    };
  }
  function success(newCard) {
    return {
      type: cardsConstants.CREATE_CARD_SUCCESS,
      newCard
    };
  }

  function failure(error) {
    return {
      type: cardsConstants.CREATE_CARD_FAILURE,
      error
    };
  }
}
