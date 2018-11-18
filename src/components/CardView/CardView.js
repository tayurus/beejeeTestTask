import React from "react";
import "./CardView.css";

import { NavLink } from "react-router-dom";
import { statusReady } from "./../../constants";

export const CardView = props => {
  const { id, status, username, email, text, image_path } = props.card;
  const { editAllowed } = props;
  return (
    <div className="CardView card">
      {editAllowed && (<i class="material-icons CardView__edit">edit</i>)}
      <NavLink className="CardView__link" to={"/card/" + id} />
      <div className="d-flex align-items-center my-2">
        <div className="mr-3">status:</div>
        <div>{status === statusReady ? "Выполнена" : "Не выполнена"}</div>
      </div>
      <hr />
      <div className="d-flex align-items-center my-2 flex-wrap">
        <div className="mr-3">username:</div>
        <div>{username}</div>
      </div>
      <hr />
      <div className="d-flex align-items-center my-2 flex-wrap">
        <div className="mr-3">email:</div>
        <div>{email}</div>
      </div>
      <hr />
      <div className="d-flex align-items-center my-2 flex-wrap">
        <div className="mr-3">text:</div>
        <div>{text}</div>
      </div>
      <hr />
      <div className="d-flex align-items-center my-2 flex-wrap">
        <div className="mr-3">image:</div>
        <img src={image_path} className="CardView__img" alt="image from user" />
      </div>
      <hr />
    </div>
  );
};
