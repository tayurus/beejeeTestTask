import { baseURL, token, statusReady, statusNotReady } from "./../constants";
import { handleResponse, fixedEncodeURIComponent } from "./../helpers";
import { sortConstants } from "./../constants";
const md5 = require("md5");

export const cardsService = {
  getCards,
  createCard,
  patchCard
};

function getCards(pageNumber = 1, sortField = sortConstants[2], sortDirection = "asc") {
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
  const query = "https://uxcandy.com/~shapoval/test-task-backend/edit/" + id + "/?developer=Name";

  let formData = new FormData();
  formData.append("status", status ? statusReady : statusNotReady);
  formData.append("text", text);
  formData.append("token", token);

  let bodyWithoutSignature =
    "status=" +
    fixedEncodeURIComponent(status) +
    "&text=" +
    fixedEncodeURIComponent(text) +
    "&token=" +
    fixedEncodeURIComponent(token);

  formData.append("signature", md5(bodyWithoutSignature));

  const requestOptions = {
    method: "POST",
    body: formData
  };

  return fetch(query, requestOptions).then(handleResponse);
}
