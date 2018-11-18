import React from "react";

export const CardInputs = props => {
  const { username, email, text, image_path, disabledInputs, handleValueChange } = props;

  return (
    <div className="CardInputs">
      <div className="CardInputs__row">
        <div>username:</div>
        <input
          type="text"
          value={username}
          disabled={disabledInputs.includes("username")}
          name="username"
          onChange={handleValueChange}
        />
      </div>

      <div className="CardInputs__row">
        <div>email:</div>
        <input
          type="email"
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
          onChange={handleValueChange}
        />
      </div>

      <div className="CardInputs__row">
        <div>Image:</div>
        <input
          type="file"
          value={image_path}
          disabled={disabledInputs.includes("image_path")}
          name="image_path"
          onChange={handleValueChange}
        />
        {image_path && <img src={image_path} alt="Your uploaded img" />}
      </div>
    </div>
  );
};

CardInputs.defaultProps = {
  disabledInputs: [],
  username: "",
  email: "",
  text: "",
  image_path: ""
};
