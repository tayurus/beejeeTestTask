import React, { Component } from "react";

import { cardsActions } from "./../actions";

import { connect } from "react-redux";

import { Header, CardView, Sort } from "./../components";

import { Pagination } from "react-materialize";

import { sortConstants } from "./../constants";

import { NavLink } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { currentPaginationPage: 1 };

    this.loadPage = this.loadPage.bind(this);
    this.onSortItemClick = this.onSortItemClick.bind(this);

    this.loadPage(this.currentPaginationPage);
  }

  loadPage(page) {
    const { dispatch, sortField, sortDirection } = this.props;
    this.setState({ currentPaginationPage: page });
    dispatch(cardsActions.getCards(page, sortField, sortDirection));
  }

  onSortItemClick(sortField, sortDirection) {
    const { dispatch } = this.props;
    this.setState({ currentPaginationPage: 1 }, () => {
      dispatch(cardsActions.getCards(this.state.currentPaginationPage, sortField, sortDirection));
    });
  }

  render() {
    const { username, cards, totalCardsCount, sortField, sortDirection } = this.props;
    const { currentPaginationPage } = this.state;
    console.log("SORT FIELD = ", sortField, " sortDirection =  ", sortDirection);
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
              items={parseInt(totalCardsCount / 3) + (totalCardsCount % 3 !== 0)}
              activePage={currentPaginationPage}
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
  const { cards, totalCardsCount, sortField, sortDirection } = state.cardsReducer;
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
)(Main);

export { connectedComponent as Main };
