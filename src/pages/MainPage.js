import React, { Component } from "react";

import { cardsActions, userActions } from "./../actions";

import { connect } from "react-redux";

import { Header } from "./../components";

class MainPage extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(cardsActions.getCards(0));
    // setTimeout(() => {
    //   dispatch(cardsActions.sortCards("id", "desc"));
    // }, 1500);
    // dispatch(userActions.login("admin", "123"));
  }

  render() {
    const { username } = this.props;
    return (
      <div className="App container">
        <Header username={username} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { cards } = state.cardsReducer;
  const { username } = state.user;
  return {
    cards,
    username
  };
}

const connectedComponent = connect(
  mapStateToProps,
  null
)(MainPage);

export { connectedComponent as MainPage };
