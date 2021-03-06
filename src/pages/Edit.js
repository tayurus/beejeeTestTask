import React, { Component } from "react";

import { boolToStatus } from "./../helpers";

import { getCardById } from "./../helpers";

import { connect } from "react-redux";

import { Header, CardInputs, CardView } from "./../components";

import { cardsActions } from "./../actions";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previewMode: false
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.togglePreviewMode = this.togglePreviewMode.bind(this);
    this.handlePatchCardClicked = this.handlePatchCardClicked.bind(this);
  }

  componentWillMount() {
    const editedId = parseInt(this.props.match.params.id);
    const { cards } = this.props;
    const editedCard = getCardById(cards, editedId);
    this.setState({ ...editedCard });
  }

  handleValueChange(e) {
    if (e.target.type === "checkbox") {
      this.setState({ [e.target.name]: boolToStatus(e.target.checked) });
    } else if (e.target.type === "file") {
      this.setState({ [e.target.name]: e.target.files[0] });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  togglePreviewMode() {
    this.setState({ previewMode: !this.state.previewMode });
  }

  handlePatchCardClicked() {
    const { dispatch } = this.props;
    const card = this.state;
    dispatch(cardsActions.patchCard(card.id, card));
  }

  render() {
    const disabledInputs = ["username", "email", "image_path"];
    const { previewMode } = this.state;
    const { username } = this.props;
    return (
      <div className="Create">
        <Header username={username} />
        {previewMode
          ? [
              <h1 className="text-center">Предпросмотр редактированной задачи</h1>,
              <CardView card={this.state} />,
              <button className="btn d-block mx-auto my-3" onClick={this.togglePreviewMode}>
                Вернуться к редактированию
              </button>
            ]
          : [
              <h1 className="text-center">Редактирование задачи</h1>,
              <CardInputs
                card={this.state}
                handleValueChange={this.handleValueChange}
                disabledInputs={disabledInputs}
              />,
              <button className="btn d-block mx-auto my-3" onClick={this.togglePreviewMode}>
                Предпросмотр
              </button>
            ]}
        <button
          type="submit"
          form="createForm"
          className="btn d-block mx-auto my-3"
          onClick={this.handlePatchCardClicked}
        >
          Сохранить изменения
        </button>
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
)(Edit);

export { connectedComponent as Edit };
