import React, { Component } from "react";

import { cardsActions, userActions } from "./../actions";

import { connect } from "react-redux";

class MainPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(cardsActions.getCards(0));
    // setTimeout(() => {
    //   dispatch(cardsActions.sortCards("id", "desc"));
    // }, 1500);
    dispatch(userActions.login("admin", "123"));
  }

  render() {
    return (
      <div className="App">
        <h1>NICE</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards } = state.cardsReducer;
  return cards;
}

const connectedComponent = connect(
  mapStateToProps,
  null
)(MainPage);

export { connectedComponent as MainPage };
