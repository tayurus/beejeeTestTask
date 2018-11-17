import { baseURL, token, statusReady, statusNotReady } from "./../constants";
import { handleResponse } from "./../helpers";
const md5 = require("md5");

export const cardsService = {
  getCards,
  sortCards,
  createCard,
  patchCard
};

function getCards(pageNumber) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  const query = baseURL + "/?developer=Name&page=" + pageNumber;

  return fetch(query, requestOptions).then(handleResponse);
}

function sortCards(sortField = "id", sortDirection = "asc", pageNumber = 0) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const query =
    baseURL +
    "/?developer=Name&page=" +
    pageNumber +
    "&sort_field=" +
    sortField +
    "&sort_direction=" +
    sortDirection;

  return fetch(query, requestOptions).then(handleResponse);
}

function createCard(newCardData) {
  const { username, email, text, image } = newCardData;
  var form = new FormData();
  form.append("username", username);
  form.append("email", email);
  form.append("text", text);
  form.append("image", image);

  const requestOptions = {
    method: "POST",
    body: form
  };

  const query = baseURL + "/create?developer=Name";

  return fetch(query, requestOptions).then(handleResponse);
}

function patchCard(id, newData) {
  const { text, status } = newData;

  const bodyWithoutSignature =
    "status=" +
    (status
      ? encodeURIComponent(statusReady)
      : encodeURIComponent(statusNotReady)) +
    "&text=" +
    encodeURIComponent(text) +
    "&token=" +
    encodeURIComponent(token);

  const md5Hash = md5(bodyWithoutSignature);

  const body =
    bodyWithoutSignature + "&signature=" + encodeURIComponent(md5Hash);

  const query = baseURL + "/edit/" + id;

  const requestOptions = {
    method: "POST",
    body: body
  };

  return fetch(query, requestOptions).then(handleResponse);
}
