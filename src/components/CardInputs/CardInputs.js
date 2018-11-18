import React from "react";

import "./CardInputs.css";

import { statusToBool } from "./../../helpers";

import { Input } from "react-materialize";

export const CardInputs = props => {
  const { username, email, text, image_path, status } = props.card;
  const { handleValueChange, disabledInputs } = props;
  console.log("disabledInputs = ", disabledInputs);
  console.log("disabledInputs includes username ", disabledInputs.includes("username"));
  return (
    <form className="CardInputs" id="createForm" onSubmit={e => e.preventDefault()}>
      <div className="CardInputs__row">
        <Input
          type="checkbox"
          checked={statusToBool(status)}
          disabled={disabledInputs.includes("status")}
          label="Task is ready:"
          name="status"
          onChange={handleValueChange}
        />
      </div>
      <div className="CardInputs__row">
        <div>username:</div>
        <input
          type="text"
          value={username}
          disabled={disabledInputs.includes("username")}
          name="username"
          required
          onChange={handleValueChange}
        />
      </div>

      <div className="CardInputs__row">
        <div>email:</div>
        <input
          type="text"
          value={email}
          disabled={disabledInputs.includes("email")}
          name="email"
          onChange={handleValueChange}
        />
      </div>

      <div className="CardInputs__row">
        <div>text:</div>
        <input
          type="text"
          value={text}
          disabled={disabledInputs.includes("text")}
          name="text"
          required
          onChange={handleValueChange}
        />
      </div>

      <div className="CardInputs__row">
        <div>Image:</div>
        <input
          type="file"
          disabled={disabledInputs.includes("image_path")}
          name="image_path"
          required
          onChange={handleValueChange}
          accept="image/jpeg,image/png,image/gif"
        />
        {typeof image_path === "object" ? (
          <img src={URL.createObjectURL(image_path)} alt="Your uploaded img" className="CardInputs__img" />
        ) : (
          <img src={image_path} alt="Your uploaded img" className="CardInputs__img" />
        )}
      </div>
    </form>
  );
};

CardInputs.defaultProps = {
  disabledInputs: [],
  username: "",
  email: "",
  text: "",
  image_path: ""
};
