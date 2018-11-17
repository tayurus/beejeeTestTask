import React from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "./helpers";
import { alertActions, userActions } from "./actions";
import { MainPage } from "./pages";

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
    const { alert } = this.props;
    return (
      <div className="container py-5">
        <div className="text-center">
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
        </div>

        <Router history={history}>
          <Route exact path="/" component={MainPage} />
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
