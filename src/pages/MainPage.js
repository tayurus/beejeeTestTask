import React, { Component } from "react";

import { cardsActions, userActions } from "./../actions";

import { connect } from "react-redux";

import { Header, CardView } from "./../components";

import { Pagination } from "react-materialize";

class MainPage extends Component {
  constructor(props) {
    super(props);

    // setTimeout(() => {
    //   dispatch(cardsActions.sortCards("id", "desc"));
    // }, 1500);
    // dispatch(userActions.login("admin", "123"));

    this.loadPage = this.loadPage.bind(this);

    this.loadPage(0);
  }

  loadPage(page) {
    const { dispatch } = this.props;
    dispatch(cardsActions.getCards(page - 1));
  }

  render() {
    const { username, cards, totalCardsCount } = this.props;

    if (cards) {
      return (
        <div className="App container">
          <Header username={username} />

          <div className="row">
            {cards.map((card, index) => {
              return (
                <div className="col-lg-4" key={index}>
                  <CardView card={card} />
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Pagination
              items={
                parseInt(totalCardsCount / 3) + (totalCardsCount % 3 !== 0)
              }
              activePage={1}
              maxButtons={10}
              className="d-inline-block"
              onSelect={this.loadPage}
            />
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

function mapStateToProps(state) {
  const { cards, totalCardsCount } = state.cardsReducer;
  const { username } = state.user;
  return {
    cards,
    username,
    totalCardsCount
  };
}

const connectedComponent = connect(
  mapStateToProps,
  null
)(MainPage);

export { connectedComponent as MainPage };
