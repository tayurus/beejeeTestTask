export const getCardById = (cards, id) => {
  return cards.filter(card => card.id === id)[0];
};

export const boolToStatus = value => {
  if (value) {
    return "10";
  }

  return "0";
};

export const statusToBool = value => {
  if (value === "10") {
    return true;
  }

  return false;
};
