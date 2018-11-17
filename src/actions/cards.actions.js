import { cardsConstants } from "../constants";
import { cardsService } from "../services";
import { alertActions } from "./";

export const cardsActions = { getCards, sortCards };

function getCards(pageNumber) {
  return dispatch => {
    dispatch(request(pageNumber));
    dispatch(
      alertActions.success("Запрос карточек для страницы " + pageNumber)
    );

    cardsService.getCards(pageNumber).then(
      cards => {
        dispatch(success(cards, pageNumber));
        dispatch(
          alertActions.success(
            "Запрос карточек для страницы " + pageNumber + " выполнился успешно"
          )
        );
      },
      error => {
        dispatch(failure(error, pageNumber));
        dispatch(
          alertActions.error(
            "Не удалось запросить карточки для страницы " + pageNumber
          )
        );
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
      alertActions.success(
        "Сортируем карточки по полю " +
          sortField +
          " в направлении " +
          sortDirection
      )
    );

    cardsService.sortCards(sortField, sortDirection).then(
      cards => {
        dispatch(success(cards, sortField, sortDirection));
        dispatch(
          alertActions.success(
            "Карточки успешно отсортированы по полю " +
              sortField +
              " в направлении " +
              sortDirection
          )
        );
      },
      error => {
        dispatch(failure(error, sortField, sortDirection));
        dispatch(
          alertActions.error(
            "Не получилось отсортировать карточки по полю " +
              sortField +
              " в направлении " +
              sortDirection
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
