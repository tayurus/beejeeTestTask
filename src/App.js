import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { history, getCardById } from "./helpers";
import { alertActions, userActions } from "./actions";
import { Main, Login, Create } from "./pages";
import { CardView, Header } from "./components";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    dispatch(alertActions.success("День добрый!"));
    dispatch(userActions.logout());
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert, cards } = this.props;
    return (
      <div className="container py-5">
        <div className="text-center">
          {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
        </div>

        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/create" component={Create} />
            <Route
              path="/card/:id"
              render={props => {
                return [<Header />, <CardView card={getCardById(cards, parseInt(props.match.params.id))} />];
              }}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  const { cards } = state.cardsReducer;
  return {
    alert,
    cards
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
