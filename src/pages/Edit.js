import React, { Component } from "react";

import { cardsActions } from "./../actions";

import { boolToStatus, resizeImage } from "./../helpers";

import { getCardById } from "./../helpers";

import { connect } from "react-redux";

import { MAX_UPLOAD_WIDTH, MAX_UPLOAD_HEIGHT } from "./../constants";

import { Header, CardInputs, CardView } from "./../components";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      text: "",
      image_path: "",
      status: false,
      previewMode: false
    };

    this.handleValueChange = this.handleValueChange.bind(this);
    this.togglePreviewMode = this.togglePreviewMode.bind(this);
    this.createTask = this.createTask.bind(this);
  }

  componentWillMount() {
    const editedId = parseInt(this.props.match.params.id);
    const { cards } = this.props;
    const editedCard = getCardById(cards, editedId);
    this.setState({ ...editedCard });
  }

  createTask() {
    const { dispatch } = this.props;
    const { username, email, text, image_path } = this.state;
    if (username && email && text && image_path) {
      const newCard = Object.assign({}, this.state);
      resizeImage(image_path, MAX_UPLOAD_WIDTH, MAX_UPLOAD_HEIGHT).then(resizedImage => {
        newCard.image = resizedImage;
        dispatch(cardsActions.createCard(newCard));
      });
    }
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

  render() {
    const disabledInputs = ["username, email, image_path"];
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
          onClick={this.createTask}
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
