import React, { Component } from "react";

import { cardsActions } from "./../actions";

import { boolToStatus, resizeImage } from "./../helpers";

import { connect } from "react-redux";

import {MAX_UPLOAD_WIDTH, MAX_UPLOAD_HEIGHT} from './../constants';

import { Header, CardInputs, CardView } from "./../components";

class Create extends Component {
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
    const { previewMode } = this.state;
    return (
      <div className="Create">
        <Header />
        {previewMode
          ? [
              <h1 className="text-center">Предпросмотр задачи</h1>,
              <CardView card={this.state} />,
              <button className="btn d-block mx-auto my-3" onClick={this.togglePreviewMode}>
                Вернуться к созданию
              </button>
            ]
          : [
              <h1 className="text-center">Создание задачи</h1>,
              <CardInputs card={this.state} handleValueChange={this.handleValueChange} />,
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
          Создать задачу
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {}

const connectedComponent = connect(
  mapStateToProps,
  null
)(Create);

export { connectedComponent as Create };
