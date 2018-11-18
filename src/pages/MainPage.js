import React, { Component } from "react";

import { cardsActions, userActions } from "./../actions";

import { connect } from "react-redux";

import { Header, CardView, Sort } from "./../components";

import { Pagination } from "react-materialize";

import { sortConstants } from "./../constants";

import { NavLink } from "react-router-dom";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.loadPage = this.loadPage.bind(this);
    this.onSortItemClick = this.onSortItemClick.bind(this);

    this.loadPage(1);
  }

  loadPage(page) {
    const { dispatch } = this.props;
    dispatch(cardsActions.getCards(page - 1));
  }

  onSortItemClick(item, direction) {
    const { dispatch } = this.props;
    dispatch(cardsActions.sortCards(item, direction));
  }

  render() {
    const {
      username,
      cards,
      totalCardsCount,
      sortField,
      sortDirection
    } = this.props;

    if (cards) {
      return (
        <div className="App container">
          <Header username={username} />

          <Sort
            items={sortConstants}
            currentItem={sortField}
            direction={sortDirection}
            onItemClick={this.onSortItemClick}
          />

          <div className="row">
            {cards.map((card, index) => {
              return (
                <div className="col-lg-4 text-center" key={index}>
                  <CardView card={card} editAllowed={username !== ""} />
                </div>
              );
            })}
          </div>

          <div className="text-center my-3">
            <NavLink className="d-inline-block" to="/create">
              <button className="btn">+</button>
            </NavLink>
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
  const {
    cards,
    totalCardsCount,
    sortField,
    sortDirection
  } = state.cardsReducer;
  const { username } = state.user;
  return {
    cards,
    username,
    totalCardsCount,
    sortField,
    sortDirection
  };
}

const connectedComponent = connect(
  mapStateToProps,
  null
)(MainPage);

export { connectedComponent as MainPage };
