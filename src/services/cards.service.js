import { baseURL, token, statusReady, statusNotReady } from "./../constants";
import { handleResponse } from "./../helpers";
import { sortConstants } from "./../constants";
const md5 = require("md5");

export const cardsService = {
  getCards,
  createCard,
  patchCard
};

function getCards(pageNumber = 1, sortField = sortConstants[0], sortDirection = "asc") {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };
  const query =
    baseURL +
    "/?developer=Name&sort_field=" +
    sortField +
    "&sort_direction=" +
    sortDirection +
    "&page=" +
    pageNumber;

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
    (status ? encodeURIComponent(statusReady) : encodeURIComponent(statusNotReady)) +
    "&text=" +
    encodeURIComponent(text) +
    "&token=" +
    encodeURIComponent(token);

  const md5Hash = md5(bodyWithoutSignature);

  const body = bodyWithoutSignature + "&signature=" + encodeURIComponent(md5Hash);

  const query = baseURL + "/edit/" + id;

  const requestOptions = {
    method: "POST",
    body: body
  };

  return fetch(query, requestOptions).then(handleResponse);
}
