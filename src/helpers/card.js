export const getCardById = (cards, id) => {
  console.log(
    "cards = ",
    cards,
    " filter = ",
    cards.filter(card => card.id === id)[0],
    " id = ",
    id
  );
  return cards.filter(card => card.id === id)[0];
};
