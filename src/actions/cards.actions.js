import { cardsConstants } from "./../constants";
import { cardsService } from "./../services";
import { alertActions } from "./";
import { history } from "./../helpers";
import { responseToText } from "./../helpers";
export const cardsActions = { getCards, sortCards, createCard };

function getCards(pageNumber) {
  return dispatch => {
    dispatch(request(pageNumber));
    dispatch(alertActions.success("Запрос карточек для страницы " + pageNumber));

    cardsService.getCards(pageNumber).then(
      cards => {
        dispatch(success(cards, pageNumber));
        dispatch(alertActions.success("Запрос карточек для страницы " + pageNumber + " выполнился успешно"));
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
  function success(cards, pageNumber) {
    return { type: cardsConstants.GET_CARDS_SUCCESS, cards, pageNumber };
  }
  function failure(error, pageNumber) {
    return { type: cardsConstants.GET_CARDS_FAILURE, error, pageNumber };
  }
}

function sortCards(sortField = "id", sortDirection = "asc", pageNumber = 0) {
  return dispatch => {
    dispatch(request(sortField, sortDirection));
    dispatch(
      alertActions.success("Сортируем карточки по полю " + sortField + " в направлении " + sortDirection)
    );

    cardsService.sortCards(sortField, sortDirection).then(
      cards => {
        dispatch(success(cards, sortField, sortDirection));
        dispatch(
          alertActions.success(
            "Карточки успешно отсортированы по полю " + sortField + " в направлении " + sortDirection
          )
        );
      },
      error => {
        dispatch(failure(error, sortField, sortDirection));
        dispatch(
          alertActions.error(
            "Не получилось отсортировать карточки по полю " + sortField + " в направлении " + sortDirection
          )
        );
      }
    );
  };

  function request(sortField, sortDirection) {
    return {
      type: cardsConstants.SORT_CARDS_REQUEST,
      sortField,
      sortDirection
    };
  }
  function success(cards, sortField, sortDirection) {
    return {
      type: cardsConstants.SORT_CARDS_SUCCESS,
      cards,
      sortField,
      sortDirection
    };
  }
  function failure(error, sortField, sortDirection) {
    return {
      type: cardsConstants.SORT_CARDS_FAILURE,
      error,
      sortField,
      sortDirection
    };
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
        // history.push("/card/" + id);
      },
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error("Не получилось создать карточку. Ответ сервера: " + responseToText(error))
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
